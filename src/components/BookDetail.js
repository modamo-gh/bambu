import React from "react";
import { StyleSheet, Text, View } from "react-native";

const BookDetails = ({ label, data }) => {
	return (
		<View style={styles.detail}>
			<Text style={styles.label}>{label}</Text>
			<Text>{data}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	detail: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		borderColor: "black",
		borderWidth: 1
	},
	label: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center"
	}
});

export default BookDetails;
