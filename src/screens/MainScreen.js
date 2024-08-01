import { useActionSheet } from "@expo/react-native-action-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import BookDisplay from "../components/BookDisplay";
import Search from "../components/Search";

const MainScreen = ({ navigation }) => {
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

	const getBooksWithEPH = (books) => {
		let booksWithEPH;

		books.length > 1
			? (booksWithEPH = books.map((book) => ({
					...book,
					timeToReadInMinutes: (book.numberOfPages * 275) / 250,
					eph: (
						book.normalizedAverageRating /
						(book.timeToReadInMinutes / 60)
					).toFixed(2)
			  })))
			: (booksWithEPH = [...books]);

		return booksWithEPH;
	};

	const getBooksWithNormalizedAverageRatings = (books) => {
		const averageRatings = books.map((book) => book.averageRating);
		let lowestRating = Math.min(...averageRatings);
		let highestRating = Math.max(...averageRatings);

		let booksWithNormalizedAverageRatings;

		books.length > 1
			? (booksWithNormalizedAverageRatings = books.map((book) => ({
					...book,
					normalizedAverageRating: (
						(100 * (book.averageRating - lowestRating)) /
						(highestRating - lowestRating)
					).toFixed(2)
			  })))
			: (booksWithNormalizedAverageRatings = [...books]);

		return booksWithNormalizedAverageRatings;
	};

	return (
		<View style={styles.screenContainerStyle}>
			<Search
				books={books}
				getBooksWithEPH={getBooksWithEPH}
				getBooksWithNormalizedAverageRatings={
					getBooksWithNormalizedAverageRatings
				}
				setBooks={setBooks}
			/>
			<BookDisplay
				books={books}
				getBooksWithEPH={getBooksWithEPH}
				getBooksWithNormalizedAverageRatings={
					getBooksWithNormalizedAverageRatings
				}
				navigation={navigation}
				setBooks={setBooks}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screenContainerStyle: { flex: 1, backgroundColor: "#FEFAE0" }
});

export default MainScreen;
