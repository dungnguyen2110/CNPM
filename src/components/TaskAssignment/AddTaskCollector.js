import React from "react";
import "../TaskAssignment/addtaskcollector.scss";
import { Link } from "react-router-dom";

export default function AddTaskCollector(props) {
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
  // const employees = props.data
  //   ? props.data.tasks.map((item) => item.employees)
  //   : [];
  // const area = props.data ? props.data.area.map((item) => item.name) : [];
  // const selectValue = {
  //   area: area,
  //   employees: employees,
  // };

  const Save = (event) => {
    // event.preventDefault();
    let temp = {
      employees: document.getElementById("inputEmployee").value,
      // area: document.getElementById("inputArea").value,
      // date: document.getElementById("inputDate").value,
      time: document.getElementById("inputTime").value,
      // 'img': document.getElementById('inputEmployees'),
      // 'distance': document.getElementById('inputDistance')
      distance: 30, // document.getElementById('inputDistance')
    };

    let ule = [...props.data.taskCollector];
    // console.log(ule)
    ule.push(temp);
    let temp2 = props.data;
    // if (temp2===temp3) props.data.task=[]
    temp2.taskCollector = ule;
    props.updatedData(temp2);
  };

  return (
    <div className="main-add">
      <div className="main-table">
        <div className="title">
          <p>Tạo nhiệm vụ</p>
        </div>
        <div className="content">
          <div className="left">
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
          <div className="right">
            <label htmlFor="my-select">Vùng:</label>
            <select id="inputArea" name="my-select" defaultValue="Chọn vùng">
              <option value={""}>-- Chọn vùng --</option>
              {dataArea.map((value, index) => (
                <option key={index} value={value.name}>
                  {value.name}
                </option>
              ))}
            </select>
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
            <label htmlFor="my-select">Giờ:</label>
            <input type="time" id="inputTime" />
          </div>
        </div>
        <div className="control">
          <div className="container">
            <Link to="/map/detail">
              <button className="b1">Hủy</button>
            </Link>
            <Link to="/map/detail" onClick={Save}>
              <button className="b2">Lưu</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
