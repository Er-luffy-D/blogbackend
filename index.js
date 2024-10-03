const cheerio = require("cheerio");
const axios = require("axios");

async function scrapeArxiv() {
  try {
    // Fetch the HTML content of the page
    const { data: html } = await axios.get(
      "https://arxiv.org/search/?query=hardware&searchtype=all&source=header",
    );

    // Load the HTML into Cheerio
    const $ = cheerio.load(html);

    const data = [];
    // Iterate over each element that contains the article information
    $(".arxiv-result").each(function (index, element) {
      // Added index parameter
      const title = $(element).find(".title").text().trim(); // Adjusted selector to match arXiv's HTML structure

      const text = $("p.is-size-7").text().trim();

      const dateRegex = /(\d{1,2} [A-Za-z]+, \d{4})/;
      const match = text.match(dateRegex);

      const abstract = $(element).find(".abstract-full").text().trim();

      // Clean up the abstract
      const cleanedAbstract =
        abstract.replace(" △ Less", "") || "No abstract available"; // Handle cases where abstract may not be present

      data.push({
        title: title,
        published: match[0], // Store the cleaned published date
        abstract: cleanedAbstract,
      });
    });

    return data; // Return the scraped data
  } catch (error) {
    console.error("Error scraping Arxiv:", error);
  }
}

module.exports = { scrapeArxiv };
