import { colors, fonts } from '@gcMobile/theme/default.styles'
import { TextStyle, ViewStyle } from 'react-native'

export const defaultContainer: ViewStyle = {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    marginBottom: '5%',
}

export const headerContainer: ViewStyle = {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: '5%',
}

export const inputStyles: TextStyle = {
    width: '100%',
    height: 50,
    borderColor: colors.text_subtitle_color,
    borderWidth: 1,
    marginBottom: '3%',
    paddingLeft: '2%',
    fontSize: fonts.bodyText2,
    borderRadius: 5,
}
