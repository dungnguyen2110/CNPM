import styles from "./InfoOverviewEmployee.module.scss";
import HeaderTable from "../HeaderTable";
import { Link } from "react-router-dom";
import images from "../../../../assets/images";
import React, { useState } from "react";
import Search from "../Search";

export default function InfoOverviewEmployee(props) {
  const { data } = props;

  //Lấy thông tin nhân viên
  const emps = data.employees;

  const [searchResults, setSearchResults] = useState([]);

  function handleSearchResult(results) {
    setSearchResults(results);
  }

  return (
    <div className={styles.overviewContainer}>
      <HeaderTable />

      <div className={styles.employeeOverview}>
        <div className={styles.action}>
          <div className={`${styles.title} ${styles.taskHeader}`}>
            Thanh tác vụ
          </div>
          <div className={styles.actionSearch}>
            {/* Search theo name */}
            <Search
              data={emps}
              handleSearchResult={handleSearchResult}
              field={"name"}
            />
          </div>
        </div>

        <div className={styles.tableSection}>
          <div className={`${styles.title} ${styles.empInfoTable}`}>
            Bảng thông tin nhân viên
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeaderInfo}>
              <div className={`${styles.c1} ${styles.attr} `}>
                Chức vụ
                <img
                  alt=""
                  className={styles.sort}
                  src={images.sortdecrement}
                ></img>
              </div>
              <div className={`${styles.c2} ${styles.attr} `}>
                Họ và tên
                <img
                  alt=""
                  className={styles.sort}
                  src={images.sortdecrement}
                ></img>
              </div>
              <div className={`${styles.c3} ${styles.attr} `}>
                Mã nhân viên
                <img
                  alt=""
                  className={styles.sort}
                  src={images.sortdecrement}
                ></img>
              </div>
            </div>
            <div className={styles.tableItemContainer}>
              {searchResults.map((emp, index) => (
                <div key={index} className={styles.tableInfoItem}>
                  <div className={`${styles.c1} ${styles.attr} `}>
                    {emp.role}
                  </div>
                  <div className={`${styles.c2} ${styles.attr} `}>
                    {emp.name}
                  </div>
                  <div className={`${styles.c3} ${styles.attr} `}>
                    {emp.code}
                  </div>
                  {console.log(emp.cccd)}

                  <Link
                    to="/employee/detail"
                    state={{ cccd: emp.cccd }}
                    className={styles.viewInfo}
                  >
                    Xem thông tin
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
