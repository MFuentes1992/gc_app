import { colors } from '@gcMobile/theme/default.styles'
import { StyleSheet } from 'react-native'

export const cardPopUpStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '15%',
        right: 30,
        top: 0,
        backgroundColor: colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        padding: '5%',
        zIndex: 1,
        elevation: 5,
    },
    row: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: '15%',
    },
    icon: {
        width: 30,
        height: 30,
    },
    text: {
        fontSize: 12,
        color: colors.gray,
    },
})
