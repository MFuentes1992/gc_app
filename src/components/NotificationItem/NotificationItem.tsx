import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { AVISOS_TYPE, NotificationItemProps, RIBBON_COLOR, container, dateContainer, titleContainer } from './constants'
import { colors, fonts } from '@gcMobile/theme/default.styles'
import { useNavigation } from '@react-navigation/native'
import { VIEWS } from '@gcMobile/navigation/constants'

export const NotificationItem = ({ title, date, type, handlePress }: NotificationItemProps) => {
    return (
        <TouchableOpacity style={container} onPress={handlePress}>
            <View style={[titleContainer, { borderLeftColor: RIBBON_COLOR[`${type}`] }]}>
                <Text style={{ fontSize: fonts.text_subtitle }}>{title}</Text>
            </View>
            <View style={[dateContainer, { borderLeftColor: RIBBON_COLOR[`${type}`] }]}>
                <Text style={{ fontSize: fonts.bodyText3 }}>{date}</Text>
            </View>
        </TouchableOpacity>
    )
}
