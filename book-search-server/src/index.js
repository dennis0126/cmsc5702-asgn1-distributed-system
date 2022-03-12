import express from "express";
import fetchBookList from "./externalData/bookDepository/fetchBookList.js";
import fetchBookBookDepository from "./externalData/bookDepository/fetchBook.js";
import fetchBookElephants from "./externalData/elephants/fetchBook.js";
import fetchBookAmazon from "./externalData/amazon/fetchBook.js";

const PORT = 8000;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/books/list", async (req, res) => {
  const keyword = req.query.keyword;
  const bookList = await fetchBookList(keyword);
  res.send(bookList);
});

app.get("/books/:isbn", async (req, res) => {
  const isbn = req.params.isbn;
  const bookBookDepository = await fetchBookBookDepository(isbn);
  const bookElephants = await fetchBookElephants(isbn);
  const bookAmazon = await fetchBookAmazon(isbn);
  const book = { ...bookBookDepository };
  book.sources = [];
  book.sources.push({
    source: "Book Depository",
    url: bookBookDepository.url,
    currency: bookBookDepository.currency,
    price: bookBookDepository.price,
  });
  book.sources.push({
    source: "Elephants",
    url: bookElephants.url,
    currency: bookElephants.currency,
    price: bookElephants.price,
  });
  book.sources.push({
    source: "Amazon",
    url: bookAmazon.url,
    currency: bookAmazon.currency,
    price: bookAmazon.price,
  });
  const { url, currency, price, ...bookOutput } = book;
  res.send(bookOutput);
});

//start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
