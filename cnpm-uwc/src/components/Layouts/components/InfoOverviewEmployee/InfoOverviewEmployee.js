import styles from "./InfoOverviewEmployee.module.scss";
import HeaderTable from "../HeaderTable";
import Task from "../Task";
function InfoOverviewEmployee() {
  return (
    <div className={styles.InfoOverview__Employee}>
      <HeaderTable />

      <div className={styles.EmployeeOverview}>
        <div className={styles.EmployeeInfoheader}>Thông tin nhân viên</div>

        <div className={styles.EmployeeInfoContainer}>
          <div className={styles.EmployeeInfoCard1}>
            <div className={styles.TaskHeader}>Các nhiệm vụ được giao</div>

            <div className={styles.Detail}>
              <div className={styles.ImageContainer1}>
                <div className={styles.ImageContainer0}></div>
              </div>

              <div className={styles.Employee__detail__info}>
                <div className={styles.NameInfo}>
                  <div className={styles.NameLabel}>Họ và tên:</div>
                  <div className={styles.Name}>A</div>
                </div>

                <div className={styles.Code__info}>
                  <div className={styles.CodeLabel}>Mã nhân viên:</div>
                  <div className={styles.Code}>123456789</div>
                </div>

                <div className={styles.Citizen__info}>
                  <div className={styles.CitizenLabel}>CCCD:</div>
                  <div className={styles.Citizen}>123456789</div>{" "}
                </div>

                <div className={styles.Age__info}>
                  <div className={styles.AgeLabel}>Tuổi:</div>
                  <div className={styles.Age}>30</div>
                </div>

                <div className={styles.Role__info}>
                  <div className={styles.RoleLabel}>Chức vụ</div>
                  <div className={styles.Role}>Quét rác</div>
                </div>
              </div>
            </div>
          </div>

          <Task />
        </div>
      </div>
    </div>
  );
}

export default InfoOverviewEmployee;
