import { useState } from "react";
import styles from "./Header.module.css";

const Header = ({ searchKeyword }) => {
  const [keyword, setKeyword] = useState(searchKeyword);
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <div className={styles.inner}>
          <a href="/" className={styles.title}>
            BookPrice
          </a>
          <form action="/api/search" method="POST" autoComplete="off" className={styles.searchForm}>
            <input
              type="text"
              name="searchKeyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search for books by title / author / isbn"
            />
            <button>Search</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
