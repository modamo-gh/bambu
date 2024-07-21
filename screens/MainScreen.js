import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

const MainScreen = () => {
	const [title, setTitle] = useState("");

	return (
		<TextInput
			autoCapitalize="words"
			onChangeText={(newTitle) => setTitle(newTitle)}
			style={styles.textInputStyle}
			value={title}
		></TextInput>
	);
};

const styles = StyleSheet.create({
	textInputStyle: {
		borderBlockColor: "black",
		borderRadius: 5,
		borderWidth: 2,
		fontSize: 18,
		height: 48,
		paddingHorizontal: 8
	}
});

export default MainScreen;
