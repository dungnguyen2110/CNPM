import styles from "./InfoOverviewMapDetail.module.scss";
import HeaderTable from "../HeaderTable";
import { Link } from "react-router-dom";
import images from "../../../../assets/images";
import { useState, useEffect } from "react";
import Initmap, { current_focus } from "./initmap.js";
import Operation from "./OperationOnMap.js";
import Routing from "./routing";
import SearchModule from "./searh-module";
import { getRoutesbyDistrict, mapElements } from "./MapElement";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function regionInfo(nameRegion, area) {
  return (
    <div className={`${styles.regionInfo} regionInfo`}>
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
  console.log(dataDistrict);

  const name = dataDistrict[0].name;
  const address = dataDistrict[0].address;
  console.log(dataDistrict);
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
  let count = 0;

  const { data } = props;
  //Lấy thông tin vùng
  const nameRegion = data.regions[0].name;
  const areaRegion = data.regions[0].area;

  //Xử lý việc drop button chọn quận
  const [regionSelected, setregionSelected] = useState("Quận");

  // Thay đổi giá trị của state khi người dùng chọn một quận

  const tasks = data.taskCollectors;

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

  const [taskCollector, setTaskCollector] = useState(tasks);

  let filterTaskWithRegion = tasks.filter(
    (task) => task.region === regionSelected
  );

  function abc() {
    // let actionD = document.querySelector(".actionD");
    // if (actionD) {
    //   if (filterTaskWithRegion.length > 0) {
    //     actionD.style.display = "block";
    //   } else {
    //     actionD.style.display = "none";
    //   }
    // }
    // console.log(actionD);
  }
  const dataDistrict = getRoutesbyDistrict(current_focus) || [
    { name: "", address: "" },
  ];

  return (
    <div className={styles.wrap}>
      <HeaderTable />

      <div className={styles.container}>
        <div className={`${styles.title} title`}>
          Bản đồ hiển thị các quận làm việc
        </div>
        {regionInfo(regionSelected, areaRegion + "km^2")}

        <div className={styles.regionContainer}>
          <div className={`${styles.regionTask} regionContainer`}>
            <div className={styles.headerTitle}>Thông tin nhiệm vụ</div>

            {filterTaskWithRegion.length === 0 ? (
              <div className={`${styles.taskEmpty} task`}>
                <div style={{ display: "none" }}>{(count = 2)}</div>
                <div className={styles.mt10}>Vùng này không có Collector</div>
                <Link to="/addtaskcollector" className={styles.addTask}>
                  <img
                    className={styles.pdr10}
                    src={images.addicon}
                    alt="Thêm thu gom"
                  ></img>
                  Thêm thu gom
                </Link>
                <Link to="/addTaskJanitor" className={styles.addTask}>
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
                <div style={{ display: "none" }}>{(count = 1)}</div>

                <div className={styles.infoElements}>
                  <div className={styles.infoElement}>
                    <span>Người thu gom</span>

                    <span id="abc">{filterTaskWithRegion[0].lastName}</span>

                    <Link
                      className={styles.viewInfo}
                      to="/employee/detail"
                      state={{ cccd: filterTaskWithRegion[0].cccd }}
                    >
                      Xem thông tin
                    </Link>
                  </div>
                  <div className={styles.infoElement}>
                    <span>Thời gian</span>
                    <span>
                      {`${filterTaskWithRegion[0].timeStart} -> ${filterTaskWithRegion[0].timeEnd[0]}`}
                    </span>
                  </div>
                  <div className={styles.infoElement}>
                    <span>Loại xe</span>
                    <span>{filterTaskWithRegion[0].type} tấn</span>
                  </div>

                  <div
                    className={styles.infoElement}
                    style={{ display: "block" }}
                  >
                    <span>Chu trình</span>

                    {handleDisplayRoute(dataDistrict)}
                  </div>
                </div>
              </div>
            )}
            <div
              style={count === 1 ? { display: "block" } : { display: "none" }}
              className={`${styles.action}`}
            >
              {console.log(count)}
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
            {/* {abc()} */}
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
          <Routing />

          {/* {shouldRenderRouting && <Routing />} */}
          <SearchModule />
        </div>
      </div>
    </div>
  );
}

export default MDetail;

// import styles from "./InfoOverviewMapDetail.module.scss";
// import HeaderTable from "../HeaderTable";
// import { Link } from "react-router-dom";
// import images from "../../../../assets/images";
// import { useState } from "react";
// import Initmap from "./initmap.js";
// import Operation from "./OperationOnMap.js";
// import Routing from "./routing";
// import SearchModule from "./searh-module";
// function regionInfo(nameRegion, area) {
//   return (
//     <div className={styles.regionInfo}>
//       <Link to="/map/" className={styles.arrowback}>
//         <img width="40" height="30" src={images.arrowback} alt="Trở lại"></img>
//       </Link>
//       <div className={styles.regionInfoElement}>
//         <span className={styles.pdr10}>Tên vùng:</span>
//         <span>{nameRegion}</span>
//       </div>
//       <div className={styles.regionInfoElement}>
//         <span className={styles.pdr10}>Diện tích</span>
//         <span>{area}</span>
//       </div>
//     </div>
//   );
// }

// function infoElement(attr, value, isLink) {
//   return (
//     <div className={styles.infoElement}>
//       <span>{attr}</span>
//       <span>{value}</span>
//       {isLink && (
//         <Link className={styles.viewInfo} to="/employee/detail">
//           Xem thông tin
//         </Link>
//       )}
//     </div>
//   );
// }

// function btnRoad(name1, class1, name2, class2) {
//   return (
//     <div className={`${styles.RouteBtns} ${styles.mt16}`}>
//       <button className={`${styles.RouteBtn} ${styles.leftBtn} ${class1}`}>
//         {name1}
//       </button>
//       <button className={`${styles.RouteBtn} ${styles.rightBtn} ${class2}`}>
//         {name2}
//       </button>
//     </div>
//   );
// }

// function MDetail(props) {
//   const { data } = props;
//   //Lấy thông tin vùng
//   const nameRegion = data.regions[0].name;
//   const areaRegion = data.regions[0].area;

//   const [tasks, setTasks] = useState(data.taskCollector);
//   // console.log(tasks);
//   // console.log(tasks.length);

//   // const infoElements = [
//   //   infoElement("Người thu gom:", nameCollector, true),
//   //   infoElement("Thời gian:", time),
//   //   infoElement("Chu trình:", route),
//   //   infoElement("Quảng đường", distance + "km"),
//   // ];
//   {
//   }

//   return (
//     <div>
//       <HeaderTable />
//       <div className={styles.container}>
//         {regionInfo(nameRegion, areaRegion + "km^2")}

//         <div className={styles.regionContainer}>
//           <Link to="/infotask">Qua trang add task</Link>
//           <div className={styles.regionTask}>
//             <div className={styles.headerTitle}>Thông tin nhiệm vụ</div>
//             {tasks.length === 0 ? (
//               <div className={styles.taskEmpty}>
//                 <div className={styles.mt10}>Vùng này không có Collector</div>
//                 <Link to="/addtaskcollector" className={styles.addTask}>
//                   <img
//                     className={styles.pdr10}
//                     src={images.addicon}
//                     alt="Thêm nhiệm vụ"
//                   ></img>
//                   Thêm nhiệm vụ
//                 </Link>
//               </div>
//             ) : (
//               <div style={{ display: "flex" }} className={styles.taskInfo}>
//                 <div className={styles.infoElements}>
//                   <div className={styles.infoElement}>
//                     <span>Người thu gom</span>
//                     <span>{tasks[0].employees}</span>
//                     {/* {console.log(tasks[0].employees)} */}
//                     <Link className={styles.viewInfo} to="/employee/detail">
//                       Xem thông tin
//                     </Link>
//                   </div>
//                   <div className={styles.infoElement}>
//                     <span>Thời gian</span>
//                     <span>{tasks[0].time[0]}</span>
//                   </div>
//                   <div className={styles.infoElement}>
//                     <span>Chu trình</span>
//                     <span>{tasks.route}</span>
//                   </div>
//                   <div className={styles.infoElement}>
//                     <span>Quảng đường</span>
//                     <span>{tasks[0].distance}</span>
//                   </div>
//                 </div>
//                 <hr className={styles.line} />
//                 {btnRoad(
//                   "Bắt đầu",
//                   "Routing_btn",
//                   "Xóa chu trình",
//                   "Clear-route_btn"
//                 )}
//                 {btnRoad(
//                   "Trở lại",
//                   "Undo_btn",
//                   "kết thúc",
//                   "Finish-routing_btn"
//                 )}
//                 <hr className={styles.line} />
//                 {btnRoad(
//                   "Tối ưu chu trình",
//                   "Optimize_btn",
//                   "Thoát",
//                   "Exit-routing_btn"
//                 )}
//                 <div
//                   className={`${styles.RouteBtn} ${styles.leftBtn} ${styles.deleteBtn}`}
//                 >
//                   Xóa nhiệm vụ
//                 </div>
//                 {/* <div>Tự động</div> */}
//                 <button value="Quận 1" id="Quan1">
//                   Quan1
//                 </button>
//                 <button value="Quận 3" id="Quan3">
//                   Quan3
//                 </button>
//                 <button value="Quận 5" id="Quan5">
//                   Quan5
//                 </button>
//                 {/* <button className="Routing_btn">Start routing</button>
//                 <button className="Clear-route_btn">Clear routes</button>
//                 <button className="Undo_btn">Undo</button>
//                 <button className="Optimize_btn">optimize</button>
//                 <button className="Finish-routing_btn">Finish routing</button>
//                 <button className="Exit-routing_btn">Exit routing</button> */}
//                 <div className="form">
//                   <button id="search-btn">Search location</button>
//                   <input type="text" id="search-location" list="suggestions" />
//                   <datalist id="suggestions"></datalist>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className={styles.regionMap}>
//             <div className={styles.headerTitle}>Bản đồ vùng</div>
//             <div
//               style={{ width: "90%", height: "100%" }}
//               id="mapContainer"
//             ></div>
//           </div>
//           <Initmap />
//           <Operation />
//           <Routing />
//           <SearchModule />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MDetail;
