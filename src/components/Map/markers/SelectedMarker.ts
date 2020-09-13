import L from 'leaflet';

const selectedMarker = new L.Icon({
  iconUrl: require('../../../assets/selected-marker.png'),
  iconSize: new L.Point(45, 45),
  iconAnchor: new L.Point(22, 38),
});

export default selectedMarker;
