import { ICardProps } from '@gcMobile/components/Card/Card'

export type TVehicles = {
    [key: string]: string
    id: string
    idVisita: string
    conductor: string
    marca: string
    modelo: string
    anio: string
    placas: string
    color: string
    fechaRegistro: string
    fechaActualizacion: string
    estatusRegistro: string
}

export type TPedestrians = {
    [key: string]: string | undefined
    id: string
    idVisita?: string
    nombre: string
    fechaRegistro?: string
    fechaActualizacion?: string
    estatusRegistro?: string
}

export type TVisita = {
    visitaId: string
    idTipoVisita: string
    idTipoIngreso: string
    idUsuario: string
    fechaIngreso: string
    fechaSalida: string
    multiple: string
    notificaciones: string
    appGenerado: string
    vigenciaQR: string
    uniqueId: string
    autor: string
    emailAutor: string
    residencialSeccion: string
    residencialNumInterior: string
    residencialNumExterior: string
    residencialCalle: string
    residencialColonia: string
    residencialCiudad: string
    residencialEstado: string
    residencialCP: string
    residencialNombre: string
    nombre: string
    vehicles: TVehicles[]
    pedestrians: TPedestrians[]
}

export type TVisitas = {
    visitas: ICardProps[]
    createdQr: string
    visita: TVisita
    vehicles: TVehicles[]
}

export type TVisitaPayload = {
    idVisita?: string
    idUsuario?: string
    idTipoVisita: string
    idTipoIngreso: string
    idInstalacion?: string
    fechaIngreso: string
    fechaSalida: string
    multiple: string
    notificaciones: string
    appGenerado?: string
    nombre: string
    vehiculos?: string
    peatones?: string
}
