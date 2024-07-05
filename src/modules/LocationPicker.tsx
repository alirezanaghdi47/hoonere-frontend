// libraries
import {useEffect, useRef} from "react";
import L from "leaflet";
import classNames from "classnames";

// assets
import markerIcon from "../../public/assets/images/icons/marker.svg";

// styles
import "leaflet/dist/leaflet.css";
import "@/styles/modules/leaflet.scss";

// types
import {TLocationPicker} from "@/types/moduleType.ts";

const customMarker = L.icon({
    shadowUrl: null,
    iconSize: [40, 40],
    iconUrl: markerIcon
});

const LocationPicker = ({width = "100%", height, location, setLocation, ...props}: TLocationPicker) => {
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const layers = {
                "osm": L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }),
            };

            mapRef.current = L.map('map', {
                zoomControl: false,
                // @ts-ignore
                drawControl: false,
            }).setView(new L.LatLng(35.696, 51.362), 17);

            mapRef.current.addLayer(layers.osm);

            L.control.zoom({
                position: "topright",
            }).addTo(mapRef.current);

            // @ts-ignore
            markerRef.current = new L.marker({
                lat: location?.lat,
                lng: location?.lon
            }, {icon: customMarker}).addTo(mapRef.current);

            return () => mapRef.current.remove();
        }
    }, []);

    useEffect(() => {
        mapRef.current.on("click", (e) => {
            if (markerRef.current) {
                mapRef.current.removeLayer(markerRef.current);

                markerRef.current = null;

                // @ts-ignore
                markerRef.current = new L.marker({
                    lat: e.latlng?.lat,
                    lng: e.latlng?.lng
                }, {icon: customMarker}).addTo(mapRef.current);
            }

            setLocation({lat: e.latlng?.lat, lon: e.latlng?.lng});
        });
    }, [location]);

    return (
        <div style={{width: width, height: height}}>
            <div
                {...props}
                id="map"
                className={classNames('z-index-3 w-100 h-100 rounded-2', props.className)}
            />
        </div>
    )
}

export default LocationPicker;