import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routesUWC } from "../src/routes";
import { DefaultLayout } from "../src/components/Layouts";
import HomeTA from "./components/TaskAssignment/HomeTA";
import Test from "./components/TaskAssignment/Test";
import AddTask from "./components/TaskAssignment/AddTask";
import EditTask from "./components/TaskAssignment/EditTask";
import InfoTask from "./components/TaskAssignment/InfoTask";

function App() {
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
          <Route path="/tasks" element={<HomeTA/>}/>
          <Route path="/addtask" element={<AddTask/>}/>
          <Route path="/edittask" element={<EditTask/>}/>
          <Route path="/infotask" element={<InfoTask/>}/>
          <Route path="/task" element={<Test/>}/>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
