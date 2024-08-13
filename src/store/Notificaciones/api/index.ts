import { base_url } from '@gcMobile/components/Auth/constants'
import { setLoading } from '@gcMobile/store/UI'
import { stringTemplateAddQuery } from '@gcMobile/util'
import { NotificacionesAvisos } from '../types'
import { setAttachments, setAvisos } from '@gcMobile/store/Notificaciones'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { ENDPOINTS } from '@gcMobile/util/urls'

export const registerDeviceId = async (deviceId: string, recintoId: string) => {
    const url = base_url + '/Notificaciones/register/index.php'
    const data = new FormData()
    data.append('deviceId', deviceId)
    data.append('idRecinto', recintoId)
    const requestOptions = {
        method: 'POST',
        body: data,
    }
    const raw = await fetch(url, requestOptions)
    const response = await raw.json()
    return response
}

export const getAvisos = (recintoId: string) => async (dispatch: any) => {
    try {
        dispatch(setLoading(true))
        const rawUrl = base_url + '/Notificaciones/avisos/index.php'
        const url = stringTemplateAddQuery(rawUrl, { recintoId })
        const requestOptions = {
            method: 'GET',
        }
        const raw = await fetch(url, requestOptions)
        const response = await raw.json()
        if (['OK'].includes(response.status)) {
            dispatch(setLoading(false))
            dispatch(setAvisos(response.avisos as NotificacionesAvisos[]))
        }
    } catch (error) {
        console.error('Error en getAvisos', error)
        Toast.show({
            title: 'Error',
            textBody: 'Error al obtener los avisos',
            type: ALERT_TYPE.DANGER,
        })
        dispatch(setLoading(false))
    }
}

export const getAvisosByDate = (recintoId: string, fecha: string) => async (dispatch: any) => {
    try {
        dispatch(setLoading(true))
        const rawUrl = `${base_url}${ENDPOINTS.AVISOS.DATE}`
        const url = stringTemplateAddQuery(rawUrl, { recintoId, date: fecha })
        const requestOptions = {
            method: 'GET',
        }
        const raw = await fetch(url, requestOptions)
        const response = await raw.json()
        if (['OK'].includes(response.status)) {
            dispatch(setLoading(false))
            dispatch(setAvisos(response.avisos as NotificacionesAvisos[]))
        }
    } catch (error) {
        console.error('Error en getAvisosByDate', error)
        Toast.show({
            title: 'Error',
            textBody: 'Error al obtener los avisos',
            type: ALERT_TYPE.DANGER,
        })
        dispatch(setLoading(false))
    }
}

export const getAttachments = (avisoId: string) => async (dispatch: any) => {
    try {
        dispatch(setLoading(true))
        const rawUrl = base_url + '/Notificaciones/avisos/adjuntos/index.php'
        const url = stringTemplateAddQuery(rawUrl, { avisoId })
        console.log('url ====>', url)
        const requestOptions = {
            method: 'GET',
        }
        const raw = await fetch(url, requestOptions)
        const response = await raw.json()
        if (['OK'].includes(response.status)) {
            dispatch(setLoading(false))
            dispatch(setAttachments(response.attachments))
        }
    } catch (error) {
        console.error('Error en getAttachments', error)
        Toast.show({
            title: 'Error',
            textBody: 'Error al obtener los archivos adjuntos',
            type: ALERT_TYPE.DANGER,
        })
        dispatch(setLoading(false))
    }
}
