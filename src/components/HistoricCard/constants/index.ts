import { StyleSheet, ViewStyle } from 'react-native'
import { colors } from '@gcMobile/theme/default.styles'

export const historicCardStyles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: colors.lightGray,
        elevation: 2,
        marginTop: '2%',
        marginBottom: 5,
    },
    cardHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nameContainer: {
        width: '33%',
    },
    line: {
        marginTop: '2%',
        borderBottomWidth: 4,
        borderColor: colors.yellow,
        height: 1,
        width: 120,
        marginBottom: '2%',
    },
    body: {
        flexDirection: 'row',
    },
    iconContainer: {
        marginLeft: '-60%',
        marginTop: '-5%',
    },
    iconLogout: {
        width: '10%',
        backgroundColor: colors.blue,
        borderRadius: 100,
        height: 28,
    },
})

export const plateContainer: ViewStyle = {
    width: '50%',
    maxWidth: '50%',
}

export type VehicleCardProps = {
    vehicle_id: string
    marca: string
    modelo: string
    placas: string
    color: string
    year: string
}

export type HistoricCardProps = {
    casa: string
    nombreVisita: string
    fechaVisita: string
    horaVisita: string
    tipoVisita: string
    tipoIngreso: string
    idVisita: string
    visitaUniqueId: string
    vehiculos: { placas: string }[]
}
