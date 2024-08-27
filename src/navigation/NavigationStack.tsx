import { createDrawerNavigator } from '@react-navigation/drawer'
import LoginScreen from '@gcMobile/screens/Login'
import Form from '@gcMobile/components/Form'
import VisitsScreen from '@gcMobile/screens/VisitsScreen'
import { HouseManagement } from '@gcMobile/screens/HouseScreen/HouseManagement'
import { QRDetails } from '@gcMobile/screens/QRDetails/QRDetails'
import { VIEWS } from '@gcMobile/navigation/constants'
import Notificaciones from '@gcMobile/screens/Notificaciones/'
import { ReadNotification } from '@gcMobile/screens/Notificaciones/ReadNotification/ReadNotification'
import { colors } from '@gcMobile/theme/default.styles'
import { PDFViewer } from '@gcMobile/screens/PDFViewer/PDFViewer'
import { AttachImageViewer } from '@gcMobile/screens/AttachImageViewer/AttachImageViewer'
import EdoCuenta from '@gcMobile/screens/Edocuenta'
import { Avisos } from '@gcMobile/screens/Avisos/Avisos'
import { MenuScreen } from '@gcMobile/screens/MenuScreen/MenuScreen'
import Recibos from '@gcMobile/screens/Recibos'
import Home from '@gcMobile/screens/Home'
import { PasswordManager } from '@gcMobile/screens/PasswordManager/PasswordManager'

const NavigationStack = () => {
    const Drawer = createDrawerNavigator()

    return (
        <Drawer.Navigator
            drawerContent={() => <MenuScreen />}
            backBehavior="initialRoute"
            initialRouteName={VIEWS.LOGIN}
            screenOptions={{
                unmountOnBlur: true,
            }}
        >
            <Drawer.Screen name={VIEWS.HOME} component={Home} options={{ headerShown: false }} />
            <Drawer.Screen name={VIEWS.LOGIN} component={LoginScreen} options={{ headerShown: false }} />
            <Drawer.Screen name={VIEWS.CREATE_VISITA} component={Form} options={{ headerShown: false }} />
            <Drawer.Screen name={VIEWS.VISITAS} component={VisitsScreen} options={{ headerShown: false }} />
            <Drawer.Screen name={VIEWS.QR_DETAILS} component={QRDetails} options={{ headerShown: false }} />
            <Drawer.Screen name={VIEWS.HOUSE_MANAGEMENT} component={HouseManagement} options={{ headerShown: false }} />
            <Drawer.Screen name={VIEWS.NOTIFICACIONES} component={Notificaciones} options={{ headerShown: false }} />
            <Drawer.Screen
                name={VIEWS.READ_NOTIFICATION}
                component={ReadNotification}
                options={{ headerShown: false }}
            />
            <Drawer.Screen name={VIEWS.PDF_VIEWER} component={PDFViewer} options={{ headerShown: false }} />
            <Drawer.Screen
                name={VIEWS.ATTACH_IMAGE_VIEWER}
                component={AttachImageViewer}
                options={{ headerShown: false }}
            />
            <Drawer.Screen name={VIEWS.EDO_CUENTA} component={EdoCuenta} options={{ headerShown: false }} />
            <Drawer.Screen name={VIEWS.AVISOS} component={Avisos} options={{ headerShown: false }} />
            <Drawer.Screen name={VIEWS.RECIBOS} component={Recibos} options={{ headerShown: false }} />
            <Drawer.Screen name={VIEWS.CHANGE_PASSWORD} component={PasswordManager} options={{ headerShown: false }} />
        </Drawer.Navigator>
    )
}

export default NavigationStack
