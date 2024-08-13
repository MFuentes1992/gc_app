import { IconName } from '@gcMobile/components/CircularButton/CircularButton'
import Ionicons from '@expo/vector-icons/Ionicons'

export type PaymentReference = {
    targetBank: string
    reference: string
    cents: string
}

export type BankInformation = {
    bankName: string
    accountNumber: string
    CLABE: string
}

export type HomeCardProps = {
    imageUrl: string
    nombre: string
    recinto: string
    instalacion: string
    bankInformation: BankInformation
    paymentReference: PaymentReference
    showBankData: boolean
}

export type HomeCreateVisitProps = {
    window: string
    icon: IconName
}

export type LastPaymentInformationProps = {
    dateAccountBalance: string
    dateLastPayment: string
    accountBalancePress: () => void
    lastPaymentPress: () => void
}

export type NotificationCardProps = {
    title: string
    date: string
    icon: Extract<keyof typeof Ionicons.glyphMap, string>
    iconColor: string
    onPress: () => void
}
