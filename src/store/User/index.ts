import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserData } from './types'
import { set } from 'lodash'

const initialState: UserData = {
    access_token: '',
    id_instalacion: '',
    id_profile: 0,
    email: '',
    name: '',
    id: '',
    recintoId: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserData>) => {
            state.access_token = action.payload.access_token
            state.id_instalacion = action.payload.id_instalacion
            state.email = action.payload.email
            state.name = action.payload.name
            state.id = action.payload.id
            state.recintoId = action.payload.recintoId
        },
        cleanUserData: (state) => {
            state.access_token = ''
            state.id_instalacion = ''
            state.email = ''
            state.name = ''
            state.id = ''
            state.recintoId = ''
            state.id_profile = 0
        },
        setProfileId: (state, action: PayloadAction<number>) => {
            state.id_profile = action.payload
        },
    },
})

export const { setUserData, cleanUserData, setProfileId } = userSlice.actions
export default userSlice.reducer

// ...
