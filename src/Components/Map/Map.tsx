"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface MapProps {
  lat?: number;
  lng?: number;
  onSelect: (coords: { lat: number; lng: number }) => void;
}

// const containerStyle = {
//   width: "100%",
//   height: "500px",
// };

// Координаты Киева по умолчанию
const DEFAULT_CENTER = { lat: 50.4501, lng: 30.5234 };

export default function Map({ lat, lng, onSelect }: MapProps) {
  // Если координаты не переданы — используем дефолт
  const center = {
    lat: lat ?? DEFAULT_CENTER.lat,
    lng: lng ?? DEFAULT_CENTER.lng,
  };

  const handleClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newLat = e.latLng.lat();
      const newLng = e.latLng.lng();
      onSelect({ lat: newLat, lng: newLng });
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
    >
      <GoogleMap
        // mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={handleClick}
      >
        {/* Показываем маркер */}
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}
