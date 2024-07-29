import React from 'react'
import { /* Platform */ View } from 'react-native'
// import Pdf from 'react-native-pdf' -- Disabled for IOS
import { containerStyles /* pdfViewerStyles */ } from './constants'

/**
 * Currently disabled for IOS
 */

export const PDFViewer = ({ route, navigation }: any) => {
    const { uri } = route.params

    return (
        <View style={containerStyles}>
            {/* <Pdf source={{ uri: Platform.OS === 'android' ? `file://${uri}` : `${uri}` }} style={pdfViewerStyles} /> */}
        </View>
    )
}
