import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Tab from '@gcMobile/components/Tab'
import VisitorControlScreen from '../VisitorControl'
import VisitHistoryScreen from '../VisitHistory'
import { visitsStyle } from './constants'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@gcMobile/store'
import { getCatalogTipoVisitas } from '@gcMobile/store/TipoVisitas/api'
import { isEmpty } from 'lodash'
import { VIEWS } from '@gcMobile/navigation/constants'

const VisitsScreen = ({ navigation }: any) => {
    const dispatch = useDispatch()
    const { catalogVisitas } = useSelector((state: RootState) => state.tipoVisitas)
    const { access_token } = useSelector((state: RootState) => state.userReducer)

    const [selectedTab, setSelectedTab] = useState<string>()
    const getSelectedValue = (value: string) => {
        if (value) setSelectedTab(value)
    }

    useEffect(() => {
        if (catalogVisitas.length === 0 || catalogVisitas === undefined)
            dispatch(getCatalogTipoVisitas() as unknown as any)
        if (isEmpty(access_token)) navigation.navigate(VIEWS.LOGIN as never)
    }, [catalogVisitas])

    return (
        <View style={{ flex: 1 }}>
            <Tab selectedTab={getSelectedValue} />
            <View
                style={{
                    ...(selectedTab === 'VisitHistory' && visitsStyle.hidden),
                    flex: 1,
                }}
            >
                {access_token !== '' && <VisitorControlScreen navigation={navigation} filters={catalogVisitas || []} />}
            </View>
            <View
                style={
                    // -- TODO: Fix this to match the above
                    !selectedTab || selectedTab === 'VisitorControl' ? visitsStyle.hidden : undefined
                }
            >
                {access_token !== '' && <VisitHistoryScreen />}
            </View>
        </View>
    )
}

export default VisitsScreen
