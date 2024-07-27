import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useActionSheet } from "@expo/react-native-action-sheet";
import ActionButton from "../components/ActionButton";
import { scrapeBookData } from "../services/dataFetcher";

const MainScreen = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [books, setBooks] = useState([]);

	const { showActionSheetWithOptions } = useActionSheet();

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

	const calculateEPH = () => {
		const mutableBooks = [...books];

		if (books.length > 1) {
			mutableBooks.forEach((book) => {
				book.timeToReadInMinutes = (book.numberOfPages * 275) / 250;
				book.eph =
					book.normalizedAverageRating /
					(book.timeToReadInMinutes / 60);
			});
		}

		setBooks(mutableBooks);
	};

	const normalizeAverageRatings = () => {
		const averageRatings = books.map((book) => book.averageRating);
		let lowestRating = Math.min(...averageRatings);
		let highestRating = Math.max(...averageRatings);

		const mutableBooks = [...books];

		if (books.length > 1) {
			mutableBooks.forEach((book) => {
				book.normalizedAverageRating =
					(100 * (book.averageRating - lowestRating)) /
					(highestRating - lowestRating);
			});
		}

		setBooks(mutableBooks);
	};

	const addBook = async () => {
		const date = new Date();
		const book = await scrapeBookData(searchTerm);
		book.dateAdded = date.getTime();
		book.averageRating = (book.amazonRating + book.goodreadsRating) / 2;

		const updatedBooks = [...books, book];
		setBooks(updatedBooks);

		normalizeAverageRatings();
		calculateEPH();

		try {
			await AsyncStorage.setItem("books", JSON.stringify(updatedBooks));
			setBooks(updatedBooks);
			setSearchTerm("");
		} catch (error) {
			console.error("Something went wrong saving the book:", error);
		}
	};

	const deleteBook = async (bookToDelete) => {
		const updatedBooks = [
			...books.filter((book) => book.title !== bookToDelete.title)
		];

		normalizeAverageRatings();
		calculateEPH();

		try {
			await AsyncStorage.setItem("books", JSON.stringify(updatedBooks));
			setBooks(updatedBooks);
		} catch (error) {
			console.error("Something went wrong deleting the book:", error);
		}
	};

	const onSortPress = () => {
		const options = [
			"A - Z",
			"Z - A",
			"Least to Most Recent",
			"Most to Least Recent",
			"Lowest to Highest EPH",
			"Highest to Lowest EPH",
			"Cancel"
		];
		const cancelButtonIndex = 6;

		showActionSheetWithOptions({ options, cancelButtonIndex }, (index) => {
			switch (index) {
				case 0:
					setBooks([
						...books.sort((a, b) =>
							a.title
								.toLowerCase()
								.localeCompare(b.title.toLowerCase())
						)
					]);
					break;
				case 1:
					setBooks([
						...books.sort((a, b) =>
							b.title
								.toLowerCase()
								.localeCompare(a.title.toLowerCase())
						)
					]);
					break;
				case 2:
					setBooks([
						...books.sort((a, b) => a.dateAdded - b.dateAdded)
					]);
					break;
				case 3:
					setBooks([
						...books.sort((a, b) => b.dateAdded - a.dateAdded)
					]);
					break;
				case 4:
					setBooks([...books.sort((a, b) => a.eph - b.eph)]);
					break;
				case 5:
					setBooks([...books.sort((a, b) => b.eph - a.eph)]);
					break;
				case cancelButtonIndex:
					break;
			}
		});
	};

	return (
		<View style={styles.screenContainerStyle}>
			<View style={styles.inputAndButtonContainerStyle}>
				<TextInput
					autoCapitalize="words"
					onChangeText={(newSearchTerm) =>
						setSearchTerm(newSearchTerm)
					}
					onEndEditing={() => {
						if (searchTerm.length) {
							addBook(searchTerm);
						}
					}}
					placeholder="Enter Book Title"
					placeholderTextColor="#DDA15E"
					style={styles.textInputStyle}
					value={searchTerm}
				/>
				<ActionButton
					buttonStyle={styles.addBooksButtonStyle}
					onPress={() => {
						if (searchTerm.length) {
							addBook(searchTerm);
						}
					}}
					text="+"
				/>
			</View>
			{books.length ? (
				<ActionButton
					buttonStyle={styles.sortButtonStyle}
					onPress={onSortPress}
					text="Sort"
				/>
			) : null}
			<FlatList
				data={books}
				renderItem={({ item }) => {
					return (
						<View style={styles.books}>
							<Text
								style={styles.bookText}
								numberOfLines={1}
								ellipsizeMode="tail"
							>
								{item.title}
							</Text>
							<ActionButton
								buttonStyle={styles.deleteBooksButtonStyle}
								onPress={() => deleteBook(item)}
								text="X"
							/>
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
		alignItems: "center",
		backgroundColor: "#DDA15E",
		borderRadius: 5,
		flexDirection: "row",
		fontSize: 18,
		height: 48,
		justifyContent: "space-between",
		margin: 8
	},
	bookText: {
		color: "#283618",
		padding: 8,
		maxWidth: "80%",
		fontSize: 16
	},
	deleteBooksButtonStyle: {
		alignItems: "center",
		backgroundColor: "#BC4749",
		borderRadius: 5,
		height: "100%",
		justifyContent: "center",
		width: 48
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
