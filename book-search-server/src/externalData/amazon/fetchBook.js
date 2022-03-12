import axios from "axios";
import cheerio from "cheerio";
import parsePriceStr from "../helpers/parsePriceStr.js";

const fetchBook = async (isbn) => {
  const url = `https://www.amazon.com/s?k=${isbn}&i=stripbooks&language=en_US&crid=16LS9HIXTSUP4&sprefix=9780802412706%2Caps%2C245&ref=nb_sb_noss`;

  const res = await axios.get(url);
  const html = res.data;
  const $ = cheerio.load(html);
  const itemPageUrl = $("[data-component-type=s-search-result]").find(".a-link-normal").attr("href");
  const fullItemPageUrl = `https://www.amazon.com${itemPageUrl}`;
  const res2 = await axios.get(fullItemPageUrl, {
    headers: {
      Cookie: "i18n-prefs=HKD;",
    },
  });
  return { ...extractBookDataFromHTML(res2.data), url: fullItemPageUrl };
};

const extractBookDataFromHTML = (html) => {
  const $ = cheerio.load(html);
  const name = $("#productTitle").text().trim();
  const isbn = $("#detailBullets_feature_div > ul > li:nth-child(5) > span > span:nth-child(2)").text().trim();
  const imgPath = $("#img-wrapper").find("img").attr("src");
  const author = $(".author").find(".contributorNameID").text().trim();
  const excerpt = $("[data-a-expander-name=book_description_expander] > div").text().trim();

  const priceStr = $(".swatchElement")
    .filter(function () {
      return $(this).find(".a-button-text > span").first().text() === "Paperback";
    })
    .first()
    .find(".a-color-price")
    .text()
    .trim()
    .replaceAll(" ", "");
  const [currency, price] = parsePriceStr(priceStr);

  return {
    name,
    isbn,
    imgPath,
    author,
    excerpt,
    currency,
    price,
  };
};
export default fetchBook;
