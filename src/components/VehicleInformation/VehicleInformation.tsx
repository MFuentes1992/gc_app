import React, { useEffect } from 'react'
import { VehicleInformationProps, VehicleInformationState } from './types'
import { View, Text, TextInput } from 'react-native'
import { defaultContainer, headerContainer, inputStyles } from './styles/default.theme'
import { Separator } from '../Separator/Separator'
import { HeaderActionButton } from '../HeaderActionButton/HeaderActionButton'
import { colors } from '@gcMobile/theme/default.styles'

export const VehicleInformation = (props: VehicleInformationProps) => {
    return (
        <>
            {props.vehicles.map((vehicle, index) => (
                <View key={`container-${vehicle.id}`}>
                    {props.vehicles.length >= 1 && (
                        <View style={headerContainer}>
                            <HeaderActionButton
                                icon="times-circle"
                                color={colors.red}
                                onPress={() => props.removeVehicle(vehicle.id)}
                            />
                        </View>
                    )}
                    <View style={defaultContainer}>
                        <TextInput
                            style={inputStyles}
                            onChangeText={(conductor: string) =>
                                props.handleOnChange(vehicle.id, 'conductor', conductor)
                            }
                            value={vehicle.conductor}
                            placeholder="Nombre conductor"
                        />
                        <TextInput
                            style={inputStyles}
                            onChangeText={(brand: string) => props.handleOnChange(vehicle.id, 'marca', brand)}
                            value={vehicle.marca}
                            placeholder="Marca del vehículo"
                        />
                        <TextInput
                            style={inputStyles}
                            onChangeText={(model: string) => props.handleOnChange(vehicle.id, 'modelo', model)}
                            value={vehicle.modelo}
                            placeholder="Modelo del vehículo"
                        />
                        <TextInput
                            style={inputStyles}
                            onChangeText={(year: string) => props.handleOnChange(vehicle.id, 'anio', year)}
                            value={vehicle.anio}
                            placeholder="Año del vehículo"
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={inputStyles}
                            onChangeText={(color: string) => props.handleOnChange(vehicle.id, 'color', color)}
                            value={vehicle.color}
                            placeholder="Color del vehículo"
                        />
                        <TextInput
                            style={inputStyles}
                            onChangeText={(plate: string) => props.handleOnChange(vehicle.id, 'placas', plate)}
                            value={vehicle.placas}
                            placeholder="Matrícula del vehículo"
                        />
                    </View>
                    {index + 1 !== props.vehicles.length && <Separator />}
                </View>
            ))}
        </>
    )
}

VehicleInformation.defaultProps = {
    saveInformation: () => {},
}
