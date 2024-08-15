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
import { useNavigation } from '@react-navigation/native'
import { VIEWS } from '@gcMobile/navigation/constants'
import { colors } from '@gcMobile/theme/default.styles'
import { Navbar } from '@gcMobile/navigation/Navbar/Navbar'

export const HouseManagement = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const { houses, currentHouseId } = useSelector((state: RootState) => state.houseReducer)
    const { name } = useSelector((state: RootState) => state.userReducer)

    const [selectedHouse, setSelectedHouse] = useState<string>(currentHouseId ? `${currentHouseId}` : '')

    const radioButtonsData = useMemo(
        () =>
            houses.map((house) => ({
                id: `${house.id}`,
                label: `${house.manzana} ${house.num_int}\n${house.calle}, ${house.ciudad}, ${house.cp}`,
                value: `${house.id}`,
            })),
        []
    )

    return (
        <View style={styles.container}>
            <Navbar title="Consultar otra casa" />
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
                                    recintoImageUrl: house.logo,
                                })
                            )
                        }
                        setSelectedHouse(id)
                        navigation.navigate({ name: VIEWS.HOME } as never)
                    }}
                    selectedId={selectedHouse}
                />
            </View>
        </View>
    )
}
