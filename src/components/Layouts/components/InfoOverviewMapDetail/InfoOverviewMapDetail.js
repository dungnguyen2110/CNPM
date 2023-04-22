import styles from "./InfoOverviewMapDetail.module.scss";
import HeaderTable from "../HeaderTable";
import { Link } from "react-router-dom";
import images from "../../../../assets/images";
import { useState, useEffect, useRef } from "react";
import Initmap, { current_focus } from "./initmap.js";
import Operation from "./OperationOnMap.js";
import Routing from "./routing";
import SearchModule, { getInputValueSearch } from "./searh-module";
import { getRoutesbyDistrict } from "./MapElement";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import DropdownButton from "react-bootstrap/DropdownButton";

function regionInfo(nameRegion, area) {
  // console.log(current_focus);
  return (
    <div className={`${styles.regionInfo} regionInfo`}>
      {/* <Link to="/map/" className={styles.arrowback}>
        <img width="40" height="30" src={images.arrowback} alt="Trở lại"></img>
      </Link> */}
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

function handleDisplayAction() {
  let displayActionMap = document.querySelector(".displayActionMap");
  displayActionMap.style.display = "block";
}

function handleExitRouting() {
  let displayActionMap = document.querySelector(".displayActionMap");
  displayActionMap.style.display = "none";
}

function handleDisplayRoute(dataDistrict) {
  const name = dataDistrict[0].name;
  const address = dataDistrict[0].address;

  return (
    <div>
      {dataDistrict.map((district, index) => (
        <div key={index}>
          {district.name} : {district.address}
          <hr />
        </div>
      ))}
    </div>
  );
}

function MDetail(props) {
  const { data } = props;
  //Lấy thông tin vùng
  const nameRegion = data.regions[0].name;
  const areaRegion = data.regions[0].area;

  //Xử lý việc drop button chọn quận
  const [regionSelected, setregionSelected] = useState("Quận");

  // Thay đổi giá trị của state khi người dùng chọn một quận

  const tasks = data.taskCollector;
  // const [tasks, setTasks] = useState(data.taskCollector);
  // console.log(tasks);
  const handleItemClick = (value) => {
    let regionInfo = document.querySelector(".regionInfo");
    let title = document.querySelector(".title");
    var routing_Btn = document.querySelector(".Routing_btn");

    let task = document.querySelector(".task");
    regionInfo.style.display = "flex";
    title.style.display = "none";
    task.style.display = "flex";

    setregionSelected(value);
  };
  // let taskCollector = [{ e: "1" }];
  const a = tasks.filter((task) => task.region === regionSelected);
  const [taskCollector, setTaskCollector] = useState([]);
  const [shouldRenderRouting, setShouldRenderRouting] = useState(true);
  useEffect(() => {
    const newTaskCollector = tasks.filter(
      (task) => task.region === regionSelected
    );
    setTaskCollector(newTaskCollector);
    if (shouldRenderRouting) {
    }

    setShouldRenderRouting(!shouldRenderRouting);
  }, [tasks, regionSelected]);

  // taskCollector = tasks.filter((task) => task.region === regionSelected);

  // let dataDistrict = [{ name: "123", address: "234" }];

  const dataDistrict = getRoutesbyDistrict(current_focus) || [
    { name: "", address: "" },
  ];

  // console.log(dataDistrict);

  const name = dataDistrict[0].name;
  const address = dataDistrict[0].address;

  // console.log(name, address);

  // let task = tasks.filter(tasks.region === regionSelected);
  // const a = getRoutesbyDistrict(current_focus);
  return (
    <div className={styles.wrap}>
      <HeaderTable />

      <div className={styles.container}>
        <div className={`${styles.title} title`}>
          Bản đồ hiển thị các quận làm việc
        </div>
        {regionInfo(regionSelected, areaRegion + "km^2")}

        <div className={styles.regionContainer}>
          <div className={styles.regionTask}>
            <div className={styles.headerTitle}>Thông tin nhiệm vụ</div>
            {taskCollector.length === 0 ? (
              <div className={`${styles.taskEmpty} task`}>
                <div className={styles.mt10}>Vùng này không có Collector</div>
                <Link to="/addtaskcollector" className={styles.addTask}>
                  <img
                    className={styles.pdr10}
                    src={images.addicon}
                    alt="Thêm thu gom"
                  ></img>
                  Thêm thu gom
                </Link>
                <Link to="/infotask" className={styles.addTask}>
                  <img
                    className={styles.pdr10}
                    src={images.addicon}
                    alt="Thêm nhiệm vụ"
                  ></img>
                  Thêm nhiệm vụ
                </Link>
              </div>
            ) : (
              <div className={`${styles.taskInfo} task`}>
                <div className={styles.infoElements}>
                  <div className={styles.infoElement}>
                    <span>Người thu gom</span>

                    <span>{taskCollector[0].employees}</span>
                    {/* {console.log(tasks[0].employees)} */}
                    <Link className={styles.viewInfo} to="/employee/detail">
                      Xem thông tin
                    </Link>
                  </div>
                  <div className={styles.infoElement}>
                    <span>Thời gian</span>
                    <span>
                      {`${taskCollector[0].timeStart} -> ${tasks[0].timeEnd[0]}`}
                    </span>
                  </div>
                  <div
                    className={styles.infoElement}
                    style={{ display: "block" }}
                  >
                    <span>Chu trình</span>

                    {handleDisplayRoute(dataDistrict)}
                  </div>
                  <div className={styles.infoElement}>
                    <span>Sức chứa troller</span>
                    <span>{tasks[0].trollercapacity} tấn</span>
                  </div>
                </div>

                <div className={`${styles.RouteBtns} ${styles.mt16}`}>
                  <button
                    onClick={handleDisplayAction}
                    className={`${styles.RouteBtn} ${styles.leftBtn} ${
                      styles.editColor
                    } ${"Routing_btn"}`}
                  >
                    <img
                      className={`${styles.ml10} ${styles.icon} `}
                      src={images.editicon}
                      alt="Chỉnh sửa"
                    ></img>
                    Chỉnh sửa chu trình
                  </button>

                  <button
                    className={`${styles.RouteBtn} ${styles.rightBtn} ${styles.deleteColor}`}
                  >
                    <img
                      className={`${styles.pdr10} `}
                      src={images.deleteicon}
                      alt="Xóa nhiệm vụ"
                    ></img>
                    Xóa nhiệm vụ
                  </button>
                </div>

                <Link to="/addTaskJanitor" className={styles.addTask}>
                  <img
                    className={`${styles.pdr10} ${styles.ml10}${styles.icon}`}
                    src={images.addicon}
                    alt="Thêm nhiệm vụ"
                  ></img>
                  Thêm nhiệm vụ
                </Link>
              </div>
            )}
          </div>
          <div className={styles.regionMap}>
            <div className={styles.headerTitle}>Bản đồ vùng</div>
            <div className={styles.containerMap}>
              <div className={styles.actionMap}>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {regionSelected}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        onClick={() => handleItemClick("Quận 1")}
                        value="Quận 1"
                        id="Quan1"
                        className="dropdown-item"
                      >
                        Quận 1
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleItemClick("Quận 3")}
                        value="Quận 3"
                        id="Quan3"
                        className="dropdown-item"
                      >
                        Quận 3
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleItemClick("Quận 5")}
                        value="Quận 5"
                        id="Quan5"
                        className="dropdown-item"
                      >
                        Quận 5
                      </button>
                    </li>
                  </ul>
                </div>

                <div className={`${styles.actionRouting} displayActionMap`}>
                  {/* <div className={`${styles.buttonRouting} ${"Routing_btn"}`}>
                    Bắt đầu routing
                  </div> */}
                  <div
                    className={`${styles.buttonRouting} ${"Clear-route_btn"}`}
                  >
                    Xóa
                  </div>
                  <div className={`${styles.buttonRouting} ${"Undo_btn"}`}>
                    Trở lại
                  </div>
                  <div
                    className={`${
                      styles.buttonRouting
                    } ${"Finish-routing_btn"}`}
                  >
                    Kết thúc
                  </div>
                  <div className={`${styles.buttonRouting} ${"Optimize_btn"}`}>
                    Tối ưu
                  </div>
                  <div
                    onClick={handleExitRouting}
                    className={`${styles.buttonRouting} ${"Exit-routing_btn"}`}
                  >
                    Thoát
                  </div>
                </div>
              </div>
              <div
                className={styles.mapContainer}
                style={{ width: "90%", height: "100%" }}
                id="mapContainer"
              ></div>
            </div>
          </div>
          <Initmap />
          <Operation />

          {shouldRenderRouting && <Routing />}
          <SearchModule />
        </div>
      </div>
    </div>
  );
}

export default MDetail;
