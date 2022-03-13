import Head from "next/head";
import axios from "axios";
import styles from "../styles/Home.module.css";
import Header from "../component/Header/Header";
import Book from "../component/Book/Book";

export default function Home({ searchKeyword, bookList }) {
  return (
    <div>
      <Head>
        <title>BookPrice</title>
        <meta name="description" content="Get the book at the lowest price" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header searchKeyword={searchKeyword} />
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <h3>{searchKeyword ? `Search result of "${searchKeyword}"` : "Recommended books"}</h3>
          <div className={styles.bookList}>
            {bookList.map((book) => (
              <Book key={book.isbn} book={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const searchKeyword = context.query.search;
  let url;
  if (searchKeyword) {
    url = `${process.env.SERVER_URL}/books/list?keyword=${encodeURI(searchKeyword)}`;
  } else {
    url = `${process.env.SERVER_URL}/books/list`;
  }
  const res = await axios.get(url);
  const bookList = res.data;

  return {
    props: {
      searchKeyword: searchKeyword === undefined ? null : searchKeyword,
      bookList,
    },
  };
};
