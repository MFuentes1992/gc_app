import React from 'react'
import { View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Fontisto from '@expo/vector-icons/Fontisto'
import { cardPopUpStyles } from './constants'
import { colors } from '@gcMobile/theme/default.styles'
import { TouchableOpacity } from 'react-native-gesture-handler'

type PopOverMenuProps = {
    iconList: { name: string; size: number; color: string; onPressed: () => void }[]
}

export const PopOverMenu = ({ iconList }: PopOverMenuProps) => {
    return (
        <View style={cardPopUpStyles.container}>
            {iconList.map((icon, index) => (
                <TouchableOpacity key={index} style={cardPopUpStyles.row} onPress={icon.onPressed}>
                    <FontAwesome
                        name={icon.name as any}
                        size={icon.size}
                        color={icon.color}
                        // style={[cardPopUpStyles.icon]}
                    />
                </TouchableOpacity>
            ))}
        </View>
    )
}
