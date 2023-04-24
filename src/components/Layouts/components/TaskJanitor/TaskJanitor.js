import styles from "./TaskJanitor.module.scss";
import HeaderTable from "../HeaderTable";
import { Link, useLocation } from "react-router-dom";
import images from "../../../../assets/images";
import { useState, useEffect } from "react";

//Hàm hiển thị tên khu vực + diện tích
function locationInfo(nameLocation, area) {
  return (
    <div className={styles.locationInfo}>
      <Link to="/map" className={styles.arrowback}>
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
  const location = useLocation();
  const { data } = props;

  const areaLocation = data.area[0].area;

  let [taskCoor, setTaskCoor] = useState(null);

  console.log("task_coo1", taskCoor);

  let filteredArray;
  const taskJanitorssss = data.taskJanitors;
  const [taskJanitors, setTasks] = useState(data.taskJanitors);

  if (taskJanitorssss.length > 0 && !taskCoor) {
    const tmpz = taskJanitorssss[taskJanitorssss.length - 1].coor;
    setTaskCoor(tmpz);
    console.log(taskJanitorssss);
    console.log(tmpz);

    filteredArray = taskJanitorssss.filter(
      (obj) => obj.coor.lat === tmpz.lat && obj.coor.lng === tmpz.lng
    );

    setTasks(filteredArray);
  }
  console.log("Coor last:", taskCoor);
  // console.log(taskJanitorssss[taskJanitorssss.length - 1].coor);
  if (taskCoor) {
    filteredArray = taskJanitorssss.filter(
      (obj) => obj.coor.lat === taskCoor.lat && obj.coor.lng === taskCoor.lng
    );
    // setTasks(filteredArray);
  }

  //Lấy thông tin nhiệm vụ
  useEffect(() => {
    const task_coor = location.state?.task_coor;
    if (task_coor) {
      setTaskCoor(task_coor);
      filteredArray = taskJanitorssss.filter(
        (obj) =>
          obj.coor.lat === task_coor.lat && obj.coor.lng === task_coor.lng
      );
      setTasks(filteredArray);
    }
  }, [location.state, taskJanitorssss]);

  console.log(filteredArray);

  let nameLocation;
  console.log(taskJanitors);
  if (data.taskJanitors.length > 0) {
    nameLocation = taskJanitors[0].location;
  }

  console.log(taskJanitors.length);

  const handleDelete = (x) => {
    let temp = [...taskJanitors];
    temp.splice(x, 1);
    setTasks(temp);
    let temp2 = props.data;
    temp2.tasks = temp;

    props.updatedData(temp2);
  };

  const updateIndex = (x) => {
    props.setIndex(x);
  };

  //Lấy thông tin cụ thể của tất cả nhân viên
  const infoEmps = data.employees;

  // Lưu thông tin nhân viên cần hiển thị
  const [infoEmp, setInfoEmp] = useState(null);

  // Xử lý sự kiện click vào xem thông tin
  function displayInfo(cccd) {
    let tmp = infoEmps.filter((e) => e.cccd === Number(cccd));
    setInfoEmp(tmp);
  }

  return (
    <div>
      <HeaderTable />
      <div className={styles.container}>
        {locationInfo(nameLocation, areaLocation + " m^2")}

        <div className={styles.locationContainer}>
          <div className={styles.locationTask}>
            <div className={styles.headerTitle}>Thông tin nhiệm vụ</div>

            <div className={styles.task}>
              {taskJanitors.length === 0 ? (
                <div className={styles.mt10}>Khu vực này không có Janitor</div>
              ) : (
                <div className={styles.taskInfo}>
                  {taskJanitors.map((task, index) => (
                    <div key={index} className={styles.taskItem}>
                      <div className={styles.infoElement}>
                        <div className={styles.infoText}>
                          <span className={styles.pdr10}>Người quét rác:</span>
                          <span>{task.lastName}</span>
                        </div>
                        <div
                          value={index}
                          onClick={() => displayInfo(task.cccd)}
                          className={styles.viewInfo}
                        >
                          Xem thông tin
                        </div>
                      </div>
                      <div className={styles.infoElement}>
                        <div className={styles.infoText}>
                          <span className={styles.pdr10}>Thời gian:</span>
                          <span>{`${task.timeStart[0]} -> ${task.timeEnd[0]}`}</span>
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
                            state={{
                              location: task.location,
                              fullName: task.fullName,
                              timeStart: task.timeStart,
                              timeEnd: task.timeEnd,
                              date: task.date,
                            }}
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

            {infoEmp ? (
              <div className={styles.infoEmp}>
                <div className={styles.imgEmp}></div>
                <div className={styles.infoDetail}>
                  {janitorInfo("Họ và tên", infoEmp[0].name)}
                  {janitorInfo("Mã nhân viên", infoEmp[0].code)}
                  {janitorInfo("CCCD", infoEmp[0].cccd)}
                  {janitorInfo("Tuổi", infoEmp[0].age)}
                  {janitorInfo("Chức vụ", infoEmp[0].role)}
                  <Link
                    to="/employee/detail"
                    state={{ cccd: infoEmp[0].cccd }}
                    className={styles.schedule}
                  >
                    <img
                      className={styles.pdr10}
                      src={images.schedule}
                      alt="Lịch"
                    ></img>
                    Lịch làm việc
                  </Link>
                </div>
                <div></div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// export default TJanitor;
