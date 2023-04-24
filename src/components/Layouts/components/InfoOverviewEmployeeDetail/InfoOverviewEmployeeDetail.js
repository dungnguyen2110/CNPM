import styles from "./InfoOverviewEmployeeDetail.module.scss";
import HeaderTable from "../HeaderTable";
import Task from "../Task";
import { Link } from "react-router-dom";
import images from "../../../../assets/images";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

//Hàm in ra thông tin chi tiết của 1 nhân viên
function info(name, code, cccd, age, role) {
  return (
    <div className={styles.detailInfo}>
      <div className={styles.attrInfo}>
        <div className={styles.attr}>Họ và tên:</div>
        <div className={styles.value}>{name}</div>
      </div>

      <div className={styles.attrInfo}>
        <div className={styles.attr}>Mã nhân viên:</div>
        <div className={styles.value}>{code}</div>
      </div>

      <div className={styles.attrInfo}>
        <div className={styles.attr}>CCCD:</div>
        <div className={styles.value}>{cccd}</div>
      </div>

      <div className={styles.attrInfo}>
        <div className={styles.attr}>Tuổi:</div>
        <div className={styles.value}>{age}</div>
      </div>

      <div className={styles.attrInfo}>
        <div className={styles.attr}>Chức vụ:</div>
        <div className={styles.value}>{role}</div>
      </div>
    </div>
  );
}

export default function EDetail(props) {
  const location = useLocation();
  console.log(location);

  let cccd;
  if (location) {
    cccd = location.state.cccd;
  }

  const navigate = useNavigate();
  const { data } = props;
  const infoEmp = data.employees.filter(
    (emp) => Number(emp.cccd) === Number(cccd)
  );

  // Lấy thông tin empployee đầu tiên
  // const infoEmp = data.employees[0];

  return (
    <div className={styles.overviewContainer}>
      <HeaderTable />

      <div className={styles.employeeOverview}>
        <div className={styles.employeeInfoHeader}>
          <div onClick={() => navigate(-1)} className={styles.arrowback}>
            <img
              width="40"
              height="30"
              src={images.arrowback}
              alt="Trở lại"
            ></img>
          </div>
          <div className={styles.size20}>Thông tin nhân viên</div>
        </div>

        <div className={styles.employeeInfoContainer}>
          <div className={styles.employeeInfo}>
            <div className={styles.headerTitle}>
              <img
                className={styles.iconContact}
                width="40"
                height="30"
                src={images.contact}
                alt="Thông tin"
              ></img>
              <div>Các nhiệm vụ được giao</div>
            </div>

            <div className={styles.detail}>
              <div className={styles.imageContainer}>
                <div className={styles.imageEmp}></div>
              </div>

              {info(
                infoEmp[0].name,
                infoEmp[0].code,
                infoEmp[0].cccd,
                infoEmp[0].age,
                infoEmp[0].role
              )}
            </div>
          </div>

          <Task code={infoEmp.code} data={data} />
        </div>
      </div>
    </div>
  );
}
