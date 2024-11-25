import { StyleSheet } from 'react-native'
import { colors } from '@gcMobile/theme/default.styles'

export const formStyles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flex: 0.16,
        marginBottom: '3%',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.lightGray,
    },
    radioButtonsContainer: {
        flexDirection: 'row',
        marginHorizontal: 4,
        borderWidth: 2,
        borderColor: colors.blue,
        width: 100,
        height: 100,
        borderRadius: 5,
        marginVertical: 3,
        margin: '2%',
    },
    radioButton: {
        height: 20,
        width: 20,
        borderRadius: 12,
        borderWidth: 1.8,
        borderColor: colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButton2: {
        height: 20,
        width: 20,
        borderRadius: 12,
        borderWidth: 1.8,
        borderColor: colors.gray,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonSelected: {
        height: 10,
        width: 10,
        borderRadius: 6,
        backgroundColor: colors.blue,
    },
    radioBtnPosition: {
        //ajustar al lado derecho
        position: 'absolute',
        right: 5,
        top: 5,
    },
    descPosition: {
        //ajustar elementos al centro
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonsContainer2: {
        flexDirection: 'row',
        marginHorizontal: 4,
        width: 100,
        height: 100,
        borderRadius: 5,
        marginVertical: 3,
    },
    text2: {
        color: colors.gray,
    },
    text1: {},
    name: {
        fontSize: 18,
        borderBottomWidth: 0.9,
        borderBottomColor: colors.black,
        width: '95%',
    },
    nameContainer: {
        width: '90%',
        height: '5.5%',
        marginTop: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
    },
    schedule: {
        marginTop: '5%',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    columnContainer: {
        flexDirection: 'column',
        paddingHorizontal: 5,
    },
    date: {
        borderBottomWidth: 0.9,
        borderBottomColor: colors.black,
    },
    accessTypeContainer: {
        marginTop: '5%',
    },
})

export const formatDateToPayload = (date: string, hour: string) => {
    const resDate = date.split('T')[0]
    const payload = `${resDate}T${hour}:00:00`
    return payload
}

export const VISITA_INITIAL_STATE = {
    idTipoVisita: 1,
    idTipoIngreso: 2,
    idUsuario: 0,
    fechaIngreso: new Date().toISOString(),
    fechaSalida: new Date().toISOString(),
    fechaIngresoHora: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
    fechaSalidaHora: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
    multiple: 0,
    notificaciones: 1,
    appGenerado: 1,
    vigenciaQR: 1,
    uniqueId: '',
    autor: '',
    emailAutor: '',
    residencialSeccion: '',
    residencialNumInterior: '',
    residencialNumExterior: '',
    residencialCalle: '',
    residencialColonia: '',
    residencialCiudad: '',
    residencialEstado: '',
    residencialCP: '',
    residencialNombre: '',
    nombre: '',
    vehicles: [],
    pedestrians: [],
} as any

export const NEW_EMPTY_VEHICLE = {
    id: Math.random().toString(36).substr(2, 9),
    idVisita: '',
    conductor: '',
    marca: '',
    modelo: '',
    anio: '',
    placas: '',
    color: '',
    fechaRegistro: '',
    fechaActualizacion: '',
    estatusRegistro: '',
}
