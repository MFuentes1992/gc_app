import React, { useEffect, useState } from 'react'
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import InputComponent from '../../components/Inputs/InputComponent'
import InputPassword from '../../components/Inputs/InputPassword'
import Button from '../../components/Button'
import * as Notifications from 'expo-notifications'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DrawerActions, StackActions, useNavigation } from '@react-navigation/native'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import {
    loginScreenStyles,
    useStyles,
    authenticate,
    saveToken,
    InitializeConnection,
    getIsntalaciones,
} from './constants'
import { buttonComponentStyles } from '@gcMobile/components/Button/constants'
import { colors } from '@gcMobile/theme/default.styles'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '@gcMobile/store/User'
import { setCurrentHouseInfo, setHouse, setRecintoId } from '@gcMobile/store/Houses'
import { IHouseManagement, styles } from '../HouseScreen/conts'
import { setLoading } from '@gcMobile/store/UI'
import { VIEWS } from '@gcMobile/navigation/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RootState } from '@gcMobile/store'
import { LOCAL_STORAGE } from '@gcMobile/util/constants'
import { registerDeviceId } from '@gcMobile/store/Notificaciones/api'
import { registerForPushNotificationsAsync } from '@gcMobile/util/'
import { getRecintoId } from '@gcMobile/store/Houses/api'
import { addBadgeCount } from '@gcMobile/store/Notificaciones'

interface INavigationProps {
    navigation: any
}
interface ErrorResponse {
    status: number
}

type LocalStoredData = {
    access_token: string
    userName: string
    userResidence: string
    userEmail: string
    userId: string
    instalaciones: string
    password?: string
    customerCode?: string
    recintoId?: string
}

