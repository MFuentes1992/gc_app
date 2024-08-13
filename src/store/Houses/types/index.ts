import { IHouseManagement } from '@gcMobile/screens/HouseScreen/conts'

export type HousesSlice = {
    houses: IHouseManagement[]
    recintoId: number
    currentResidence: string
    currentHouseId: number
    currentHouseInstalacion: string
    currentHouseManzana: string
    recintoImageUrl: string
}
