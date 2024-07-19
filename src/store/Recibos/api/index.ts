import { base_url } from '@gcMobile/components/Auth/constants'
import { setLoading } from '@gcMobile/store/UI'
import { stringTemplateAddQuery } from '@gcMobile/util'
import { setRecibos } from '..'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'

type Payload = {
    residenteId: string
    instalacionId: string
    recintoId: string
}

export const getRecibos = (payload: Payload) => (dispatch: any) => {
    const raw = `${base_url}/recibos/index.php`
    const url = stringTemplateAddQuery(raw, payload)
    try {
        const response = fetch(url)
        dispatch(setLoading(true))
        response
            .then((res) => res.json())
            .then((data) => {
                dispatch(setRecibos(data?.attachments))
                dispatch(setLoading(false))
            })
    } catch (error) {
        Toast.show({
            title: 'Error',
            textBody: 'Ocurrió un error al obtener los recibos',
            type: ALERT_TYPE.DANGER,
        })
    }
}
