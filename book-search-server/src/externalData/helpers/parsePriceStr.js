import numeral from "numeral";

const parsePriceStr = (priceStr) => {
  if (!priceStr) {
    return [];
  }
  const currency = priceStr.match(/[a-zA-Z$]+/g)[0];
  const price = numeral(priceStr.match(/[0-9,.]+/g)[0]).value();
  return [currency, price];
};

export default parsePriceStr;
