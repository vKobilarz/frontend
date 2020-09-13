import React, { FC, useEffect, useState } from 'react';

import { Map as LeafletMap, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { useOcurrences } from '../../hooks/OcurrencesContext';
import selectedMarker from './markers/SelectedMarker';
import marker from './markers/Marker';

const Map: FC = () => {
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const { ocurrences } = useOcurrences();

  function handleMapClick({ latlng }: LeafletMouseEvent) {
    console.log(latlng);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setInitialPosition([coords.latitude, coords.longitude]);
    });
  }, []);

  return (
    <LeafletMap
      zoomControl={false}
      style={{ height: '100%', width: '100%', borderRadius: '7px' }}
      center={initialPosition}
      zoom={15}
      onClick={handleMapClick}
    >
      <TileLayer url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png" />
      {ocurrences.map(ocurrence => (
        <Marker
          key={ocurrence._id}
          position={[ocurrence.latitude, ocurrence.longitude]}
          icon={ocurrence.selected ? selectedMarker : marker}
        />
      ))}
    </LeafletMap>
  );
};

export default Map;
