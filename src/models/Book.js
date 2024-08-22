class Book {
	constructor() {
		this.amazonRating;
		this.averageRating;
		this.dateAdded;
		this.eph;
		this.goodreadsRating;
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

	getAverageRating() {
		return this.averageRating;
	}

	calculateAverageRating() {
		this.averageRating = (
			(this.amazonRating + this.goodreadsRating) /
			2
		).toFixed(3);
	}

	getDateAdded() {
		return this.dateAdded;
	}

	setDateAdded(date) {
		this.dateAdded = date;
	}
}
