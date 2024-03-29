import React from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const AssignedMap = ({ ticketLocation, technicianLocation }) => {
  // Define the initial map view
  const position = [ticketLocation.latitude, ticketLocation.longitude];

  return (
    <MapContainer center={position} zoom={15} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Add a marker for the ticket location */}
      <Marker position={[ticketLocation.latitude, ticketLocation.longitude]}>
        <Popup>
          Ticket Location
        </Popup>
      </Marker>
      {/* Add a marker for the technician location */}
      <Marker position={[technicianLocation.latitude, technicianLocation.longitude]}>
        <Popup>
          Technician Location
        </Popup>
      </Marker>
      {/* Draw a polyline between the ticket location and technician location */}
      <Polyline
        positions={[
          [ticketLocation.latitude, ticketLocation.longitude],
          [technicianLocation.latitude, technicianLocation.longitude]
        ]}
        color="blue"
      />
    </MapContainer>
  );
};

export default AssignedMap;
