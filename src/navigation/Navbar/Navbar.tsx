import React from 'react'
import { View, Text } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { navbar_styles, NavbarProps } from './constants'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { RootState } from '@gcMobile/store'
import { styles } from '@gcMobile/screens/HouseScreen/conts'
import { colors } from '@gcMobile/theme/default.styles'
import { VIEWS } from '../constants'

export const Navbar = (props: { title?: string; callback?: () => void }) => {
    const navigation = useNavigation()
    const { currentHouseManzana, currentHouseInstalacion } = useSelector((state: RootState) => state.houseReducer)

    const handleBack = (route: string) => {
        props.callback && props.callback()
        switch (route) {
            case '':
                navigation.goBack()
                break
            case VIEWS.HOUSE_MANAGEMENT:
                navigation.navigate({ name: route } as never)
                break
            default:
                break
        }
    }

    return (
        <View style={[{ display: 'flex', flexDirection: 'column', width: '100%' }]}>
            <View style={[navbar_styles]}>
                <TouchableOpacity onPress={() => handleBack('')}>
                    <Ionicons name="return-down-back-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleBack(VIEWS.HOUSE_MANAGEMENT)}>
                    <Text>{`${currentHouseManzana} ${currentHouseInstalacion}`}</Text>
                </TouchableOpacity>
            </View>
            {props.title && (
                <View style={[styles.teenthHeight, { backgroundColor: 'transparent' }]}>
                    <Text style={[styles.tinyText, { color: colors.blue }]}>{props.title}</Text>
                </View>
            )}
        </View>
    )
}

Navbar.defaultProps = {
    title: '',
    callback: () => {},
}
