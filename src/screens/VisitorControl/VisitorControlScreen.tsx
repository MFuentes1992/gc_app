import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Filter from '@gcMobile/components/Filter'
import Card from '@gcMobile/components/Card'
import CircularButton from '@gcMobile/components/CircularButton'
import { circularBtnStyles } from '@gcMobile/components/CircularButton/constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TipoVisita } from '@gcMobile/store/TipoVisitas/types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@gcMobile/store'
import { getVisistaByFilter, getVisitas } from '@gcMobile/store/Visitas/api'
import { setVisitas } from '@gcMobile/store/Visitas'

type VisitorControlScreenProps = {
    navigation: any
    filters: TipoVisita[]
}

export default function VisitorControlScreen({ navigation, filters }: VisitorControlScreenProps) {
    const dispatch = useDispatch()
    const { email } = useSelector((state: RootState) => state.userReducer)
    const { visitas } = useSelector((state: RootState) => state.visitasReducer)
    const { newVisistaQR } = useSelector((state: RootState) => state.visitasReducer)
    const { currentHouseId } = useSelector((state: RootState) => state.houseReducer)
    const [selectedFilters, setFilters] = useState<string[]>([])

    useEffect(() => {
        if (visitas.length === 0) {
            dispatch(getVisitas(email, currentHouseId) as any)
        }
        return () => {
            dispatch(setVisitas([]))
        }
    }, [])

    useEffect(() => {
        if (selectedFilters.length > 0) {
            dispatch(getVisistaByFilter(email, currentHouseId, selectedFilters) as any)
        } else {
            dispatch(getVisitas(email, currentHouseId) as any)
        }
    }, [selectedFilters, newVisistaQR, currentHouseId])
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                width: '100%',
            }}
        >
            <Filter filters={filters} handleFilters={(filterArr: string[]) => setFilters(filterArr)} />
            <View
                style={{
                    flex: 0.1,
                    flexDirection: 'row-reverse',
                }}
            >
                <CircularButton styles={circularBtnStyles.container} window={'Form'} icon="plus" color="white" />
            </View>
            <SafeAreaView
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    width: '100%',
                }}
            >
                <ScrollView
                    contentContainerStyle={{
                        width: '100%',
                        padding: '2%',
                    }}
                >
                    {visitas?.map((data: any, index: number) => (
                        <View style={{ width: '100%' }} key={data?.uniqueID}>
                            <Card {...data} index={index} />
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
