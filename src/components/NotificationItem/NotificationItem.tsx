import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { AVISOS_TYPE, NotificationItemProps, container, dateContainer, titleContainer } from './constants'
import { colors, fonts } from '@gcMobile/theme/default.styles'
import { useNavigation } from '@react-navigation/native'
import { VIEWS } from '@gcMobile/navigation/constants'

export const NotificationItem = ({ title, date, type, handlePress }: NotificationItemProps) => {
    return (
        <TouchableOpacity style={container} onPress={handlePress}>
            <View
                style={[
                    titleContainer,
                    { borderLeftColor: [type].includes(AVISOS_TYPE.NOTIFICACION) ? colors.cherry : colors.blue },
                ]}
            >
                <Text style={{ fontSize: fonts.text_subtitle }}>{title}</Text>
            </View>
            <View
                style={[
                    dateContainer,
                    { borderLeftColor: [type].includes(AVISOS_TYPE.NOTIFICACION) ? colors.cherry : colors.blue },
                ]}
            >
                <Text style={{ fontSize: fonts.bodyText3 }}>{date}</Text>
            </View>
        </TouchableOpacity>
    )
}

NotificationItem.defaultProps = {
    type: AVISOS_TYPE.NOTIFICACION,
}
