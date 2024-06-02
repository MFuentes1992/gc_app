import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Provider, useDispatch } from 'react-redux'
import * as Notifications from 'expo-notifications'
import { Header } from 'react-native-elements'
import { PersistGate } from 'redux-persist/integration/react'
import { AlertNotificationRoot } from 'react-native-alert-notification'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import NavigationStack from '@gcMobile/navigation/NavigationStack'
import Menu from '@gcMobile/components/Menu'
import { colors } from '@gcMobile/theme/default.styles'
import { store, persistor } from '@gcMobile/store'
import Loader from '@gcMobile/components/Loader'
import { VIEWS } from '@gcMobile/navigation/constants'
import { NotificationBadge } from '@gcMobile/components/NotificationsBadge/NotificationBadge'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
})

export default function App() {
    const ref = React.useRef<any>()

    useEffect(() => {
        ref.current = Notifications.addNotificationReceivedListener((notification) => {
            console.log('--- notification received ---')
            console.log(notification)
            console.log('------')
        })
    }, [])

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <AlertNotificationRoot theme="light">
                    <Loader>
                        <NavigationContainer>
                            <Header
                                leftComponent={<Menu />}
                                rightComponent={<NotificationBadge />}
                                containerStyle={{
                                    backgroundColor: colors.blue,
                                    justifyContent: 'space-around',
                                    height: 90,
                                }}
                                centerComponent={{
                                    text: 'GESTIÓN Y CONTROL',
                                    style: { color: '#fff', marginTop: '3%', fontWeight: 'bold' },
                                }}
                            />
                            <NavigationStack />
                        </NavigationContainer>
                    </Loader>
                </AlertNotificationRoot>
            </PersistGate>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
