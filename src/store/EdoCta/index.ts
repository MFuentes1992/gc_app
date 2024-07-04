import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EdoCuentaProps } from './types'

const initialState: { avisos: EdoCuentaProps[] } = {
    avisos: [],
}

const edoCtaSlice = createSlice({
    name: 'estadoCuenta',
    initialState,
    reducers: {
        setAvisos: (state, action: PayloadAction<EdoCuentaProps[]>) => {
            state.avisos = action.payload
        },
    },
})

export const { setAvisos } = edoCtaSlice.actions
export default edoCtaSlice.reducer
