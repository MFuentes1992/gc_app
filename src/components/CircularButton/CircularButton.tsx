import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { circularBtnStyles } from './constants'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
interface ICircularButtonProps {
    window: string
    icon: IconName
    color: string
    styles: { [key: string]: string | number | any }
}
export type IconName = Extract<keyof typeof AntDesign.glyphMap, string>

export default function CircularButton(props: ICircularButtonProps) {
    const navigation = useNavigation<any>()
    const openWindow = () => {
        navigation.navigate(props.window, {})
    }
    return (
        <TouchableOpacity style={props.styles} onPress={openWindow}>
            <AntDesign name={props.icon} size={24} color={props.color} />
        </TouchableOpacity>
    )
}
