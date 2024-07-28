import React from "react";
import { StyleSheet, Text, View } from "react-native";

const BookDetails = ({ label, data }) => {
	return (
		<View style={styles.detail}>
			<Text style={styles.label}>{label}</Text>
			<Text
				ellipsizeMode="tail"
				numberOfLines={2}
				style={styles.text}
			>
				{data}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	detail: {
		alignItems: "center",
		backgroundColor: "#DDA15E",
		borderColor: "black",
		borderRadius: 5,
		borderWidth: 1,
		flex: 1,
		justifyContent: "center",
		margin: 4
	},
	label: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center"
	},
	text: { textAlign: "center" }
});

export default BookDetails;
