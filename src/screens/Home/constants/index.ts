import { colors, fonts } from '@gcMobile/theme/default.styles'
import { ImageStyle, TextStyle, ViewStyle } from 'react-native'

export const row_label: ViewStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '90%',
}

export const card_container_styles: ViewStyle = {
    width: '90%',
    margin: '5%',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
}

export const Main_Info_Headers: ViewStyle = {
    display: 'flex',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 2,
    paddingBottom: 10,
    marginBottom: 10,
}

export const Main_Info_Body: ViewStyle = {
    display: 'flex',
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

export const Main_Info_Body_Account: ViewStyle = {
    display: 'flex',
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 10,
}

export const Main_Body_Titles: TextStyle = {
    fontSize: fonts.typingText,
    fontWeight: 'bold',
    marginBottom: 5,
}

export const Main_Body_Titles_small: TextStyle = {
    fontSize: fonts.bodyText1,
    fontWeight: 'bold',
    marginBottom: 5,
    color: colors.gray,
}

export const Image_Styles: ImageStyle = {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 10,
}

export const Generate_Visit_Styles: ViewStyle = {
    width: '100%',
    display: 'flex',
    marginBottom: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

export const add_visit_button_styles: ViewStyle = {
    display: 'flex',
    width: '30%',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
}

export const Last_Payment_Row: ViewStyle = {
    display: 'flex',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
}

export const icons_styles: any = {
    marginLeft: '2%',
    fontSize: 20,
    color: colors.gray,
}

export const saldos_styles: TextStyle = {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
}
