import axios from "axios";
import cheerio from "cheerio";
import parsePriceStr from "./helpers/parsePriceStr.js";

const fetchBookList = async (keyword = "") => {
  // get search result from Book Depository (searchLang: English, format: softback, availability: in stock)
  const url = `https://www.bookdepository.com/search?searchTerm=${encodeURI(
    keyword
  )}&searchLang=123&format=1&availability=1`;
  const res = await axios.get(url);
  return extractBookListFromHTML(res.data);
};

const extractBookListFromHTML = (html) => {
  const $ = cheerio.load(html);
  const booksData = [];
  $(".book-item").each((index, ele) => {
    const name = $(ele).find("meta[itemprop=name]").attr("content");
    const isbn = $(ele).find("meta[itemprop=isbn]").attr("content");
    const imgPath = $(ele).find(".item-img img").attr("src");
    const url = $(ele).find(".item-img a").attr("href");
    const author = $(ele).find(".author").text().trim();
    const fullStar = $(ele).find(".stars .star.full-star").toArray().length;
    const halfStar = $(ele).find(".stars .star.half-star").toArray().length;
    const rating = fullStar + 0.5 * halfStar;
    const datePublished = $(ele).find(".published").text().trim();
    const priceStr = $(ele).find(".price").text().trim();
    const [currency, price] = parsePriceStr(priceStr);

    const bookData = { name, isbn, imgPath, url, author, rating, datePublished, currency, price };
    booksData.push(bookData);
  });

  return booksData;
};

export default fetchBookList;
