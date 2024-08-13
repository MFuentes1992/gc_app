import { RootState } from '@gcMobile/store'
import React from 'react'
import { TouchableOpacity, View, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { base_web_server } from '../Auth/constants'

export const ProfilePicture = () => {
    const { pictureUrl } = useSelector((state: RootState) => state.userReducer)
    console.log('Picture url =======>', pictureUrl)
    return (
        <TouchableOpacity onPress={() => {}}>
            <View>
                <Image
                    source={{ uri: `${base_web_server}${pictureUrl}` }}
                    width={30}
                    height={30}
                    style={{ borderRadius: 50 }}
                />
            </View>
        </TouchableOpacity>
    )
}
