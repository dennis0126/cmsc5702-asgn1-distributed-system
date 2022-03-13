import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <div className={styles.inner}>
          <a href="/" className={styles.title}>
            BookPrice
          </a>
          <form action="/search" autoComplete="off" className={styles.searchForm}>
            <input type="text" placeholder="Search for books by title / author / isbn" />
            <button>Search</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
