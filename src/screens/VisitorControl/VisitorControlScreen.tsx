import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Filter from "@gcMobile/components/Filter";
import Card from "@gcMobile/components/Card";
import CircularButton from "@gcMobile/components/CircularButton";
import { circularBtnStyles } from "@gcMobile/components/CircularButton/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { TipoVisita } from "@gcMobile/store/TipoVisitas/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@gcMobile/store";
import { getVisistaByFilter, getVisitas } from "@gcMobile/store/Visitas/api";
import { setVisitas } from "@gcMobile/store/Visitas";

type VisitorControlScreenProps = {
	navigation: any;
	filters: TipoVisita[];
};

export default function VisitorControlScreen({
	navigation,
	filters,
}: VisitorControlScreenProps) {
	const dispatch = useDispatch();
	const { email } = useSelector((state: RootState) => state.userReducer);
	const { visitas } = useSelector((state: RootState) => state.visitasReducer);
	const { newVisistaQR } = useSelector(
		(state: RootState) => state.visitasReducer
	);
	const { currentHouseId } = useSelector(
		(state: RootState) => state.houseReducer
	);
	const [selectedFilters, setFilters] = useState<string[]>([]);

	useEffect(() => {
		if (visitas.length === 0) {
			dispatch(getVisitas(email, currentHouseId) as any);
		}
		return () => {
			dispatch(setVisitas([]));
		};
	}, []);

	useEffect(() => {
		if (selectedFilters.length > 0) {
			dispatch(
				getVisistaByFilter(email, currentHouseId, selectedFilters) as any
			);
		} else {
			dispatch(getVisitas(email, currentHouseId) as any);
		}
	}, [selectedFilters, newVisistaQR, currentHouseId]);
	return (
		<View style={{ flex: 1, flexDirection: "column" }}>
			<View style={{ flex: 0.1 }}>
				<Filter
					filters={filters}
					handleFilters={(filterArr: string[]) => setFilters(filterArr)}
				/>
			</View>
			<View
				style={{
					flex: 0.1,
					flexDirection: "row-reverse",
				}}>
				<CircularButton
					styles={circularBtnStyles.container}
					window={"Form"}
					icon='plus'
				/>
			</View>
			<SafeAreaView
				style={{
					flex: 1,
					alignItems: "center",
					width: "100%",
				}}>
				<ScrollView style={{ flex: 1, marginHorizontal: 20, width: "95%" }}>
					{visitas.map((data: any, index: number) => (
						<Card {...data} key={data?.uniqueID} index={index} />
					))}
				</ScrollView>
			</SafeAreaView>
		</View>
	);
}
