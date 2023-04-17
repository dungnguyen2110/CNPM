import { mapElements } from "./MapElement.js";
import { mapScale } from "./MapElement.js";
export const API_Key = "ddwku6PajGzWcxHJNk1zFvMbzNpClOskeHtwBG_F88M";

//Init position and zoom
var element_index = 0;
var init_position = mapElements[element_index].location;
var init_zoom = mapElements[element_index].zoom;

// Obtain the default map types from the platform object:
export var platform = new H.service.Platform({
  apikey: API_Key,
});
// Instantiate (and display) a map object:
var defaultLayers = platform.createDefaultLayers();
// Obtain the default map types from the platform object:
export var map = new H.Map(
  document.getElementById("mapContainer"),
  defaultLayers.vector.normal.map,
  {
    zoom: init_zoom,
    center: init_position,
    pixelRatio: window.devicePixelRatio || 1,
  }
);
//Add map default event
var mapEvents = new H.mapevents.MapEvents(map);
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
export var behavior = new H.mapevents.Behavior(mapEvents);
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener("resize", () => map.getViewPort().resize());

// provided that map was instantiated with the vector layer
// // // as a base layer
// var style=boundary_style;
// var baseLayer = map.getBaseLayer();
// baseLayer.getProvider().setStyle(new H.map.Style(style));
