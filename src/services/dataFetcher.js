import axios from "axios";
import * as cheerio from "cheerio";

export const scrapeSearchResults = async (searchTerm) => {
  const baseURL = "https://www.goodreads.com";

  try {
    const response = await axios.get(
      `${baseURL}//search?utf8=✓&query=${searchTerm}`,
    );
    const html = response.data;
    const $ = cheerio.load(html);

    let results = $("tr[itemtype='http://schema.org/Book']").toArray();

    results = results.map((element) => {
      return {
        title: $(element).find(".bookTitle").text(),
        url: `${baseURL}${$(element).find(".bookTitle").attr("href")}`,
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
        book_$("[type='application/ld+json']").text(),
      );

      const title = bookJSON.name;
      const imageURL = bookJSON.image;
      const numberOfPages = bookJSON.numberOfPages;
      const goodreadsRating = bookJSON.aggregateRating.ratingValue;
      const author = bookJSON.author[0].name;

      try {
        const symbollessTitle = title.replace(/[^a-zA-Z0-9\s]/g, "+");
        const searchTerm = `${symbollessTitle} ${author} hardcover`.replace(
          /\s+/g,
          "+",
        );
        const amazonResponse = await axios.get(
          `https://www.amazon.com/s?k=${searchTerm}`,
        );
        const amazonHTML = amazonResponse.data;

        const amazon_$ = cheerio.load(amazonHTML);

        const amazonResult = amazon_$(
          "a.a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal",
        )
          .first()
          .attr("href");

        try {
          const amazonBookResponse = await axios.get(
            `https://www.amazon.com${amazonResult}`,
          );
          const amazonBookHTML = amazonBookResponse.data;

          const amazonBook_$ = cheerio.load(amazonBookHTML);
          const amazonRating = parseFloat(
            amazonBook_$("[data-hook='rating-out-of-text']")
              .text()
              .split(" ")[0],
          );

          return {
            amazonRating,
            goodreadsRating,
            imageURL,
            numberOfPages,
            title,
          };
        } catch (error) {
          console.error("Error scraping Amazon book data:", error);
        }
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
