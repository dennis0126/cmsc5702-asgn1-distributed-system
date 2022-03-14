import axios from "axios";
import Header from "../../component/Header/Header";
import Rating from "../../component/Rating/Rating";
import Book from "../../component/Book/Book";
import styles from "../../styles/BookPage.module.css";

export default function BookPage({ book }) {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.bookContainer}>
            {!book.name ? (
              <div>No Book satisfies your search. Please try another keyword.</div>
            ) : (
              <>
                <div className={styles.cover}>
                  <img src={book.imgPath} alt={book.name} />
                </div>
                <div className={styles.bookInfo}>
                  <div className={styles.title}>{book.name}</div>
                  <div className={styles.rating}>
                    <Rating rating={book.rating} />
                  </div>
                  <div className={styles.bookDetail}>
                    <ul>
                      <li>
                        <label>Author: </label>
                        <span>{book.author}</span>
                      </li>
                      <li>
                        <label>isbn: </label>
                        <span>{book.isbn}</span>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <label>Publication Date: </label>
                        <span>{book.datePublished}</span>
                      </li>
                      <li>
                        <label>Publisher: </label>
                        <span>{book.publisher}</span>
                      </li>
                    </ul>
                  </div>
                  <div className={styles.bookPrices}>
                    <table>
                      <thead>
                        <tr>
                          <td>Source</td>
                          <td>Price</td>
                          <td></td>
                        </tr>
                      </thead>
                      <tbody>
                        {book.sources.map((source, idx) => (
                          <tr key={idx}>
                            <td>{source.source}</td>
                            <td className={styles.price}>HKD${source.price}</td>
                            <td>
                              <a href={source.url} target="_blank" rel="noreferrer">
                                Purchase at {source.source}
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className={styles.excerpt}>{book.excerpt}</div>
                </div>
              </>
            )}
          </div>
          {book.isbnRecommendationBooks && book.isbnRecommendationBooks.length > 0 && (
            <div className={styles.relatedBooks}>
              <h3>People who bought this also bought</h3>
              <div className={styles.relatedBookList}>
                {book.isbnRecommendationBooks.map((book) => (
                  <div key={book.isbn} className={styles.relatedBook}>
                    <Book book={book} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {book.categoryRecommendationBooks && book.categoryRecommendationBooks.length > 0 && (
            <div className={styles.relatedBooks}>
              <h3>Recommended books in similar category</h3>
              <div className={styles.relatedBookList}>
                {book.categoryRecommendationBooks.map((book) => (
                  <div key={book.isbn} className={styles.relatedBook}>
                    <Book book={book} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const isbn = context.query.isbn;

  const url = `${process.env.SERVER_URL}/books/${encodeURI(isbn)}`;

  const res = await axios.get(url);
  const book = res.data;

  return {
    props: {
      book,
    },
  };
};
