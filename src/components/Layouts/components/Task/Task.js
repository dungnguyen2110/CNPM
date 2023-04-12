import styles from "./Task.module.scss";
import images from "../../../../assets/images";
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
  console.log(code, data);
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
          {taskInfo("7:30 - 10", "A", "C", 100)}
          {taskInfo("7:30 - 10", "A", "C", 100)}
          {taskInfo("7:30 - 10", "A", "C", 100)}
          {taskInfo("7:30 - 10", "A", "C", 100)}
          {taskInfo("7:30 - 10", "A", "C", 100)}
          {taskInfo("7:30 - 10", "A", "C", 100)}
        </div>
      </div>
    </div>
  );
}

export default Task;
