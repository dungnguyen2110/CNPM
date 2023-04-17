/*  
Section:
    Set common variable
    Location to be the center on map
    Init map event
    Create marker
        Create icon for marker
        Add marker
        Delete marker
        Add event to marker
    Add event to buttons
        
*/
import { useEffect } from "react";
import images from "../../../../assets/images/index.js";
import { map } from "./initmap.js";
import {
  getMCPbyDistrict,
  getMCPbyDistrictName,
  mapElements,
  getMCPbyLocation,
} from "./MapElement.js";
import {
  location_to_route,
  stateEditRouting,
  state_edit,
  createPackageRoutingContent,
  addRoutes,
  AddStartPoint,
  getEndPoint,
  AddEndPoint,
} from "./routing.js";
import { current_focus } from "./initmap.js";
var AddMCP_Btn = document.getElementsByClassName("MCP_btn")[0];
var AddFactory_Btn = document.getElementsByClassName("Factory_btn")[0];
var Exit_Btn = document.getElementsByClassName("Exit_btn")[0];
var Finish_Btn = document.getElementsByClassName("Finish_btn")[0];
var Delete_Btn = document.getElementsByClassName("Delete_btn")[0];
let markerType,
  focusLocation,
  CreateIcon,
  AddMarker,
  increaseOpacity,
  reduceOpacity,
  ViewMapLocations,
  ShowRoutes;

