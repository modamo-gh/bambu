import axios from "axios";
import * as cheerio from "cheerio";

export const scrapeGoodreads = async (term) => {
	const baseURL = "https://www.goodreads.com";

	try {
		const response = await axios.get(
			`${baseURL}/search?utf8=%E2%9C%93&q=${term}&search_type=books`
		);
		const html = response.data;
		const $ = cheerio.load(html);

		const firstBook = $("tr[itemtype='http://schema.org/Book']").first();
		const url = firstBook.find(".bookTitle").attr("href");
		try {
			const bookResponse = await axios.get(`${baseURL}${url}`);
			const book_html = bookResponse.data;

			const book_$ = cheerio.load(book_html);

			const bookJSON = JSON.parse(
				book_$("[type='application/ld+json']").text()
			);

			const title = bookJSON.name;
			const imageURL = bookJSON.image;
			const numberOfPages = bookJSON.numberOfPages;
			const isbn = bookJSON.isbn;
			const goodreadsRating = bookJSON.aggregateRating.ratingValue;

			const scriptJSON = JSON.parse(book_$("#__NEXT_DATA__").text());

			const apolloState = scriptJSON.props.pageProps.apolloState;
			let amazonKindleURL;
			for (const key in apolloState) {
				if (key.startsWith("Book:kca")) {
					amazonKindleURL =
						apolloState[key]["links({})"].primaryAffiliateLink.url;
					break;
				}
			}

			try {
				const amazonResponse = await axios.get(amazonKindleURL);
				const amazonHTML = amazonResponse.data;

				const amazon_$ = cheerio.load(amazonHTML);
				const amazonRating = parseFloat(amazon_$(".a-size-base.a-color-base").text());

                return {title, imageURL, numberOfPages, isbn, goodreadsRating, amazonRating}
			} catch (error) {
				console.error("Error scraping Amazon book data:", error)
			}
		} catch (error) {
			console.error("Error scraping book data:", error);
		}
	} catch (error) {
		console.error("Error scraping data:", error);
	}
};