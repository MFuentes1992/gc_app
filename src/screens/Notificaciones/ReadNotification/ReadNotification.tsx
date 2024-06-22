import React from 'react'
import { View, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import {
    AttachmentIcon,
    IconStyle,
    fileLabelStyle,
    readNotification,
    readNotificationAttachments,
    readNotificationBody,
    readNotificationHeader,
} from '../constants'
import { colors, fonts } from '@gcMobile/theme/default.styles'
import { onShareFile, sanitizeString, saveToCameraRoll } from '@gcMobile/util'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { VIEWS } from '@gcMobile/navigation/constants'
import RNFetchBlob from 'rn-fetch-blob'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'

export const ReadNotification = ({ route, navigation }: any) => {
    const { title, body } = route.params
    const [base64Uri, setBase64Uri] = React.useState<string>('')
    const baseUrl = 'https://gcdemo.dasgalu.net/'
    const attachment = 'avisos/1_5_6667453b2c291.pdf'

    const handleAttachFile = (uri: string, fileName: string) => {
        const imageRegex = /\.(jpeg|jpg|gif|png)$/
        const docRegex = /\.(pdf)$/
        if (fileName.match(imageRegex)) {
            saveToCameraRoll(`${baseUrl}${attachment}`, 'Imagen guardada en galería')
        } else if (uri.match(docRegex) && base64Uri !== '') {
            navigation.navigate(VIEWS.PDF_VIEWER, { uri: base64Uri })
        }
    }

    const urlFileToUri = (url: string) => {
        try {
            RNFetchBlob.config({
                fileCache: true,
                appendExt: 'pdf',
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

    React.useEffect(() => {
        if (base64Uri === '') {
            urlFileToUri(`${baseUrl}${attachment}`)
        }
    }, [])

    return (
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
                                <FontAwesome name="download" style={AttachmentIcon} />
                            </Text>
                        </TouchableOpacity>
                        <Text style={fileLabelStyle}>{attachment.split('/')[1]}</Text>
                    </View>
                )}
            </View>
        </View>
    )
}
