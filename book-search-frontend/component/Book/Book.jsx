import styles from "./Book.module.css";
import Rating from "../Rating/Rating";

const Book = ({ book }) => {
  return (
    <div className={styles.book}>
      <a href={`/book/${book.isbn}`} className={styles.image}>
        <img src={book.imgPath} alt={book.name} />
      </a>
      <a href={`/book/${book.isbn}`} className={styles.title}>
        {book.name}
      </a>
      <Rating rating={book.rating} />
      <div className={styles.datePublished}>{book.datePublished}</div>
      <div className={styles.author}>By {book.author}</div>
      <div className={styles.price}>
        {book.currency}
        {book.price}
      </div>
    </div>
  );
};

export default Book;
