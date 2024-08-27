import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { colors, fonts } from '@gcMobile/theme/default.styles'
import { onShareFile, sanitizeString } from '@gcMobile/util'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { VIEWS } from '@gcMobile/navigation/constants'
import RNFetchBlob from 'rn-fetch-blob'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { base_web_server } from '@gcMobile/components/Auth/constants'
import {
    AttachmentIcon,
    IconStyle,
    fileLabelStyle,
    readNotification,
    readNotificationAttachments,
    readNotificationBody,
    readNotificationHeader,
} from '../constants'
import { RootState } from '@gcMobile/store'
import { getAttachments } from '@gcMobile/store/Notificaciones/api'
import { setAttachments } from '@gcMobile/store/Notificaciones'
import { Navbar } from '@gcMobile/navigation/Navbar/Navbar'

export const ReadNotification = ({ route, navigation }: any) => {
    const { id, title, body } = route.params
    const dispatch = useDispatch()
    const [base64Uri, setBase64Uri] = React.useState<string>('')
    const [attachment, setAttachment] = React.useState<string>('')
    const { attachments } = useSelector((state: RootState) => state.notificacionesReducer)
    // const baseUrl = 'https://gcdemo.dasgalu.net/'
    // const attachment = 'avisos/1_5_6667453b2c291.pdf'
    // const attachment = 'avisos/1_6_6669f5dc532b4.png'

    useEffect(() => {
        if (attachments.length === 0) {
            dispatch(getAttachments(id) as any)
        }
        return () => {
            dispatch(setAttachments([]))
        }
    }, [])

    useEffect(() => {
        if (attachments.length > 0) {
            const [firstElement] = attachments
            const attachment = firstElement.nombre
            setAttachment(attachment)
            urlFileToUri(`${base_web_server}${attachment}`, attachment.split('.')[1])
        }
    }, [attachments])

    const handleAttachFile = (uri: string, fileName: string) => {
        const imageRegex = /\.(jpeg|jpg|gif|png)$/
        const docRegex = /\.(pdf)$/
        if (fileName.match(imageRegex)) {
            navigation.navigate(VIEWS.ATTACH_IMAGE_VIEWER, { url: `${base_web_server}${attachment}` })
        } else if (uri.match(docRegex) && base64Uri !== '') {
            navigation.navigate(VIEWS.PDF_VIEWER, { uri: base64Uri })
        }
    }

    const urlFileToUri = (url: string, extension: string) => {
        try {
            RNFetchBlob.config({
                fileCache: true,
                appendExt: extension,
            })
                .fetch('GET', url)
                .then((res) => {
                    setBase64Uri(res.path())
                })
                .catch((error) => console.log(error))
        } catch (error) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                textBody: 'No se pudo obtener el archivo.',
            })
        }
    }
    /* React.useEffect(() => {
        if (base64Uri === '') {
            // urlFileToUri(`${baseUrl}${attachment}`, attachment.split('.')[1])
        }
        return () => {
            setBase64Uri('')
        }
    }, []) */

    return (
        <>
            <Navbar />
            <View style={readNotification}>
                <View style={readNotificationHeader}>
                    <Text
                        style={[
                            {
                                fontFamily: 'Roboto',
                                fontSize: fonts.text_subtitle,
                                fontWeight: '500',
                                color: colors.darkGray,
                            },
                        ]}
                    >
                        {title}
                    </Text>
                </View>
                <View style={readNotificationBody}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text
                            style={[
                                {
                                    fontFamily: 'Roboto',
                                    fontSize: fonts.bodyText2,
                                    fontWeight: '200',
                                    color: colors.darkGray,
                                },
                            ]}
                        >
                            {sanitizeString(body)}
                        </Text>
                    </View>
                    {base64Uri !== '' && (
                        <View style={readNotificationAttachments}>
                            <TouchableOpacity onPress={() => handleAttachFile(base64Uri, attachment)}>
                                <Text style={IconStyle}>
                                    <FontAwesome name="paperclip" style={AttachmentIcon} />
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onShareFile(base64Uri)}>
                                <Text>
                                    <FontAwesome name="share" style={AttachmentIcon} />
                                </Text>
                            </TouchableOpacity>
                            <Text style={fileLabelStyle}>{attachment.split('/')[1]}</Text>
                        </View>
                    )}
                </View>
            </View>
        </>
    )
}
