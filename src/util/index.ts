import { colorFilters } from '@gcMobile/components/Filter/constants'
import { RootState } from '@gcMobile/store'
import { useSelector } from 'react-redux'
import Constants from 'expo-constants'
import { Alert, PermissionsAndroid, Platform } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import Share from 'react-native-share'

export const getTipoVisitaIcon = (tipo_visita: string) => {
    const { catalogVisitas } = useSelector((state: RootState) => state.tipoVisitas)
    const findTipoVisita = catalogVisitas.find((visita) => visita.tipo_visita === tipo_visita)
    if (findTipoVisita) {
        return colorFilters[Number.parseInt(findTipoVisita.id, 10) - 1]
    }
    return 'green'
}

export const formatDate = (date: string) => {
    if (date.includes('T')) {
        const dateNotime = date.split('T')[0]
        const newDate = new Date(dateNotime)
        return newDate.toLocaleDateString()
    }
    const newDate = new Date(date)
    return newDate.toLocaleDateString()
}

export const plateFormat = (plate: string) => {
    return plate.length > 16 ? plate.slice(0, 16) + '...' : plate
}

export const formatTime = (hora: string) => {
    return hora.slice(0, 5)
}

export const stringTemplateParser = (cadena: string, object: any) => {
    const regex = /{([^{}]*)}/g
    return cadena.replace(regex, (match, submatch) => object[submatch])
}

export const stringTemplateAddQuery = (cadena: string, object: any) => {
    cadena += '?'
    Object.keys(object).forEach((key) => {
        cadena += `${key}=${object[key]}&`
    })
    cadena = cadena.slice(0, -1)
    return cadena
}

// --- Push Notifications ---
export const registerForPushNotificationsAsync = async (Notifications: any) => {
    let token = ''
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
    }
    if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!')
        return
    }
    token = (await Notifications.getDevicePushTokenAsync()).data

    return token
}

export const sanitizeString = (string: string) => {
    const replacements: any = {
        '<b>': '**',
        '</b>': '**',
        '<i>': '*',
        '</i>': '*',
        '<p>': '',
        '</p>': '',
        '<br>': '\n',
        '<br/>': '\n',
        '<br />': '\n',
    }

    return string.replace(/<b>|<\/b>|<i>|<\/i>|<br>|<br\/>|<br \/>|<p>|<\/p>/g, (tag) => replacements[tag])
}

const hasAndroidPermission = async () => {
    const getCheckPermissionPromise = () => {
        if (Platform.Version >= `33`) {
            return Promise.all([
                PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
                PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
            ]).then(
                ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
                    hasReadMediaImagesPermission && hasReadMediaVideoPermission
            )
        } else {
            return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
        }
    }

    const hasPermission = await getCheckPermissionPromise()
    if (hasPermission) {
        return true
    }
    const getRequestPermissionPromise = () => {
        if (Platform.Version >= `33`) {
            return PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
            ]).then((statuses) => {
                console.log('statuses ====>', statuses)
                return (
                    statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] === PermissionsAndroid.RESULTS.GRANTED &&
                    statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] === PermissionsAndroid.RESULTS.GRANTED
                )
            })
        } else {
            return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then(
                (status) => status === PermissionsAndroid.RESULTS.GRANTED
            )
        }
    }

    return await getRequestPermissionPromise()
}

export const saveToCameraRoll = async (url: string, message: string) => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
        return
    }
    try {
        RNFetchBlob.config({
            fileCache: true,
            appendExt: 'png',
        })
            .fetch('GET', url)
            .then((res) => {
                CameraRoll.saveAsset(res.data, { type: 'photo' })
                    .then(() => {
                        Alert.alert('Informacion', message)
                    })
                    .catch((err: any) => console.log(err))
            })
            .catch((error) => console.log(error))
    } catch (error) {
        Toast.show({
            type: ALERT_TYPE.DANGER,
            textBody: 'No se pudo guardar la imagen',
        })
    }
}

export const onShareFile = async (uri: string) => {
    try {
        await Share.open({ url: uri, showAppsToView: true, saveToFiles: true })
    } catch (error) {
        console.log(error)
    }
}
