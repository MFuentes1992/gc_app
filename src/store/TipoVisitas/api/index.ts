import { base_url } from "@gcMobile/components/Auth/constants";
import { ENDPOINTS } from "@gcMobile/util/urls";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { setTipoVisita } from "..";
import { TipoVisita } from "../types";
import fakeApi from "./fakeApi.json";

export const getCatalogTipoVisitas = () => (dispatch: any) => {
	const url = `${base_url}${ENDPOINTS.CATALOG_TIPO_VISITAS}`;
	fetch(url)
		.then((response: any) => {
			response
				.json()
				.then((data: TipoVisita[]) => {
					console.log("data", data);
					dispatch(setTipoVisita(fakeApi));
				})
				.catch((error: any) => {
					Toast.show({
						type: ALERT_TYPE.DANGER,
						title: "Error",
						textBody: `${error}`,
					});
				});
		})
		.catch((error) => {
			Toast.show({
				type: ALERT_TYPE.DANGER,
				title: "Error",
				textBody: `${error}`,
			});
		});
};
