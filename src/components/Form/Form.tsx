import React, { useEffect, useState } from 'react'
import _, { set } from 'lodash'
import { View, Text, TouchableOpacity, TextInput, Modal, ScrollView, Switch } from 'react-native'
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { formStyles, formatDateToPayload } from './constants'
import Button from '@gcMobile/components/Button'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@gcMobile/theme/default.styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@gcMobile/store'
import RadioGroup from '@gcMobile/components/RadioGroup/'
import { Calendar } from 'react-native-calendars'
import { ModalHour } from '../ModalHour/ModalHour'
import { createVisita } from '@gcMobile/store/Visitas/api'
import { setOperationSuccess } from '@gcMobile/store/UI'
import { VIEWS } from '@gcMobile/navigation/constants'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { getCatalogTipoIngreso } from '@gcMobile/store/TipoIngreso/api'
import { Container } from '../Container/Container'
import { VehicleInformation } from '../VehicleInformation/VehicleInformation'
import { HeaderActionButton } from '../HeaderActionButton/HeaderActionButton'
import { VehicleInformationState } from '../VehicleInformation/types'
import { clearForm } from '@gcMobile/util'

export const TipoVisitasIcon: { [key: string]: React.ReactNode } = {
    Visita: <FontAwesome name="user" size={24} color={colors.darkGray} />,
    Provedor: <FontAwesome name="truck" size={24} color={colors.darkGray} />,
    ['Servicio domestico']: <FontAwesome name="wrench" size={24} color={colors.darkGray} />,
    ['Vehículo']: <FontAwesome name="car" size={24} color={colors.darkGray} />,
    Peatonal: <FontAwesome5 name="walking" size={24} color={colors.darkGray} />,
    single: <FontAwesome name="user" size={24} color={colors.darkGray} />,
    multiple: <MaterialCommunityIcons name="account-multiple-plus" size={24} color="black" />,
}

