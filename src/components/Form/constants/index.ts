import { StyleSheet } from "react-native";
import { colors } from "@gcMobile/theme/default.styles";

export const formStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lightGray,
  },
  radioButtonsContainer: {
    flexDirection: "row",
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: colors.yellow,
    width: 100,
    height: 100,
    borderRadius: 5,
    marginVertical: 3,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 12,
    borderWidth: 1.8,
    borderColor: colors.yellow,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButton2: {
    height: 20,
    width: 20,
    borderRadius: 12,
    borderWidth: 1.8,
    borderColor: "#edd4a6",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 6,
    backgroundColor: colors.yellow,
  },
  radioBtnPosition: {
    //ajustar al lado derecho
    position: "absolute",
    right: 5,
    top: 5,
  },
  descPosition: {
    //ajustar elementos al centro
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonsContainer2: {
    flexDirection: "row",
    marginHorizontal: 4,
    width: 100,
    height: 100,
    borderRadius: 5,
    marginVertical: 3,
  },
  text2: {
    color: colors.gray,
  },
  text1: {},
  name: {
    fontSize: 18,
    borderBottomWidth: 0.9,
    borderBottomColor: colors.black,
    width: "95%",
  },
  nameContainer: {
    width: "90%",
    height: "5.5%",
    marginTop: "5%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  schedule: {
    marginTop: "5%",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  columnContainer: {
    flexDirection: "column",
    paddingHorizontal: 5,
  },
  date: {
    borderBottomWidth: 0.9,
    borderBottomColor: colors.black,
  },
  accessTypeContainer: {
    marginTop: "5%",
  },
});