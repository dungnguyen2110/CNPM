import React from "react";
import "../TaskAssignment/infotask.scss";
import { Link } from "react-router-dom";
import Initmap from "../Layouts/components/InfoOverviewMapDetail/initmap";
export default function InfoTask(props) {
  const { data, index, updatedata, setIndex } = props;
  console.log(updatedata, setIndex);
  console.log(data);
  console.log(data[index]);
  console.log(data.tasks);
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
  const infoArea = data
    ? data.area[index]
    : {
        curRecycle: 15,
        totalRecycle: 30,
        avgGarbage: 5,
        speed: 12,
      };

  return (
    <div className="main-info">
      <div className="main-table">
        <div className="title">
          <p>Tạo nhiệm vụ cho Janitor</p>
        </div>
        <div className="content">
          <div className="left">
            <label htmlFor="my-select">Khu vực:</label>
            <input type="text" value={obj.area} />
            <label htmlFor="my-select">Nhân viên:</label>
            <input id="my-select" value={obj.employees} />

            <label htmlFor="my-select">Ngày:</label>
            <input type="date" value={obj.date} />
            <label htmlFor="my-select">Giờ:</label>
            <input type="time" value={obj.time} />
            <label htmlFor="my-select">Giờ bắt đầu:</label>
            <input type="time" value={obj.time} />
            <label htmlFor="my-select">Giờ kết thúc</label>
            <input type="time" value={obj.time} />
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
            <Link to="/map/detail">
              <button className="b1">Trở về</button>
            </Link>
          </div>
        </div>
      </div>
      <Initmap />
    </div>
  );
}
