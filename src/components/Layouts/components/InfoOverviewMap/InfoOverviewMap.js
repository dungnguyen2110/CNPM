import styles from "./InfoOverviewMap.module.scss";
import HeaderTable from "../HeaderTable";
import { Link } from "react-router-dom";
import Search from "../Search";
import React, { useState } from "react";

export default function InfoOverviewMap(props) {
  const { data } = props;

  //Lấy thông tin các vùng
  const regions = data.regions;
  console.log(regions);
  const [searchResults, setSearchResults] = useState([]);

  function handleSearchResult(results) {
    setSearchResults(results);
  }
  return (
    <div>
      <HeaderTable />

      <div className={styles.mapOverview}>
        <div className={`${styles.title}`}>Vùng làm việc</div>
        <div className={styles.regions}>
          <Search
            data={regions}
            handleSearchResult={handleSearchResult}
            field={"name"}
          />
          <Link to="./detail" className={styles.regionsDisplay}>
            {searchResults.map((region, index) => (
              <div key={index} className={styles.regionElement}>
                {region.name}
              </div>
            ))}
          </Link>
        </div>
      </div>
    </div>
  );
}
