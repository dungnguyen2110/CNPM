import styles from "./InfoOverviewMap.module.scss";
import HeaderTable from "../HeaderTable";
import { Link } from "react-router-dom";

function InfoOverviewMap() {
  return (
    <div className={styles.InfoOverview__Employee}>
      <HeaderTable />

      <div className={styles.MapOverview}>
        <div className={styles.LocationInfo}>
          Bản đồ biểu thị các vùng làm viêc
        </div>
        <Link
          to="./detail"
          className={styles.Map__vung}
          style={{ backgroundColor: "green" }}
        ></Link>
      </div>
    </div>
  );
}

export default InfoOverviewMap;
