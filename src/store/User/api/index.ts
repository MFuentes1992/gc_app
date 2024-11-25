import { base_url } from '@gcMobile/components/Auth/constants'
import { stringTemplateAddQuery } from '@gcMobile/util'
import { setProfileId } from '@gcMobile/store/User'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { ENDPOINTS } from '@gcMobile/util/urls'
import { setLoading, setOperationSuccess } from '@gcMobile/store/UI'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LOCAL_STORAGE } from '@gcMobile/util/constants'

export const getUserProfile = (email: string) => async (dispatch: any) => {
    const rawUrl = `${base_url}/users/index.php`
    const url = stringTemplateAddQuery(rawUrl, { email })
    console.log('User profile url ===>', url)
    try {
        const response = await fetch(url)
        const data = await response.json()
        const [dataProfile] = data.result
        dispatch(
            setProfileId({
                id_profile: dataProfile.id_profile,
                pictureUrl: dataProfile.foto,
            })
        )
    } catch (error) {
        Toast.show({
            title: 'Error',
            textBody: 'Error al obtener el perfil del usuario',
            type: ALERT_TYPE.DANGER,
        })
    }
}

export const changePassword = (email: string, password: string, previousPassword: string) => async (dispatch: any) => {
    const url = `${base_url}${ENDPOINTS.USER.CHANGE_PASSWORD}`
    const formData = new FormData()
    formData.append('email', email)
    formData.append('newPassword', password)
    formData.append('previousPassword', previousPassword)
    dispatch(setLoading(true))
    try {
        const res = await fetch(url, { method: 'POST', body: formData })
        const data = await res.json()
        dispatch(setLoading(false))
        if (data.status === 'OK') {
            dispatch(setOperationSuccess(true))
            AsyncStorage.getItem(LOCAL_STORAGE.USER_CREDENTIALS).then((res: any) => {
                if (res) {
                    const data = JSON.parse(res)
                    AsyncStorage.setItem(
                        LOCAL_STORAGE.USER_CREDENTIALS,
                        JSON.stringify({ ...data, email: email, password: password })
                    )
                }
            })
            Toast.show({
                title: 'Éxito',
                textBody: data?.message,
                type: ALERT_TYPE.SUCCESS,
            })
        } else {
            Toast.show({
                title: 'Error',
                textBody: data?.message || 'Error al cambiar la contraseña',
                type: ALERT_TYPE.DANGER,
            })
        }
    } catch (error) {
        Toast.show({
            title: 'Error',
            textBody: 'Error al cambiar la contraseña',
            type: ALERT_TYPE.DANGER,
        })
    }
}
