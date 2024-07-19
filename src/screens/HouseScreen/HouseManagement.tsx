import React, { useEffect, useMemo, useState } from 'react'
import { IHouseManagement, styles } from './conts'
import { View } from 'react-native'
import RadioGroup from 'react-native-radio-buttons-group'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@gcMobile/store'
import { setCurrentHouseInfo, setRecintoId } from '@gcMobile/store/Houses'
import { Text } from 'react-native-elements'
import { FontAwesome5 } from '@expo/vector-icons'
import { getRecintoId } from '@gcMobile/store/Houses/api'

export const HouseManagement = () => {
    const dispatch = useDispatch()
    const { houses, currentHouseId } = useSelector((state: RootState) => state.houseReducer)
    const { name } = useSelector((state: RootState) => state.userReducer)

    const [selectedHouse, setSelectedHouse] = useState<string>(currentHouseId ? `${currentHouseId}` : '')

    const radioButtonsData = useMemo(
        () =>
            houses.map((house) => ({
                id: `${house.id}`,
                label: `Manzana: ${house.manzana} - Numero: ${house.num_int}.\n${house.calle}, ${house.ciudad}, ${house.cp}`,
                value: `${house.id}`,
            })),
        []
    )

    return (
        <View style={styles.container}>
            <View style={styles.teenthHeight}>
                <FontAwesome5 name="house-user" size={18} color="gray" />
                <Text style={styles.title}>{`Gestion de Unidades de: ${name}`}</Text>
            </View>
            <View style={styles.thirdHeight}>
                <RadioGroup
                    layout="column"
                    containerStyle={styles.containerStyle}
                    labelStyle={styles.labelStyle}
                    radioButtons={radioButtonsData}
                    onPress={(id) => {
                        const house = houses.find((house) => `${house.id}` === id)
                        if (house) {
                            getRecintoId(house.id)
                                .then((raw) => raw.json())
                                .then((data) => {
                                    const [payload] = data
                                    dispatch(setRecintoId(payload.id_recinto as number))
                                })
                            dispatch(
                                setCurrentHouseInfo({
                                    currentHouseId: house.id,

                                    currentResidence: house.residencial,
                                    currentHouseInstalacion: house.num_int,
                                    currentHouseManzana: house.manzana,
                                })
                            )
                        }
                        setSelectedHouse(id)
                    }}
                    selectedId={selectedHouse}
                />
            </View>
        </View>
    )
}
