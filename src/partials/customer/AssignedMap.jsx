import React from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const AssignedMap = ({ routePoints }) => {
  const position = [routePoints[0].latitude, routePoints[0].longitude];
  const source = routePoints[0];
  const destination = routePoints[routePoints.length - 1];

  return (
    <MapContainer center={position} zoom={15} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polyline positions={routePoints.map(point => [point.latitude, point.longitude])} color="blue" />
      <Marker position={[source.latitude, source.longitude]}>
        <Popup>
          Source
        </Popup>
      </Marker>
      <Marker position={[destination.latitude, destination.longitude]}>
        <Popup>
          Destination
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default AssignedMap;
