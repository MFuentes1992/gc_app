import React, { useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { container } from './constants'
import NotificationItem from '@gcMobile/components/NotificationItem'
import { useDispatch, useSelector } from 'react-redux'
import { clearBadgeCount } from '@gcMobile/store/Notificaciones'
import { getAvisos } from '@gcMobile/store/Notificaciones/api'
import { RootState } from '@gcMobile/store'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@gcMobile/theme/default.styles'
import { useNavigation } from '@react-navigation/native'
import { VIEWS } from '@gcMobile/navigation/constants'

export const Notificaciones = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation<any>()

    const { avisos } = useSelector((state: RootState) => state.notificacionesReducer)
    const { recintoId } = useSelector((state: RootState) => state.houseReducer)

    useEffect(() => {
        dispatch(clearBadgeCount())
        dispatch(getAvisos(`${recintoId}`) as any)
    }, [])

    const handlePress = (id: string, title: string, body: string) => {
        navigation.navigate(VIEWS.READ_NOTIFICATION, { id, title, body })
    }

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={container}>
                {avisos.map((item, index) => (
                    <NotificationItem
                        key={index}
                        id={item.id}
                        title={item.titulo}
                        date={item.fecha}
                        body={item.descripcion}
                        handlePress={() => handlePress(item.id, item.titulo, item.descripcion)}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}
