import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '@gcMobile/theme/default.styles'

export const cardStyles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        height: 150,
        flexDirection: 'column',
        backgroundColor: colors.white,
        borderRadius: 10,
        justifyContent: 'space-around',
        elevation: 1,
        marginBottom: 10,
    },
    header: {
        width: '100%',
        height: '25%',
        flexDirection: 'row',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        justifyContent: 'space-between',
        padding: '2%',
    },
    headerMenu: {
        width: 30,
        borderRadius: 50,
        padding: 'auto',
        flexDirection: 'column',
        justifyContent: 'center',
        elevation: 1,
    },
    body: {
        width: '75%',
        height: '75%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        padding: '2%',
    },
    cardRow: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    cardColumn: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
})

export const popOverMenu = [
    { name: 'qrcode', color: colors.black, size: 22, onPressed: () => {} },
    { name: 'pencil', color: colors.black, size: 22, onPressed: () => {} },
    { name: 'trash', color: colors.red, size: 22, onPressed: () => {} },
]
