import React from 'react'
import { TextInput, View } from 'react-native'
import { defaultContainer, headerContainer, inputStyles } from './styles/default.theme'
import { TPedestriansProps } from './types'
import { HeaderActionButton } from '../HeaderActionButton/HeaderActionButton'
import { colors } from '@gcMobile/theme/default.styles'

export const Pedestrians = (props: TPedestriansProps) => {
    return (
        <>
            {props.pedestrians.map((pedestrian, index) => (
                <View key={`pedestrian-${pedestrian.id}`}>
                    {props.pedestrians.length >= 1 && (
                        <View style={headerContainer}>
                            <HeaderActionButton
                                icon="times-circle"
                                color={colors.red}
                                onPress={() => props.removePedestrian(pedestrian.id)}
                            />
                        </View>
                    )}
                    <View style={defaultContainer}>
                        <TextInput
                            style={inputStyles}
                            onChangeText={(nombre: string) => props.handleOnChange(pedestrian.id, 'nombre', nombre)}
                            value={pedestrian.nombre}
                            placeholder="Nombre"
                        />
                    </View>
                </View>
            ))}
        </>
    )
}
