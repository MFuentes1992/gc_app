import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHouseManagement } from "@gcMobile/screens/HouseScreen/conts";
import { HousesSlice } from "./types";

const initialState: HousesSlice = {
	houses: [],
	currentHouseId: 0,
	currentHouseInstalacion: "",
	currentHouseManzana: "",
};

const houseSlice = createSlice({
	name: "house",
	initialState,
	reducers: {
		setHouse: (state, action: PayloadAction<IHouseManagement[]>) => {
			state.houses = action.payload;
		},
		setCurrentHouseInfo: (
			state,
			action: PayloadAction<{
				currentHouseId: number;
				currentHouseInstalacion: string;
				currentHouseManzana: string;
			}>
		) => {
			state.currentHouseId = action.payload.currentHouseId;
			state.currentHouseInstalacion = action.payload.currentHouseInstalacion;
			state.currentHouseManzana = action.payload.currentHouseManzana;
		},
	},
});

export const { setHouse, setCurrentHouseInfo } = houseSlice.actions;
export default houseSlice.reducer;