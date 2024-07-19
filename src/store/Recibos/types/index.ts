export type ReciboAttachment = {
    id: number
    nombre: string
    fecha: string
    folio: string
}

export type ReciboProps = {
    recibos: ReciboAttachment[]
}
