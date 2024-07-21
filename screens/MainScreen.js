import React, { useState } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";

const MainScreen = () => {
	const [title, setTitle] = useState("");
	const [books, setBooks] = useState([]);

	return (
		<View style={styles.screenContainerStyle}>
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
			<FlatList
				data={books}
				renderItem={({ item }) => {
					return (
						<View style={styles.books}>
							<Text>{item.title}</Text>
						</View>
					);
				}}
			/>
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
	books: {
		backgroundColor: "rgb(234, 219, 203)",
		borderRadius: 5,
		fontSize: 18,
		margin: 8,
		padding: 16
	},
	inputAndButtonContainerStyle: {
		flexDirection: "row",
		padding: 8
	},
	screenContainerStyle: { flex: 1 },
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
