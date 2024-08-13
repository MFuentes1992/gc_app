import { base_url } from '@gcMobile/components/Auth/constants'
import { setLoading } from '@gcMobile/store/UI'
import { setAvisos } from '@gcMobile/store/EdoCta'
import { stringTemplateAddQuery } from '@gcMobile/util'
import { EdoCuentaProps } from '../types'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { ENDPOINTS } from '@gcMobile/util/urls'

export const getEstadosCuenta = (residenteId: string, instalacionId: string) => async (dispatch: any) => {
    try {
        dispatch(setLoading(true))
        const url = stringTemplateAddQuery(`${base_url}/Notificaciones/edo-cta`, {
            residente: residenteId,
            instalacion: instalacionId,
        })
        const requestOptions = {
            method: 'GET',
        }
        const response = await fetch(url, requestOptions)
        const data = await response.json()
        if (['OK'].includes(data.status)) {
            dispatch(setLoading(false))
            dispatch(setAvisos(data.avisos as EdoCuentaProps[]))
        }
    } catch (error) {
        Toast.show({
            title: 'Error',
            textBody: 'Error al obtener los estados de cuenta',
            type: ALERT_TYPE.DANGER,
        })
        dispatch(setLoading(false))
    }
}

export const getLastEdoCta = (residenteId: string, instalacionId: string) => async (dispatch: any) => {
    try {
        dispatch(setLoading(true))
        const url = stringTemplateAddQuery(`${base_url}${ENDPOINTS.EDO_CTA.LAST}`, {
            residente: residenteId,
            instalacion: instalacionId,
        })
        const requestOptions = {
            method: 'GET',
        }
        const response = await fetch(url, requestOptions)
        const data = await response.json()
        if (['OK'].includes(data.status)) {
            dispatch(setLoading(false))
            dispatch(setAvisos(data.avisos as EdoCuentaProps[]))
        }
    } catch (error) {
        Toast.show({
            title: 'Error',
            textBody: 'Error al obtener los estados de cuenta',
            type: ALERT_TYPE.DANGER,
        })
        dispatch(setLoading(false))
    }
}
