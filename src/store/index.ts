import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userReducer from "./User";
import houseReducer from "./Houses";
import tipoVisitas from "./TipoVisitas";
import visitasReducer from "./Visitas";
import uiReducer from "./UI";
import tipoIngresoReducer from "./TipoIngreso";
import historicoVisitasReducer from "./HistoricVisitas";


const persistConfig = {
	storage: AsyncStorage,
	key: "root",
};
const rootReducer = combineReducers({
	userReducer,
	houseReducer,
	tipoVisitas,
	visitasReducer,
	uiReducer,
	tipoIngresoReducer,
  historicoVisitasReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
