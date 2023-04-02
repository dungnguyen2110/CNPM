import styles from "./InfoOverviewEmployee.module.scss";
import HeaderTable from "../HeaderTable";
import { Link } from "react-router-dom";
import images from "../../../../assets/images";
import React, { useState } from "react";
import Search from "../Search";

export function InfoOverviewEmployee() {
  const emps = [
    { Role: "Quét rác", Name: "Phạm Quang B", Code: "0001" },
    { Role: "Thu gom rác", Name: "Nguyễn Văn A", Code: "0002" },
    { Role: "Quét rác", Name: "Lê Văn C", Code: "0003" },
    { Role: "Thu gom rác", Name: "Lê Văn D", Code: "0004" },
    { Role: "Quét rác", Name: "Alexander", Code: "0005" },
    { Role: "Thu gom rác", Name: "Nguyễn A", Code: "0006" },
    { Role: "Quét rác", Name: "Robert", Code: "0007" },
    { Role: "Quét rác", Name: "Luffy", Code: "0008" },
    { Role: "Thu gom rác", Name: "Zoro", Code: "0009" },
    // { Role: "Quét rác", Name: "Ussop", Code: "0010" },
    // { Role: "Quét rác", Name: "Chopper", Code: "0011" },
    // { Role: "Thu gom rác", Name: "Sanji", Code: "0012" },
    // { Role: "Thu gom rác", Name: "Levi", Code: "0013" },
    // { Role: "Thu gom rác", Name: "Eren", Code: "0014" },
    // { Role: "Quét rác", Name: "Zeke", Code: "0015" },
    // { Role: "Thu gom rác", Name: "Yasuo", Code: "0016" },
    // { Role: "Quét rác", Name: "Leesim", Code: "0017" },
  ];

  const [searchResults, setSearchResults] = useState([]);

  function handleSearchResult(results) {
    setSearchResults(results);
  }

  return (
    <div className={styles.InfoOverview__Employee}>
      <HeaderTable />

      <div className={styles.EmployeeOverview}>
        <div className={styles.ActionContainer0}>
          <div className={styles.TaskHeader}>Thanh tác vụ</div>
          <div className={styles.Action}>
            <Search
              data={emps}
              handleSearchResult={handleSearchResult}
              field={"Name"}
            />
          </div>
        </div>

        <div className={styles.TableSection}>
          <div className={styles.EmployeeInfoTable}>
            Bảng thông tin nhân viên
          </div>
          <div className={styles.Table}>
            <div className={styles.TableHeaderInfo}>
              <div className={styles.Role}>
                Chức vụ
                <img
                  alt=""
                  className={styles.sort}
                  src={images.sortdecrement}
                ></img>
              </div>
              <div className={styles.Name}>
                Họ và tên
                <img
                  alt=""
                  className={styles.sort}
                  src={images.sortdecrement}
                ></img>
              </div>
              <div className={styles.Code}>
                Mã nhân viên
                <img
                  alt=""
                  className={styles.sort}
                  src={images.sortdecrement}
                ></img>
              </div>
            </div>
            <div className={styles.TableItemContainer}>
              {searchResults.map((emp, index) => (
                <div key={index} className={styles.TableInfoItem}>
                  <div className={styles.Role}>{emp.Role}</div>
                  <div className={styles.Name}>{emp.Name}</div>
                  <div className={styles.Code}>{emp.Code}</div>
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
