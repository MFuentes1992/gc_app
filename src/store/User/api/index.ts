import { base_url } from '@gcMobile/components/Auth/constants'
import { stringTemplateAddQuery } from '@gcMobile/util'
import { setProfileId } from '@gcMobile/store/User'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'

export const getUserProfile = (email: string) => async (dispatch: any) => {
    const rawUrl = `${base_url}/users/index.php`
    const url = stringTemplateAddQuery(rawUrl, { email })
    console.log('User profile url ===>', url)
    try {
        const response = await fetch(url)
        const data = await response.json()
        const [dataProfile] = data.result
        dispatch(setProfileId(dataProfile.id_profile as number))
    } catch (error) {
        Toast.show({
            title: 'Error',
            textBody: 'Error al obtener el perfil del usuario',
            type: ALERT_TYPE.DANGER,
        })
    }
}
