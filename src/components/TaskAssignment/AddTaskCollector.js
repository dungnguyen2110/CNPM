import React from "react";
import "../TaskAssignment/addtask.scss";

import { Link } from "react-router-dom";
import Initmap, {
  current_focus,
} from "../Layouts/components/InfoOverviewMapDetail/initmap";
import SearchModule from "../Layouts/components/InfoOverviewMapDetail/searh-module";

export default function AddTaskCollector(props) {
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

  const collector = props.data.employees.filter(
    (employee) => employee.role === "Thu gom rác"
  );

  const typeVehicle = props.data.typeVehicle;
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
    setIndex(index + 1);
    let valueSelectEmployee = document.getElementById("inputEmployee").value;
    let type = document.getElementById("inputType").value;
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

    let temp = {
      index: index,
      cccd: cccd,
      fullName: fullName,
      lastName: lastName,
      type: Number(type),
      date: date,
      timeStart: startTime,
      timeEnd: endTime,
      region: current_focus.name,
      distance: 30,
    };

    let ule = [...props.data.taskCollectors];
    // console.log(ule)
    ule.push(temp);
    let temp2 = props.data;
    // if (temp2===temp3) props.data.task=[]
    temp2.taskCollectors = ule;
    props.updatedData(temp2);
  };

  return (
    <div className="main-info">
      <div className="main-table">
        <div className="title">
          <div>Tạo nhiệm vụ</div>
          <div>Collector</div>
        </div>
        <div className="content">
          <div className="left">
            <label htmlFor="my-select">Nhân viên:</label>
            <select id="inputEmployee" name="my-select">
              <option value={""}>-- Chọn nhân viên --</option>
              {collector.map((value) => (
                <option key={value.cccd} value={value.cccd + ";" + value.name}>
                  {value.name}
                </option>
              ))}
            </select>

            <label htmlFor="my-select">Loại xe</label>
            <select id="inputType" name="my-select">
              <option value={""}>-- Chọn loại xe --</option>
              {typeVehicle.map((value, index) => (
                <option key={index} value={value.type}>
                  {value.type} tấn
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

            <p>Thông tin quận</p>
            <ul>
              <li>
                <p className="text">Số lượng xe gom rác còn lại:</p>
                <p className="value">
                  {infoArea.totalRecycle - infoArea.curRecycle} /{" "}
                  {infoArea.totalRecycle}
                </p>
              </li>
              <li>
                <p className="text">Thời gian qua các MCP theo chu trình</p>
                <p className="value"> 2h</p>
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
            <Link to="/map">
              <button className="back">Trở lại</button>
            </Link>

            <Link to="/map" onClick={Save}>
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
