"use client";

import React, { useRef, useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
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

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);

  const mapRef = useRef<HTMLDivElement>(null);
  const autocompleteInputRef = useRef<HTMLInputElement>(null);

  // Инициализация карты
  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
        libraries: ["places"],
        language: "uk",
      });

      await loader.load();

      const mapInstance = new google.maps.Map(
        mapRef.current as HTMLDivElement,
        {
          center: DEFAULT_CENTER,
          zoom: 12,
          disableDefaultUI: false,
          mapTypeControl: false,
          zoomControl: true,
          streetViewControl: false,
          fullscreenControl: false,
          rotateControl: false,
        }
      );

      const geocoderInstance = new google.maps.Geocoder();

      const markerInstance = new google.maps.Marker({
        map: mapInstance,
        draggable: true,
        animation: google.maps.Animation.DROP,
      });

      // Drag маркера
      markerInstance.addListener("dragend", (e: google.maps.MapMouseEvent) => {
        if (!e.latLng) return;
        const coords = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        geocodeAndSend(coords);
      });

      // Клик по карте
      mapInstance.addListener("click", (e: google.maps.MapMouseEvent) => {
        if (!e.latLng) return;
        const coords = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        markerInstance.setPosition(coords);
        geocodeAndSend(coords);
      });

      // Autocomplete
      if (autocompleteInputRef.current) {
        const autocomplete = new google.maps.places.Autocomplete(
          autocompleteInputRef.current
        );
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (!place.geometry || !place.geometry.location) return;

          const coords = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          mapInstance.setCenter(coords);
          markerInstance.setPosition(coords);

          handleAddress(
            coords,
            place.address_components || [],
            place.formatted_address
          );
        });
      }

      setMap(mapInstance);
      setMarker(markerInstance);
      setGeocoder(geocoderInstance);

      // Если координаты уже пришли при первой инициализации
      if (
        typeof lat === "number" &&
        typeof lng === "number" &&
        !isNaN(lat) &&
        !isNaN(lng)
      ) {
        const pos = { lat, lng };
        mapInstance.setCenter(pos);
        markerInstance.setPosition(pos);
        geocodeAndSend(pos);
      }

      function geocodeAndSend(coords: { lat: number; lng: number }) {
        geocoderInstance.geocode({ location: coords }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            const comps = results[0].address_components;
            const getComponent = (type: string) =>
              comps.find((c) => c.types.includes(type))?.long_name || "";
            const addressData = {
              formatted: results[0].formatted_address,
              country: getComponent("country"),
              region: getComponent("administrative_area_level_1"),
              district: getComponent("administrative_area_level_2"),
              city: getComponent("locality"),
              sublocality:
                getComponent("sublocality") ||
                getComponent("sublocality_level_1"),
              street: getComponent("route"),
              houseNumber: getComponent("street_number"),
              postalCode: getComponent("postal_code"),
            };
            onSelect?.({ ...coords, address: addressData });
          }
        });
      }
    };

    initMap();
  }, [mapLocale]);

  // Следим за изменением lat/lng после инициализации карты
  useEffect(() => {
    if (!map || !marker) return;
    if (
      typeof lat === "number" &&
      typeof lng === "number" &&
      !isNaN(lat) &&
      !isNaN(lng)
    ) {
      const pos = { lat, lng };
      marker.setPosition(pos);
      map.setCenter(pos);

      if (geocoder) {
        geocoder.geocode({ location: pos }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            const comps = results[0].address_components;
            const getComponent = (type: string) =>
              comps.find((c) => c.types.includes(type))?.long_name || "";
            const addressData = {
              formatted: results[0].formatted_address,
              country: getComponent("country"),
              region: getComponent("administrative_area_level_1"),
              district: getComponent("administrative_area_level_2"),
              city: getComponent("locality"),
              sublocality:
                getComponent("sublocality") ||
                getComponent("sublocality_level_1"),
              street: getComponent("route"),
              houseNumber: getComponent("street_number"),
              postalCode: getComponent("postal_code"),
            };
            onSelect?.({ ...pos, address: addressData });
          }
        });
      }
    }
  }, [lat, lng, map, marker, geocoder]);

  const handleAddress = (
    coords: { lat: number; lng: number },
    components?: google.maps.GeocoderAddressComponent[],
    formatted?: string
  ) => {
    if (!onSelect) return;

    if (components) {
      const getComponent = (type: string) =>
        components.find((c) => c.types.includes(type))?.long_name || "";

      const addressData = {
        formatted: formatted || "",
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
      onSelect({ ...coords, address: addressData });
    }
  };

  return (
    <div className="relative w-full h-full">
      <div className="absolute z-[2] max-w-[60%] w-full top-2 left-2">
        <Input
          ref={autocompleteInputRef}
          endContent={<SearchIcon className="w-4 h-4" />}
          className="w-full"
          placeholder={t("search")}
          type="text"
        />
      </div>

      <div ref={mapRef} style={containerStyle} />
    </div>
  );
}
