import React from "react";
import { Layer, Source } from "react-map-gl";

function MapBoxRoute(props: any) {
  return (
    <Source
      type="geojson" 
      data={{
        type: "Feature" ,
        geometry: { type: "LineString", coordinates: props.coordinates },
        "properties": {
            "title": "Mapbox DC",
            "marker-symbol": "monument"
        }
      }}
    >
      <Layer
        type="line"
        layout={{ "line-join": "round", "line-cap": "square" }}
        paint={{ "line-color": "#0462d4", "line-width": 4 }}
      />
    </Source>
  );
}

export default MapBoxRoute;

