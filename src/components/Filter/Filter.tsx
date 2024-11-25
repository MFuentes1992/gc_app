import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { TipoVisita } from '@gcMobile/store/TipoVisitas/types'
import { colors } from '@gcMobile/theme/default.styles'
import { FilterStyles, colorFilters } from './constants'
import * as Animatable from 'react-native-animatable'

type FilterProps = {
    filters: TipoVisita[]
    handleFilters: (filters: string[]) => void
}

const Filter = ({ filters, handleFilters }: FilterProps) => {
    const [selectedFilter, setSelectedFilter] = useState<string[]>([])
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

    const toggleFilter = (filter: string) => {
        if (selectedFilter.includes(filter)) {
            setSelectedFilter(selectedFilter.filter((item) => item !== filter))
        } else {
            setSelectedFilter((prev) => [...prev, filter])
        }
    }

    const handleDrawer = () => {
        setDrawerOpen((prev) => !prev)
    }

    useEffect(() => {
        handleFilters(selectedFilter)
    }, [selectedFilter])

    const drawerAnim = {
        from: {
            height: 0,
        },
        to: {
            height: 80,
        },
    }

    const drawerAnimReverse = {
        from: {
            height: 80,
        },
        to: {
            height: 0,
        },
    }

    return (
        <View style={FilterStyles.container}>
            <View style={FilterStyles.filterHeaderContainer}>
                <View style={{ width: '50%', justifyContent: 'center', flexDirection: 'row' }}>
                    {selectedFilter.map((_, index) => (
                        <View style={{ backgroundColor: colorFilters[index], width: 20, margin: 5, borderRadius: 50 }}>
                            {''}
                        </View>
                    ))}
                </View>
                <View style={FilterStyles.filterControls}>
                    <TouchableOpacity onPress={handleDrawer}>
                        {!drawerOpen && <AntDesign name="down" size={20} color={colors.gray} />}
                        {drawerOpen && <AntDesign name="up" size={20} color={colors.gray} />}
                    </TouchableOpacity>
                </View>
            </View>
            <Animatable.View
                animation={drawerOpen ? drawerAnim : drawerAnimReverse}
                duration={500}
                style={[FilterStyles.filterContainer, { height: !drawerOpen ? 0 : 120, overflow: 'hidden' }]}
            >
                {filters?.map((filter: TipoVisita, index: number) => (
                    <TouchableOpacity
                        key={filter.id}
                        style={{
                            height: 40,
                            borderRadius: 30,
                            paddingHorizontal: 10,
                            marginTop: 15,
                            marginHorizontal: 1,
                            backgroundColor: selectedFilter.includes(`${filter.id}`)
                                ? colorFilters[index]
                                : colors.gray,
                        }}
                        onPress={() => toggleFilter(`${filter.id}`)}
                    >
                        <Text style={FilterStyles.buttonText}>{filter.tipo_visita}</Text>
                    </TouchableOpacity>
                ))}
            </Animatable.View>
        </View>
    )
}

export default Filter
