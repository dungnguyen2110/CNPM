import React from "react";
import { useEffect } from "react";
import "../TaskAssignment/addtask.scss";
import { Link } from "react-router-dom";
import Initmap from "../Layouts/components/InfoOverviewMapDetail/initmap";
import SearchModule, {
  valueInputSearch,
} from "../Layouts/components/InfoOverviewMapDetail/searh-module";
import Operation from "../Layouts/components/InfoOverviewMapDetail/OperationOnMap";
import Routing from "../Layouts/components/InfoOverviewMapDetail/routing";
// import { useEffect } from "react";

function getInputValue() {
  // const a = valueInputSearch;
  // console.log(valueInputSearch);
  // console.log(getInputValueSearch());
}

export default function AddTaskJanitor(props) {
  useEffect(() => {
    console.log(1);
    console.log(valueInputSearch);
    console.log(2);
  });
  const { data, index, updatedata, setIndex } = props;
  console.log(updatedata, setIndex);
  console.log(data);
  console.log(data[index]);
  console.log(data.tasks);
  const dataArea = props.data.area;
  const infoArea = props.data
    ? props.data.area[props.index]
    : {
        curRecycle: 15,
        totalRecycle: 30,
        avgGarbage: 5,
        speed: 12,
      };

  const employeessss = props.data.employees;
  // console.log(data.task[index]);
  // let obj = data.tasks[index] || {
  let obj = {
    area: "Khu vực 1",
    employees: "A",
    date: "1999-12-12",
    time: "14:00:00",
    timeEnd: "16:00:00",
    img: "../",
  };
  if (data) obj = { ...obj, area: data.area[index].name };
  // const infoArea = data
  //   ? data.area[index]
  //   : {
  //       curRecycle: 15,
  //       totalRecycle: 30,
  //       avgGarbage: 5,
  //       speed: 12,
  //     };

  const Save = (event) => {
    // event.preventDefault();
    let temp = {
      employees: document.getElementById("inputEmployee").value,
      area: valueInputSearch,
      date: document.getElementById("inputDate").value,
      time: [document.getElementById("inputTime").value],
      timeEnd: [document.getElementById("inputEndTime").value],
      // location: valueInputSearch,
      img: document.getElementById("inputEmployees"),
      distance: document.getElementById("inputDistance"),
      distance: 30, // document.getElementById('inputDistance')
    };
    console.log(temp);
    let ule = [...props.data.tasks];
    console.log(ule);
    // console.log(ule)
    ule.push(temp);
    console.log(ule);
    let temp2 = props.data;
    console.log(ule);
    // if (temp2===temp3) props.data.task=[]
    temp2.tasks = ule;
    props.updatedData(temp2);
  };

  return (
    <div className="main-info">
      <div className="main-table">
        <div className="title">
          <div>Tạo nhiệm vụ</div>
          <div>Janitor</div>
        </div>
        <div className="content">
          <div className="left">
            <label id="search-btn">Khu vực</label>

            <input
              placeholder="Nhập tên khu vực"
              id="search-location"
              list="suggestions"
            />
            {/* {console.log(document.getElementById("search-location"))} */}
            <datalist id="suggestions"></datalist>
            {getInputValue()}

            <label htmlFor="my-select">Nhân viên:</label>
            <select id="inputEmployee" name="my-select">
              <option value={""}>-- Chọn nhân viên --</option>
              {employeessss.map((value, index) => (
                <option key={index} value={value.name}>
                  {value.name}
                </option>
              ))}
            </select>

            <label htmlFor="my-select">Ngày:</label>
            <input type="date" id="inputDate" />
            <label htmlFor="my-select">Giờ bắt đầu:</label>
            <input type="time" id="inputTime" />
            <label htmlFor="my-select">Giờ kết thúc</label>
            <input type="time" id="inputEndTime" />
          </div>
          <div className="right">
            {/* <div className="img-map" src={obj.img} alt=" Đây là cái map"></div> */}
            <div id="mapContainer" className="img-map"></div>

            <p>Thông tin khu vực:</p>
            <ul>
              <li>
                <p className="text">Số lượng thùng rác còn lại:</p>
                <p className="value">
                  {infoArea.totalRecycle - infoArea.curRecycle} /{" "}
                  {infoArea.totalRecycle}
                </p>
              </li>
              <li>
                <p className="text">Lượng rác trung bình:</p>
                <p className="value">{infoArea.avgGarbage} kg/h</p>
              </li>
              <li>
                <p className="text">Tốc độ dọn rác trung bình:</p>
                <p className="value">{infoArea.speed} kg/người/giờ</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="control">
          <div className="container">
            <Link to="/taskJanitor" onClick={Save}>
              <button className="back">Trở lại</button>
            </Link>

            <Link to="/taskJanitor" onClick={Save}>
              <button className="save">Xác nhận thêm</button>
            </Link>
          </div>
        </div>
      </div>
      <Initmap />
      <SearchModule />
    </div>
  );
}
