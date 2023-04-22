import styles from "./TaskJanitor.module.scss";
import HeaderTable from "../HeaderTable";
import { Link } from "react-router-dom";
import images from "../../../../assets/images";
import { useEffect, useState } from "react";

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
  const [tasks, setTasks] = useState(data.tasks);
  console.log(tasks);
  const handleDelete = (x) => {
    let temp = [...tasks];
    temp.splice(x, 1);
    setTasks(temp);
    let temp2 = props.data;
    temp2.tasks = temp;

    // updated chưa hoạt động
    props.updatedData(temp2);
  };

  const updateIndex = (x) => {
    props.setIndex(x);
  };

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
              {tasks.length === 0 ? (
                <div className={styles.mt10}>Khu vực này không có Janitor</div>
              ) : (
                <div className={styles.taskInfo}>
                  {/* {taskItems.map((element, index) => (
                    <div key={index}>{element}</div>
                  ))} */}
                  {tasks.map((task, index) => (
                    <div key={index} className={styles.taskItem}>
                      <div className={styles.infoElement}>
                        <div className={styles.infoText}>
                          <span className={styles.pdr10}>Người quét rác:</span>
                          <span>{task.area}</span>
                        </div>
                        <Link
                          value={index}
                          onClick={(e) => {
                            updateIndex(e.currentTarget.getAttribute("value"));
                          }}
                          to="/infotask"
                          className={styles.viewInfo}
                        >
                          Xem thông tin
                        </Link>
                      </div>
                      <div className={styles.infoElement}>
                        <div className={styles.infoText}>
                          <span className={styles.pdr10}>Thời gian:</span>
                          <span>{task.time[0]}</span>
                        </div>
                        <div className={styles.btnEditDelete}>
                          <Link
                            value={index}
                            onClick={(e) => {
                              updateIndex(
                                e.currentTarget.getAttribute("value")
                              );
                            }}
                            to="/edittask"
                            className={`${styles.btn} ${styles.editBtn}`}
                          >
                            Chỉnh sửa
                          </Link>

                          <div
                            value={index}
                            onClick={(e) => {
                              handleDelete(
                                e.currentTarget.getAttribute("value")
                              );
                            }}
                            className={`${styles.btn} ${styles.deleteBtn}`}
                          >
                            Xóa
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Link to="/addTaskJanitor" className={styles.addTask}>
                <img
                  className={styles.pdr10}
                  src={images.addicon}
                  alt="Thêm nhiệm vụ"
                ></img>
                Thêm nhiệm vụ
              </Link>
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
                <Link to="/employee/detail" className={styles.schedule}>
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
