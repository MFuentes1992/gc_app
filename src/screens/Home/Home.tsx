import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { HomeCardProps, HomeCreateVisitProps, LastPaymentInformationProps, NotificationCardProps } from './types'
import { View, Text, Image } from 'react-native'
import CircularButton from '@gcMobile/components/CircularButton'
import { circularBtnStyles } from '@gcMobile/components/CircularButton/constants'
import { colors, fonts } from '@gcMobile/theme/default.styles'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import {
    add_visit_button_styles,
    card_container_styles,
    Generate_Visit_Styles,
    icons_styles,
    Image_Styles,
    Last_Payment_Row,
    Main_Body_Titles,
    Main_Info_Body,
    Main_Info_Body_Account,
    Main_Info_Headers,
    row_label,
} from './constants'
import { VIEWS } from '@gcMobile/navigation/constants'

const HeaderCard = (props: HomeCardProps) => {
    return (
        <View style={[card_container_styles]}>
            <View style={[Main_Info_Headers]}>
                <Image source={{ uri: props.imageUrl }} style={[Image_Styles]} />
                <View style={[{ paddingTop: 10 }]}>
                    <Text style={[{ fontSize: fonts.bodyText1, fontWeight: 'bold' }]}>{props.nombre}</Text>
                    <Text style={[{ fontSize: fonts.bodyText1, fontWeight: 'bold' }]}>{props.instalacion}</Text>
                </View>
            </View>
            <View style={[Main_Info_Body]}>
                <View style={[Main_Info_Body_Account]}>
                    <Text style={[Main_Body_Titles]}>Datos bancarios de {props.recinto}</Text>
                    <View style={[row_label]}>
                        <Text style={{ color: colors.black }}>Banco </Text>
                        <Text style={{ marginLeft: 10, color: colors.gray }}>{props.bankInformation.bankName}</Text>
                    </View>
                    <View style={[row_label]}>
                        <Text>Cuenta </Text>
                        <Text style={{ marginLeft: 5, color: colors.gray }}>{props.bankInformation.accountNumber}</Text>
                    </View>
                    <View style={[row_label]}>
                        <Text>CLABE </Text>
                        <Text style={{ marginLeft: 5, color: colors.gray }}>{props.bankInformation.CLABE}</Text>
                    </View>
                </View>
                <View style={[Main_Info_Body_Account]}>
                    <Text style={[Main_Body_Titles]}>Referencias de pago</Text>
                    <View style={[row_label]}>
                        <Text>Bancaria </Text>
                        <Text style={{ marginLeft: 10, color: colors.gray }}>{props.paymentReference.targetBank}</Text>
                    </View>
                    <View style={[row_label]}>
                        <Text>Concepto </Text>
                        <Text style={{ marginLeft: 5, color: colors.gray }}>{props.paymentReference.reference}</Text>
                    </View>
                    <View style={[row_label]}>
                        <Text>Centavos </Text>
                        <Text style={{ marginLeft: 5, color: colors.gray }}>{props.paymentReference.cents}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const HomeCreateVisit = (props: HomeCreateVisitProps) => {
    return (
        <View style={[Generate_Visit_Styles]}>
            <View style={[add_visit_button_styles]}>
                <CircularButton
                    styles={circularBtnStyles.container}
                    window={props.window}
                    icon={props.icon}
                    color={colors.white}
                />
            </View>
            <View style={[add_visit_button_styles]}>
                <Text style={[{ fontSize: fonts.bodyText1 }]}>Generar visita</Text>
            </View>
        </View>
    )
}

export const LastPaymentInformation = (props: LastPaymentInformationProps) => {
    return (
        <View style={[card_container_styles]}>
            <View style={[Last_Payment_Row, { borderBottomColor: colors.gray, borderBottomWidth: 1 }]}>
                <View>
                    <Text style={[Main_Body_Titles]}>Último estado de cuenta</Text>
                    <Text style={{ color: colors.gray }}>{props.dateAccountBalance}</Text>
                </View>
                <View>
                    <MaterialCommunityIcons name="file-document-multiple-outline" style={icons_styles} />
                </View>
            </View>
            <View style={[Last_Payment_Row]}>
                <View>
                    <Text style={[Main_Body_Titles]}>Último recibo de pago</Text>
                    <Text style={{ color: colors.gray }}>{props.dateLastPayment}</Text>
                </View>
                <View>
                    <MaterialCommunityIcons name="credit-card-edit-outline" style={icons_styles} />
                </View>
            </View>
        </View>
    )
}

export const NotificationCard = (props: NotificationCardProps) => {
    return (
        <View style={[card_container_styles]}>
            <View style={[Last_Payment_Row]}>
                <View>
                    <Ionicons name={props.icon} size={24} color={props.iconColor} />
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Text style={[Main_Body_Titles]}>{props.title}</Text>
                    <Text style={{ color: colors.gray }}>{props.date}</Text>
                </View>
            </View>
        </View>
    )
}

export const Home = () => {
    return (
        <ScrollView overScrollMode="never">
            <HeaderCard
                imageUrl="https://via.placeholder.com/150"
                nombre="Victor Vargas"
                recinto="Oyamel"
                instalacion="Ambar 01"
                bankInformation={{
                    bankName: 'Banamex',
                    accountNumber: '1234567890',
                    CLABE: '123456789012345678',
                }}
                paymentReference={{
                    targetBank: 'Banamex',
                    reference: 'Pago de servicios',
                    cents: '0.00',
                }}
            />
            <HomeCreateVisit window={VIEWS.CREATE_VISITA} icon="plus" />
            <LastPaymentInformation dateAccountBalance="Julio 2020-01-01" dateLastPayment="Julio 2020-01-01" />
            <NotificationCard
                title="Mantenimiento de Jardines"
                date="2020-01-01"
                icon="megaphone-outline"
                iconColor={colors.gray}
            />
        </ScrollView>
    )
}
