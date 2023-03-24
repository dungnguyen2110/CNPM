import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routesUWC } from "../src/routes";
import { DefaultLayout } from "../src/components/Layouts";

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
