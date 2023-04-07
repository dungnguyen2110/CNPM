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

    const handleDelete = (x) => {
        let temp=[...taskslist]
        temp.splice(x, 1);
        setTasklist(temp);
      }
      
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
                            {taskslist.map((task,index)=>(
                                <div className="task">
                                    <div className="textintaskkk">
                                        <p>Người thu gom: {task.employees}</p>    
                                        <p>Thời gian: {task.time}</p>    
                                        <p>Quãng đường: {task.distance}</p>
                                    </div>
                                    <div className="buttonintaskkk">
                                        <Link to='/infotask'> 
                                        <button className="Edit" >Xem thông tin</button> 
                                        </Link>
                                        <Link to='/edittask'> 
                                        <button className="Edit">Chỉnh sửa</button> 
                                        </Link>
                                        <button className="Delete" value={index} onClick={(e)=>{handleDelete(e.currentTarget.getAttribute('value'))}}>Xóa</button> 
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