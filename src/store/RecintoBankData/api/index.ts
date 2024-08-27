import { base_url } from '@gcMobile/components/Auth/constants'
import { stringTemplateAddQuery } from '@gcMobile/util'
import { ENDPOINTS } from '@gcMobile/util/urls'
import { setAdeudo, setBankData, setPaymentReference, setSaldo } from '..'
import { setLoading } from '@gcMobile/store/UI'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'

export const getBankData = (recintoId: string) => async (dispatch: any) => {
    dispatch(setLoading(true))
    const stringUrl = `${base_url}${ENDPOINTS.HOME.BANK_DATA}`
    const url = stringTemplateAddQuery(stringUrl, { recintoId })
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const { result } = data
            const [bankData] = result
            dispatch(setBankData(bankData))
            dispatch(setLoading(false))
        })
        .catch((error) => {
            dispatch(setLoading(false))
            Toast.show({
                title: 'Error',
                textBody: 'Ocurrió un error al obtener informacion.',
                type: ALERT_TYPE.DANGER,
            })
        })
}

export const getPaymentReference = (instalacionId: string) => async (dispatch: any) => {
    dispatch(setLoading(true))
    const stringUrl = `${base_url}${ENDPOINTS.HOME.PAYMENT_REFERENCE}`
    const url = stringTemplateAddQuery(stringUrl, { instalacionId })
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const { result } = data
            const [paymentReference] = result
            dispatch(setPaymentReference(paymentReference))
            dispatch(setLoading(false))
        })
        .catch((error) => {
            dispatch(setLoading(false))
            Toast.show({
                title: 'Error',
                textBody: 'Ocurrió un error al obtener informacion.',
                type: ALERT_TYPE.DANGER,
            })
        })
}

export const getAdeudo = (instalacion: string) => async (dispatch: any) => {
    dispatch(setLoading(true))
    const stringUrl = `${base_url}/${ENDPOINTS.HOME.ADEUDO}`
    const url = stringTemplateAddQuery(stringUrl, { instalacion })
    console.log(url)

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log('data ===>', data)
            const { debt } = data
            dispatch(setAdeudo(debt))
            dispatch(setLoading(false))
        })
        .catch((error) => {
            dispatch(setLoading(false))
            Toast.show({
                title: 'Error',
                textBody: 'Ocurrió un error al obtener informacion.',
                type: ALERT_TYPE.DANGER,
            })
        })
}

export const getEquity = (instalacion: string) => async (dispatch: any) => {
    dispatch(setLoading(true))
    const stringUrl = `${base_url}/${ENDPOINTS.HOME.EQUITY}`
    const url = stringTemplateAddQuery(stringUrl, { instalacion })
    console.log(url)

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log('data ===>', data)
            const { equity } = data
            dispatch(setSaldo(equity as number))
            dispatch(setLoading(false))
        })
        .catch((error) => {
            dispatch(setLoading(false))
            Toast.show({
                title: 'Error',
                textBody: 'Ocurrió un error al obtener informacion.',
                type: ALERT_TYPE.DANGER,
            })
        })
}
