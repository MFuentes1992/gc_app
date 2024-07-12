import React, { useEffect } from 'react'
import { Alert, StyleSheet, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { colors } from '@gcMobile/theme/default.styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@gcMobile/store'
import { DrawerActions, StackActions, useNavigation } from '@react-navigation/native'
import { VIEWS } from '@gcMobile/navigation/constants'
import { setMenuOpen } from '@gcMobile/store/UI'
import { useDrawerStatus } from '@react-navigation/drawer'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: colors.blue,
    },
    countContainer: {
        alignItems: 'center',
        padding: 10,
    },
})

export const Menu = () => {
    const navigation = useNavigation()
    const { access_token } = useSelector((state: RootState) => state.userReducer)

    const onPress = () => {
        navigation.dispatch(DrawerActions.toggleDrawer())
    }
    return (
        <>
            {access_token != '' && (
                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Entypo name="menu" size={32} color="white" />
                </TouchableOpacity>
            )}
        </>
    )
}
