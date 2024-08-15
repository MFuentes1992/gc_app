import { base_web_server } from '@gcMobile/components/Auth/constants'
import NotificationItem from '@gcMobile/components/NotificationItem'
import { AVISOS_TYPE } from '@gcMobile/components/NotificationItem/constants'
import { VIEWS } from '@gcMobile/navigation/constants'
import { Navbar } from '@gcMobile/navigation/Navbar/Navbar'
import { RootState } from '@gcMobile/store'
import { getRecibos } from '@gcMobile/store/Recibos/api'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ScrollView } from 'react-native'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { useDispatch, useSelector } from 'react-redux'
import RNFetchBlob from 'rn-fetch-blob'

export const Recibos = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation<any>()
    const { recibos } = useSelector((state: RootState) => state.recibos)
    const { currentHouseId, recintoId } = useSelector((state: RootState) => state.houseReducer)
    const { id } = useSelector((state: RootState) => state.userReducer)

    React.useEffect(() => {
        if (![''].includes(id)) {
            dispatch(
                getRecibos({
                    residenteId: id,
                    instalacionId: currentHouseId.toString(),
                    recintoId: recintoId.toString(),
                }) as any
            )
        }
    }, [id, currentHouseId])

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
        <>
            <Navbar title="Recibos de pago" />
            <ScrollView>
                {recibos.map((recibo) => (
                    <NotificationItem
                        key={recibo.id}
                        title={`Recibo ${recibo.folio}`}
                        date={recibo.fecha}
                        type={AVISOS_TYPE.AVISO}
                        handlePress={() => handlePress(recibo.nombre)}
                    />
                ))}
            </ScrollView>
        </>
    )
}
