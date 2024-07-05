import React, { useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { container } from './constants'
import NotificationItem from '@gcMobile/components/NotificationItem'
import { useDispatch, useSelector } from 'react-redux'
import { clearBadgeCount } from '@gcMobile/store/Notificaciones'
import { getAvisos } from '@gcMobile/store/Notificaciones/api'
import { RootState } from '@gcMobile/store'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@gcMobile/theme/default.styles'
import { useNavigation } from '@react-navigation/native'
import { VIEWS } from '@gcMobile/navigation/constants'
import { getEstadosCuenta } from '@gcMobile/store/EdoCta/api'
import RNFetchBlob from 'rn-fetch-blob'
import { base_web_server } from '@gcMobile/components/Auth/constants'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { AVISOS_TYPE } from '@gcMobile/components/NotificationItem/constants'

export const Notificaciones = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation<any>()

    const { avisos } = useSelector((state: RootState) => state.notificacionesReducer)
    const { avisos: edoCta } = useSelector((state: RootState) => state.estadoCuenta)
    const { recintoId, currentHouseId } = useSelector((state: RootState) => state.houseReducer)
    const userId = useSelector((state: RootState) => state.userReducer.id)

    useEffect(() => {
        dispatch(clearBadgeCount())
        dispatch(getAvisos(`${recintoId}`) as any)
        dispatch(getEstadosCuenta(userId, currentHouseId.toString()) as any)
    }, [])

    const handlePress = (id: string, title: string, body: string) => {
        navigation.navigate(VIEWS.READ_NOTIFICATION, { id, title, body })
    }

    const handlePressEdoCta = (path: string) => {
        try {
            RNFetchBlob.config({
                fileCache: true,
                appendExt: 'pdf',
            })
                .fetch('GET', `${base_web_server}${path}`)
                .then((res) => {
                    navigation.navigate(VIEWS.PDF_VIEWER, { uri: res.path() })
                })
                .catch((error) => console.log(error))
        } catch (error) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                textBody: 'No se pudo obtener el archivo.',
            })
        }
    }

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={container}>
                {avisos.map((item, index) => (
                    <NotificationItem
                        key={index}
                        id={item.id}
                        title={item.titulo}
                        date={item.fecha}
                        body={item.descripcion}
                        type={AVISOS_TYPE.NOTIFICACION}
                        handlePress={() => handlePress(item.id, item.titulo, item.descripcion)}
                    />
                ))}
                {edoCta.map((item, index) => (
                    <NotificationItem
                        key={index}
                        id={item.id}
                        title={item.titulo}
                        date={item.fecha}
                        type={AVISOS_TYPE.ESTADO_CUENTA}
                        handlePress={() => handlePressEdoCta(item.path)}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}
