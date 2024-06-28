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

const LocationPicker = ({width = "100%",  height , location , setLocation , ...props}: TLocationPicker) => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            let marker = null;

            const layers = {
                "osm": L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }),
            };

            // config leaflet
            mapRef.current = L.map('map', {
                zoomControl: false,
                drawControl: false,
            }).setView(new L.LatLng(35.696, 51.362), 17);

            // set initial layer
            mapRef.current.addLayer(layers.osm);

            // add zoom button
            L.control.zoom({
                position: "topright",
            }).addTo(mapRef.current);

            // customize icon
            const customMarker = L.icon({
                shadowUrl: null,
                iconSize: [40, 40],
                iconUrl: markerIcon
            });

            // add new marker & remove old one
            mapRef.current.on("click", (e) => {
                if (marker) {
                    mapRef.current.removeLayer(marker);
                    setLocation({lat: 0, lon: 0});
                }

                marker = new L.marker(e.latlng, {icon: customMarker}).addTo(mapRef.current);

                setLocation({lat: e.latlng?.lat, lon: e.latlng?.lng});
            });

            return () => mapRef.current.remove();
        }
    }, []);

    return (
        <div style={{width: width , height: height}}>
            <div
                {...props}
                id="map"
                className={classNames('z-index-3 w-100 h-100 rounded-2', props.className)}
            />
        </div>
    )
}

export default LocationPicker;