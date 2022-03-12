import axios from "axios";
import cheerio from "cheerio";
import parsePriceStr from "../helpers/parsePriceStr.js";

const fetchBook = async (isbn) => {
  const url = `https://www.elephants.com.hk/Printed/${isbn}`;

  const res = await axios.get(url);

  return extractBookDataFromHTML(res.data);
};

const extractBookDataFromHTML = (html) => {
  const $ = cheerio.load(html);
  const name = $(
    "#layout-body > div > div > div > div > div > div > div.col > div.card.rounded-0.shadow-sm.mb-3 > div > div.media > div.media-body.ml-4 > h5.text-strong.my-1"
  )
    .text()
    .trim();
  const isbn = $(
    "#layout-body > div > div > div > div > div > div > div.col > div.card.rounded-0.shadow-sm.mb-3 > div > div.mb-3 > div > div.col > dl:nth-child(2) > dd"
  )
    .text()
    .trim();
  const imgPath = $(
    "#layout-body > div > div > div > div > div > div > div.col > div.card.rounded-0.shadow-sm.mb-3 > div > div.media > div.image > img"
  ).attr("src");
  const url = `https://www.elephants.com.hk/Printed/${isbn}`;
  const excerpt = $(
    "#layout-body > div > div > div > div > div > div > div.col > div.card.rounded-0.shadow-sm.mb-3 > div > div.media > div.media-body.ml-4 > p"
  )
    .text()
    .trim();
  const priceStr = $(".text-price").text().trim().replaceAll(" ", "");
  const [currency, price] = parsePriceStr(priceStr);
  const datePublished = $(
    "#layout-body > div > div > div > div > div > div > div.col > div.card.rounded-0.shadow-sm.mb-3 > div > div.mb-3 > div > div.col-6 > dl:nth-child(3) > dd"
  )
    .text()
    .trim();

  return {
    name,
    isbn,
    imgPath,
    url,
    excerpt,
    datePublished,
    currency,
    price,
  };
};

export default fetchBook;
