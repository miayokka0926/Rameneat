import React from "react";
import { MapContainer as Map, TileLayer, Marker, Popup } from "react-leaflet";

import Menu from "./Menu.js";

//render map
export default function LeafletMap(props) {
  return (
    <>
      <Map
        center={props.center}
        zoom={18}
        scrollWheelZoom={true}
        style={{ height: "90vh" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={props.center}
          iconUrl={"https://static.thenounproject.com/png/780108-200.png"}
        >
          <Popup>Location</Popup>
        </Marker>
        {props.vendors.map((vendor) => (
          <Menu
            key={vendor.id}
            position={vendor.location}
            snacks={props.snacks}
            vendor={vendor}
            customer={props.customer}
          />
        ))}
      </Map>
    </>
  );
}
