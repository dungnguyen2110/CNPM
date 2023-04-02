import styles from "./Task.module.scss";

function Task() {
  return (
    <div className={styles.Tasks}>
      <div className={styles.TaskHeader}>Các nhiệm vụ được giao</div>
      <div className={styles.TaskContainer0}>
        <div className={styles.TaskContainer1}>
          <div className={styles.JanitorTaskInfo}>
            <div className={styles.TaskTime}>
              <div className={styles.TimeLabel}>Thời gian:</div>
              <div className={styles.TaskTime}>7:30 - 9</div>
            </div>
            <div className={styles.VungInfo}>
              <div className={styles.LocationLabel}>Vùng:</div>
              <div className={styles.Location__Label}>A</div>
              <div className={styles.KhuvucLabel}>Khu vưc:</div>
              <div className={styles.Khuvuc}>B</div>
            </div>
            <div className={styles.ToolInfo}>
              <div className={styles.ToolLabel}>Sức chứa troller:</div>
              <div className={styles.ToolName}>100</div>
            </div>
          </div>

          <div className={styles.JanitorTaskInfo}>
            <div className={styles.TaskTime}>
              <div className={styles.TimeLabel}>Thời gian:</div>
              <div className={styles.TaskTime}>7:30 - 9</div>
            </div>
            <div className={styles.VungInfo}>
              <div className={styles.LocationLabel}>Vùng:</div>
              <div className={styles.Location__Label}>A</div>
              <div className={styles.KhuvucLabel}>Khu vưc:</div>
              <div className={styles.Khuvuc}>B</div>
            </div>
            <div className={styles.ToolInfo}>
              <div className={styles.ToolLabel}>Sức chứa trooler:</div>
              <div className={styles.ToolName}>100</div>
            </div>
          </div>

          <div className={styles.JanitorTaskInfo}>
            <div className={styles.TaskTime}>
              <div className={styles.TimeLabel}>Thời gian:</div>
              <div className={styles.TaskTime}>7:30 - 9</div>
            </div>
            <div className={styles.VungInfo}>
              <div className={styles.LocationLabel}>Vùng:</div>
              <div className={styles.Location__Label}>A</div>
              <div className={styles.KhuvucLabel}>Khu vưc:</div>
              <div className={styles.Khuvuc}>B</div>
            </div>
            <div className={styles.ToolInfo}>
              <div className={styles.ToolLabel}>Sức chứa trooler:</div>
              <div className={styles.ToolName}>100</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;
