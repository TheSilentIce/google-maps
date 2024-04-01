import { useState, useEffect } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

import { GetCoords } from "./GetCoords";

async function getCoordinates() {
  let gc: GetCoords = new GetCoords();
  const coords = await gc.getCoordinates();
  return coords;
}

export default function Intro() {
  const [markers, setMarkers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const coords = await getCoordinates();
      setMarkers(coords);
    };

    fetchData();
  }, []);

  const mapOptions = {
    position: { lat: 53, lng: 10 },
    apiKey: "API_STRING",
    zoom: 3,
    mapId: "MAP_ID",
  };

  return (
    <APIProvider apiKey={mapOptions.apiKey}>
      <div id="map-container" style={{ height: "100vh", width: "100%" }}>
        <Map
          minZoom={1}
          maxZoom={15}
          defaultZoom={3}
          zoomControl={false}
          center={mapOptions.position}
          mapId={mapOptions.mapId}
        >
          <AdvancedMarker position={{ lat: 50, lng: 10 }}></AdvancedMarker>

          {markers.map((marker, idx) => (
            <AdvancedMarker key={idx} position={marker}></AdvancedMarker>
          ))}
        </Map>
      </div>
    </APIProvider>
  );
}
