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
    pictureUrl: 'https://via.placeholder.com/150',
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
            state.pictureUrl = ''
        },
        setProfileId: (state, action: PayloadAction<{ id_profile: number; pictureUrl: string }>) => {
            state.id_profile = action.payload.id_profile
            state.pictureUrl = action.payload.pictureUrl
        },
    },
})

export const { setUserData, cleanUserData, setProfileId } = userSlice.actions
export default userSlice.reducer

// ...
