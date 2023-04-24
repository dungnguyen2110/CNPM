import styles from "./Task.module.scss";
import images from "../../../../assets/images";
import { useLocation } from "react-router-dom";

//Hàm hiển thị thông tin nhiệm vụ được giao
function taskInfo(isJanitor, timeStart, timeEnd, region, location, tool) {
  return (
    <div className={styles.JanitorTaskInfo}>
      <div className={styles.taskElement}>
        <div className={styles.taskLabel}>Thời gian:</div>
        <div className={styles.taskValue}>
          {timeStart} - {timeEnd}
        </div>
      </div>
      <div className={styles.taskElement}>
        <div className={styles.region}>
          <div className={styles.taskLabel}>Vùng:</div>
          <div className={styles.taskValue}>{region}</div>
        </div>

        <div className={styles.location}>
          <div className={`${styles.taskLabel} ${styles.ml100}`}>
            {isJanitor ? "Khu vực:" : "Quảng đường::"}
          </div>
          {console.log(100)}
          <div className={styles.taskValue}>{location}</div>
        </div>

        <div></div>
      </div>
      <div className={styles.taskElement}>
        <div className={styles.taskLabel}>
          {isJanitor ? "Sức chứa thùng rác:" : "Sức chứa troller:"}
        </div>

        <div className={styles.taskValue}>{tool}</div>
      </div>
    </div>
  );
}

function Task(props) {
  const { code, data } = props;
  const location = useLocation();
  console.log(location);
  let cccd;
  if (location.state) {
    cccd = location.state.cccd;
  }

  const taskJanitors = data.taskJanitors;
  console.log();
  let isJanitor = false;
  let task;
  task = taskJanitors.filter((emp) => Number(emp.cccd) === Number(cccd));
  if (task.length > 0) isJanitor = true;

  const taskCollectors = data.taskCollectors;
  console.log(cccd);
  const tmp = taskCollectors.filter((emp) => Number(emp.cccd) === Number(cccd));
  console.log(tmp);
  if (tmp.length > 0) {
    task = tmp;
    console.log(111);
  }
  console.log(isJanitor);
  console.log(cccd);
  const taskEmp = [];
  console.log(task[0].distance);
  // console.log(task.timeStart);
  for (let i = 0; i < task[0].timeStart.length; i++) {
    taskEmp.push(
      taskInfo(
        isJanitor,
        task[0].timeStart[i],
        task[0].timeEnd[i],
        task[0].region,
        isJanitor ? task[0].location : 100 + " km",
        isJanitor ? 30 + " kg" : 50 + " tấn"
      )
    );
  }

  return (
    <div className={styles.tasks}>
      <div className={styles.headerTitle}>
        <img
          className={styles.iconTask}
          width="40"
          height="30"
          src={images.task}
          alt="Nhiệm vụ"
        ></img>
        <div>Các nhiệm vụ được giao</div>
      </div>
      <div className={styles.taskContainer}>
        <div className={styles.taskContainer1}>
          {taskEmp.map((element, index) => (
            <div key={index}>{element}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Task;
