import Employee from "../../src/pages/Employee";
import EDetail from "../../src/pages/EDetail";
import Map from "../../src/pages/Map";
import MDetail from "../../src/pages/MDetail";
import TJanitor from "../pages/TaskJanitor";

const routesUWC = [
  { path: "/employee", component: Employee },
  { path: "/", component: Employee },
  { path: "/employee/detail", component: EDetail },
  { path: "/map", component: Map },
  { path: "/map/detail", component: MDetail },
  { path: "/taskjanitor", component: TJanitor },
];

export { routesUWC };
