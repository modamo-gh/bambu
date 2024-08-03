import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";

const SplashScreen = () => {
  return;
  <View style={styles.container}>
    <LottieView source={"../../assets/animation_1.json"} autoPlay loop />
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
