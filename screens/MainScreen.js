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
					placeholder="Enter Book Title"
                    placeholderTextColor="#DDA15E"
					style={styles.textInputStyle}
					value={title}
				/>
				<TouchableOpacity
					onPress={() => {
                        const date = new Date();

						setBooks([...books, { title: title, dateAdded: date.getTime() }]);
						setTitle("");
					}}
					style={styles.addBooksButtonStyle}
				>
					<Text style={styles.plusStyle}>+</Text>
				</TouchableOpacity>
			</View>
			<FlatList
				data={books}
				renderItem={({ item }) => {
					return (
						<View style={styles.books}>
							<Text style={styles.bookText}>{item.title}</Text>
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
		backgroundColor: "#606C38",
		borderRadius: 50,
		height: 48,
		justifyContent: "center",
		width: 48
	},
	books: {
		backgroundColor: "#DDA15E",
		borderRadius: 5,
		fontSize: 18,
		margin: 8,
		padding: 16
	},
	bookText: { color: "#283618" },
	inputAndButtonContainerStyle: {
		flexDirection: "row",
		padding: 8
	},
	plusStyle: {
		color: "#FEFAE0",
		fontSize: 24,
		textAlign: "center"
	},
	screenContainerStyle: { flex: 1, backgroundColor: "#FEFAE0" },
	textInputStyle: {
		borderColor: "#606C38",
		borderRadius: 5,
		borderWidth: 2,
		color: "#283618",
		flex: 1,
		fontSize: 18,
		height: 48,
		marginHorizontal: 8,
		paddingHorizontal: 8
	}
});

export default MainScreen;
