import { Navbar } from '@gcMobile/navigation/Navbar/Navbar'
import { passwordFormValidation } from '@gcMobile/util'
import React from 'react'
import { View, TextInput, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { pass_button, pass_container, pass_input, pass_text } from './constants'
import { Button, Icon } from 'react-native-elements'
import { colors } from '@gcMobile/theme/default.styles'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '@gcMobile/store/User/api'
import { RootState } from '@gcMobile/store'

type PasswordManagerProps = {
    currentPassword: string
    newPassword: string
    repeatNewPassword: string
}

export const PasswordManager = () => {
    const dispatch = useDispatch()
    const { email } = useSelector((state: RootState) => state.userReducer)
    const [password, setPassword] = React.useState<PasswordManagerProps>({
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: '',
    })
    const [errors, setErrors] = React.useState<{ [key: string]: { [key: string]: string | any } }>()
    const [showPassword, setShowPassword] = React.useState<{ [key: string]: boolean }>({
        currentPassword: true,
        newPassword: true,
        repeatNewPassword: true,
    })

    const handleChange = (key: keyof PasswordManagerProps, value: string) => {
        setPassword((prev) => ({ ...prev, [key]: value }))
        setErrors(passwordFormValidation({ ...password, [key]: value }))
    }

    const handleSubmit = (
        form: { [key: string]: string },
        errors: { [key: string]: { [key: string]: string | any } }
    ) => {
        let isValid = true
        Object.keys(errors).forEach((key) => {
            if (errors[key].isEmpty !== '' || errors?.repeatNewPassword?.isSame !== '') {
                isValid = false
            }
        })
        if (!isValid) return
        dispatch(changePassword(email, form.newPassword) as any)
        // Do something
    }

    const toggleShowPassword = (key: string) => {
        setShowPassword((prev: any) => ({ ...prev, [key]: !prev[key] }))
    }

    return (
        <>
            <Navbar title="Cambiar contraseña" />
            <ScrollView overScrollMode="never" contentContainerStyle={[pass_container]}>
                <View>
                    <TextInput
                        placeholder="Contraseña actual"
                        onChangeText={(value: string) => {
                            handleChange('currentPassword', value)
                        }}
                        secureTextEntry={showPassword?.currentPassword}
                        style={[pass_input]}
                    />
                    <Icon
                        name={showPassword?.currentPassword ? 'eye-off-outline' : 'eye-outline'}
                        type="ionicon"
                        onPress={() => toggleShowPassword('currentPassword')}
                        containerStyle={[{ position: 'absolute', right: 35, top: 20 }]}
                        color={colors.gray}
                    />
                </View>
                {![''].includes(errors?.currentPassword?.isEmpty) && (
                    <Text style={[pass_text]}>{errors?.currentPassword?.isEmpty}</Text>
                )}
                <View>
                    <TextInput
                        placeholder="Nueva contraseña"
                        onChangeText={(value: string) => handleChange('newPassword', value)}
                        style={[pass_input]}
                        secureTextEntry={showPassword?.newPassword}
                    />
                    <Icon
                        name={showPassword?.newPassword ? 'eye-off-outline' : 'eye-outline'}
                        type="ionicon"
                        onPress={() => toggleShowPassword('newPassword')}
                        containerStyle={[{ position: 'absolute', right: 35, top: 20 }]}
                        color={colors.gray}
                    />
                </View>
                {![''].includes(errors?.newPassword?.isEmpty) && (
                    <Text style={[pass_text]}>{errors?.newPassword?.isEmpty}</Text>
                )}
                <View>
                    <TextInput
                        placeholder="Repetir nueva contraseña"
                        onChangeText={(value: string) => handleChange('repeatNewPassword', value)}
                        style={[pass_input]}
                        secureTextEntry={showPassword?.repeatNewPassword}
                    />
                    <Icon
                        name={showPassword?.repeatNewPassword ? 'eye-off-outline' : 'eye-outline'}
                        type="ionicon"
                        onPress={() => toggleShowPassword('repeatNewPassword')}
                        containerStyle={[{ position: 'absolute', right: 35, top: 20 }]}
                        color={colors.gray}
                    />
                </View>
                {![''].includes(errors?.repeatNewPassword?.isEmpty) && (
                    <Text style={[pass_text]}>{errors?.repeatNewPassword?.isEmpty}</Text>
                )}
                {![''].includes(errors?.repeatNewPassword?.isSam) && (
                    <Text style={[pass_text]}>{errors?.repeatNewPassword?.isSame}</Text>
                )}
                <Button
                    title="Cambiar contraseña"
                    onPress={() => {
                        handleSubmit(password, errors || {})
                    }}
                    buttonStyle={[pass_button]}
                ></Button>
            </ScrollView>
        </>
    )
}
