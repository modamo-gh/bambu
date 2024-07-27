import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { BallIndicator } from "react-native-indicators";

const ActionButton = ({ buttonStyle, isLoading, onPress, text }) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={buttonStyle}
		>
			{isLoading ? (
				<BallIndicator
					color="#FEFAE0"
					size={24}
				/>
			) : (
				<Text style={styles.textStyle}>{text}</Text>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	textStyle: {
		color: "#FEFAE0",
		fontSize: 24,
		textAlign: "center"
	}
});

export default ActionButton;
