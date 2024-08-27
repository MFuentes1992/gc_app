export type PaymentReference = {
    referencia_bancaria: string
    referencia_concepto: string
    referencia_centavos: string
}

export type BankData = {
    banco: string
    numero_cuenta: string
    clabe: string
    referencia?: PaymentReference
    adeudo: number
    saldo: number
}
