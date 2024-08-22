class Book {
	constructor(date) {
		this.amazonRating = -Infinity;
		this.author;
		this.averageRating;
		this.dateAdded = date;
		this.eph;
		this.goodreadsRating = -Infinity;
		this.imageURL;
		this.normalizedRating;
		this.numberOfPages;
		this.timeToReadInMinutes;
		this.title;
	}

	getAmazonRating() {
		return this.amazonRating;
	}

	setAmazonRating(amazonRating) {
		this.amazonRating = amazonRating;
	}

	getAuthor() {
		return this.author;
	}

	setAuthor(author) {
		this.author = author;
	}

	calculateAverageRating() {
		this.averageRating = (
			(this.amazonRating + this.goodreadsRating) /
			2
		).toFixed(3);
	}

	getAverageRating() {
		return this.averageRating;
	}

	getDateAdded() {
		return this.dateAdded;
	}

	setDateAdded(date) {
		this.dateAdded = date;
	}

	getImageURL() {
		return this.imageURL;
	}

	setImageURL(imageURL) {
		this.imageURL = imageURL;
	}

	getNumberOfPages() {
		return this.numberOfPages;
	}

	setNumberOfPages(numberOfPages) {
		this.numberOfPages = numberOfPages;
	}

	calculateTimeToReadInMinutes() {
		(this.numberOfPages * 275) / 250;
	}

	getTimeToReadInMinutes() {
		return this.timeToReadInMinutes;
	}

	getTitle() {
		return this.title;
	}

	setTitle(title) {
		this.title = title;
	}
}
