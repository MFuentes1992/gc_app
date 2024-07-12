import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootState } from '@gcMobile/store'
import HistoricCard from '@gcMobile/components/HistoricCard'
import { getHistoricoVisitas } from '@gcMobile/store/HistoricVisitas/api'
import { visitorHistoryStyles } from './constants'

export default function VisitHistoryScreen() {
    const dispatch = useDispatch()
    const { email } = useSelector((state: RootState) => state.userReducer)
    const { currentHouseId } = useSelector((state: RootState) => state.houseReducer)
    const { visitas } = useSelector((state: RootState) => state.historicoVisitasReducer)

    useEffect(() => {
        if (![''].includes(email)) {
            dispatch(getHistoricoVisitas({ idInstalacion: currentHouseId, email }) as any)
        }
    }, [currentHouseId, email])

    return (
        <ScrollView contentContainerStyle={{ height: 'auto', padding: 10 }}>
            {visitas?.map((visita) => (
                <HistoricCard
                    idVisita={visita?.idVisita || ''}
                    visitaUniqueId={visita?.idVisita || ''}
                    nombreVisita={''}
                    fechaVisita={visita?.fechaVisita || ''}
                    horaVisita={visita?.horaVisita || ''}
                    tipoVisita={visita?.tipoVisita || ''}
                    tipoIngreso={visita?.tipoIngreso || ''}
                    vehiculos={visita?.vehiculos || []}
                    casa={visita?.casa || ''}
                />
            ))}
            <View style={{ height: 100 }}></View>
        </ScrollView>
    )
}
