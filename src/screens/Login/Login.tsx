import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import InputComponent from "../../components/Inputs/InputComponent";
import InputPassword from "../../components/Inputs/InputPassword";
import Button from "../../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackActions } from "@react-navigation/native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import {
	loginScreenStyles,
	useStyles,
	authenticate,
	saveToken,
	InitializeConnection,
	getIsntalaciones,
} from "./constants";
import { buttonComponentStyles } from "@gcMobile/components/Button/constants";
import { colors } from "@gcMobile/theme/default.styles";
import { useDispatch } from "react-redux";
import { setUserData } from "@gcMobile/store/User";
import { setCurrentHouseInfo, setHouse } from "@gcMobile/store/Houses";
// import instalaciones from "@gcMobile/screens/HouseScreen/conts/instalaciones.json";
import { IHouseManagement, styles } from "../HouseScreen/conts";
import { setLoading } from "@gcMobile/store/UI";
import { VIEWS } from "@gcMobile/navigation/constants";

interface INavigationProps {
	navigation: any;
}
interface ErrorResponse {
	status: number;
}
export default function LoginScreen({ navigation }: INavigationProps) {
	const dispatch = useDispatch();
	const {
		emailStyles,
		setEmailStyles,
		passwordStyles,
		setPasswordStyles,
		clicked,
		setClicked,
	} = useStyles();

	//user data
	const [emailValue, setEmailValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");
	const [customerCode, setCustomerCode] = useState<string>("");

	const getInputValue = (value?: string) => {
		if (value) setEmailValue(value);
	};

	const getPasswordValue = (value?: string) => {
		if (value) setPasswordValue(value);
	};

	const handleSubmit = async () => {
		setClicked(true);
		dispatch(setLoading(true));
		if (!emailStyles.regexState) {
			dispatch(setLoading(false));
			Toast.show({
				type: ALERT_TYPE.DANGER,
				title: "Invalid email format",
				textBody: "Please enter a valid email address.",
			});
		} else if (passwordStyles.regexState) {
			if (customerCode === "") {
				dispatch(setLoading(false));
				Toast.show({
					type: ALERT_TYPE.DANGER,
					title: "Empty code",
					textBody: "Please enter a valid code",
				});
				return;
			}
			try {
				const authData = await InitializeConnection(
					emailValue,
					passwordValue,
					customerCode,
					authenticate
				);
				const instalaciones = await getIsntalaciones(authData.instalaciones);

				const tokenData: { [key: string]: string } = {
					access_token: authData.access_token,
					userName: authData.name,
					userResidence: authData.residence,
					userEmail: emailValue,
					userId: authData.id,
				};
				saveToken(tokenData.access_token);
				dispatch(
					setUserData({
						access_token: tokenData.access_token,
						id_instalacion: authData.instalaciones,
						email: emailValue,
						name: authData.name,
						id: authData.id,
					})
				);
				dispatch(setHouse(instalaciones as unknown as IHouseManagement[]));
				const _house = authData.instalaciones.split(",")[0];
				const defaultHouse = instalaciones.find(
					(inst: IHouseManagement) => inst.id === _house
				);
				if (defaultHouse) {
					dispatch(
						setCurrentHouseInfo({
							currentHouseId: defaultHouse.id,
							currentResidence: defaultHouse.residencial,
							currentHouseInstalacion: defaultHouse.num_int,
							currentHouseManzana: defaultHouse.manzana,
						})
					);
				} else {
					setCurrentHouseInfo({
						currentHouseId: 0,
						currentResidence: "",
						currentHouseInstalacion: "",
						currentHouseManzana: "",
					});
				}
				dispatch(setLoading(false));
				navigation.dispatch(StackActions.replace(VIEWS.VISITAS, tokenData));
			} catch (error) {
				dispatch(setLoading(false));
				saveToken("");
				Toast.show({
					type: ALERT_TYPE.DANGER,
					title: "Login Error",
					textBody: `${error}`,
				});
			}
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={[loginScreenStyles.container]}>
				<ScrollView>
					<View style={loginScreenStyles.rowImage}>
						<Image
							source={require("@gcMobile/images/logoGcMobile.jpeg")}
							style={loginScreenStyles.imageStyles}
						/>
					</View>
					<View style={loginScreenStyles.row}>
						<InputComponent
							textInput='Email Adress'
							styles={emailStyles.email}
							regularExpression={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
							regexValidation={(value) =>
								setEmailStyles({ ...emailStyles, regexState: value })
							}
							isClicked={clicked}
							textInputValue={getInputValue}
						/>
					</View>
					<View style={loginScreenStyles.row}>
						<InputPassword
							textInput='Password'
							styles={passwordStyles.password}
							regexValidation={(value) =>
								setPasswordStyles({ ...passwordStyles, regexState: value })
							}
							isClicked={clicked}
							passwordValue={getPasswordValue}
							regularExpression={/\S+/}
						/>
					</View>
					<View style={loginScreenStyles.row}>
						<InputPassword
							textInput='Code'
							styles={colors.gray}
							isClicked={clicked}
							passwordValue={(value: string) => setCustomerCode(value)}
						/>
					</View>
					<View style={loginScreenStyles.row}>
						<Button
							styles={buttonComponentStyles.button}
							textButton='Sign In'
							onPress={handleSubmit}
						/>
					</View>
					<View style={loginScreenStyles.rowText}>
						<Text style={loginScreenStyles.label}>New user? </Text>
						<TouchableOpacity onPress={() => navigation.navigate("Register")}>
							<Text style={loginScreenStyles.label}>Sign up</Text>
						</TouchableOpacity>
						<Text style={loginScreenStyles.label}> here</Text>
					</View>
					<View style={loginScreenStyles.rowText}>
						<Text style={loginScreenStyles.label}>
							By creating an account, you agree to our Terms of Service and
							Privacy Policy
						</Text>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
