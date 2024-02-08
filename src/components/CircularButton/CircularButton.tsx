import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { circularBtnStyles } from "./constants";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
interface ICircularButtonProps {
	window: keyof RootStackParamList;
	icon: IconName;
	styles: { [key: string]: string | number | any };
}
type IconName = Extract<keyof typeof AntDesign.glyphMap, string>;
type RootStackParamList = {
	Form: undefined;
	//add more screens here
};

export default function CircularButton(props: ICircularButtonProps) {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const openWindow = () => {
		navigation.navigate(props.window);
	};
	return (
		<TouchableOpacity style={props.styles} onPress={openWindow}>
			<AntDesign name={props.icon} size={24} color='white' />
		</TouchableOpacity>
	);
}
