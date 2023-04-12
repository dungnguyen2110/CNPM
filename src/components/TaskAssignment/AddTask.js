import React from "react";
import "../TaskAssignment/addtask.scss";
import { Link } from "react-router-dom";

export default function AddTask(props) {
  const rangmadoc = props.data.area;
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
  //   console.log(area);
  //   console.log(employees);
  // const selectValue = {
  //   area: area,
  //   employees: employees,
  // };

  const uaalo = (event) => {
    // event.preventDefault();
    let temp = {
      employees: document.getElementById("inputEmployee").value,
      area: document.getElementById("inputArea").value,
      date: document.getElementById("inputDate").value,
      time: document.getElementById("inputTime").value,
      // 'img': document.getElementById('inputEmployees'),
      // 'distance': document.getElementById('inputDistance')
      distance: 30, // document.getElementById('inputDistance')
    };

    console.log(temp);
    let ule = [...props.data.tasks];
    // console.log(ule)
    ule.push(temp);
    let temp2 = props.data;
    // if (temp2===temp3) props.data.task=[]
    temp2.tasks = ule;
    console.log("llllllll", temp2);
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
            <label for="my-select">Khu vực:</label>
            <select id="inputArea" name="my-select" defaultValue="Chọn khu vực">
              <option value={""}>-- Chọn khu vực --</option>
              {rangmadoc.map((value) => (
                <option value={value.name}>{value.name}</option>
              ))}
            </select>
            <label for="my-select">Nhân viên:</label>
            <select id="inputEmployee" name="my-select">
              <option value={""}>-- Chọn nhân viên --</option>
              {employeessss.map((value) => (
                <option value={value.name}>{value.name}</option>
              ))}
            </select>
            <label for="my-select">Ngày:</label>
            <input type="date" id="inputDate" />
            <label for="my-select">Giờ:</label>
            <input type="time" id="inputTime" />
          </div>
        </div>
        <div className="control">
          <div className="container">
            <Link to="/tasks">
              <button className="b1">Hủy</button>
            </Link>
            <Link to="/tasks" onClick={uaalo}>
              <button className="b2">Lưu</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
