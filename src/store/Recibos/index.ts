import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReciboAttachment, ReciboProps } from './types'

const initialState: ReciboProps = {
    recibos: [],
}

const recibosSlice = createSlice({
    name: 'recibos',
    initialState,
    reducers: {
        setRecibos: (state, action: PayloadAction<ReciboAttachment[]>) => {
            state.recibos = action.payload
        },
    },
})

export const { setRecibos } = recibosSlice.actions
export default recibosSlice.reducer
