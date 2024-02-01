import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { MenuProps, styles } from "./constants";
import { logout } from "../Login/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@gcMobile/store";
import { setUserData } from "@gcMobile/store/User";

export const MenuScreen = ({ navigation }: MenuProps) => {
	const { currentHouseInstalacion, currentHouseManzana } = useSelector(
		(state: RootState) => state.houseReducer
	);

	const dispatch = useDispatch();

	const handleLogout = async () => {
		const value = await logout();
		dispatch(
			setUserData({
				access_token: "",
				id_instalacion: "",
				name: "",
				id: "",
			})
		);
		if (value) navigation.navigate("Login" as never);
	};

	return (
		<View style={styles.container}>
			{/** Title row */}
			<View style={styles.residenceContainer}>
				<View style={{ flexDirection: "row" }}>
					<FontAwesome name='user-circle-o' style={styles.iconStyles} />
					<View style={{ flexDirection: "column" }}>
						<Text style={styles.textStyles}>
							Asociacion de condominos Puerta Real II Las Baixas A.C.
						</Text>
						<View style={{ flexDirection: "row" }}>
							<Text
								style={
									styles.tinyText
								}>{`Manzana: ${currentHouseManzana}`}</Text>
							<Text
								style={
									styles.tinyText
								}>{`Casa: ${currentHouseInstalacion}`}</Text>
						</View>
					</View>
				</View>
			</View>
			{/** Consulta de casas */}
			<View style={styles.tenthHeight}>
				<TouchableOpacity
					style={{ flexDirection: "row" }}
					onPress={() => {
						navigation.navigate("HouseManagement" as never);
					}}>
					<FontAwesome name='building-o' style={styles.iconStyles} />
					<Text style={styles.textStyles}>Consultar otra casa</Text>
				</TouchableOpacity>
			</View>
			{/** Cambiar contrasenia */}
			<View style={styles.tenthHeight}>
				<TouchableOpacity style={{ flexDirection: "row" }}>
					<MaterialCommunityIcons
						name='form-textbox-password'
						style={styles.iconStyles}
					/>
					<Text style={styles.textStyles}>Cambiar contrasena</Text>
				</TouchableOpacity>
			</View>
			{/** Cerrar sesion */}
			<View style={styles.tenthHeight}>
				<TouchableOpacity
					style={{ flexDirection: "row" }}
					onPress={handleLogout}>
					<FontAwesome name='arrow-circle-o-right' style={styles.iconStyles} />
					<Text style={styles.textStyles}>Cerrar sesion</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.sixthHeight}>
				<TouchableOpacity
					style={{ flexDirection: "row", justifyContent: "center" }}
					onPress={() => navigation.navigate("Visits" as never)}>
					<MaterialCommunityIcons
						name='home-circle-outline'
						size={32}
						color='black'
						style={styles.homeIcon}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};
