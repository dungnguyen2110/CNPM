import styles from "./TaskJanitor.module.scss";
import HeaderTable from "../HeaderTable";
import { Link } from "react-router-dom";
import images from "../../../../assets/images";

//Hàm hiển thị tên khu vực + diện tích
function locationInfo(nameLocation, area) {
  return (
    <div className={styles.locationInfo}>
      <Link to="/map/detail" className={styles.arrowback}>
        <img width="40" height="30" src={images.arrowback} alt="Trở lại"></img>
      </Link>
      <div className={styles.locationInfoElement}>
        <span className={styles.pdr10}>Tên khu vực:</span>
        <span>{nameLocation}</span>
      </div>
      <div className={styles.locationInfoElement}>
        <span className={styles.pdr10}>Diện tích</span>
        <span>{area}</span>
      </div>
    </div>
  );
}

//Hàm hiển thị thông tin nhân viên làm việc tại khu vực
function taskItem(name, time) {
  return (
    <div className={styles.taskItem}>
      <div className={styles.infoElement}>
        <div className={styles.infoText}>
          <span className={styles.pdr10}>Người quét rác:</span>
          <span>{name}</span>
        </div>
        <Link to="./" className={styles.viewInfo}>
          Xem thông tin
        </Link>
      </div>
      <div className={styles.infoElement}>
        <div className={styles.infoText}>
          <span className={styles.pdr10}>Thời gian:</span>
          <span>{time}</span>
        </div>
        <div className={styles.btnEditDelete}>
          <Link to="./" className={`${styles.btn} ${styles.editBtn}`}>
            Chỉnh sửa
          </Link>
          <Link to="./" className={`${styles.btn} ${styles.deleteBtn}`}>
            Xóa
          </Link>
        </div>
      </div>
    </div>
  );
}

//Hàm hiển thị thông tin nhân viên
function janitorInfo(attr, value) {
  return (
    <div className={styles.janitorInfo}>
      <span className={styles.pdr10}>{attr + ":"}</span>
      <span>{value}</span>
    </div>
  );
}

export default function TJanitor(props) {
  const { data } = props;

  // Lấy tên, diện tích khu vực
  const nameLocation = data.area[0].name;
  const areaLocation = data.area[0].area;

  //Lấy thông tin nhiệm vụ
  const tasks = data.tasks;

  //Trùng tên khu vực thì lưu last name + time của nhân viên
  const taskItems = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].area === nameLocation) {
      taskItems.push(taskItem(tasks[i].employees, tasks[i].time[0]));
    }
  }
  //Lấy thông tin cụ thể nhân viên
  const infoEmp = data.employees[0];

  return (
    <div>
      <HeaderTable />
      <div className={styles.container}>
        {locationInfo(nameLocation, areaLocation + " m^2")}

        <div className={styles.locationContainer}>
          <div className={styles.locationTask}>
            <div className={styles.headerTitle}>Thông tin nhiệm vụ</div>

            <div className={styles.task}>
              {taskItems.length === 0 ? (
                <div className={styles.mt10}>Khu vực này không có Janitor</div>
              ) : (
                <div className={styles.taskInfo}>
                  {taskItems.map((element, index) => (
                    <div key={index}>{element}</div>
                  ))}
                </div>
              )}

              <div className={styles.addTask}>
                <img
                  className={styles.pdr10}
                  src={images.addicon}
                  alt="Thêm nhiệm vụ"
                ></img>
                Thêm nhiệm vụ
              </div>
            </div>
          </div>

          <div className={styles.infoDetailJanitor}>
            <div className={styles.headerTitle}>Thông tin nhân viên</div>

            <div className={styles.infoEmp}>
              <div className={styles.imgEmp}></div>
              <div className={styles.infoDetail}>
                {janitorInfo("Họ và tên", infoEmp.name)}
                {janitorInfo("Mã nhân viên", infoEmp.code)}
                {janitorInfo("CCCD", infoEmp.cccd)}
                {janitorInfo("Tuổi", infoEmp.age)}
                {janitorInfo("Chức vụ", infoEmp.role)}
                <Link to="#" className={styles.schedule}>
                  <img
                    className={styles.pdr10}
                    src={images.schedule}
                    alt="Lịch"
                  ></img>
                  Lịch làm việc
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default TJanitor;
