import React from "react";
import LottieView from "lottie-react-native";

const SplashScreen = ({setIsSplashFinished}) => {
	return (
		<LottieView
			source={require("../../assets/splash.json")}
			style={{
				backgroundColor: "#FEFAE0",
				flex: 1,
				height: "100%",
				width: "100%",
			}}
			autoPlay
			loop={false}
      onAnimationFinish={() => setIsSplashFinished(true)}
		/>
	);
};

export default SplashScreen;
