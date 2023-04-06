import React from "react";
import { Link } from "react-router-dom";
import '../TaskAssignment/homeTA.scss'
import { useState } from "react";

export default function HomeTA(){
    const [taskslist,setTasklist] = useState([
        {employees: "A", time: "2023-04-04", distance: 30},
        {employees: "B", time: "2023-04-04", distance: 30},
        {employees: "C", time: "2023-04-04", distance: 30},
        {employees: "D", time: "2023-04-04", distance: 30},
        {employees: "A", time: "2023-04-04", distance: 30},
        {employees: "B", time: "2023-04-04", distance: 30},
        {employees: "C", time: "2023-04-04", distance: 30},
        {employees: "D", time: "2023-04-04", distance: 30}
    ]);


    return(
        <div className="main-hometa">
            <div className="main-table">
                <div className="title">
                    Thông tin nhiệm vụ
                </div>
                <div className="control">
                    <div className="container">
                        <Link to='/addtask'>
                            <button className="b3">Thêm nhiệm vụ</button>
                        </Link>
                    </div>
                </div>
                <div className="taskslist">
                    {taskslist.length > 0 ?
                        <div className="taskline">
                            {taskslist.map(task=>(
                                <div className="task">
                                    <div className="textintaskkk">
                                        <p>Người thu gom: {task.employees}</p>    
                                        <p>Thời gian: {task.time}</p>    
                                        <p>Quãng đường: {task.distance}</p>
                                    </div>
                                    <div className="buttonintaskkk">
                                        <button className="Edit">Xem thông tin</button> 
                                        <button className="Edit">Chỉnh sửa</button> 
                                        <button className="Delete">Xóa</button> 
                                    </div>

                                </div>
                            ))

                            }    
                        </div>
                        :
                        <div className="no-task"> Không có công việc hiện tại</div>
                    }
                </div>
            </div>
        </div>
    )
}