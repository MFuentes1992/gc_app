import React from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { colors } from "@gcMobile/theme/default.styles";
import { useSelector } from "react-redux";
import { RootState } from "@gcMobile/store";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: 10,
	},
	button: {
		alignItems: "center",
		backgroundColor: colors.blue,
		padding: 10,
		marginTop: 25,
	},
	countContainer: {
		alignItems: "center",
		padding: 10,
	},
});

export const Menu = () => {
	const navigation = useNavigation();
	const { access_token } = useSelector((state: RootState) => state.userReducer);

	const onPress = () => {
		navigation.navigate("Menu" as never);
	};

	return (
		<>
			{access_token != "" && (
				<TouchableOpacity style={styles.button} onPress={onPress}>
					<Entypo name='menu' size={24} color='white' />
				</TouchableOpacity>
			)}
		</>
	);
};
