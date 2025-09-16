"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { Input } from "@heroui/react";
import { SearchIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { MapSelectData } from "@/types/types";

interface MapProps {
  lat?: number;
  lng?: number;
  onSelect?: (data: MapSelectData) => void;
}

const containerStyle = { width: "100%", height: "100%" };
const DEFAULT_CENTER = { lat: 50.4501, lng: 30.5234 };

const localeMap: Record<string, string> = {
  ukr: "uk",
  ru: "ru",
};

export default function Map({ lat, lng, onSelect }: MapProps) {
  const locale = useLocale();
  const mapLocale = localeMap[locale] || "en";
  const t = useTranslations("Map");
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [markerPos, setMarkerPos] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);

  const handleMapLoad = () => {
    if (!geocoder) setGeocoder(new google.maps.Geocoder());
  };

  useEffect(() => {
    if (lat !== undefined && lng !== undefined) {
      const pos = { lat, lng };
      setMapCenter(pos);
      setMarkerPos(pos);
      fetchAddress(pos);
    }
  }, [lat, lng, geocoder]);

  const fetchAddress = (coords: { lat: number; lng: number }) => {
    if (!geocoder) return;
    geocoder.geocode({ location: coords }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const components = results[0].address_components;

        const getComponent = (type: string) =>
          components.find((c) => c.types.includes(type))?.long_name || "";

        const addressData = {
          formatted: results[0].formatted_address,
          country: getComponent("country"),
          region: getComponent("administrative_area_level_1"),
          district: getComponent("administrative_area_level_2"),
          city: getComponent("locality"),
          sublocality:
            getComponent("sublocality") || getComponent("sublocality_level_1"),
          street: getComponent("route"),
          houseNumber: getComponent("street_number"),
          postalCode: getComponent("postal_code"),
        };

        console.log("Координаты + адрес:", coords, addressData);

        if (onSelect) onSelect({ ...coords, address: addressData });
      }
    });
  };

  const updatePosition = (coords: { lat: number; lng: number }) => {
    setMarkerPos(coords);
    fetchAddress(coords);
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const coords = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      updatePosition(coords);
    }
  };

  const onLoadAutocomplete = (
    autocomplete: google.maps.places.Autocomplete
  ) => {
    autocompleteRef.current = autocomplete;
  };

  const handlePlaceChanged = () => {
    if (!autocompleteRef.current) return;
    const place = autocompleteRef.current.getPlace();
    if (place.geometry && place.geometry.location) {
      const coords = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setMarkerPos(coords);
      setMapCenter(coords);

      if (place.address_components) {
        const components = place.address_components;

        const getComponent = (type: string) =>
          components.find((c) => c.types.includes(type))?.long_name || "";

        const addressData = {
          formatted: place.formatted_address || "",
          country: getComponent("country"),
          region: getComponent("administrative_area_level_1"),
          district: getComponent("administrative_area_level_2"),
          city: getComponent("locality"),
          sublocality:
            getComponent("sublocality") || getComponent("sublocality_level_1"),
          street: getComponent("route"),
          houseNumber: getComponent("street_number"),
          postalCode: getComponent("postal_code"),
        };

        console.log("Координаты + адрес:", coords, addressData);

        if (onSelect) onSelect({ ...coords, address: addressData });
      }
    }
  };

  const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: false,
    mapTypeControl: false,
    zoomControl: true,
    streetViewControl: false,
    fullscreenControl: false,
    rotateControl: false,
    cameraControl: false,
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
      libraries={["places"]}
      language={mapLocale}
    >
      <div className="relative w-full h-full">
        {/* Поле поиска */}
        <div className="absolute z-[2] max-w-[60%] w-full top-2 left-2">
          <Autocomplete
            onLoad={onLoadAutocomplete}
            onPlaceChanged={handlePlaceChanged}
          >
            <div>
              <Input
                endContent={<SearchIcon className="w-4 h-4" />}
                className="w-full"
                placeholder={t("search")}
                type="text"
              />
            </div>
          </Autocomplete>
        </div>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={12}
          options={mapOptions}
          onClick={handleMapClick}
          onLoad={handleMapLoad}
        >
          {markerPos && (
            <Marker
              draggable
              animation={google.maps.Animation.DROP}
              position={markerPos}
              onDragEnd={(e) => {
                if (e.latLng) {
                  const coords = {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                  };
                  updatePosition(coords);
                }
              }}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
}
