import { base_url } from '@gcMobile/components/Auth/constants'
import { stringTemplateAddQuery } from '@gcMobile/util'
import { setProfileId } from '@gcMobile/store/User'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { ENDPOINTS } from '@gcMobile/util/urls'
import { setLoading } from '@gcMobile/store/UI'

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

export const changePassword = (email: string, password: string) => async (dispatch: any) => {
    const url = `${base_url}${ENDPOINTS.USER.CHANGE_PASSWORD}`
    const formData = new FormData()
    formData.append('email', email)
    formData.append('newPassword', password)
    dispatch(setLoading(true))
    const res = await fetch(url, { method: 'POST', body: formData })
    const data = await res.json()
    if (data.status === 'OK') {
        Toast.show({
            title: 'Éxito',
            textBody: 'Contraseña actualizada',
            type: ALERT_TYPE.SUCCESS,
        })
    } else {
        Toast.show({
            title: 'Error',
            textBody: 'Error al actualizar la contraseña',
            type: ALERT_TYPE.DANGER,
        })
    }
    dispatch(setLoading(false))
}
