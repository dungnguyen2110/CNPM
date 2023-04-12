import styles from "./InfoOverviewEmployee.module.scss";
import HeaderTable from "../HeaderTable";
import { Link } from "react-router-dom";
import images from "../../../../assets/images";
import React, { useState } from "react";
import Search from "../Search";

export function InfoOverviewEmployee() {
  const emps = [
    { Role: "Thu gom rác", Name: "Nguyễn Văn A", Code: "0001" },
    { Role: "Quét rác", Name: "Phạm Quang B", Code: "0002" },
    { Role: "Quét rác", Name: "Lê Văn C", Code: "0003" },
    { Role: "Thu gom rác", Name: "Lê Văn D", Code: "0004" },
    { Role: "Quét rác", Name: "Alexander E", Code: "0005" },
    { Role: "Thu gom rác", Name: "Nguyễn F", Code: "0006" },
    { Role: "Quét rác", Name: "Robert G", Code: "0007" },
    { Role: "Quét rác", Name: "Luffy H", Code: "0008" },
    { Role: "Thu gom rác", Name: "Zoro I", Code: "0009" },
    { Role: "Quét rác", Name: "Ussop J", Code: "0010" },
    { Role: "Quét rác", Name: "Chopper K", Code: "0011" },
    { Role: "Thu gom rác", Name: "Sanji L", Code: "0012" },
    { Role: "Thu gom rác", Name: "Levi M", Code: "0013" },
    { Role: "Thu gom rác", Name: "Eren N", Code: "0014" },
    { Role: "Quét rác", Name: "Zeke O", Code: "0015" },
    { Role: "Thu gom rác", Name: "Yasuo P", Code: "0016" },
  ];

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
            <Search
              data={emps}
              handleSearchResult={handleSearchResult}
              field={"Name"}
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
                    {emp.Role}
                  </div>
                  <div className={`${styles.c2} ${styles.attr} `}>
                    {emp.Name}
                  </div>
                  <div className={`${styles.c3} ${styles.attr} `}>
                    {emp.Code}
                  </div>
                  <Link to={"/employee/detail"} className={styles.viewInfo}>
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

export default InfoOverviewEmployee;
