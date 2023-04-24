import React from "react";
import "../TaskAssignment/edittask.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { convertLegacyProps } from "antd/es/button/button";

export default function EditTask(props) {
  const obj = props.data.taskJanitors[props.index] || {
    area: "Khu vực 1",
    employees: "A",
    date: "2022-12-12",
    time: "14:00:00",
  };
  const navigate = useNavigate();
  const ongke = (x) => {
    let temp = {
      ...obj,
      fullName: obj.fullName,
      location: obj.location,
      coor: obj.coor,
      date: document.getElementById("inputDate").value,
      timeStart: [document.getElementById("inputStartTime").value],
      timeEnd: [document.getElementById("inputEndTime").value],
      // 'img': document.getElementById('inputEmployees'),
      // 'distance': document.getElementById('inputDistance')
      distance: 30, // document.getElementById('inputDistance')
    };
    let temp2 = props.data;
    console.log(temp2);
    temp2.taskJanitors[props.index] = temp;
    props.updatedData(temp2);
  };
  const infoArea = props.data.area[props.index] || {
    curRecycle: 15,
    totalRecycle: 30,
    avgGarbage: 5,
    speed: 12,
  };

  console.log(obj);
  const employeessss = props.data.employees;

  const rangmadoc = props.data.area;

  // const selectValue = {
  //   area: ["Khu vực 1", "Khu vực 2", "Khu vực 3"],
  //   employees: ["A", "B", "C", "D", "E"],
  // };

  return (
    <div className="main">
      <div className="main-table">
        <div className="title">
          <div>Chỉnh sửa nhiệm vụ</div>
          <div>Janitor</div>
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
            <p>Chỉnh sửa</p>
            <label for="my-select">Khu vực:</label>
            <input
              id="inputLocationid"
              disabled
              type="text"
              value={obj.location}
            />
            <label for="my-select">Nhân viên:</label>
            <input disabled id="my-select" value={obj.fullName} />
            <label for="my-select">Ngày:</label>
            <input id="inputDate" type="date" defaultValue={obj.date} />
            <label for="my-select">Giờ bắt đầu:</label>
            <input
              id="inputStartTime"
              type="time"
              defaultValue={obj.timeStart}
            />
            <label for="my-select">Giờ kết thúc:</label>
            <input id="inputEndTime" type="time" defaultValue={obj.timeEnd} />
          </div>

          {/* <div className="right"> */}
          {/* <p>Sửa đổi</p> */}
          {/* <label for="my-select">Khu vực:</label>
            <select id="inputArea" name="my-select" defaultValue="Chọn khu vực">
              <option value={""}>-- Chọn khu vực --</option>
              {rangmadoc.map((value) => (
                <option value={value.name}>{value.name}</option>
              ))}
            </select> */}
          {/* <label for="my-select">Nhân viên:</label>
            <select id="inputEmployee" name="my-select">
              <option value={""}>-- Chọn nhân viên --</option>
              {employeessss.map((value) => (
                <option value={value.name}>{value.name}</option>
              ))}
            </select> */}
          {/* <label for="my-select">Ngày:</label>
            <input type="date" id="inputDate" />
            <label for="my-select">Giờ:</label>
            <input type="time" id="inputTime" /> */}
          {/* </div> */}
        </div>
        <div className="control">
          <div className="container">
            <div onClick={() => navigate(-1)}>
              <button className="b1">Trở lại</button>
            </div>
            <Link to="/taskjanitor">
              <button className="b2" onClick={ongke}>
                Xác nhận chỉnh sửa
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
