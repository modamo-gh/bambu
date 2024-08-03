import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <LottieView
        resizeMode="cover"
        autoPlay={true}
        loop={true}
        source={require("../../assets/splash.json")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    width: 200,
  },
});

export default SplashScreen;
