import axios from "axios";
import cheerio from "cheerio";
import parsePriceStr from "../helpers/parsePriceStr.js";

const fetchBook = async (isbn) => {
  const url = `https://www.bookdepository.com/search?searchTerm=${isbn}&search=Find+book`;

  const res = await axios.get(url);

  return extractBookDataFromHTML(res.data);
};

const extractBookDataFromHTML = (html) => {
  const $ = cheerio.load(html);
  const name = $("h1[itemprop=name]").text();
  if (!name) {
    return {};
  }
  const isbn = $("[itemprop=isbn]").text();
  const imgPath = $("[itemprop=image]").attr("src");
  const url = "https://bookdepository.com" + $("[itemprop=url]").attr("content");
  const author = $("[itemprop=author]").attr("itemscope");
  const excerptEle = $(".item-excerpt");
  excerptEle.find("a").remove();
  const excerpt = excerptEle.text().trim();
  const ratingContainer = $(".rating-wrap")[0];
  const fullStar = $(ratingContainer).find(".stars .star.full-star").toArray().length;
  const halfStar = $(ratingContainer).find(".stars .star.half-star").toArray().length;
  const rating = fullStar + 0.5 * halfStar;
  const datePublished = $("[itemprop=datePublished]").text();
  const publisher = $("[itemprop=publisher]").attr("itemscope");
  const priceStr = $(".sale-price").text();

  const [currency, price] = parsePriceStr(priceStr);

  const isbnRecommendationBooksEle = $(".isbn-recommendation-carousel").find(".book-item");
  const isbnRecommendationBooks = getRecommendedBookList($, isbnRecommendationBooksEle);

  const categoryRecommendationBooksEle = $(".category-recommendation-carousel").find(".book-item");
  const categoryRecommendationBooks = getRecommendedBookList($, categoryRecommendationBooksEle);

  return {
    name,
    isbn,
    imgPath,
    url,
    author,
    excerpt,
    rating,
    datePublished,
    publisher,
    currency,
    price,
    isbnRecommendationBooks,
    categoryRecommendationBooks,
  };
};

const getRecommendedBookList = ($, bookListEle) => {
  const bookList = [];
  bookListEle.each((idx, ele) => {
    const name = $(ele).find(".title").text().trim();
    const isbn = $(ele).find("[data-isbn]").attr("data-isbn");
    const imgPath = $(ele).find(".item-img img").attr("data-lazy");
    const author = $(ele).find(".author").text().trim();
    const fullStar = $(ele).find(".stars .star.full-star").toArray().length;
    const halfStar = $(ele).find(".stars .star.half-star").toArray().length;
    const rating = fullStar + 0.5 * halfStar;
    const datePublished = $(ele).find(".published").text().trim();
    const priceStr = $(ele).find(".price").text().trim();
    const [currency, price] = parsePriceStr(priceStr);
    bookList.push({ name, isbn, imgPath, author, rating, datePublished, currency, price });
  });
  return bookList;
};

export default fetchBook;
