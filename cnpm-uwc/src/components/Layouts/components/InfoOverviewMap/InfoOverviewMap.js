import styles from "./InfoOverviewMap.module.scss";
import HeaderTable from "../HeaderTable";
// import Task from "../Task";
function InfoOverviewMap() {
  return (
    <div className={styles.InfoOverview__Employee}>
      <HeaderTable />

      <div className={styles.MapOverview}>
        <div className={styles.LocationInfo}>
          Bản đồ biểu thị các vùng làm viêc
        </div>
        <div className={styles.Map__vung}></div>
      </div>
    </div>
  );
}

export default InfoOverviewMap;
