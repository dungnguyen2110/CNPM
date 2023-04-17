import styles from "./InfoOverviewMapDetail.module.scss";
import HeaderTable from "../HeaderTable";
import { Link } from "react-router-dom";
import images from "../../../../assets/images";
import { useState } from "react";
import Initmap from "./initmap.js";
import Operation from "./OperationOnMap.js";
import Routing from "./routing";
import SearchModule from "./searh-module";
function regionInfo(nameRegion, area) {
  return (
    <div className={styles.regionInfo}>
      <Link to="/map/" className={styles.arrowback}>
        <img width="40" height="30" src={images.arrowback} alt="Trở lại"></img>
      </Link>
      <div className={styles.regionInfoElement}>
        <span className={styles.pdr10}>Tên vùng:</span>
        <span>{nameRegion}</span>
      </div>
      <div className={styles.regionInfoElement}>
        <span className={styles.pdr10}>Diện tích</span>
        <span>{area}</span>
      </div>
    </div>
  );
}

function infoElement(attr, value, isLink) {
  return (
    <div className={styles.infoElement}>
      <span>{attr}</span>
      <span>{value}</span>
      {isLink && (
        <Link className={styles.viewInfo} to="/employee/detail">
          Xem thông tin
        </Link>
      )}
    </div>
  );
}

function btnRoad(name1, class1, name2, class2) {
  return (
    <div className={`${styles.RouteBtns} ${styles.mt16}`}>
      <button className={`${styles.RouteBtn} ${styles.leftBtn} ${class1}`}>
        {name1}
      </button>
      <button className={`${styles.RouteBtn} ${styles.rightBtn} ${class2}`}>
        {name2}
      </button>
    </div>
  );
}

function MDetail(props) {
  const { data } = props;
  //Lấy thông tin vùng
  const nameRegion = data.regions[0].name;
  const areaRegion = data.regions[0].area;

  const [tasks, setTasks] = useState(data.taskCollector);
  // console.log(tasks);
  // console.log(tasks.length);

  // const infoElements = [
  //   infoElement("Người thu gom:", nameCollector, true),
  //   infoElement("Thời gian:", time),
  //   infoElement("Chu trình:", route),
  //   infoElement("Quảng đường", distance + "km"),
  // ];

  return (
    <div>
      <HeaderTable />

      <div className={styles.container}>
        {regionInfo(nameRegion, areaRegion + "km^2")}

        <div className={styles.regionContainer}>
          <Link to="/infotask">Qua trang add task</Link>
          <div className={styles.regionTask}>
            <div className={styles.headerTitle}>Thông tin nhiệm vụ</div>
            {tasks.length === 0 ? (
              <div className={styles.taskEmpty}>
                <div className={styles.mt10}>Vùng này không có Collector</div>
                <Link to="/addtaskcollector" className={styles.addTask}>
                  <img
                    className={styles.pdr10}
                    src={images.addicon}
                    alt="Thêm nhiệm vụ"
                  ></img>
                  Thêm nhiệm vụ
                </Link>
              </div>
            ) : (
              <div className={styles.taskInfo}>
                <div className={styles.infoElements}>
                  <div className={styles.infoElement}>
                    <span>Người thu gom</span>
                    <span>{tasks[0].employees}</span>
                    {/* {console.log(tasks[0].employees)} */}
                    <Link className={styles.viewInfo} to="/employee/detail">
                      Xem thông tin
                    </Link>
                  </div>
                  <div className={styles.infoElement}>
                    <span>Thời gian</span>
                    <span>{tasks[0].time[0]}</span>
                  </div>
                  <div className={styles.infoElement}>
                    <span>Chu trình</span>
                    <span>{tasks.route}</span>
                  </div>
                  <div className={styles.infoElement}>
                    <span>Quảng đường</span>
                    <span>{tasks[0].distance}</span>
                  </div>
                </div>
                <hr className={styles.line} />

                {btnRoad(
                  "Bắt đầu",
                  "Routing_btn",
                  "Xóa chu trình",
                  "Clear-route_btn"
                )}
                {btnRoad(
                  "Trở lại",
                  "Undo_btn",
                  "kết thúc",
                  "Finish-routing_btn"
                )}

                <hr className={styles.line} />
                {btnRoad(
                  "Tối ưu chu trình",
                  "Optimize_btn",
                  "Thoát",
                  "Exit-routing_btn"
                )}

                <div
                  className={`${styles.RouteBtn} ${styles.leftBtn} ${styles.deleteBtn}`}
                >
                  Xóa nhiệm vụ
                </div>

                {/* <div>Tự động</div> */}

                <button value="Quận 1" id="Quan1">
                  Quan1
                </button>
                <button value="Quận 3" id="Quan3">
                  Quan3
                </button>
                <button value="Quận 5" id="Quan5">
                  Quan5
                </button>

                {/* <button className="Routing_btn">Start routing</button>
                <button className="Clear-route_btn">Clear routes</button>
                <button className="Undo_btn">Undo</button>
                <button className="Optimize_btn">optimize</button>
                <button className="Finish-routing_btn">Finish routing</button>
                <button className="Exit-routing_btn">Exit routing</button> */}

                <div className="form">
                  <button id="search-btn">Search location</button>
                  <input type="text" id="search-location" list="suggestions" />
                  <datalist id="suggestions"></datalist>
                </div>
              </div>
            )}
          </div>

          <div className={styles.regionMap}>
            <div className={styles.headerTitle}>Bản đồ vùng</div>
            <div
              style={{ width: "90%", height: "100%" }}
              id="mapContainer"
            ></div>
          </div>
          <Initmap />
          <Operation />
          <Routing />
          <SearchModule />
        </div>
      </div>
    </div>
  );
}

export default MDetail;
