import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { cardStyles, popOverMenu } from './constants'
import { colors } from '@gcMobile/theme/default.styles'
import { dateTimeFormat, formatDate, getTipoVisitaIcon } from '@gcMobile/util'
import { useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import { VIEWS } from '@gcMobile/navigation/constants'
import { PopOverMenu } from '../PopOverMenu/PopOverMenu'
import { useDispatch } from 'react-redux'
import { deleteVisitaByUniqueId } from '@gcMobile/store/Visitas/api'

export interface ICardProps {
    nombre: string
    desde: string
    hasta: string
    tipo: string
    multiple_entrada: string
    notificaciones: string
    emailAutor: string
    tipo_visita: string
    uniqueID: string
    estado: string
    index: number
    deleteCallback: () => void
}

export default function Card({
    nombre,
    desde,
    hasta,
    tipo,
    multiple_entrada,
    notificaciones,
    emailAutor,
    tipo_visita,
    uniqueID,
    estado,
    index,
    deleteCallback,
}: ICardProps) {
    const navigation = useNavigation<any>()
    const dispatch = useDispatch()
    const [showMenu, setOpenMenu] = React.useState<boolean>(false)

    const handleMenuIconPressed = (route: string) => {
        setOpenMenu(false)
        switch (route) {
            case 'qrcode':
                navigation.navigate(VIEWS.QR_DETAILS, { uniqueID })
                break
            case 'pencil':
                navigation.navigate(VIEWS.CREATE_VISITA, { uniqueID })
                break
            case 'trash':
                Alert.alert('Eliminar', '¿Estás seguro de eliminar esta visita?', [
                    {
                        text: 'Cancelar',
                        onPress: () => {},
                        style: 'cancel',
                    },
                    {
                        text: 'Eliminar',
                        onPress: () => dispatch(deleteVisitaByUniqueId(uniqueID, deleteCallback) as any),
                    },
                ])
                break
            default:
                break
        }
    }

    return (
        <View style={cardStyles.container}>
            {showMenu && (
                <PopOverMenu
                    iconList={popOverMenu.map((item) => ({
                        ...item,
                        onPressed: () => handleMenuIconPressed(item.name),
                    }))}
                />
            )}
            <View style={[cardStyles.header, { backgroundColor: getTipoVisitaIcon(tipo_visita) }]}>
                <Text
                    style={[{ color: colors.white, fontSize: 12, fontWeight: '500' }]}
                >{`${tipo_visita},  ${nombre}`}</Text>
                <TouchableOpacity
                    onPress={() => setOpenMenu(!showMenu)}
                    style={[cardStyles.headerMenu, { backgroundColor: getTipoVisitaIcon(tipo_visita, true) }]}
                >
                    <Entypo name="dots-three-vertical" size={18} color={colors.white} style={{ marginLeft: '20%' }} />
                </TouchableOpacity>
            </View>
            <View style={cardStyles.body}>
                <View style={cardStyles.cardRow}>
                    <View style={cardStyles.cardColumn}>
                        <FontAwesome name="calendar" size={14} color={colors.gray} />
                        <Text style={{ color: colors.gray, fontSize: 12, marginLeft: 10 }}>{`${formatDate(
                            desde
                        )}`}</Text>
                    </View>
                    <View style={cardStyles.cardColumn}>
                        <FontAwesome5 name="clock" size={14} color={colors.gray} />
                        <Text style={{ color: colors.gray, fontSize: 12, marginLeft: 10 }}>{`${dateTimeFormat(
                            desde
                        )}`}</Text>
                    </View>
                </View>
                <View style={cardStyles.cardRow}>
                    <View style={cardStyles.cardColumn}>
                        <MaterialCommunityIcons name="boom-gate" size={18} color={colors.gray} />
                        <Text style={{ color: colors.gray, fontSize: 12, marginLeft: 10 }}>{tipo}</Text>
                    </View>
                    <View style={cardStyles.cardColumn}>
                        <FontAwesome5 name="bell" size={14} color={colors.gray} />
                        <Text style={{ color: colors.gray, fontSize: 12, marginLeft: 10 }}>
                            {['1'].includes(notificaciones) ? 'Sí' : 'No'}
                        </Text>
                    </View>
                </View>
                <View style={cardStyles.cardRow}>
                    <View style={cardStyles.cardColumn}>
                        <MaterialIcons name="login" size={14} color={colors.gray} />
                        <Text style={{ color: colors.gray, fontSize: 12, marginLeft: 10 }}>
                            {['1'].includes(multiple_entrada) ? 'Múltiple' : 'Único'}
                        </Text>
                    </View>
                    <View style={cardStyles.cardColumn}>
                        <Text style={{ color: colors.gray, fontSize: 10 }}>{emailAutor}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
