import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { scrapeBookData, scrapeSearchResults } from "../services/dataFetcher";
import ActionButton from "./ActionButton";

const Search = ({
  books,
  getBooksWithEPH,
  getBooksWithNormalizedAverageRatings,
  setBooks,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const addBook = async (url) => {
    setSearchResults([]);
    const date = new Date();
    setIsLoading(true);
    let book = await scrapeBookData(url);
    setIsLoading(false);
    book.dateAdded = date.getTime();
    book.averageRating = (
      (book.amazonRating + book.goodreadsRating) /
      2
    ).toFixed(3);
    book.timeToReadInMinutes = (book.numberOfPages * 275) / 250;

    let updatedBooks = [...books, book];

    updatedBooks = getBooksWithNormalizedAverageRatings(updatedBooks);
    updatedBooks = getBooksWithEPH(updatedBooks);
    setBooks(updatedBooks);

    try {
      await AsyncStorage.setItem("books", JSON.stringify(updatedBooks));
      setBooks(updatedBooks);
      setSearchTerm("");
    } catch (error) {
      console.error("Something went wrong saving the book:", error);
    }
  };

  const getSearchResults = async (searchTerm) => {
    setIsLoading(true);
    const results = await scrapeSearchResults(searchTerm);
    setIsLoading(false);
    setSearchResults(results);
  };

  return (
    <View style={styles.inputAndButtonContainerStyle}>
      <View
        style={{
          flex: 1,
          zIndex: 1,
        }}
      >
        <TextInput
          autoCapitalize="words"
          onChangeText={(newSearchTerm) => setSearchTerm(newSearchTerm)}
          onEndEditing={() => {
            getSearchResults(searchTerm);
          }}
          placeholder="Enter Book Title"
          placeholderTextColor="#DDA15E"
          style={styles.textInputStyle}
          value={searchTerm}
        />
        {searchTerm.length && searchResults.length ? (
          <FlatList
            data={searchResults}
            contentContainerStyle={{
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              borderColor: "black",
              borderTopColor: "transparent",
              borderWidth: 1,
              marginHorizontal: 8,
              height: 200,
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.searchResultsStyle}
                onPress={() => {
                  addBook(item.url);
                }}
              >
                <Text>{item.title}</Text>
              </TouchableOpacity>
            )}
          ></FlatList>
        ) : null}
      </View>
      <ActionButton
        buttonStyle={styles.addBooksButtonStyle}
        iconName="search"
        isLoading={isLoading}
        onPress={() => {
          if (searchTerm.length) {
            getSearchResults(searchTerm);
          }
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
    width: 48,
  },
  inputAndButtonContainerStyle: {
    flexDirection: "row",
    padding: 8,
  },
  searchResultsStyle: {
    borderWidth: 1,
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "black",
  },
  textInputStyle: {
    borderColor: "#606C38",
    borderRadius: 5,
    borderWidth: 2,
    color: "#283618",
    fontSize: 18,
    height: 48,
    marginHorizontal: 8,
    paddingHorizontal: 8,
  },
});

export default Search;
