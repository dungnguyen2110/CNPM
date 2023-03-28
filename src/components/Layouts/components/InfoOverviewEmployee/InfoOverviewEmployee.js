import styles from "./InfoOverviewEmployee.module.scss";
import HeaderTable from "../HeaderTable";
import { Link } from "react-router-dom";
import images from "../../../../assets/images";
export function InfoOverviewEmployee() {
  return (
    <div className={styles.InfoOverview__Employee}>
      <HeaderTable />

      <div className={styles.EmployeeOverview}>
        <div className={styles.ActionContainer0}>
          <div className={styles.TaskHeader}>Thanh tác vụ</div>
          <div className={styles.Action}>
            <div className={styles.SearchInput}>Search</div>
          </div>
        </div>

        <div className={styles.TableSection}>
          <div className={styles.EmployeeInfoTable}>
            Bảng thông tin nhân viên
          </div>
          <div className={styles.Table}>
            <div className={styles.TableHeaderInfo}>
              <div className={styles.Role}>
                <img alt= "" src={images.sortdecrement}></img>
                Chức vụ
              </div>
              <div className={styles.Name}>
                <img alt= "" src={images.sortdecrement}></img>
                Họ và tên
              </div>
              <div className={styles.Code}>
                <img alt = "" src={images.sortdecrement}></img>
                Mã nhân viên
              </div>
            </div>
            <div className={styles.TableItemContainer}>
              <div className={styles.TableInfoItem}>
                <div className={styles.Role}>Quét rác</div>
                <div className={styles.Name}>Phạm Quang B</div>
                <div className={styles.Code}>1432</div>
                <Link to={"/employee/detail"} className={styles.viewInfo}>
                  Xem thông tin
                </Link>
              </div>

              <div className={styles.TableInfoItem}>
                <div className={styles.Role}>Thu gom rác</div>
                <div className={styles.Name}> Nguyen Van A</div>
                <div className={styles.Code}>1234</div>
                <Link to={"/employee/detail"} className={styles.viewInfo}>
                  Xem thông tin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoOverviewEmployee;
