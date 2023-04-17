import { API_Key, map } from "./initmap.js";
import { mapElements, mapScale, getDistrict } from "./MapElement.js";
import { focusLocation, markerType, ViewMapLocations,ShowRoutes,AddMarker } from "./OperationOnMap.js";
import { DisableEditRoute } from "./routing.js";

export var req=new XMLHttpRequest();
//Get button
var District1_btn=document.getElementById('Quan1')
var District3_btn=document.getElementById('Quan3')
var District5_btn=document.getElementById('Quan5')
var input=document.getElementById('search-location');
var suggestion_list=document.getElementById('suggestions');
var searchBtn=document.getElementById('search-btn');

export var current_focus=mapElements[0];  //First focus is city

focusLocation(map,current_focus);  //Focus on the whole city first
//add event listener for search button between district
District1_btn.addEventListener('click',GoToDistrict);
District3_btn.addEventListener('click',GoToDistrict);
District5_btn.addEventListener('click',GoToDistrict);
function GoToDistrict(){
    input.value="";
    input.textContent="";
    suggestion_list.innerHTML="";
    DisableEditRoute();
    var district=this.value;
    var mydistrict=getDistrict(district);
    if(mydistrict){
        if(district!=current_focus.name){
            ClearObject(map);
            current_focus=mydistrict;
            focusLocation(map,current_focus);
            ViewMapLocations(current_focus);
            ShowRoutes(current_focus);
        }
    }
}
//Clear all object on map
function ClearObject(this_map){
    var objects=this_map.getObjects();
    for(let i=0;i<objects.length;i++){
        this_map.removeObject(objects[i]);
    }
    current_search_marker=[];
}

//Add event listener for search box, search for every input change
input.addEventListener('input', function(){
    var location_to_search=String(input.value);
    if(location_to_search.length>=3){
        var content=packageContent(location_to_search,current_focus.location,4);
        getLocation(content,true);
    }
});
input.addEventListener('change',ReadValue);
function ReadValue(){
    var options=document.getElementsByTagName('option');
    for(let i=0;i<options.length;i++){
        var option=options[i];
        if(this.value==option.value){
            this.textContent=option.textContent;
            break;
        }
    }
}

//package content for http request
function packageContent(location_to_search, center, limit=5){
    var header_str="https://discover.search.hereapi.com/v1/discover?";
    var center_str="at="+String(center.lat)+","+String(center.lng);
    var limit_str='limit='+String(limit);
    var location_to_search_str="q="+String(location_to_search);
    var api_str="apiKey="+String(API_Key);
    return header_str+center_str+"&"+limit_str+"&"+location_to_search_str+"&"+api_str;
}

//send request
function getLocation(packageContent, districtFilter=false, district=null,async=true){
    req.open("GET",packageContent,async);
    req.send(null);
}

//get response
var current_search_marker=[];
req.onreadystatechange=function(){
    if (this.readyState === 4 && this.status === 200) {
        var locations=(JSON.parse(req.responseText)).items;
        suggestion_list.innerHTML="";
        for(let i=0;i<locations.length;i++){
            var location=locations[i];
            if(location.address.city==current_focus.name){
                var coor={lat: parseFloat(location.access[0].lat), lng:parseFloat(location.access[0].lng)};
                var newoption=addSuggestion(location.address.label,coor);
            }
        }
    }
}
//Add options when searching
function addSuggestion(content,coor){
    var option=document.createElement('option');
    option.value=content;
    option.textContent=String(coor.lat)+","+String(coor.lng);
    option.style.display="none";
    suggestion_list.append(option);
    return option;
}
//Clear current search marker
function Clear_search_marker(){
    for(let i=0;i<current_search_marker.length;i++){
        map.removeObject(current_search_marker[i]);
    }
    current_search_marker=[];
}

var coors=[];
searchBtn.addEventListener('click',performSearch);
function performSearch(){
    var options=document.getElementsByTagName('option');
    if(String(input.textContent).includes(',')){
        var coor=String(input.textContent).split(',').map(parseFloat);
        var coor={lat:parseFloat(coor[0]), lng:parseFloat(coor[1])};
        var t_coor=coor;
        coors.push(coor);
        showLocations(coors);
        focusLocation(map,{zoom: mapScale.streets, location:t_coor});
    }else alert("No location");    
}
//get locations, which is an array of coor and show them.
function showLocations(locations){
    Clear_search_marker();
    for(let i=0;i<locations.length;i++){
        var location=locations[i];
        var marker=AddMarker(map,location,markerType.location);
        // marker.addEventListener('tap',performClickLocation);
        current_search_marker.push(marker);
    } 
    coors=[];
}







