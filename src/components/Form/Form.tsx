import React, { useEffect, useState } from 'react'
import _, { set } from 'lodash'
import { View, Text, TouchableOpacity, TextInput, Modal, ScrollView, Switch, Alert } from 'react-native'
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { NEW_EMPTY_VEHICLE, VISITA_INITIAL_STATE, formStyles, formatDateToPayload } from './constants'
import Button from '@gcMobile/components/Button'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@gcMobile/theme/default.styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@gcMobile/store'
import RadioGroup from '@gcMobile/components/RadioGroup/'
import { Calendar } from 'react-native-calendars'
import { ModalHour } from '../ModalHour/ModalHour'
import {
    createVisita,
    deleteVehicle,
    getVehiclesByUniqueId,
    getVisitaByuniqueId,
    updateVisita,
} from '@gcMobile/store/Visitas/api'
import { setOperationSuccess } from '@gcMobile/store/UI'
import { VIEWS } from '@gcMobile/navigation/constants'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { getCatalogTipoIngreso } from '@gcMobile/store/TipoIngreso/api'
import { Container } from '../Container/Container'
import { VehicleInformation } from '../VehicleInformation/VehicleInformation'
import { HeaderActionButton } from '../HeaderActionButton/HeaderActionButton'
import { Navbar } from '@gcMobile/navigation/Navbar/Navbar'
import { clearEditableVisita, clearVehicles } from '@gcMobile/store/Visitas'
import { TPedestrians, TVehicles, TVisitaPayload } from '@gcMobile/store/Visitas/types'

export const TipoVisitasIcon: { [key: string]: React.ReactNode } = {
    Visita: <FontAwesome name="user" size={24} color={colors.darkGray} />,
    Provedor: <FontAwesome name="truck" size={24} color={colors.darkGray} />,
    ['Servicio domestico']: <FontAwesome name="wrench" size={24} color={colors.darkGray} />,
    ['Vehículo']: <FontAwesome name="car" size={24} color={colors.darkGray} />,
    Peatonal: <FontAwesome5 name="walking" size={24} color={colors.darkGray} />,
    single: <FontAwesome name="user" size={24} color={colors.darkGray} />,
    multiple: <MaterialCommunityIcons name="account-multiple-plus" size={24} color="black" />,
}