export default function Form({ navigation }: any) {
    const dispatch = useDispatch()
    const { catalogVisitas } = useSelector((state: RootState) => state.tipoVisitas)
    const { catalogIngreso } = useSelector((state: RootState) => state.tipoIngresoReducer)
    const { currentHouseId } = useSelector((state: RootState) => state.houseReducer)
    const { id } = useSelector((state: RootState) => state.userReducer)
    const { operationSuccess } = useSelector((state: RootState) => state.uiReducer)
    const { newVisistaQR } = useSelector((state: RootState) => state.visitasReducer)

    const [formValues, setFormValues] = useState<{
        [key: string]: string | number
    }>({
        visitaNombre: '',
        tipo_visita: '',
        tipo_ingreso: '',
        fromDate: new Date().toISOString(),
        toDate: new Date().toISOString(),
        fromHour: new Date().toLocaleString().split(' ')[1].split(':')[0],
        toHour: new Date().toLocaleString().split(' ')[1].split(':')[0],
        notificaciones: 1,
        acceso: -1,
    })
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showModalTime, setShowModalTime] = useState<boolean>(false)
    const [totalVehicles, setTotalVehicles] = useState<number>(1)
    const [vehicleData, setVehicleData] = useState<VehicleInformationState[]>([
        {
            brand: '',
            model: '',
            year: '',
            color: '',
            plates: '',
        },
    ])

    const handleSubmit = () => {
        let flagEmpty = false
        Object.keys(formValues).forEach((key) => {
            if (
                _.isEmpty(formValues[key]) &&
                typeof formValues[key] !== 'number' &&
                !['vehicle_model', 'vehicle_color', 'vehicle_plate'].includes(key)
            ) {
                flagEmpty = true
            }
        })

        if (flagEmpty) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Visita',
                textBody: 'Favor de llenar todos los campos',
            })
            return
        }

        dispatch(
            createVisita({
                idUsuario: id,
                tipoVisita: formValues.tipo_visita.toString(),
                tipoIngreso: formValues.tipo_ingreso.toString(),
                fechaIngreso: formatDateToPayload(formValues.fromDate.toString(), formValues.fromHour.toString()),
                fechaSalida: formatDateToPayload(formValues.toDate.toString(), formValues.toHour.toString()),
                multEntry: formValues.acceso.toString(),
                notificacion: formValues.notificaciones.toString(),
                nombre: formValues.visitaNombre.toString(),
                idInstalacion: currentHouseId.toString(),
                vehicle: JSON.stringify(vehicleData),
            }) as any
        )
    }

    useEffect(() => {
        if (catalogIngreso.length === 0 || catalogIngreso === undefined)
            dispatch(getCatalogTipoIngreso() as unknown as any)

        setFormValues({
            visitaNombre: '',
            tipo_visita: '',
            tipo_ingreso: '',
            fromDate: new Date().toISOString(),
            toDate: new Date().toISOString(),
            fromHour: new Date().toLocaleString().split(' ')[1].split(':')[0],
            toHour: new Date().toLocaleString().split(' ')[1].split(':')[0],
            notificaciones: 0,
            acceso: -1,
        })
    }, [])

    useEffect(() => {
        if (operationSuccess) {
            dispatch(setOperationSuccess(false))
            navigation.navigate(VIEWS.QR_DETAILS, { uniqueID: newVisistaQR })
        }
    }, [operationSuccess])

    const handleAddVehicle = () => {
        setTotalVehicles((prev) => prev + 1)
        setVehicleData((prev) => [
            ...prev,
            {
                brand: '',
                model: '',
                year: '',
                color: '',
                plates: '',
            },
        ])
    }

    const handleRemoveVehicle = (index: number) => {
        setTotalVehicles((prev) => prev - 1)
        setVehicleData((prev) => {
            let temp = [...prev]
            temp.splice(index, 1)
            return temp
        })
    }

    const handleVehicleOnChange = (index: number, key: string, value: string) => {
        setVehicleData((prev) => {
            let temp = [...prev]
            temp[index][key] = value
            return temp
        })
    }

    return (
        <SafeAreaView style={formStyles.container}>
            <ScrollView
                contentContainerStyle={{
                    alignItems: 'center',
                    paddingTop: '5%',
                    paddingBottom: '5%',
                }}
                overScrollMode="never"
            >
                {/** Tipo de servicios */}
                <View style={{ flex: 0.16, marginBottom: '10%' }}>
                    <RadioGroup
                        options={catalogVisitas.map((catalog) => ({
                            id: catalog.id,
                            label: catalog.tipo_visita,
                            icon: TipoVisitasIcon[catalog.tipo_visita] as unknown as React.ReactNode,
                        }))}
                        value={`${formValues.tipo_visita}`}
                        handleChange={(value: string) => {
                            setFormValues((prev) => ({ ...prev, tipo_visita: value }))
                        }}
                    />
                </View>
                <View style={{ flex: 0.16, alignItems: 'center' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={{
                                width: '80%',
                                height: 40,
                                borderBottomColor: 'gray',
                                borderBottomWidth: 1,
                            }}
                            value={formValues.visitaNombre.toString()}
                            onFocus={() => {}}
                            onBlur={() => {}}
                            onChangeText={(text) => setFormValues({ ...formValues, visitaNombre: text })}
                            autoCapitalize="none"
                            maxLength={50}
                        />
                    </View>
                </View>
                <View style={[formStyles.row, formStyles.schedule]}>
                    <View style={formStyles.columnContainer}>
                        <Text style={[formStyles.text2, { paddingVertical: 5 }]}>Desde el:</Text>
                        <Text style={[formStyles.text2, { paddingVertical: 5 }]}>Hasta el:</Text>
                    </View>
                    <View style={formStyles.columnContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                setFormValues((prev) => ({ ...prev, dateType: 'from' }))
                                setShowModal(true)
                            }}
                        >
                            <Text style={[formStyles.date, { paddingVertical: 5 }]}>
                                {new Date(formValues['fromDate']).toLocaleDateString('es-MX', {})}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setFormValues((prev) => ({ ...prev, dateType: 'to' }))
                                setShowModal(true)
                            }}
                        >
                            <Text style={[formStyles.date, { paddingVertical: 5 }]}>
                                {new Date(formValues['toDate']).toLocaleDateString('es-MX', {})}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={formStyles.columnContainer}>
                        <Text style={[formStyles.text2, { paddingVertical: 5 }]}>a las</Text>
                        <Text style={[formStyles.text2, { paddingVertical: 5 }]}>a las</Text>
                    </View>
                    <View style={formStyles.columnContainer}>
                        <TouchableOpacity
                            style={{ paddingVertical: 5 }}
                            onPress={() => {
                                setFormValues((prev) => ({ ...prev, hourType: 'from' }))
                                setShowModalTime(true)
                            }}
                        >
                            <Text>{`${formValues['fromHour']}:00`}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ paddingVertical: 5 }}
                            onPress={() => {
                                setFormValues((prev) => ({ ...prev, hourType: 'to' }))
                                setShowModalTime(true)
                            }}
                        >
                            <Text>{`${formValues['toHour']}:00`}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={formStyles.columnContainer}>
                        <Text style={{ paddingVertical: 5 }}>CST</Text>
                        <Text style={{ paddingVertical: 5 }}>CST</Text>
                    </View>
                </View>
                <View style={{ flex: 0.16, marginBottom: '5%' }}>
                    <RadioGroup
                        options={catalogIngreso.map((catalog) => ({
                            id: catalog.id,
                            label: catalog.tipo_ingreso,
                            icon: TipoVisitasIcon[catalog.tipo_ingreso] as unknown as React.ReactNode,
                        }))}
                        value={`${formValues.tipo_ingreso}`}
                        handleChange={(value: string) => {
                            setFormValues((prev) => ({ ...prev, tipo_ingreso: value }))
                        }}
                    />
                </View>
                {formValues.tipo_ingreso === '1' && (
                    <Container
                        title="Informacion del vehiculo"
                        actionButton={<HeaderActionButton icon="plus-circle" onPress={handleAddVehicle} />}
                    >
                        <VehicleInformation
                            numberOfVehicles={totalVehicles}
                            vehicleData={vehicleData}
                            removeVehicle={handleRemoveVehicle}
                            handleOnChange={handleVehicleOnChange}
                        />
                    </Container>
                )}
                <View style={{ flex: 0.16, marginBottom: '5%' }}>
                    <RadioGroup
                        options={[
                            { id: '0', label: 'Una vez', accesor: 'single' },
                            { id: '1', label: 'Varias', accesor: 'multiple' },
                        ].map((catalog) => ({
                            id: catalog.id,
                            label: catalog.label,
                            icon: TipoVisitasIcon[catalog.accesor] as unknown as React.ReactNode,
                        }))}
                        value={`${formValues.acceso}`}
                        handleChange={(value: string) => setFormValues((prev) => ({ ...prev, acceso: value }))}
                    />
                </View>
                <View
                    style={{
                        flex: 0.2,
                        //flexDirection: "row",
                        alignItems: 'center',
                        marginBottom: '5%',
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 12, color: colors.gray, marginRight: '2%' }}>Notificaciones:</Text>
                        <Switch
                            trackColor={{ false: colors.lightGray, true: colors.limeGreen }}
                            thumbColor={formValues['notificaciones'] === 0 ? colors.lightGray : colors.white}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() =>
                                setFormValues((prev) => ({
                                    ...prev,
                                    notificaciones: prev['notificaciones'] === 0 ? 1 : 0,
                                }))
                            }
                            value={formValues['notificaciones'] === 1 ? true : false}
                        />
                    </View>
                </View>
                <View style={{ flex: 0.2, flexDirection: 'row', height: '50%' }}>
                    <View
                        style={{
                            flex: 1,

                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        }}
                    >
                        <Button
                            styles={{
                                backgroundColor: colors.red,
                                width: 100,
                                height: 46.5,
                                borderRadius: 2,
                                margin: 'auto',
                                filter: colors.dropShadow,
                            }}
                            textButton="Cancelar"
                            onPress={() => {
                                navigation.navigate(VIEWS.HOME)
                            }}
                        />
                        <Button
                            styles={{
                                backgroundColor: colors.green,
                                width: 100,
                                height: 46.5,
                                borderRadius: 2,
                                margin: 'auto',
                                filter: colors.dropShadow,
                            }}
                            textButton="Aceptar"
                            onPress={handleSubmit}
                        />
                    </View>
                </View>
            </ScrollView>
            <ModalHour
                showModal={showModalTime}
                setShowModal={setShowModalTime}
                handleHourChange={(hour: string) => {
                    switch (formValues['hourType']) {
                        case 'from':
                            setFormValues((prev) => ({ ...prev, fromHour: hour }))
                            break
                        case 'to':
                            setFormValues((prev) => ({ ...prev, toHour: hour }))
                            break
                        default:
                            break
                    }
                }}
            />
            <Modal animationType="fade" transparent={true} visible={showModal} style={{ width: '50%' }}>
                <View style={{ flex: 1, marginTop: '40%', alignItems: 'center' }}>
                    <View style={{ flex: 1, width: '90%' }}>
                        <Calendar
                            markedDates={{
                                [formValues['fromDate'].toString().split('T')[0]]: {
                                    selected: true,
                                    selectedColor: colors.blue,
                                },
                                [formValues['toDate'].toString().split('T')[0]]: {
                                    selected: true,
                                    selectedColor: colors.cherry,
                                },
                            }}
                            style={{ width: '100%' }}
                            onDayPress={(day: any) => {
                                switch (formValues['dateType']) {
                                    case 'from':
                                        setFormValues((prev) => ({
                                            ...prev,
                                            fromDate: `${day.dateString}T23:59:00.000Z`,
                                        }))
                                        break
                                    case 'to':
                                        setFormValues((prev) => ({
                                            ...prev,
                                            toDate: `${day.dateString}T23:59:00.000Z`,
                                        }))
                                        break
                                    default:
                                        break
                                }
                                setShowModal(false)
                            }}
                            shouldRasterizeIOS={true}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}
