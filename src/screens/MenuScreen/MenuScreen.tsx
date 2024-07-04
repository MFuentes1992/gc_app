import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { View, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'
import { MenuProps, styles } from './constants'
import { logout } from '../Login/constants'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@gcMobile/store'
import { cleanUserData, setUserData } from '@gcMobile/store/User'
import { VIEWS } from '@gcMobile/navigation/constants'
import { StackActions } from '@react-navigation/native'
import { setMenuOpen } from '@gcMobile/store/UI'

export const MenuScreen = ({ navigation }: MenuProps) => {
    const { currentHouseInstalacion, currentHouseManzana, currentResidence } = useSelector(
        (state: RootState) => state.houseReducer
    )

    const dispatch = useDispatch()

    const handleLogout = async () => {
        const value = await logout()
        dispatch(cleanUserData())
        dispatch(setMenuOpen(false))
        if (value) navigation.navigate(VIEWS.LOGIN as never)
    }

    return (
        <View style={styles.container}>
            {/** Title row */}
            <View style={styles.residenceContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <FontAwesome name="user-circle-o" style={styles.iconStyles} />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.textStyles}>Asociacion de condominos - {currentResidence}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.tinyText}>{`Manzana: ${currentHouseManzana}`}</Text>
                            <Text style={styles.tinyText}>{`Casa: ${currentHouseInstalacion}`}</Text>
                        </View>
                    </View>
                </View>
            </View>
            {/** Consulta de notificaciones */}
            <View style={styles.tenthHeight}>
                <TouchableOpacity
                    style={{ flexDirection: 'row' }}
                    onPress={() => {
                        dispatch(setMenuOpen(false))
                        navigation.dispatch(StackActions.replace(VIEWS.NOTIFICACIONES))
                    }}
                >
                    <FontAwesome name="bell-o" style={styles.iconStyles} />
                    <Text style={styles.textStyles}>Notificaciones</Text>
                </TouchableOpacity>
            </View>
            {/** Consulta de Avisos */}
            <View style={styles.tenthHeight}>
                <TouchableOpacity
                    style={{ flexDirection: 'row' }}
                    onPress={() => {
                        dispatch(setMenuOpen(false))
                        navigation.dispatch(StackActions.replace(VIEWS.EDO_CUENTA as never))
                    }}
                >
                    <MaterialCommunityIcons name="file-document-multiple-outline" style={styles.iconStyles} />
                    <Text style={styles.textStyles}>Avisos</Text>
                </TouchableOpacity>
            </View>
            {/** Consulta de casas */}
            <View style={styles.tenthHeight}>
                <TouchableOpacity
                    style={{ flexDirection: 'row' }}
                    onPress={() => {
                        dispatch(setMenuOpen(false))
                        navigation.dispatch(StackActions.replace(VIEWS.HOUSE_MANAGEMENT as never))
                    }}
                >
                    <FontAwesome name="building-o" style={styles.iconStyles} />
                    <Text style={styles.textStyles}>Consultar otra casa</Text>
                </TouchableOpacity>
            </View>
            {/** Cambiar contrasenia */}
            <View style={styles.tenthHeight}>
                <TouchableOpacity style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcons name="form-textbox-password" style={styles.iconStyles} />
                    <Text style={styles.textStyles}>Cambiar contrasena</Text>
                </TouchableOpacity>
            </View>
            {/** Cerrar sesion */}
            <View style={styles.tenthHeight}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={handleLogout}>
                    <FontAwesome name="arrow-circle-o-right" style={styles.iconStyles} />
                    <Text style={styles.textStyles}>Cerrar sesion</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
