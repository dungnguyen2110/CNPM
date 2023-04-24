import React from "react";
import { useEffect, useState } from "react";
import "../TaskAssignment/addtask.scss";
import { Link } from "react-router-dom";
import Initmap, {
  current_focus,
  setCurrentFocus,
} from "../Layouts/components/InfoOverviewMapDetail/initmap";
import {
  mapElement,
  mapElements,
} from "../Layouts/components/InfoOverviewMapDetail/MapElement";

import SearchModule, {
  valueInputSearch,
  coor,
} from "../Layouts/components/InfoOverviewMapDetail/searh-module";
import Operation from "../Layouts/components/InfoOverviewMapDetail/OperationOnMap";
import Routing from "../Layouts/components/InfoOverviewMapDetail/routing";
// import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function AddTaskJanitor(props) {
  const [regionSelected, setregionSelected] = useState("Chọn quận khác");

  const handleItemClick = (value) => {
    setregionSelected(value);
  };
  const { data, index, updatedata, setIndex } = props;

  const dataArea = props.data.area;
  const infoArea = props.data
    ? props.data.area[props.index]
    : {
        curRecycle: 15,
        totalRecycle: 30,
        avgGarbage: 5,
        speed: 12,
      };
  console.log(infoArea);

  const janitor = props.data.employees.filter(
    (employee) => employee.role === "Quét rác"
  );

  let obj = {
    area: "Khu vực 1",
    employees: "A",
    date: "1999-12-12",
    time: "14:00:00",
    timeEnd: "16:00:00",
    img: "../",
  };
  // if (data) obj = { ...obj, area: data.area[index].name };
  // const infoArea = data
  //   ? data.area[index]
  //   : {
  //       curRecycle: 15,
  //       totalRecycle: 30,
  //       avgGarbage: 5,
  //       speed: 12,
  //     };

  const Save = (even) => {
    setIndex(index + 1);
    let valueSelectEmployee = document.getElementById("inputEmployee").value;
    let cccd, fullName, lastName;
    console.log(valueSelectEmployee);
    if (valueSelectEmployee) {
      cccd = valueSelectEmployee.split(";")[0];
      fullName = valueSelectEmployee.split(";")[1];
      lastName = fullName.split(" ").pop();
    }

    let date = document.getElementById("inputDate").value;
    let startTime = [document.getElementById("inputStartTime").value];
    let endTime = [document.getElementById("inputEndTime").value];
    let indexFirstComma, location;
    if (valueInputSearch) {
      indexFirstComma = valueInputSearch.indexOf(",");
      location = valueInputSearch.slice(0, indexFirstComma);
    }
    let temp = {
      index: index,
      cccd: cccd,
      fullName: fullName,
      lastName: lastName,
      location: location,
      coor: coor,
      date: date,
      timeStart: startTime,
      timeEnd: endTime,
      region: current_focus.name,
      distance: 30,
    };
    let ule = [...props.data.taskJanitors];
    ule.push(temp);
    let temp2 = props.data;
    temp2.taskJanitors = ule;
    props.updatedData(temp2);
    setCurrentFocus(mapElements[0]);
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
              autoComplete="off"
            />
            {/* {console.log(document.getElementById("search-location"))} */}
            <datalist id="suggestions"></datalist>

            <label htmlFor="my-select">Nhân viên:</label>
            <select id="inputEmployee" name="my-select">
              <option value="">-- Chọn nhân viên --</option>

              {janitor.map((value) => (
                <option key={value.cccd} value={value.cccd + ";" + value.name}>
                  {value.name}
                </option>
              ))}
            </select>

            <label htmlFor="my-select">Ngày:</label>
            <input type="date" id="inputDate" />
            <label htmlFor="my-select">Giờ bắt đầu:</label>
            <input type="time" id="inputStartTime" />
            <label htmlFor="my-select">Giờ kết thúc</label>
            <input type="time" id="inputEndTime" />
          </div>
          <div className="right">
            {/* <div className="img-map" src={obj.img} alt=" Đây là cái map"></div> */}
            <div id="mapContainer" className="img-map"></div>
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
            <Link to="/taskJanitor">
              <button className="back">Trở lại</button>
            </Link>

            <Link to="/taskJanitor" onClick={Save}>
              <button className="save">Xác nhận thêm</button>
            </Link>
          </div>
        </div>
      </div>
      <Initmap />
      <Routing />
      {/* <Operation /> */}
      <SearchModule />
    </div>
  );
}
