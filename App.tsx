import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Provider } from 'react-redux'
import * as Notifications from 'expo-notifications'
import { Header } from 'react-native-elements'
import { Entypo } from '@expo/vector-icons'
import { PersistGate } from 'redux-persist/integration/react'
import { AlertNotificationRoot } from 'react-native-alert-notification'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import NavigationStack from '@gcMobile/navigation/NavigationStack'
import Menu from '@gcMobile/components/Menu'
import { colors } from '@gcMobile/theme/default.styles'
import { store, persistor } from '@gcMobile/store'
import Loader from '@gcMobile/components/Loader'
import { NotificationBadge } from '@gcMobile/components/NotificationsBadge/NotificationBadge'
import { ProfilePicture } from '@gcMobile/components/ProfilePicture/ProfilePicture'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
})

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <AlertNotificationRoot theme="light">
                    <Loader>
                        <NavigationContainer>
                            <Header
                                leftComponent={<Menu />}
                                rightComponent={<ProfilePicture />}
                                containerStyle={{
                                    backgroundColor: colors.blue,
                                    justifyContent: 'space-around',
                                    height: 90,
                                }}
                                centerComponent={{
                                    text: 'Gestion Comunidad',
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
