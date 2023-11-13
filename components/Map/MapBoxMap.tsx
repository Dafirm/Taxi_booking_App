import { UserLocationContext } from '@/context/UserLocationContext';
import React, { useContext, useEffect, useRef } from 'react'
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from './Markers';
import { SourceCordiContext } from '@/context/SourceCordiContext';
import { DestinationCordiContext } from '@/context/DestinationCordiContext';
import { DirectionDataContext } from '@/context/DirectionDataContext';
const MAPBOX_DRIVING_ENDPOINT =
  "https://api.mapbox.com/directions/v5/mapbox/driving/";

function MapBoxMap() {
  const mapRef = useRef<any>();
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { sourceCordinates, setSourceCordinates } =
    useContext(SourceCordiContext);

  const { destinationCordinates, setDestinationCordinates } = useContext(
    DestinationCordiContext
  );

  // const { directionData, setDirectionData } = useContext(DirectionDataContext);

  //Use to Fly to Source Marker Location

  useEffect(() => {
    if (sourceCordinates) {
      mapRef.current?.flyTo({
        center: [sourceCordinates.lng, sourceCordinates.lat],
        duration: 2500,
      });
    }
  }, [sourceCordinates]);
  //Use to Fly to Destination Markers Location
  useEffect(() => {
    if (destinationCordinates) {
      mapRef.current?.flyTo({
        center: [destinationCordinates.lng, destinationCordinates.lat],
        duration: 2500,
      });
    }

    if (sourceCordinates && destinationCordinates) {
      getDirectionRoute();
    }
  }, [destinationCordinates]);

  //Newly Added
  const getDirectionRoute = async () => {
    const res = await fetch(
      MAPBOX_DRIVING_ENDPOINT +
        sourceCordinates.lng +
        "," +
        sourceCordinates.lat +
        ";" +
        destinationCordinates.lng +
        "," +
        destinationCordinates.lat +
        "?overview=full&geometries=geojson" +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();
    console.log(result);
    console.log(result.routes);
    // setDirectionData(result);
  };
  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Map</h2>
      <div className="rounded-lg overflow-hidden">
        {userLocation ? (
          <Map
          ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation?.lng,
              latitude: userLocation?.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: 450, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers />
          </Map>
        ) : null}
      </div>
    </div>
  );
}

export default MapBoxMap
