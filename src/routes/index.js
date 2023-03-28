import Employee from "../../src/pages/Employee";
import EDetail from "../../src/pages/EDetail";
import Map from "../../src/pages/Map";

const routesUWC = [
  { path: "/employee", component: Employee },
  { path: "/", component: EDetail },
  { path: "/employee/detail", component: EDetail },
  { path: "/map", component: Map },
];

export { routesUWC };
