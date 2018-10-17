
import { StyleSheet } from "react-native";
// import { Constants } from "expo";

module.exports = StyleSheet.create({
    blockContainer: {
      width: "100%",
      backgroundColor: "blue",
      flexDirection: "row",
      flexWrap: "wrap"
    },
    block: {
      width: 65,
      height: 65,
      borderColor: "red",
      backgroundColor: "green",
      borderWidth: 1
    },
    selected: {
        backgroundColor: "yellow"
    }
  });
  