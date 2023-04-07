import React from "react";
import "../TaskAssignment/edittask.scss";
import { Link } from "react-router-dom";

export default function EditTask(props) {
  const ongke = (x) => {
    let temp = {
      employees: document.getElementById("inputEmployee").value,
      area: document.getElementById("inputArea").value,
      date: document.getElementById("inputDate").value,
      time: document.getElementById("inputTime").value,
      // 'img': document.getElementById('inputEmployees'),
      // 'distance': document.getElementById('inputDistance')
      distance: 30, // document.getElementById('inputDistance')
    };
    let temp2 = props.data;
    temp2.tasks[props.index] = temp;
    props.updatedData(temp2);
  };
  const infoArea = props.data.area[props.index] || {
    curRecycle: 15,
    totalRecycle: 30,
    avgGarbage: 5,
    speed: 12,
  };

  const obj = props.data.tasks[props.index] || {
    area: "Khu vực 1",
    employees: "A",
    date: "2022-12-12",
    time: "14:00:00",
  };
  const employeessss = props.data.employees;

  const rangmadoc = props.data.area;

  const selectValue = {
    area: ["Khu vực 1", "Khu vực 2", "Khu vực 3"],
    employees: ["A", "B", "C", "D", "E"],
  };

  return (
    <div className="main-edit">
      <div className="main-table">
        <div className="title">
          <p>Sửa nhiệm vụ</p>
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

          <div className="mid">
            <p>Hiện tại</p>
            <label for="my-select">Khu vực:</label>
            <input type="text" value={obj.area} />
            <label for="my-select">Nhân viên:</label>
            <input id="my-select" value={obj.employees} />
            <label for="my-select">Ngày:</label>
            <input type="date" value={obj.date} />
            <label for="my-select">Giờ:</label>
            <input type="time" value={obj.time} />
          </div>

          <div className="right">
            <p>Sửa đổi</p>
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
            <Link to="/tasks">
              <button className="b2" onClick={ongke}>
                Lưu
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
