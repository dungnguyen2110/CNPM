import styles from "./HeaderTable.module.scss";
import React from "react";
import { NavLink } from "react-router-dom";
import images from "../../../../assets/images";

function HeaderTable() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <NavLink
          to="/map"
          className={({ isActive }) =>
            `${styles.tableBtn}  ${isActive ? styles.map : styles.buttonHover}`
          }
        >
          <img className={styles.img} src={images.mapmarker} alt="Bản đồ"></img>
          Bản dồ
        </NavLink>
        <NavLink
          to="/employee"
          className={({ isActive }) =>
            `${isActive ? styles.emp : styles.buttonHover} ${styles.tableBtn} ${
              styles.lastBtn
            }`
          }
        >
          <img className={styles.img} src={images.staff} alt="Nhân viên"></img>
          Nhân viên
        </NavLink>
      </div>
    </div>
  );
}

export default HeaderTable;
