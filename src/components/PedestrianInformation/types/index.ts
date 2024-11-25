import { TPedestrians } from '@gcMobile/store/Visitas/types'

export type TPedestriansProps = {
    pedestrians: Array<TPedestrians>
    saveInformation?: (_d: { [key: string]: string }) => void
    removePedestrian: (id: string) => void
    handleOnChange: (id: string, key: string, value: string) => void
}
