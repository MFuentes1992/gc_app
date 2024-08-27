import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { View, TouchableOpacity, Image } from 'react-native'
import { Text } from 'react-native-elements'
import { MenuProps, styles } from './constants'
import { logout } from '../Login/constants'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@gcMobile/store'
import { cleanUserData, setUserData } from '@gcMobile/store/User'
import { VIEWS } from '@gcMobile/navigation/constants'
import { DrawerActions, StackActions, useNavigation } from '@react-navigation/native'
import { setMenuOpen } from '@gcMobile/store/UI'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PROFILES } from '@gcMobile/util'
import { base_web_server } from '@gcMobile/components/Auth/constants'

export const MenuScreen = () => {
    const { currentHouseInstalacion, currentHouseManzana, currentResidence, recintoImageUrl } = useSelector(
        (state: RootState) => state.houseReducer
    )

    const { id_profile } = useSelector((state: RootState) => state.userReducer)

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const handleLogout = async () => {
        const value = await logout()
        AsyncStorage.clear()
        dispatch(cleanUserData())
        dispatch(setMenuOpen(false))
        if (value) navigation.navigate(VIEWS.LOGIN as never)
    }

    return (
        <DrawerContentScrollView style={styles.container}>
            {/** Title row */}
            <View style={styles.residenceContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: `${base_web_server}${recintoImageUrl}` }} style={[styles.Image_Styles]} />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.textStyles}>{currentResidence}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.tinyText}>{currentHouseManzana}</Text>
                            <Text style={styles.tinyText}>{currentHouseInstalacion}</Text>
                        </View>
                    </View>
                </View>
            </View>
            {/** Consulta de Edo Cuenta */}
            {[`${PROFILES.OWNER}`].includes(`${id_profile}`) && (
                <View style={styles.tenthHeight}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row' }}
                        onPress={() => {
                            dispatch(setMenuOpen(false))
                            navigation.navigate({
                                name: VIEWS.EDO_CUENTA,
                            } as never)
                        }}
                    >
                        <MaterialCommunityIcons name="file-document-multiple-outline" style={styles.iconStyles} />
                        <Text style={styles.textStyles}>Estados de cuenta</Text>
                    </TouchableOpacity>
                </View>
            )}
            {/** Consulta de Recibos */}
            {[`${PROFILES.OWNER}`].includes(`${id_profile}`) && (
                <View style={styles.tenthHeight}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row' }}
                        onPress={() => {
                            dispatch(setMenuOpen(false))
                            navigation.navigate({
                                name: VIEWS.RECIBOS,
                            } as never)
                        }}
                    >
                        <MaterialCommunityIcons name="credit-card-edit-outline" style={styles.iconStyles} />
                        <Text style={styles.textStyles}>Recibos</Text>
                    </TouchableOpacity>
                </View>
            )}
            {/** Consulta de Visitas */}
            <View style={styles.tenthHeight}>
                <TouchableOpacity
                    style={{ flexDirection: 'row' }}
                    onPress={() => {
                        dispatch(setMenuOpen(false))
                        navigation.navigate(VIEWS.VISITAS as never)
                    }}
                >
                    <FontAwesome name="id-card-o" style={styles.iconStyles} />
                    <Text style={styles.textStyles}>Visitas</Text>
                </TouchableOpacity>
            </View>
            {/** Consulta de Avisos */}
            <View style={styles.tenthHeight}>
                <TouchableOpacity
                    style={{ flexDirection: 'row' }}
                    onPress={() => {
                        dispatch(setMenuOpen(false))
                        navigation.navigate(VIEWS.AVISOS as never)
                    }}
                >
                    <Ionicons name="megaphone-outline" style={styles.iconStyles} />
                    <Text style={styles.textStyles}>Avisos</Text>
                </TouchableOpacity>
            </View>
            {/** Consulta de casas */}
            <View style={styles.tenthHeight}>
                <TouchableOpacity
                    style={{ flexDirection: 'row' }}
                    onPress={() => {
                        dispatch(setMenuOpen(false))
                        navigation.navigate(VIEWS.HOUSE_MANAGEMENT as never)
                    }}
                >
                    <FontAwesome name="building-o" style={styles.iconStyles} />
                    <Text style={styles.textStyles}>Consultar otra casa</Text>
                </TouchableOpacity>
            </View>
            {/** Cambiar contrasenia */}
            <View style={styles.tenthHeight}>
                <TouchableOpacity
                    style={{ flexDirection: 'row' }}
                    onPress={() => {
                        dispatch(setMenuOpen(false))
                        navigation.navigate(VIEWS.CHANGE_PASSWORD as never)
                    }}
                >
                    <MaterialCommunityIcons name="form-textbox-password" style={styles.iconStyles} />
                    <Text style={styles.textStyles}>Cambiar contraseña</Text>
                </TouchableOpacity>
            </View>
            {/** Cerrar sesion */}
            <View style={styles.tenthHeight}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={handleLogout}>
                    <FontAwesome name="arrow-circle-o-right" style={styles.iconStyles} />
                    <Text style={styles.textStyles}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    )
}
