import styles from "./HeaderTable.module.scss";
import React from "react";
import { NavLink } from "react-router-dom";
import images from "../../../../assets/images";

function HeaderTable() {
  return (
    <div className={styles.InfoCategory__container}>
      <div className={styles.Infomation__category}>
        <NavLink
          to="/map"
          className={({ isActive }) =>
            `${isActive ? styles.active : ""} ${styles.table__btn}`
          }
        >
          <img className={styles.img} src={images.mapmarker} alt="Bản đồ"></img>
          Bản dồ
        </NavLink>
        <NavLink
          to="/employee"
          className={({ isActive }) =>
            `${isActive ? styles.active : ""} ${styles.last__table__btn}`
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
