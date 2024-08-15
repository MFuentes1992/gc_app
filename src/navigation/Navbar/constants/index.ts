import { colors } from '@gcMobile/theme/default.styles'
import { ViewStyle } from 'react-native'

export type NavbarProps = {
    goBackAction: () => void
    title: string
}

export const navbar_styles: ViewStyle = {
    flexDirection: 'row',
    width: '100%',
    height: 'auto',
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor: colors.lightBlue,
}
