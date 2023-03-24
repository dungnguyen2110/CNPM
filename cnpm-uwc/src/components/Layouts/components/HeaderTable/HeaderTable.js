import styles from "./HeaderTable.module.scss";
import { Link } from "react-router-dom";

function HeaderTable() {
  return (
    <div className={styles.InfoCategory__container}>
      <div className={styles.Infomation__category}>
        <Link to={"/map"} className={styles.Map__name__btn}>
          Bản đồ
        </Link>
        <Link to={"/employee"} className={styles.Employee}>
          Nhân viên
        </Link>
      </div>
    </div>
  );
}

// export function HeaderTable2() {
//   return (
//     <div className={styles.InfoCategory__container}>
//       <div className={styles.Infomation__category}>
//         <Link to={"/map"} className={styles.Map__name__btn}>
//           Bản đồ
//         </Link>
//         <Link to={"/employee"} className={styles.Employee}>
//           Nhân viên
//         </Link>
//       </div>
//     </div>
//   );
// }

export default HeaderTable;
