import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routesUWC } from "../src/routes";
import { DefaultLayout } from "../src/components/Layouts";
import HomeTA from "./components/TaskAssignment/HomeTA";
import AddTask from "./components/TaskAssignment/AddTask";
import EditTask from "./components/TaskAssignment/EditTask";
import InfoTask from "./components/TaskAssignment/InfoTask";
import { useState, useCallback } from "react";
let dataInit = require('./data.json')

function App() {
  const [data,setData]=useState(dataInit)
  const updatedData = useCallback((newData)=>{
    setData(newData)
  },[setData])
  //cái route [...] nên sài biến không trong path luôn.
  const [index,upIndex]=useState(0)
  const setIndex=(x)=>{
    upIndex(x)
  }
  console.log(data)
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {routesUWC.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          <Route path="/tasks" element={<HomeTA data={data} updatedData={updatedData}      setIndex={setIndex} index={index}/>}/>
          <Route path="/addtask" element={<AddTask  data={data} updatedData={updatedData}  setIndex={setIndex} index={index}/>}/>
          <Route path="/edittask" element={<EditTask data={data} updatedData={updatedData} setIndex={setIndex} index={index}/>}/>
          <Route path="/infotask" element={<InfoTask data={data} updatedData={updatedData} setIndex={setIndex} index={index}/>}/>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
