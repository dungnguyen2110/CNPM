import React from "react";
import '../TaskAssignment/addtask.scss'
import { Link } from "react-router-dom";

export default function AddTask(){
    const infoArea = {
        curRecycle: 15,
        totalRecycle: 30,
        avgGarbage: 5,
        speed: 12
    }
    const selectValue={
        area: ["Khu vực 1", "Khu vực 2", "Khu vực 3"],
        employees: ["A", "B", "C", "D", "E"]
    }

    return(
        <div className="main-add">
            <div className="main-table">
                <div className="title">
                    <p>Tạo nhiệm vụ</p>
                    <p>Janitor</p>
                </div>
                <div className="content">
                    <div className="left">
                        <p>Thông tin khu vực:</p>
                       <ul>
                            <li>
                                <p className="text">Số lượng thùng rác còn lại:</p>
                                <p className="value">{infoArea.totalRecycle-infoArea.curRecycle} / {infoArea.totalRecycle}</p>
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
                        <select id="my-select" name="my-select">
                            {selectValue.area.map(value => 
                                <option value={value}>{value}</option>)
                            }
                        </select>
                        <label for="my-select">Nhân viên:</label>
                        <select id="my-select" name="my-select">
                            {selectValue.employees.map(value => 
                                <option value={value}>{value}</option>)
                            }
                        </select>
                        <label for="my-select">Ngày:</label>
                        <input type="date" />
                        <label for="my-select">Giờ:</label>
                        <input type="time" />
                    </div> 
                </div>
                <div className="control">
                    <div className="container">
                    <Link to='/tasks'><button className="b1">  Trở lại</button></Link>
                    <button className="b2">Tiếp tục với Controller</button>
                    <button className="b3">Xác nhận thêm</button>
                    </div>
                </div>
            </div>
        </div>
    )
}