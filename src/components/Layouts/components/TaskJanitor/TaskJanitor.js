import styles from "./TaskJanitor.module.scss";
import HeaderTable from "../HeaderTable";
import { Link } from "react-router-dom";
import images from "../../../../assets/images";

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

function janitorInfo(attr, value) {
  return (
    <div className={styles.janitorInfo}>
      <span className={styles.pdr10}>{attr + ":"}</span>
      <span>{value}</span>
    </div>
  );
}

function MDetail() {
  const taskItems = [
    taskItem("A", "7:30 - 9"),
    taskItem("A", "7:30 - 10"),
    taskItem("A", "7:30 - 9"),
    taskItem("A", "7:30 - 9"),
    taskItem("A", "7:30 - 11"),
    taskItem("A", "7:30 - 9"),
    taskItem("A", "7:30 - 9"),
  ];

  return (
    <div>
      <HeaderTable />
      <div className={styles.container}>
        {locationInfo("C", "2000m^2")}

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
                {janitorInfo("Họ và tên", "A")}
                {janitorInfo("Mã nhân viên", 1539)}
                {janitorInfo("CCCD", 123456789)}
                {janitorInfo("Tuổi", 30)}
                {janitorInfo("Chức vụ", "Người quét rác/thu gom")}
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

export default MDetail;
