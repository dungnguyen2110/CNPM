import styles from "./Search.module.scss";
import React, { useState, useEffect } from "react";
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
    <input
      type="search"
      onChange={handleChange}
      value={searchInput}
      className={styles.SearchInput}
      placeholder="Search"
    />
  );
}

export default Search;
