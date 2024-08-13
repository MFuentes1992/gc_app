import { colors } from '@gcMobile/theme/default.styles'
import { StyleSheet } from 'react-native'

export interface IHouseManagement {
    id: number
    manzana: string
    num_int: string
    residencial: string
    calle: string
    num_ext: string
    colonia: string
    ciudad: string
    estado: string
    cp: string
    logo: string
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    teenthHeight: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: colors.white,
        padding: 10,
        justifyContent: 'flex-start',
    },
    thirdHeight: {
        flex: 0.33,
        backgroundColor: colors.white,
        padding: 10,
        flexWrap: 'wrap',
    },
    title: {
        fontSize: 18,
        color: colors.darkGray,
        textAlign: 'center',
    },
    labelStyle: {
        fontSize: 14,
        color: colors.gray,
    },
    containerStyle: {
        paddingTop: '0%',
    },
    tinyText: {
        marginTop: '1%',
        marginLeft: '5%',
        fontSize: 12,
        fontWeight: 'normal',
    },
})