const Operation = () => {
  useEffect(() => {
    // console.log(map);
    // console.log("1=========");
    // console.log(getMCPbyDistrict);
    // console.log("2=========");
    // console.log(getMCPbyDistrictName);
    // console.log("3=========");
    // console.log(mapElements);
    // console.log("4=========");
    // console.log(getMCPbyLocation);
    // console.log("5=========");
    // console.log(location_to_route);
    // console.log("6=========");
    // console.log(stateEditRouting);
    // console.log("7=========");
    // console.log(state_edit);
    // console.log("8=========");
    // console.log(createPackageRoutingContent);
    // console.log("9==========");
    // console.log(addRoutes);
    // console.log("10==========");
    // console.log(AddStartPoint);
    // console.log("11==========");
    // console.log(getEndPoint);
    // console.log("12==========");
    // console.log(AddEndPoint);
    // console.log("13==========");
    // console.log(getMCPbyDistrict);
    // console.log("14==========");
    // console.log(getMCPbyDistrictName);
    // console.log("15==========");
    // console.log(mapElements);
    // console.log("16==========");
    // console.log(getMCPbyLocation);
    // console.log("17==========");
    // console.log(current_focus);

    const H = window.H;
    //Set common variable
    const OperationTypeOnTap = {
      Add: 1,
      Delete: 2,
      None: 0,
    };

    const stateEdit = {
      ModifyNoMCP: 1,
      ModifyNoFactory: 2,
      Disable: 0,
    };
    markerType = {
      MCP: 0,
      Factory: 1,
      location: 2,
      startPoint: 3,
      endPoint: 4,
    };
    //Location to be the center on map
    focusLocation = function focusLocation(map, region) {
      map.setZoom(region.zoom);
      map.setCenter(region.location);
    };

    const MCP_marker_size = { h: 30, w: 30 };
    const Factory_marker_size = { h: 30, w: 30 };
    //Init map event
    map.addEventListener("tap", MapOnClick);
    var tapStatus = stateEdit.Disable;
    var actionType = OperationTypeOnTap.None;

    //Handle map event click
    var temp_Marker_Buffer_to_delete = [];
    var temp_Marker_Buffer_to_add = [];
    function removeElement(array, marker) {
      var found = false;
      for (let i = 0; i < array.length; i++) {
        if (array[i] == marker) {
          found = true;
          for (let z = i; z < array.length - 1; z++) {
            //loop to shift
            array[i] = array[i + 1];
          }
        }
      }
      if (found)
        //if marker is found, reduce array length
        array.pop();
      return found;
    }
    function MapOnClick(evt) {
      // Log 'tap' and 'mouse' events:
      //get current lat long
      var coords = map.screenToGeo(
        evt.currentPointer.viewportX,
        evt.currentPointer.viewportY
      );
      switch (tapStatus) {
        case stateEdit.ModifyNoMCP:
          if (actionType == OperationTypeOnTap.Add) {
            //perform add
            var marker = AddMarker(
              map,
              coords,
              markerType.MCP,
              MCP_marker_size
            );
            marker.addEventListener("tap", performClickMarker);

            temp_Marker_Buffer_to_delete.push(marker);
          }
          break;
        case stateEdit.ModifyNoFactory:
          if (actionType == OperationTypeOnTap.Add) {
            //perform add
            var marker = AddMarker(
              map,
              coords,
              markerType.Factory,
              Factory_marker_size
            );
            marker.addEventListener("tap", performClickMarker);
            temp_Marker_Buffer_to_delete.push(marker);
          }
          break;
        case stateEdit.Disable:
          //Do something
          break;
        default:
      }
    }

    //Create marker
    //Create icon for marker
    CreateIcon = function CreateIcon(path_to_icon, size = 0) {
      var icon_element = document.createElement("img");
      icon_element.setAttribute("src", path_to_icon);
      icon_element.setAttribute("alt", "Icon's not found");
      if (size != 0) {
        icon_element.style.height = String(size.h) + "px";
        icon_element.style.width = String(size.w) + "px";
      }
      return icon_element;
    };
    //Add marker
    AddMarker = function AddMarker(this_map, location, type, size = 0) {
      var path_to_icon = "";
      if (type === markerType.MCP) {
        path_to_icon = images.Landfill;
        // path_to_icon = images.addicon;
      } else if (type === markerType.Factory) {
        path_to_icon = images.Factory;

        // path_to_icon = "./images/Factory.png";
      } else if (type === markerType.location || type === markerType.endPoint) {
        // path_to_icon = "./images/location.png";
        path_to_icon = images.location;
      } else if (type === markerType.startPoint) {
        path_to_icon = images.startPoint;

        // path_to_icon = "./images/startPoint.png";
      }

      var icon;
      if (size) {
        icon = new H.map.DomIcon(CreateIcon(path_to_icon, size), {
          onAttach: function (clonedElement, domIcon, domMarker) {
            clonedElement.addEventListener("mouseover", increaseOpacity);
            clonedElement.addEventListener("mouseout", reduceOpacity);
          },
          onDetach: function (clonedElement, domIcon, domMarker) {
            clonedElement.removeEventListener("mouseover", increaseOpacity);
            clonedElement.removeEventListener("mouseout", reduceOpacity);
          },
        });
      } else {
        icon = new H.map.DomIcon(CreateIcon(path_to_icon), {
          onAttach: function (clonedElement, domIcon, domMarker) {
            clonedElement.addEventListener("mouseover", increaseOpacity);
            clonedElement.addEventListener("mouseout", reduceOpacity);
          },
          onDetach: function (clonedElement, domIcon, domMarker) {
            clonedElement.removeEventListener("mouseover", increaseOpacity);
            clonedElement.removeEventListener("mouseout", reduceOpacity);
          },
        });
      }

      var marker = new H.map.DomMarker(location, {
        icon: icon,
        data: type,
        volativity: false,
      });
      if (type === markerType.MCP) {
        marker.addEventListener("pointerenter", MarkerOnHover);
      }
      this_map.addObject(marker);
      return marker;
    };
    function MarkerOnHover(evt) {
      // console.log(current_focus);
      var coor = { lat: this.getGeometry().lat, lng: this.getGeometry().lng };
      var mcp = getMCPbyLocation(current_focus, coor);
      console.log(mcp);
    }

    increaseOpacity = function increaseOpacity(evt) {
      evt.target.style.opacity = 0.8;
    };
    reduceOpacity = function reduceOpacity(evt) {
      evt.target.style.opacity = 1;
    };
    function performClickMarker(evt) {
      if (state_edit === stateEditRouting.Enable) {
        var this_location = {
          lat: this.getGeometry().lat,
          lng: this.getGeometry().lng,
        };
        if (location_to_route[location_to_route.length - 1] == this_location)
          return;
        location_to_route.push(this_location);
        var length = location_to_route.length;
        if (length >= 2) {
          //create route
          createPackageRoutingContent(
            location_to_route[length - 2],
            location_to_route[length - 1]
          );
          addRoutes();
          //Remove previous endPoint first
          var pre_endPoint = getEndPoint();
          if (pre_endPoint != 0) map.removeObject(pre_endPoint);
          //Add new endPoint
          var marker = AddMarker(map, this_location, markerType.endPoint);
          marker.addEventListener("tap", performClickMarker);
          AddEndPoint(marker); //define temporary endPoint
        } else if (length == 1) {
          //Add marker for start point
          var marker = AddMarker(map, this_location, markerType.startPoint);
          marker.addEventListener("tap", performClickMarker);
          AddStartPoint(marker); //define temporary startPoint
        }
      }
      var coord = map.screenToGeo(
        evt.currentPointer.viewportX,
        evt.currentPointer.viewportY
      );
    }
    //Delete marker
    function RemvoveMarker(this_map, marker) {
      this_map.removeObject(marker);
    }

    //Add event to buttons
    //Event for adding MCP
    // AddMCP_Btn.addEventListener("click", RunMCP);
    function RunMCP() {
      if (
        tapStatus !== stateEdit.Disable &&
        tapStatus !== stateEdit.ModifyNoMCP
      ) {
        alert("Finish current action first");
        return;
      }
      tapStatus = stateEdit.ModifyNoMCP;
      actionType = OperationTypeOnTap.Add;
    }
    //Event for adding factory
    // AddFactory_Btn.addEventListener("click", RunFactory);
    function RunFactory() {
      if (
        tapStatus != stateEdit.Disable &&
        tapStatus != stateEdit.ModifyNoFactory
      ) {
        alert("Finish current action first");
        return;
      }
      tapStatus = stateEdit.ModifyNoFactory;
      actionType = OperationTypeOnTap.Add;
    }
    //Event for finish action

    // Finish_Btn.addEventListener("click", FisnishAction);
    function FisnishAction() {
      tapStatus = stateEdit.Disable;
      temp_Marker_Buffer_to_delete = [];
      temp_Marker_Buffer_to_add = [];
    }
    //Event for delete object action

    // Delete_Btn.addEventListener("click", DeleteAction);
    function DeleteAction() {
      if (tapStatus != stateEdit.Disable) {
        actionType = OperationTypeOnTap.Delete;
      }
    }
    //Event for exit action

    // Exit_Btn.addEventListener("click", RunExit);
    function RunExit() {
      for (let i = 0; i < temp_Marker_Buffer_to_delete.length; i++) {
        RemvoveMarker(map, temp_Marker_Buffer_to_delete[i]);
      }
      temp_Marker_Buffer_to_delete = [];
      for (let i = 0; i < temp_Marker_Buffer_to_add.length; i++) {
        map.addObject(temp_Marker_Buffer_to_add[i]);
      }
      temp_Marker_Buffer_to_add = [];
      tapStatus = stateEdit.Disable;
    }

    //Find nearest marker
    function findNearestMarker(coords, markertype = null) {
      var minDist = 2000,
        nearest_text = "*None*",
        markerDist,
        marker_type,
        marker_idx = -1,
        len,
        objects = [];
      // get all objects added to the map
      var pre_objects = map.getObjects();
      //Filter markers
      if (markertype) {
        for (let i = 0; i < pre_objects.length; i++) {
          var objectType = pre_objects[i].getData();
          if (markertype == objectType) {
            objects.push(pre_objects[i]);
          }
        }
      } else objects = pre_objects;
      len = objects.length;
      // iterate over objects and calculate distance between them
      for (let i = 0; i < len; i += 1) {
        markerDist = objects[i].getGeometry().distance(coords);
        if (markerDist < minDist) {
          minDist = markerDist;
          marker_idx = i;
        }
      }
      if (marker_idx != -1) {
        return objects[marker_idx];
      }
      return null;
    }

    ViewMapLocations = function ViewMapLocations(district_region) {
      //Add marker for factory
      if ("factory" in district_region) {
        var factory = district_region.factory;
        var marker = AddMarker(
          map,
          factory.location,
          markerType.Factory,
          Factory_marker_size
        );
        marker.addEventListener("tap", performClickMarker);
      }
      var mcps = getMCPbyDistrict(district_region);
      for (let i = 0; i < mcps.length; i++) {
        var marker = AddMarker(
          map,
          mcps[i].location,
          markerType.MCP,
          MCP_marker_size
        );
        marker.addEventListener("tap", performClickMarker);
      }
    };
    ShowRoutes = function ShowRoutes(district) {
      if (!("routeInfo" in district)) return;
      var routes = district.routeInfo.routes;
      var routes_to_draw = [];
      for (let i = 0; i < routes.length; i++) {
        routes_to_draw.push(routes[i].outline);
        routes_to_draw.push(routes[i].arrow);
      }
      //Add routes
      map.addObjects(routes_to_draw);

      //Add start point, end point
      var start_point = AddMarker(
        map,
        district.routeInfo.location[0].location,
        markerType.startPoint
      );
      var end_point = AddMarker(
        map,
        district.routeInfo.location[district.routeInfo.location.length - 1]
          .location,
        markerType.endPoint
      );
      map.addObjects([start_point, end_point]);
    };
  }, []);
};

export {
  markerType,
  focusLocation,
  CreateIcon,
  AddMarker,
  increaseOpacity,
  reduceOpacity,
  ViewMapLocations,
  ShowRoutes,
};

export default Operation;
