import { useEffect } from "react";

import {
  mapElements,
  getDistrict,
  getMCPbyDistrict,
  getMCPbyDistrictName,
  getFactorybyDistrictName,
  mapScale,
} from "./MapElement.js";
import { AddMarker, markerType } from "./OperationOnMap.js";
import { platform, map, API_Key } from "./initmap.js";
import { current_focus, setCurrentFocus } from "./initmap.js";

var createPackageRoutingContent,
  addRoutes,
  location_to_route,
  temp_route,
  stateEditRouting,
  state_edit,
  ActivateEditRoute,
  DisableEditRoute,
  AddEndPoint,
  AddStartPoint,
  getEndPoint,
  getStartPoint,
  route;

export default function Routing() {
  const H = window.H;
  useEffect(() => {
    var req = new XMLHttpRequest();
    var router = platform.getRoutingService(null, 8);
    var routing_Btn = document.getElementsByClassName("Routing_btn")[0];

    var clearRoutes_Btn = document.getElementsByClassName("Clear-route_btn")[0];
    var Undo_Btn = document.getElementsByClassName("Undo_btn")[0];

    var Optimize_Btn = document.getElementsByClassName("Optimize_btn")[0];
    console.log(Optimize_Btn);
    var Finish_Btn = document.getElementsByClassName("Finish-routing_btn")[0];
    var Exit_Btn = document.getElementsByClassName("Exit-routing_btn")[0];
    var current_mcps = getMCPbyDistrictName("Quận 5");
    var myfact = getFactorybyDistrictName("Quận 5");
    // console.log(routing_Btn);

    var routingParameters = {
      routingMode: "fast",
      transportMode: "car",
      // The start point of the route:
      origin: parseCoor(current_mcps[0].location),
      // The end point of the route:
      destination: parseCoor(myfact.location),
      // Include the route shape in the response
      return: "polyline",
    };
    //Add route
    var routingContentPackage = [];
    createPackageRoutingContent = function createPackageRoutingContent(
      origin,
      dest
    ) {
      var routing_param = {};
      routing_param.routingMode = "fast";
      routing_param.transportMode = "car";
      try {
        routing_param.origin = parseCoor(origin.location);
        routing_param.destination = parseCoor(dest.location);
      } catch (err) {
        routing_param.origin = parseCoor(origin);
        routing_param.destination = parseCoor(dest);
      }
      routing_param.return = "polyline";
      routingContentPackage.push(routing_param);
    };

    addRoutes = function addRoutes(contentPackage = routingContentPackage) {
      for (let i = 0; i < contentPackage.length; i++) {
        var routing_param = contentPackage[i];
        router.calculateRoute(routing_param, onResult);
      }
      routingContentPackage = [];
    };

    function parseCoor(location) {
      return String(location.lat) + "," + String(location.lng);
    }
    //result of requesting route
    var currentZIndex = 0;
    var onResult = function (result) {
      // ensure that at least one route was found
      if (result.routes.length) {
        result.routes[0].sections.forEach((section) => {
          // Create a linestring to use as a point source for the route line
          let linestring = H.geo.LineString.fromFlexiblePolyline(
            section.polyline
          );
          // Create a polyline to display the route:
          // Create an outline for the route polyline:
          var routeOutline = new H.map.Polyline(linestring, {
            style: {
              lineWidth: 10,
              strokeColor: GenerateColorString(),
              lineTailCap: "arrow-tail",
              lineHeadCap: "arrow-head",
            },
          });
          // Create a patterned polyline:
          var routeArrows = new H.map.Polyline(linestring, {
            style: CreateStyleForArrow(),
          });
          routeArrows.addEventListener("pointerenter", function (evt) {
            this.setStyle(CreateStyleForArrow(changeColorToBlack()));
            currentZIndex = this.getZIndex();
            this.setZIndex(100);
          });

          routeArrows.addEventListener("pointerleave", function (evt) {
            this.setStyle(CreateStyleForArrow(changeColorToWhite()));
            this.setZIndex(currentZIndex);
          });

          map.addObjects([routeOutline, routeArrows]);

          if (state_edit == stateEditRouting.Enable) {
            temp_route.push({ outline: routeOutline, arrow: routeArrows });
          }
          // Set the map's viewport to make the whole route visible:
          //   map.getViewModel().setLookAtData({bounds: routeOutline.getBoundingBox()});
        });
      }
      // console.log(result.);
    };
    //Set attribute for interactive line
    var color_state = 0;
    function GenerateColorString() {
      if (color_state == 0) {
        color_state = 1;
        return "rgba(0, 128, 255, 0.5)";
      } else if (color_state == 1) {
        color_state = 2;
        return "rgba(154, 125, 10, 0.5)";
      } else if (color_state == 2) {
        color_state = 3;
        return "rgba(25, 111, 61, 0.5)";
      } else if (color_state == 3) {
        color_state = 4;
        return "rgba(125, 60, 152, 0.5)";
      } else {
        color_state = 0;
        return "rgba(176, 58, 46, 0.5)";
      }
    }
    function changeColorToBlack() {
      return "rgba(0, 0, 0, 0.7)";
    }
    function changeColorToWhite() {
      return "rgba(255, 255, 255, 1)";
    }
    function CreateStyleForArrow(stroke_color = 0) {
      var style = {};
      if (stroke_color == 0) {
        style = {
          lineWidth: 10,
          fillColor: "white",
          strokeColor: "rgba(255, 255, 255, 1)",
          lineDash: [0, 2],
          lineTailCap: "arrow-tail",
          lineHeadCap: "arrow-head",
        };
      } else {
        style = {
          lineWidth: 10,
          fillColor: "white",
          strokeColor: stroke_color,
          lineDash: [0, 2],
          lineTailCap: "arrow-tail",
          lineHeadCap: "arrow-head",
        };
      }
      return style;
    }

    //   createPackageRoutingContent(current_mcps[0],myfact);
    // //   console.log(routingContentPackage);
    //   createPackageRoutingContent(current_mcps[1],myfact);
    //   addRoutes(routingContentPackage);

    location_to_route = [];

    temp_route = [];
    var startPoint = 0;
    var endPoint = 0;
    //Add event for button
    stateEditRouting = {
      Enable: 1,
      Disable: 0,
    };
    state_edit = stateEditRouting.Disable;
    ActivateEditRoute = function ActivateEditRoute() {
      state_edit = stateEditRouting.Enable;
    };
    DisableEditRoute = function DisableEditRoute() {
      state_edit = stateEditRouting.Disable;
    };
    AddStartPoint = function AddStartPoint(marker) {
      startPoint = marker;
    };
    AddEndPoint = function AddEndPoint(marker) {
      endPoint = marker;
    };
    getEndPoint = function getEndPoint() {
      return endPoint;
    };
    getStartPoint = function getStartPoint() {
      return startPoint;
    };
    if (routing_Btn) {
      routing_Btn.addEventListener("click", EnableRouting);
    }
    function EnableRouting() {
      if (current_focus.zoom == mapScale.district) {
        state_edit = stateEditRouting.Enable;
      }
    }

    if (Exit_Btn) {
      Exit_Btn.addEventListener("click", DisableRouting);
    }

    function DisableRouting() {
      state_edit = stateEditRouting.Disable;
      ClearRoutingBuffer();
    }
    if (Finish_Btn) {
      Finish_Btn.addEventListener("click", SaveWork);
    }

    function SaveWork() {
      state_edit = stateEditRouting.Disable;
      var this_district = current_focus;
      var mcps = this_district.regionalMCPs;

      if (temp_route.length > 0) {
        this_district.routeInfo = {};
        this_district.routeInfo.location = [];
        this_district.routeInfo.routes = [];
        for (let i = 0; i < location_to_route.length; i++) {
          for (let j = 0; j < mcps.length + 1; j++) {
            if (j == mcps.length) {
              if (
                this_district.factory.location.lat ==
                  location_to_route[i].lat &&
                this_district.factory.location.lng == location_to_route[i].lng
              ) {
                this_district.routeInfo.location.push({
                  name: this_district.factory.name,
                  address: this_district.factory.address,
                  location: {
                    lat: this_district.factory.location.lat,
                    lng: this_district.factory.location.lng,
                  },
                });
                break;
              }
            } else {
              if (
                mcps[j].location.lat == location_to_route[i].lat &&
                mcps[j].location.lng == location_to_route[i].lng
              ) {
                this_district.routeInfo.location.push({
                  name: mcps[j].name,
                  address: mcps[j].address,
                  location: {
                    lat: location_to_route[i].lat,
                    lng: location_to_route[i].lng,
                  },
                });
              }
            }
          }
        }
        for (let i = 0; i < temp_route.length; i++) {
          this_district.routeInfo.routes.push(temp_route[i]);
        }
        console.log(this_district.routeInfo);
        console.log(this.district);
      } else {
        if ("routeInfo" in this_district) delete this_district.routeInfo;
      }

      location_to_route = [];
      temp_route = [];
      startPoint = 0;
      endPoint = 0;
      route = this_district;
      setCurrentFocus(this_district);
    }

    if (Undo_Btn) {
      Undo_Btn.addEventListener("click", UndoRouting);
    }

    function UndoRouting() {
      if (state_edit != stateEditRouting.Enable) return;
      //check if there is any route left to delete
      if (temp_route.length > 0) {
        var route = temp_route.pop();
        map.removeObjects([route.outline, route.arrow]);
      }
      var length = location_to_route.length;

      //Check if endpoint exist
      if (length > 2) {
        map.removeObject(endPoint);
        //remove current endPoint
        endPoint = AddMarker(
          map,
          location_to_route[length - 2],
          markerType.endPoint
        ); //add new endpoint
      } else if (length == 2) {
        //remove the last endpoint
        map.removeObject(endPoint);
        // console.log(endPoint); //remove current endPoint
        endPoint = 0;
      } else if (length == 1) {
        //there is startPoint only
        map.removeObject(startPoint);

        startPoint = 0;
      }
      if (length > 0) location_to_route.pop();
    }
    if (clearRoutes_Btn) {
      clearRoutes_Btn.addEventListener("click", ClearRoutes);
    }
    function ClearRoutes() {
      if (state_edit !== stateEditRouting.Enable) return;
      var map_objects = map.getObjects();
      var length = map_objects.length;
      for (let i = 0; i < length; i++) {
        var data = map_objects[i].getData();
        if (data !== markerType.MCP && data !== markerType.Factory) {
          //delete all except MCP and Factory
          map.removeObject(map_objects[i]);
        }
        temp_route = [];
        location_to_route = [];
        startPoint = 0;
        endPoint = 0;
      }
    }

    function ClearRoutingBuffer() {
      var length = temp_route.length;
      for (let i = 0; i < length; i++) {
        //clear routes
        var route = temp_route.pop();
        map.removeObjects([route.outline, route.arrow]);
      }
      location_to_route = []; //clear tempporary locations for routing
      if (startPoint) map.removeObject(startPoint);
      if (endPoint) map.removeObject(endPoint);
      startPoint = 0;
      endPoint = 0;
    }

    if (Optimize_Btn) {
      Optimize_Btn.addEventListener("click", OptimizeRoutes);
    }
    function OptimizeRoutes() {
      if (state_edit !== stateEditRouting.Enable) return;
      ClearRoutes();
      req.open("POST", TourPlaningHeader(), false);
      req.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      // console.log("click");
      var content = JSON.stringify(
        constructTSPRequest(
          getMCPbyDistrictName(current_focus.name),
          getDistrict(current_focus.name).factory
        )
      );
      req.send(content);
      var result = JSON.parse(req.responseText);
      var stops = result.tours[0].stops;
      for (let i = 0; i < stops.length; i++) {
        //add to buffer location_to_route
        var stop = stops[i];
        if (stop.activities[0].jobId === "departure") {
          var marker = AddMarker(map, stop.location, markerType.startPoint);
          startPoint = marker;
        } else if (stop.activities[0].jobId === "arrival") {
          var marker = AddMarker(map, stop.location, markerType.endPoint);
          endPoint = marker;
        }
        location_to_route.push(stop.location);
      }
      for (let i = 0; i < location_to_route.length - 1; i++) {
        //from location_to_route buffer, draw
        createPackageRoutingContent(
          location_to_route[i],
          location_to_route[i + 1]
        );
      }
      addRoutes();
    }

    function constructTSPRequest(mcps, factory) {
      var content = {};
      content.plan = {};
      content.plan.jobs = [];
      var timeLimit = getTime();
      for (let i = 0; i < mcps.length; i++) {
        var job = {};
        job.id = mcps[i].name;
        job.tasks = {};
        job.tasks.deliveries = [];
        var delivery = {};
        delivery.places = [];
        var place = {};
        place.location = {};
        place.location.lat = mcps[i].location.lat;
        place.location.lng = mcps[i].location.lng;
        place.duration = 0;
        place.times = [];
        place.times[0] = [];
        place.times[0][0] = timeLimit.first;
        place.times[0][1] = timeLimit.last;
        delivery.places.push(place);
        delivery.demand = [];
        delivery.demand[0] = 0;
        job.tasks.deliveries.push(delivery);
        content.plan.jobs.push(job);
      }
      content.fleet = {};
      content.fleet.types = [];
      var type = {};
      type.id = "car_profile";
      type.profile = "car_1";
      type.costs = {};
      type.costs.distance = 0.0001;
      type.costs.time = 0;
      type.shifts = [];
      var shift = {};
      shift.start = {};
      shift.start.time = timeLimit.first;
      shift.start.location = {};
      shift.start.location.lat = factory.location.lat;
      shift.start.location.lng = factory.location.lng;
      shift.end = {};
      shift.end.time = timeLimit.last;
      shift.end.location = {};
      shift.end.location.lat = factory.location.lat;
      shift.end.location.lng = factory.location.lng;
      type.shifts.push(shift);
      type.capacity = [];
      type.capacity[0] = 0;
      type.amount = 1;
      content.fleet.types.push(type);
      content.fleet.profiles = [];
      var profile = {};
      profile.name = "car_1";
      profile.type = "car";
      content.fleet.profiles.push(profile);

      return content;
    }

    function TourPlaningHeader() {
      var request = "https://tourplanning.hereapi.com/v3/problems?";
      var api = "apiKey=" + String(API_Key);
      return request + api;
    }

    function getTime() {
      const now = new Date();
      var year = now.getFullYear();
      var firstDayOfYear = new Date(year, 0, 1);
      var timeAtFirstDayOfYear = firstDayOfYear.getTime();
      var first_moment = new Date(timeAtFirstDayOfYear).toISOString();

      var lastDayOfYear = new Date(year, 11, 31, 23, 59, 59, 999);
      var timeAtLastDayOfYear = lastDayOfYear.getTime();
      var last_moment = new Date(timeAtLastDayOfYear).toISOString();

      return { first: String(first_moment), last: String(last_moment) };
    }
  }, []);
}

export {
  createPackageRoutingContent,
  addRoutes,
  location_to_route,
  temp_route,
  stateEditRouting,
  state_edit,
  ActivateEditRoute,
  DisableEditRoute,
  AddEndPoint,
  AddStartPoint,
  getEndPoint,
  getStartPoint,
  route,
};
