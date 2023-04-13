import styles from "./Task.module.scss";
import images from "../../../../assets/images";

//Hàm hiển thị thông tin nhiệm vụ được giao
function taskInfo(time, region, location, tool) {
  return (
    <div className={styles.JanitorTaskInfo}>
      <div className={styles.taskElement}>
        <div className={styles.taskLabel}>Thời gian:</div>
        <div className={styles.taskValue}>{time}</div>
      </div>
      <div className={styles.taskElement}>
        <div className={styles.taskLabel}>Vùng:</div>
        <div className={styles.taskValue}>{region}</div>
        <div className={`${styles.taskLabel} ${styles.ml100}`}>Khu vực:</div>
        <div className={styles.taskValue}>{location}</div>
      </div>
      <div className={styles.taskElement}>
        <div className={styles.taskLabel}>Sức chứa troller:</div>
        <div className={styles.taskValue}>{tool}</div>
      </div>
    </div>
  );
}

function Task(props) {
  const { code, data } = props;

  //Lấy thông tin nhiệm vụ
  const taskEmp = [];
  for (let i = 0; i < data.tasks.length; i++) {
    let tasks = data.tasks[i];
    if (tasks.code === code) {
      for (let j = 0; j < tasks.time.length; j++) {
        taskEmp.push(
          taskInfo(
            tasks.time[j],
            tasks.region,
            tasks.area,
            tasks.trollercapacity + " tấn"
          )
        );
      }
    }
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
