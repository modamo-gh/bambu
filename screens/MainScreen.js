import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

const MainScreen = () => {
	const [title, setTitle] = useState("");
	const [books, setBooks] = useState([]);

	return (
		<View style={styles.inputAndButtonContainerStyle}>
			<TextInput
				autoCapitalize="words"
				onChangeText={(newTitle) => setTitle(newTitle)}
				style={styles.textInputStyle}
				value={title}
			/>
			<TouchableOpacity
				onPress={() => {
					setBooks([...books, { title: title }]);
				}}
				style={styles.addBooksButtonStyle}
			></TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	addBooksButtonStyle: {
		alignItems: "center",
		backgroundColor: "green",
		borderRadius: 50,
		height: 48,
		justifyContent: "center",
		width: 48
	},
	inputAndButtonContainerStyle: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 8
	},
	textInputStyle: {
		borderBlockColor: "black",
		borderRadius: 5,
		borderWidth: 2,
		flex: 1,
		fontSize: 18,
		height: 48,
		marginHorizontal: 8,
		paddingHorizontal: 8
	}
});

export default MainScreen;
