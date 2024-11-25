import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TVehicles, TVisita, TVisitas } from './types'
import { ICardProps } from '@gcMobile/components/Card/Card'
import { VISITA_INITIAL_STATE } from '@gcMobile/components/Form/constants'

const initialState: TVisitas = {
    visitas: [],
    createdQr: '',
    visita: VISITA_INITIAL_STATE,
    vehicles: [],
}

const visitasSlice = createSlice({
    name: 'visitas',
    initialState,
    reducers: {
        setVisitas: (state, action: PayloadAction<ICardProps[]>) => {
            state.visitas = action.payload
        },
        setNewVisitaQR: (state, action: PayloadAction<string>) => {
            state.createdQr = action.payload
        },
        setEditableVisita: (state, action: PayloadAction<TVisita>) => {
            state.visita = action.payload
        },
        clearEditableVisita: (state) => {
            state.visita = initialState.visita
        },
        setVehicles: (state, action: PayloadAction<TVehicles[]>) => {
            state.vehicles = action.payload
        },
        clearVehicles: (state) => {
            state.vehicles = []
        },
    },
})

export const { setVisitas, setNewVisitaQR, setEditableVisita, clearEditableVisita, setVehicles, clearVehicles } =
    visitasSlice.actions
export default visitasSlice.reducer
