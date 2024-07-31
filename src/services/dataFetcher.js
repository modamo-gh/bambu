import axios from "axios";
import * as cheerio from "cheerio";

export const scrapeSearchResults = async (searchTerm) => {
	const baseURL = "https://www.goodreads.com";

	try {
		const response = await axios.get(
			`${baseURL}//search?utf8=✓&query=${searchTerm}`
		);
		const html = response.data;
		const $ = cheerio.load(html);

		let results = $("tr[itemtype='http://schema.org/Book']").toArray();

		results = results.map((element) => {
			return {
				title: $(element).find(".bookTitle").text(),
				url: `${baseURL}${$(element).find(".bookTitle").attr("href")}`
			};
		});

		return results;
	} catch (error) {
		console.error("Error getting search results", error);
	}
};

export const scrapeBookData = async (url) => {
	try {
		const response = await axios.get(url);
		const html = response.data;
		const $ = cheerio.load(html);

		const firstBook = $("tr[itemtype='http://schema.org/Book']").first();

		try {
			const bookResponse = await axios.get(url);
			const book_html = bookResponse.data;

			const book_$ = cheerio.load(book_html);

			const bookJSON = JSON.parse(
				book_$("[type='application/ld+json']").text()
			);

			const title = bookJSON.name;
			const imageURL = bookJSON.image;
			const numberOfPages = bookJSON.numberOfPages;
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
				const amazonRating = parseFloat(
					amazon_$(".a-size-base.a-color-base").text()
				);

				return {
					amazonRating,
					goodreadsRating,
					imageURL,
					numberOfPages,
					title
				};
			} catch (error) {
				console.error("Error scraping Amazon book data:", error);
			}
		} catch (error) {
			console.error("Error scraping book data:", error);
		}
	} catch (error) {
		console.error("Error scraping data:", error);
	}
};
