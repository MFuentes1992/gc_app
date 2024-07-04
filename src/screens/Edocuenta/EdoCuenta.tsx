import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { container } from './constantes'
import NotificationItem from '@gcMobile/components/NotificationItem'
import { VIEWS } from '@gcMobile/navigation/constants'
import { useNavigation } from '@react-navigation/native'
import RNFetchBlob from 'rn-fetch-blob'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { base_web_server } from '@gcMobile/components/Auth/constants'
import { EdoCuentaProps } from '@gcMobile/store/EdoCta/types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@gcMobile/store'
import { getEstadosCuenta } from '@gcMobile/store/EdoCta/api'

export const EdoCuenta = () => {
    const navigation = useNavigation<any>()
    const dispatch = useDispatch()

    const { currentHouseId } = useSelector((state: RootState) => state.houseReducer)
    const userId = useSelector((state: RootState) => state.userReducer.id)
    const { avisos } = useSelector((state: RootState) => state.estadoCuenta)

    const [edoCuenta, setEdoCuenta] = React.useState<EdoCuentaProps[]>([])

    useEffect(() => {
        if (currentHouseId) {
            dispatch(getEstadosCuenta(userId, currentHouseId.toString()) as any)
        }
    }, [])

    useEffect(() => {
        if (avisos.length > 0) {
            setEdoCuenta(avisos)
        }
    }, [avisos])

    const handlePress = (path: string) => {
        try {
            RNFetchBlob.config({
                fileCache: true,
                appendExt: 'pdf',
            })
                .fetch('GET', `${base_web_server}${path}`)
                .then((res) => {
                    navigation.navigate(VIEWS.PDF_VIEWER, { uri: res.path() })
                })
                .catch((error) => console.log(error))
        } catch (error) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                textBody: 'No se pudo obtener el archivo.',
            })
        }
    }

    return (
        <ScrollView contentContainerStyle={container}>
            {edoCuenta.map((item) => (
                <NotificationItem
                    key={Math.random().toString(36).substring(7)}
                    title={item.titulo}
                    date={item.fecha}
                    handlePress={() => handlePress(item.path)}
                />
            ))}
        </ScrollView>
    )
}