export default function LoginScreen() {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const ref = React.useRef<any>()
    const { emailStyles, setEmailStyles, passwordStyles, setPasswordStyles, clicked, setClicked } = useStyles()
    const { isLoading } = useSelector((state: RootState) => state.uiReducer)
    //user data
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [customerCode, setCustomerCode] = useState<string>('')
    const [deviceId, setDevideId] = useState<string>('')

    useEffect(() => {
        AsyncStorage.getItem(LOCAL_STORAGE.USER_CREDENTIALS)
            .then((itemRes: any) => {
                if (itemRes === null) return
                const { customerCode: code, email, password } = JSON.parse(itemRes)
                if (code !== null || email !== null || password !== null) {
                    dispatch(setLoading(true))
                    handleLogin(code, email, password)
                }
            })
            .catch((error: any) => {
                console.error(error)
            })

        ref.current = Notifications.addNotificationReceivedListener((notification) => {
            console.log('--- notification received ---')
            console.log(notification)
            console.log('------')
            dispatch(addBadgeCount())
        })
    }, [])

    const getInputValue = (value?: string) => {
        if (value) setEmailValue(value)
    }

    const getPasswordValue = (value?: string) => {
        if (value) setPasswordValue(value)
    }

    const saveIntoAsyncStorage = async (data: LocalStoredData) => {
        saveToken(data.access_token)
        await AsyncStorage.setItem(LOCAL_STORAGE.USER_CREDENTIALS, JSON.stringify({ ...data, email: data.userEmail }))
        AsyncStorage.getItem(LOCAL_STORAGE.NOTIFICACIONES)
            .then(async (deviceIdLs: any) => {
                if (deviceIdLs === null) {
                    registerForPushNotificationsAsync(Notifications).then(async (deviceId) => {
                        const { estatus, message } = await registerDeviceId(deviceId || '', data.recintoId || '0')
                        if (['200', '201'].includes(estatus)) {
                            console.info({ estatus, message })
                            AsyncStorage.setItem(LOCAL_STORAGE.NOTIFICACIONES, deviceId || '')
                        }
                    })
                }
            })
            .catch((error: any) => {
                console.error(error)
            })
        dispatch(
            setUserData({
                access_token: data.access_token,
                id_instalacion: data.instalaciones,
                email: data.userEmail,
                name: data.userName,
                id: data.userId,
                recintoId: data.recintoId || '0',
            })
        )
        dispatch(setRecintoId(Number.parseInt(data.recintoId || '0', 10)))
    }

    const queryInstalaciones = async (instalaciones: string) => {
        try {
            const rawInstalaciones = await getIsntalaciones(instalaciones)
            const data = await rawInstalaciones.json()
            dispatch(setHouse(instalaciones as unknown as IHouseManagement[]))
            const _house = instalaciones.split(',')[0]
            const defaultHouse = data.find((inst: IHouseManagement) => `${inst.id}` === _house)
            const rawRecinto = await getRecintoId(defaultHouse.id)
            const res = await rawRecinto.json()
            dispatch(setHouse(data))
            dispatch(
                setCurrentHouseInfo({
                    currentHouseId: defaultHouse.id || 0,
                    currentResidence: defaultHouse.residencial || '',
                    currentHouseInstalacion: defaultHouse.num_int || '',
                    currentHouseManzana: defaultHouse.manzana || '',
                })
            )
            return res[0]?.id_recinto
        } catch (error) {
            console.error('Error Instalaciones ======>', error)
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: `Hubo un error al obtener la informacion de residencias, por favor intenta de nuevo.`,
            })
        }
    }

    const handleLogin = async (code: string, email: string, password: string) => {
        try {
            dispatch(setLoading(true))
            const handShakeRaw = await InitializeConnection(code)
            const { status, message: msgHandShake } = await handShakeRaw.json()
            if ([400, 401, 500].includes(status) || msgHandShake.includes('Error')) {
                dispatch(setLoading(false))
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: `Hubo un error al iniciar sesion, por favor intenta de nuevo.`,
                })
                return
            }
            const loginRaw = await authenticate(email, password)
            const { code: loginCode, message, access_token, name, residence, id, instalaciones } = await loginRaw.json()
            if (loginCode === '400') {
                dispatch(setLoading(false))
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: 'Usuario o contraseña incorrectos, por favor intenta de nuevo.',
                })
                return
            }
            const recintoId = await queryInstalaciones(instalaciones)

            saveIntoAsyncStorage({
                access_token,
                userName: name,
                userResidence: residence,
                userEmail: email,
                userId: id,
                instalaciones,
                customerCode: code,
                password,
                recintoId,
            })
            dispatch(setLoading(false))
            navigation.navigate(VIEWS.VISITAS as never)
        } catch (error) {
            console.error('Error Login ======>', error)
            dispatch(setLoading(false))
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: `Hubo un error al iniciar sesion, por favor, verifica tus credenciales e intenta de nuevo`,
            })
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {!isLoading && (
                <View style={[loginScreenStyles.container]}>
                    <ScrollView>
                        <View style={loginScreenStyles.rowImage}>
                            <Image
                                source={require('@gcMobile/images/logoGcMobile.jpeg')}
                                style={loginScreenStyles.imageStyles}
                            />
                        </View>
                        <View style={loginScreenStyles.row}>
                            <InputComponent
                                textInput="Email"
                                styles={emailStyles.email}
                                regularExpression={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
                                regexValidation={(value) =>
                                    setEmailStyles({
                                        ...emailStyles,
                                        regexState: value,
                                    })
                                }
                                isClicked={clicked}
                                textInputValue={getInputValue}
                            />
                        </View>
                        <View style={loginScreenStyles.row}>
                            <InputPassword
                                textInput="Contraseña"
                                styles={passwordStyles.password}
                                regexValidation={(value) =>
                                    setPasswordStyles({
                                        ...passwordStyles,
                                        regexState: value,
                                    })
                                }
                                isClicked={clicked}
                                passwordValue={getPasswordValue}
                                regularExpression={/\S+/}
                            />
                        </View>
                        <View style={loginScreenStyles.row}>
                            <InputPassword
                                textInput="Código"
                                styles={colors.gray}
                                isClicked={clicked}
                                passwordValue={(value: string) => setCustomerCode(value)}
                            />
                        </View>
                        <View style={loginScreenStyles.row}>
                            <Button
                                styles={buttonComponentStyles.button}
                                textButton="Iniciar sesión"
                                onPress={() => {
                                    if (!emailStyles.regexState) {
                                        dispatch(setLoading(false))
                                        Toast.show({
                                            type: ALERT_TYPE.DANGER,
                                            title: 'Invalid email format',
                                            textBody: 'Please enter a valid email address.',
                                        })
                                        return
                                    } else if (passwordStyles.regexState) {
                                        if (customerCode === '') {
                                            dispatch(setLoading(false))
                                            Toast.show({
                                                type: ALERT_TYPE.DANGER,
                                                title: 'Empty code',
                                                textBody: 'Please enter a valid code',
                                            })
                                            return
                                        }
                                        handleLogin(customerCode, emailValue, passwordValue)
                                    }
                                }}
                            />
                        </View>
                        <View style={loginScreenStyles.rowText}>
                            <Text style={loginScreenStyles.label}>V1.1</Text>
                        </View>
                    </ScrollView>
                </View>
            )}
        </SafeAreaView>
    )
}
