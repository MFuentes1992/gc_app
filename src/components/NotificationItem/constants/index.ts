import { colors } from '@gcMobile/theme/default.styles'
import { ViewStyle } from 'react-native'

export type NotificationItemProps = {
    id?: string
    title: string
    date: string
    body?: string
    type: number
    handlePress: () => void
}

export const AVISOS_TYPE = {
    AVISO: 1,
    NOTIFICACION: 2,
    ESTADO_CUENTA: 3,
}

export const RIBBON_COLOR: { [key: string]: string } = {
    1: colors.notificationYellow,
    2: colors.green,
    3: colors.cherry,
}

export const container: ViewStyle = {
    width: '98%',
    backgroundColor: colors.white,
    // borderColor: colors.lightGray,
    // borderWidth: 1,
    margin: 5,
    elevation: 1,
}

export const titleContainer: ViewStyle = {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    borderLeftWidth: 7,
    // borderLeftColor: colors.cherry,
}

export const dateContainer: ViewStyle = {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    borderLeftWidth: 7,
    // borderLeftColor: colors.cherry,
}
