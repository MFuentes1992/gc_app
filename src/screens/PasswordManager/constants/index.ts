import { colors } from '@gcMobile/theme/default.styles'
import { TextStyle, ViewStyle } from 'react-native'

export const pass_container: ViewStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    padding: 10,
}

export const pass_input: TextStyle = {
    width: '90%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
    padding: 10,
}

export const pass_button: ViewStyle = {
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
}

export const pass_text: TextStyle = {
    color: colors.cherry,
    fontSize: 10,
}
