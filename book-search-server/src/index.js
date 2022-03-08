import express from "express";
import fetchBookList from "./externalData/fetchBookList.js";
import fetchBook from "./externalData/fetchBook.js";

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
  const book = await fetchBook(isbn);
  res.send(book);
});

//start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
