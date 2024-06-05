import { StyleSheet } from 'react-native'
import { colors } from '@gcMobile/theme/default.styles'

export type MenuProps = {
    navigation: any
}

export const styles = StyleSheet.create({
    container: {
        height: '100%',
        flexDirection: 'column',
        backgroundColor: colors.white,
    },
    residenceContainer: {
        flex: 0.1,
        backgroundColor: colors.white,
        padding: 5,
        paddingBottom: 15,
    },
    tenthHeight: {
        flex: 0.1,
        backgroundColor: colors.white,
        padding: 5,
    },
    sixthHeight: {
        flex: 0.6,
        backgroundColor: colors.white,
        padding: 10,
    },
    homeIcon: {
        marginTop: '80%',
        fontSize: 56,
        color: colors.gray,
    },
    textStyles: {
        marginLeft: '5%',
        fontSize: 18,
        color: colors.gray,
    },
    iconStyles: {
        marginLeft: '2%',
        fontSize: 24,
        color: colors.gray,
    },
    tinyText: {
        marginTop: '1%',
        marginLeft: '5%',
        fontSize: 12,
        fontWeight: 'bold',
    },
})
