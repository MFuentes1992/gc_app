import { TVehicles } from '@gcMobile/store/Visitas/types'

export type VehicleInformationProps = {
    vehicles: Array<TVehicles>
    saveInformation?: (_d: { [key: string]: string }) => void
    removeVehicle: (id: string) => void
    handleOnChange: (id: string, key: string, value: string) => void
}

export type VehicleInformationState = {
    [key: string]: string
}
