import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routesUWC } from "../src/routes";
import { DefaultLayout } from "../src/components/Layouts";
import HomeTA from "./components/TaskAssignment/HomeTA";
import Test from "./components/TaskAssignment/Test";
import AddTask from "./components/TaskAssignment/AddTask";
import EditTask from "./components/TaskAssignment/EditTask";
import InfoTask from "./components/TaskAssignment/InfoTask";
import { useState } from "react";
let dataInit = require('./data.json')

function App() {
  const [data,setData]=useState(dataInit)
  const updatedData =(newData)=>{
    setData(newData)
  }
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
          <Route path="/tasks" element={<HomeTA data={data} undatedata={updatedData}/>}/>
          <Route path="/addtask" element={<AddTask  data={data} undatedata={updatedData}/>}/>
          <Route path="/edittask" element={<EditTask data={data} undatedata={updatedData}/>}/>
          <Route path="/infotask" element={<InfoTask data={data} undatedata={updatedData}/>}/>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
