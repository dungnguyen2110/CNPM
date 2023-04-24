export const mapScale = {
  world: 1,
  continent: 3,
  country: 5,
  city: 10,
  district: 14,
  streets: 15,
  buildings: 20,
};
const MCP5 = [
  {
    name: "MCP1",
    location: { lat: 10.7557, lng: 106.66398 },
    address: "124 Đường Hồng Bàng, Phường 12 Quận 5",
    district: "Quận 5",
  },
  {
    name: "MCP2",
    location: { lat: 10.75643, lng: 106.67316 },
    address: "292 Trần Phú, Phường 8 Quận 5",
    district: "Quận 5",
  },
  {
    name: "MCP3",
    location: { lat: 10.75821, lng: 106.66035 },
    address: "201A Nguyễn Chí Thanh, Phường 12, Quận 5",
    district: "Quận 5",
  },
  {
    name: "MCP4",
    location: { lat: 10.75634, lng: 106.66786 },
    address: "Công viên Văn Lang, Phường 9 Quận 5",
    district: "Quận 5",
  },
  {
    name: "MCP5",
    location: { lat: 10.75933, lng: 106.66599 },
    address: "153 Nguyễn Chí Thanh, Phường 9 Quận 5",
    district: "Quận 5",
  },
  {
    name: "MCP6",
    location: { lat: 10.75284, lng: 106.67116 },
    address: "7 Trần Hưng Đạo B, Phường 6 Quận 5",
    district: "Quận 5",
  },
];
const MCP1 = [];
const MCP3 = [];
const districts = [
  {
    name: "Quận 1",
    location: { lat: 10.776111, lng: 106.695833 },
    zoom: mapScale.district,
    regionalMCPs: MCP1,
    //   content: createMarkerCard('Header BK', 'Body BK')
  },
  {
    name: "Quận 5",
    location: { lat: 10.75619, lng: 106.66699 },
    zoom: mapScale.district,
    regionalMCPs: MCP5,
    factory: {
      name: "Nhà máy 1",
      location: { lat: 10.76077, lng: 106.68231 },
      address: "280 An Dương Vương, Phường 4 Quận 5",
      district: "Quận 5",
    },
    //   content: createMarkerCard('Header BK', 'Body BK')
  },
  {
    name: "Quận 3",
    location: { lat: 10.77513, lng: 106.68659 },
    zoom: mapScale.district,
    regionalMCPs: MCP3,
    //   content: createMarkerCard('Header BK', 'Body BK')
  },
];

export const mapElements = [
  {
    name: "Ho Chi Minh",
    location: { lat: 10.762622, lng: 106.660172 },
    zoom: mapScale.city,
    icon: "images/city.png",
    city_districts: districts,
    //   content: createMarkerCard('Header BK', 'Body BK')
  },
];

export function getDistrict(name) {
  var my_districts = mapElements[0].city_districts;
  for (let i = 0; i < my_districts.length; i++) {
    var district = my_districts[i];
    if (district.name == name) {
      return district;
    }
  }
  return null;
}

export function getMCPbyDistrictName(district_name) {
  var mydistrict = getDistrict(district_name);
  return mydistrict.regionalMCPs;
}
export function getMCPbyDistrict(district) {
  return district.regionalMCPs;
}
export function getFactorybyDistrictName(district_name) {
  var mydistrict = getDistrict(district_name);
  if ("factory" in mydistrict) {
    return mydistrict.factory;
  } else return null;
}
export function getFactorybyDistrict(district) {
  if ("factory" in district) {
    return district.factory;
  } else return null;
}

export function getMCPbyLocation(district, location) {
  var mcps = getMCPbyDistrict(district);
  for (let i = 0; i < mcps.length; i++) {
    if (
      location.lat == mcps[i].location.lat &&
      location.lng == mcps[i].location.lng
    ) {
      return mcps[i];
    }
  }
}

export function getRoutesbyDistrict(district) {
  if ("routeInfo" in district) {
    return district.routeInfo.location;
  } else {
    return null;
  }
}
