import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routesUWC } from "../src/routes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {routesUWC.map((route, index) => {
            const Page = route.component;
            console.log(route.component);
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
