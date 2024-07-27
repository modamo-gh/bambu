import React from "react";
import { Image, StyleSheet, View } from "react-native";
import BookDetails from "../components/BookDetail";
import { Col, Row, Grid } from "react-native-easy-grid";

const BookScreen = ({ route }) => {
	const { book } = route.params;

	return (
		<View style={styles.container}>
			<Image
				source={{ uri: book.imageURL }}
				style={styles.image}
			/>
			<Grid style={styles.details}>
				<Row>
					<Col>
						<BookDetails
							data={book.title}
							label="Title"
						/>
					</Col>
					<Col>
						<BookDetails
							data={new Date(book.dateAdded).toLocaleDateString()}
							label="Date Added"
						/>
					</Col>
					<Col>
						<BookDetails
							data={book.numberOfPages}
							label="Number of Pages"
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<BookDetails
							data={book.amazonRating}
							label="Amazon Rating"
						/>
					</Col>
					<Col>
						<BookDetails
							data={book.goodreadsRating}
							label="Goodreads Rating"
						/>
					</Col>
					<Col>
						<BookDetails
							data={book.averageRating}
							label="Average Rating"
						/>
					</Col>
				</Row>
				{book.normalizedAverageRating && book.eph ? (
					<Row>
						<Col>
							<BookDetails
								data={`${Math.floor(
									book.timeToReadInMinutes / 60
								)}hrs ${Math.floor(
									book.timeToReadInMinutes % 60
								)}mins`}
								label="Time to Read"
							/>
						</Col>
						<Col>
							<BookDetails
								data={book.normalizedAverageRating}
								label="Normalized Rating"
							/>
						</Col>
						<Col>
							<BookDetails
								data={book.eph}
								label="eph"
							/>
						</Col>
					</Row>
				) : (
					<Row>
						<Col>
							<BookDetails
								data={`${Math.floor(
									book.timeToReadInMinutes / 60
								)}hrs ${Math.floor(
									book.timeToReadInMinutes % 60
								)}mins`}
								label="Time to Read"
							/>
						</Col>
					</Row>
				)}
			</Grid>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { display: "flex", flex: 1 },
	image: {
		flex: 3
	},
	details: { flex: 1 }
});

export default BookScreen;