export default function Form({ route, navigation }: any) {
    const { uniqueID } = route?.params
    const dispatch = useDispatch()
    const { catalogVisitas } = useSelector((state: RootState) => state.tipoVisitas)
    const { catalogIngreso } = useSelector((state: RootState) => state.tipoIngresoReducer)
    const { currentHouseId } = useSelector((state: RootState) => state.houseReducer)
    const { id: idUsuario } = useSelector((state: RootState) => state.userReducer)
    const { operationSuccess } = useSelector((state: RootState) => state.uiReducer)
    const { createdQr, visita } = useSelector((state: RootState) => state.visitasReducer)
    const [formValues, setFormValues] = useState<{
        [key: string]: string | number | Array<TVehicles> | Array<TPedestrians>
    }>(VISITA_INITIAL_STATE)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showModalTime, setShowModalTime] = useState<boolean>(false)

    const handleSubmit = () => {
        let flagEmpty = false
        Object.keys(formValues).forEach((key) => {
            if (_.isEmpty(formValues[key]) && typeof formValues[key] !== 'number') {
                flagEmpty = true
            }
        })
        const vehiclePayload = formValues.vehicles as Array<TVehicles>
        vehiclePayload.forEach((vehicle) => {
            if (_.isEmpty(vehicle.conductor) || _.isEmpty(vehicle.placas)) {
                flagEmpty = true
            }
        })

        if (flagEmpty) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Visita',
                textBody: `Favor de llenar todos los campos`,
            })
            return
        }
        if (uniqueID) {
            Alert.alert('¿Estás seguro?', '¿Deseas actualizar la visita?', [
                {
                    text: 'Cancelar',
                    onPress: () => {},
                    style: 'cancel',
                },
                {
                    text: 'Aceptar',
                    onPress: () => {
                        const payload: TVisitaPayload = {
                            idVisita: formValues.visitaId.toString(),
                            idTipoVisita: formValues.idTipoVisita.toString(),
                            idTipoIngreso: formValues.idTipoIngreso.toString(),
                            fechaIngreso: formValues.fechaIngreso.toString(),
                            fechaSalida: formValues.fechaSalida.toString(),
                            multiple: formValues.multiple.toString(),
                            notificaciones: formValues.notificaciones.toString(),
                            nombreVisita: formValues.visitaNombre.toString(),
                            vehiculos: JSON.stringify(vehiclePayload),
                            peatones: JSON.stringify([]),
                        }
                        console.info('update payload =====>', payload)
                        dispatch(updateVisita(payload) as any)
                    },
                },
            ])
        } else {
            const payload = {
                idUsuario,
                idTipoVisita: formValues.idTipoVisita.toString(),
                idTipoIngreso: formValues.idTipoIngreso.toString(),
                idInstalacion: currentHouseId.toString(),
                fechaIngreso: formValues.fechaIngreso.toString(),
                fechaSalida: formValues.fechaSalida.toString(),
                multiple: formValues.multiple.toString(),
                notificaciones: formValues.notificaciones.toString(),
                appGenerado: '1',
                nombreVisita: formValues.visitaNombre.toString(),
                vehiculos: JSON.stringify(vehiclePayload),
                peatones: JSON.stringify([]),
            }
            console.info('create payload =====>', payload)
            dispatch(createVisita(payload) as any)
        }
    }

    useEffect(() => {
        if (catalogIngreso.length === 0 || catalogIngreso === undefined)
            dispatch(getCatalogTipoIngreso() as unknown as any)
    }, [])

    useEffect(() => {
        if (uniqueID) {
            dispatch(getVisitaByuniqueId(uniqueID) as any)
        }
    }, [uniqueID])

    useEffect(() => {
        if (visita?.visitaId) {
            setFormValues(
                (prev) =>
                    ({
                        ...prev,
                        ...visita,
                    } as any)
            )
        }
        return () => {
            dispatch(clearVehicles())
            dispatch(clearEditableVisita())
            setFormValues(VISITA_INITIAL_STATE)
        }
    }, [visita])

    useEffect(() => {
        if (operationSuccess) {
            dispatch(setOperationSuccess(false))
            clearScreenOnReturn()
            navigation.navigate(VIEWS.QR_DETAILS, { uniqueID: createdQr })
        }
    }, [operationSuccess])

    const handleAddVehicle = () => {
        const newVehicle = NEW_EMPTY_VEHICLE
        const vehiclesArr = [...(formValues.vehicles as TVehicles[]), newVehicle]
        setFormValues((prev) => ({ ...prev, vehicles: vehiclesArr }))
    }

    const removeVehicleLocal = (id: string) => {
        const vehicles = formValues.vehicles as Array<TVehicles>
        const filteredVehicles = vehicles.filter((v) => v.id !== id)
        setFormValues((prev) => ({ ...prev, vehicles: filteredVehicles }))
    }

    const handleRemoveVehicle = (id: string) => {
        if (uniqueID) {
            Alert.alert('¿Estás seguro?', '¿Deseas eliminar el vehículo?', [
                {
                    text: 'Cancelar',
                    onPress: () => {},
                    style: 'cancel',
                },
                {
                    text: 'Aceptar',
                    onPress: () => dispatch(deleteVehicle(id.toString(), () => removeVehicleLocal(id)) as any),
                },
            ])
        } else {
            removeVehicleLocal(id)
        }
    }

    const handleVehicleOnChange = (id: string, key: string, value: string) => {
        const vehicles = formValues.vehicles as Array<TVehicles>
        const vehicle = vehicles.find((v) => v.id === id) as any
        if (vehicle) {
            vehicle[key] = value
            const filteredVehicles = vehicles.filter((v) => v.id !== id)
            filteredVehicles.push(vehicle)
            setFormValues((prev) => ({ ...prev, vehicles: filteredVehicles }))
        }
    }

    const clearScreenOnReturn = () => {
        setFormValues(VISITA_INITIAL_STATE)
        dispatch(clearEditableVisita())
        dispatch(clearVehicles())
    }

    return (
        <>
            <Navbar title="Generar visita" callback={clearScreenOnReturn} />
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
                            value={formValues.idTipoVisita.toString()}
                            handleChange={(value: string) => {
                                setFormValues((prev) => ({ ...prev, idTipoVisita: value }))
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
                                value={formValues.nombre.toString()}
                                onFocus={() => {}}
                                onBlur={() => {}}
                                onChangeText={(text) => setFormValues({ ...formValues, nombre: text })}
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
                                    {new Date(formValues.fechaIngreso.toString()).toLocaleDateString('es-MX', {})}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setFormValues((prev) => ({ ...prev, dateType: 'to' }))
                                    setShowModal(true)
                                }}
                            >
                                <Text style={[formStyles.date, { paddingVertical: 5 }]}>
                                    {new Date(formValues.fechaSalida.toString()).toLocaleDateString('es-MX', {})}
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
                                <Text>{`${formValues?.fechaIngresoHora}`}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ paddingVertical: 5 }}
                                onPress={() => {
                                    setFormValues((prev) => ({ ...prev, hourType: 'to' }))
                                    setShowModalTime(true)
                                }}
                            >
                                <Text>{`${formValues?.fechaSalidaHora}`}</Text>
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
                            value={`${formValues.idTipoIngreso}`}
                            handleChange={(value: string) => {
                                setFormValues((prev) => ({ ...prev, idTipoIngreso: value }))
                            }}
                        />
                    </View>
                    {formValues.idTipoIngreso.toString() === '1' && (
                        <Container
                            title="Informacion del vehiculo"
                            actionButton={<HeaderActionButton icon="plus-circle" onPress={handleAddVehicle} />}
                        >
                            <VehicleInformation
                                vehicles={formValues.vehicles as Array<TVehicles>}
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
                            value={`${formValues.multiple}`}
                            handleChange={(value: string) => setFormValues((prev) => ({ ...prev, multiple: value }))}
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
                                thumbColor={
                                    Number.parseInt(formValues.notificaciones.toString()) === 0
                                        ? colors.lightGray
                                        : colors.white
                                }
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() =>
                                    setFormValues((prev) => ({
                                        ...prev,
                                        notificaciones:
                                            Number.parseInt(formValues.notificaciones.toString()) === 0 ? 1 : 0,
                                    }))
                                }
                                value={Number.parseInt(formValues.notificaciones.toString()) === 1 ? true : false}
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
                                    clearScreenOnReturn()
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
                                setFormValues((prev) => ({ ...prev, fechaIngresoHora: hour }))
                                break
                            case 'to':
                                setFormValues((prev) => ({ ...prev, fechaSalidaHora: hour }))
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
                                    [formValues.fechaIngreso.toString().split('T')[0]]: {
                                        selected: true,
                                        selectedColor: colors.blue,
                                    },
                                    [formValues.fechaSalida.toString().split('T')[0]]: {
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
                                                fechaIngreso: `${day.dateString}T${prev.fechaIngresoHora}:00.000Z`,
                                            }))
                                            break
                                        case 'to':
                                            setFormValues((prev) => ({
                                                ...prev,
                                                fechaSalida: `${day.dateString}T${prev.fechaSalidaHora}:00.000Z`,
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
        </>
    )
}
