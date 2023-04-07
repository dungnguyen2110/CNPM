import React from "react";
import { Link } from "react-router-dom";
import "../TaskAssignment/homeTA.scss";
import { useState } from "react";

export default function HomeTA(props) {
  console.log(props.data);
  const [taskslist, setTasklist] = useState(
    props.data.tasks || [
      { employees: "A", time: "2023-04-04", distance: 30 },
      { employees: "B", time: "2023-04-04", distance: 30 },
      { employees: "C", time: "2023-04-04", distance: 30 },
      { employees: "D", time: "2023-04-04", distance: 30 },
      { employees: "A", time: "2023-04-04", distance: 30 },
      { employees: "B", time: "2023-04-04", distance: 30 },
      { employees: "C", time: "2023-04-04", distance: 30 },
      { employees: "D", time: "2023-04-04", distance: 30 },
    ]
  );
  const bdne = (x) => {
    props.setIndex(x);
  };

  const handleDelete = (x) => {
    let temp = [...taskslist];
    temp.splice(x, 1);
    setTasklist(temp);
    let temp2 = props.data;
    temp2.tasks = temp;
    props.updatedData(temp2);
  };

  return (
    <div className="main-hometa">
      <div className="main-table">
        <div className="title">Thông tin nhiệm vụ</div>
        <div className="control">
          <div className="container">
            <Link to="/addtask">
              <button className="b3">Thêm nhiệm vụ</button>
            </Link>
          </div>
        </div>
        <div className="taskslist">
          {taskslist.length > 0 ? (
            <div className="taskline">
              {taskslist.map((task, cut) => (
                <div className="task">
                  <div className="textintaskkk">
                    <p>Khu vực: {task.area}</p>
                    <p>Người thu gom: {task.employees}</p>
                    <p>Thời gian: {task.date}</p>
                  </div>
                  <div className="buttonintaskkk">
                    <Link to="/infotask">
                      {" "}
                      <button
                        className="ifo"
                        value={cut}
                        onClick={(e) => {
                          bdne(e.currentTarget.getAttribute("value"));
                        }}
                      >
                        Xem thông tin
                      </button>{" "}
                    </Link>
                    <Link to="/edittask">
                      {" "}
                      <button
                        className="Edit"
                        value={cut}
                        onClick={(e) => {
                          bdne(e.currentTarget.getAttribute("value"));
                        }}
                      >
                        Chỉnh sửa
                      </button>{" "}
                    </Link>
                    <button
                      className="Delete"
                      value={cut}
                      onClick={(e) => {
                        handleDelete(e.currentTarget.getAttribute("value"));
                      }}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-task"> Không có công việc hiện tại</div>
          )}
        </div>
      </div>
    </div>
  );
}
