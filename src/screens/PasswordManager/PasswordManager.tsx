import { Navbar } from '@gcMobile/navigation/Navbar/Navbar'
import { clearForm, passwordFormValidation } from '@gcMobile/util'
import React, { useEffect } from 'react'
import { View, TextInput, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { pass_button, pass_container, pass_input, pass_text } from './constants'
import { Button, Icon } from 'react-native-elements'
import { colors } from '@gcMobile/theme/default.styles'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '@gcMobile/store/User/api'
import { RootState } from '@gcMobile/store'
import { setOperationSuccess } from '@gcMobile/store/UI'

type PasswordManagerProps = {
    currentPassword: string
    newPassword: string
    repeatNewPassword: string
}

export const PasswordManager = () => {
    const dispatch = useDispatch()
    const { email } = useSelector((state: RootState) => state.userReducer)
    const { operationSuccess } = useSelector((state: RootState) => state.uiReducer)
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
            if (
                errors[key].isEmpty !== '' ||
                errors?.repeatNewPassword?.isSame !== '' ||
                errors?.newPassword?.isPrevious !== ''
            ) {
                isValid = false
            }
        })
        if (!isValid) return
        dispatch(changePassword(email, form.newPassword, form.currentPassword) as any)
    }

    const toggleShowPassword = (key: string) => {
        setShowPassword((prev: any) => ({ ...prev, [key]: !prev[key] }))
    }

    useEffect(() => {
        if (operationSuccess) {
            setPassword((prev) => ({ ...prev, ...clearForm(prev) }))
            dispatch(setOperationSuccess(false))
        }
    }, [operationSuccess])

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
                        value={password.currentPassword}
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
                        value={password.newPassword}
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
                {![''].includes(errors?.newPassword?.isPrevious) && (
                    <Text style={[pass_text]}>{errors?.newPassword?.isPrevious}</Text>
                )}
                <View>
                    <TextInput
                        placeholder="Repetir nueva contraseña"
                        onChangeText={(value: string) => handleChange('repeatNewPassword', value)}
                        style={[pass_input]}
                        secureTextEntry={showPassword?.repeatNewPassword}
                        value={password.repeatNewPassword}
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
                {![''].includes(errors?.repeatNewPassword?.isSame) && (
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
