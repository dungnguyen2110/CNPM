import styles from "./Search.module.scss";
import React, { useState, useEffect } from "react";
import images from "../../../../assets/images";
function Search(props) {
  const { data, handleSearchResult, field } = props;
  const [searchInput, setSearchInput] = useState("");
  const [, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const result = data.filter((ele) =>
      ele[field].toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchResults(result);
    handleSearchResult(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  return (
    <div className={styles.search}>
      <img className={styles.iconSearch} src={images.search} alt="Search" />
      <input
        type="search"
        onChange={handleChange}
        value={searchInput}
        placeholder="Search"
        className={styles.searchInput}
      />
    </div>
  );
}

export default Search;
