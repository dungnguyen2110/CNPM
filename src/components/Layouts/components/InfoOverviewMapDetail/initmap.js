import { useEffect } from "react";
import { mapElements, mapScale } from "./MapElement";
import { configConsumerProps } from "antd/es/config-provider";

export const API_Key = "ddwku6PajGzWcxHJNk1zFvMbzNpClOskeHtwBG_F88M";

let map, platform, behavior, current_focus, setCurrentFocus;
current_focus = mapElements[0];
const Initmap = () => {
  useEffect(() => {
    var init_position = current_focus.location;
    var init_zoom = current_focus.zoom;
    const H = window.H;

    platform = new H.service.Platform({
      apikey: API_Key,
    });

    setCurrentFocus = function setCurrentFocus(para) {
      current_focus = para;
    };

    const defaultLayers = platform.createDefaultLayers();

    // let numb = document.getElementById("mapContainer").childElementCount;

    // if (numb === 0) {
    map = new H.Map(
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
    behavior = new H.mapevents.Behavior(mapEvents);
    // add a resize listener to make sure that the map occupies the whole container
    window.addEventListener("resize", () => map.getViewPort().resize());
    // }
    // }
  }, []);
};

export { map, platform, behavior, current_focus, setCurrentFocus };

export default Initmap;
