import NotificationItem from '@gcMobile/components/NotificationItem'
import { AVISOS_TYPE } from '@gcMobile/components/NotificationItem/constants'
import { VIEWS } from '@gcMobile/navigation/constants'
import { Navbar } from '@gcMobile/navigation/Navbar/Navbar'
import { RootState } from '@gcMobile/store'
import { getAvisos } from '@gcMobile/store/Notificaciones/api'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

export const Avisos = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation<any>()

    const { avisos } = useSelector((state: RootState) => state.notificacionesReducer)
    const { recintoId } = useSelector((state: RootState) => state.houseReducer)

    useEffect(() => {
        if (![''].includes(recintoId.toString())) {
            dispatch(getAvisos(`${recintoId}`) as any)
        }
    }, [recintoId])

    const handlePress = (id: string, title: string, body: string) => {
        navigation.navigate(VIEWS.READ_NOTIFICATION, { id, title, body })
    }

    return (
        <>
            <Navbar title="Avisos" />
            <ScrollView>
                {avisos.map((item, index) => (
                    <NotificationItem
                        key={index}
                        id={item.id}
                        title={item.titulo}
                        date={item.fecha}
                        body={item.descripcion}
                        type={AVISOS_TYPE.AVISO}
                        handlePress={() => handlePress(item.id, item.titulo, item.descripcion)}
                    />
                ))}
            </ScrollView>
        </>
    )
}
