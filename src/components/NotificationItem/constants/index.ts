import { colors } from '@gcMobile/theme/default.styles'
import { ViewStyle } from 'react-native'

export type NotificationItemProps = {
    id?: string
    title: string
    date: string
    body?: string
    handlePress: () => void
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
    borderLeftColor: colors.cherry,
}

export const dateContainer: ViewStyle = {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    borderLeftWidth: 7,
    borderLeftColor: colors.cherry,
}
