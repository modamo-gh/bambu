import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const ActionButton = ({ buttonStyle, onPress, text}) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={buttonStyle}
		>
			<Text style={styles.textStyle}>{text}</Text>
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
