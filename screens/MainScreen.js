import React, { useEffect, useState } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainScreen = () => {
	const [title, setTitle] = useState("");
	const [books, setBooks] = useState([]);

	const getBooks = async () => {
		try {
			const savedBooks = await AsyncStorage.getItem("books");
			if (savedBooks) {
				setBooks(JSON.parse(savedBooks));
			}
		} catch (error) {
			console.error("Something went wrong retrieving books:", error);
		}
	};

	useEffect(() => {
		getBooks();
	}, []);

	const addBook = async () => {
		const date = new Date();
		const newBook = { title: title, dateAdded: date.getTime() };
		const updatedBooks = [...books, newBook];

		try {
			await AsyncStorage.setItem("books", JSON.stringify(updatedBooks));
			setBooks(updatedBooks);
			setTitle("");
		} catch (error) {
			console.error("Something went wrong saving the book:", error);
		}
	};

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
					onPress={addBook}
					style={styles.addBooksButtonStyle}
				>
					<Text style={styles.buttonTextStyle}>+</Text>
				</TouchableOpacity>
			</View>
			{books.length ? (
				<TouchableOpacity style={styles.sortButtonStyle}>
					<Text style={styles.buttonTextStyle}>Sort</Text>
				</TouchableOpacity>
			) : null}
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
		height: 48,
		justifyContent: "center"
	},
	bookText: { color: "#283618", padding: 8 },
	buttonTextStyle: {
		color: "#FEFAE0",
		fontSize: 24,
		textAlign: "center"
	},
	inputAndButtonContainerStyle: {
		flexDirection: "row",
		padding: 8
	},
	screenContainerStyle: { flex: 1, backgroundColor: "#FEFAE0" },
	sortButtonStyle: {
		backgroundColor: "#606C38",
		height: 48,
		width: 60,
		justifyContent: "center",
		borderRadius: 5,
		alignSelf: "flex-end",
		marginHorizontal: 8
	},
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
