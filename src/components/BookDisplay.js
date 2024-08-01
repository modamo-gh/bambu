import { useActionSheet } from "@expo/react-native-action-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import ActionButton from "./ActionButton";

const BookDisplay = ({
	books,
	getBooksWithEPH,
	getBooksWithNormalizedAverageRatings,
	navigation,
	setBooks
}) => {
	const [containerHeight, setContainerHeight] = useState(0);
	const [isListLayout, setIsListLayout] = useState(true);
	const [numColumns, setNumColumns] = useState(1);

	const { showActionSheetWithOptions } = useActionSheet();

	const deleteBook = async (bookToDelete) => {
		let updatedBooks = [
			...books.filter((book) => book.title !== bookToDelete.title)
		];

		updatedBooks = getBooksWithNormalizedAverageRatings(updatedBooks);
		updatedBooks = getBooksWithEPH(updatedBooks);

		try {
			await AsyncStorage.setItem("books", JSON.stringify(updatedBooks));
			setBooks(updatedBooks);
		} catch (error) {
			console.error("Something went wrong deleting the book:", error);
		}
	};

	const onLayout = (event) => {
		const { height } = event.nativeEvent.layout;
		setContainerHeight(height);
	};

	const onLayoutPress = () => {
		setIsListLayout(!isListLayout);

		if (numColumns === 1) {
			setNumColumns(2);
		} else {
			setNumColumns(1);
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
		<View style={{ flex: 1 }}>
			{books.length ? (
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between"
					}}
				>
					<ActionButton
						buttonStyle={styles.layoutButtonStyle}
						onPress={onLayoutPress}
						text="Layout"
					/>

					<ActionButton
						buttonStyle={styles.sortButtonStyle}
						onPress={onSortPress}
						text="Sort"
					/>
				</View>
			) : null}
			{isListLayout ? (
				<FlatList
					data={books}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity
								style={styles.listBooks}
								onPress={() =>
									navigation.navigate("Book", { book: item })
								}
							>
								<Text
									ellipsizeMode="tail"
									numberOfLines={1}
									style={styles.bookText}
								>
									{item.title}
								</Text>
								<ActionButton
									buttonStyle={styles.deleteBooksButtonStyle}
									onPress={() => deleteBook(item)}
									text="X"
								/>
							</TouchableOpacity>
						);
					}}
				/>
			) : (
				<View
					onLayout={onLayout}
					style={{ flex: 1 }}
				>
					<FlatList
						data={books}
						key={numColumns}
						numColumns={numColumns}
						renderItem={({ item }) => {
							return (
								<TouchableOpacity
									style={[
										styles.gridBooks,
										{ height: containerHeight / 2 }
									]}
									onPress={() =>
										navigation.navigate("Book", {
											book: item
										})
									}
								>
									<Image
										source={{ uri: item.imageURL }}
										style={styles.gridImage}
									/>
								</TouchableOpacity>
							);
						}}
					/>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	bookText: {
		color: "#283618",
		fontSize: 16,
		maxWidth: "80%",
		padding: 8
	},
	deleteBooksButtonStyle: {
		alignItems: "center",
		backgroundColor: "#BC4749",
		borderRadius: 5,
		height: "100%",
		justifyContent: "center",
		width: 48
	},
	gridBooks: {
		borderRadius: 20,
		flexBasis: "50%",
		padding: 15
	},
	gridImage: {
		borderRadius: 20,
		height: "100%",
		objectFit: "fill",
		overflow: "hidden"
	},
	layoutButtonStyle: {
		alignSelf: "flex-end",
		backgroundColor: "#606C38",
		borderRadius: 5,
		height: 48,
		justifyContent: "center",
		marginHorizontal: 8,
		width: 80
	},
	listBooks: {
		alignItems: "center",
		backgroundColor: "#DDA15E",
		borderRadius: 5,
		flexDirection: "row",
		fontSize: 18,
		height: 48,
		justifyContent: "space-between",
		margin: 8
	},
	sortButtonStyle: {
		alignSelf: "flex-end",
		backgroundColor: "#606C38",
		borderRadius: 5,
		height: 48,
		justifyContent: "center",
		marginHorizontal: 8,
		width: 60
	}
});

export default BookDisplay;
