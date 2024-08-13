import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BankData, PaymentReference } from './types'
import { set } from 'lodash'

const initialState: BankData = {
    banco: '',
    numero_cuenta: '',
    clabe: '',
    referencia: {
        referencia_bancaria: '',
        referencia_concepto: '',
        referencia_centavos: '',
    },
}

const RecintoBankDataSlice = createSlice({
    name: 'RecintoBankData',
    initialState,
    reducers: {
        setBankData(state, action: PayloadAction<BankData>) {
            state.banco = action.payload.banco
            state.numero_cuenta = action.payload.numero_cuenta
            state.clabe = action.payload.clabe
        },
        setPaymentReference(state, action: PayloadAction<PaymentReference>) {
            state.referencia = action.payload
        },
    },
})

export const { setBankData, setPaymentReference } = RecintoBankDataSlice.actions
export default RecintoBankDataSlice.reducer
