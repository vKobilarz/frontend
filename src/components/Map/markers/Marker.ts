import L from 'leaflet';

const Marker = new L.Icon({
  iconUrl: require('../../../assets/marker.png'),
  iconSize: new L.Point(45, 45),
  iconAnchor: new L.Point(22, 38),
});

export default Marker;
