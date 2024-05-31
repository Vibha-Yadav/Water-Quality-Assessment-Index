import { useEffect, useRef, useState, useCallback, Fragment } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import '../DashboardMap/style.css';
import Card from "./card";
import "firebase/compat/firestore";

const DashboardMap = ({searchLocationCoordinates}) => {

	console.log(searchLocationCoordinates);
	const latitude = searchLocationCoordinates.coordinates && searchLocationCoordinates?.coordinates[1];
	const longitude = searchLocationCoordinates.coordinates &&  searchLocationCoordinates?.coordinates[0];

	console.log(latitude, longitude);
	
	return (
		<Fragment>
			<MapContainer
				center={[-17.2375195,145.7729715]}
				zoom={13}
				scrollWheelZoom={false}
				minZoom={2}
				maxZoom={18}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
       			 <Card />
				
				{
					searchLocationCoordinates.coordinates !== null && searchLocationCoordinates.coordinates[0] !== undefined && 
					searchLocationCoordinates.coordinates[1] !== undefined && 	
						<SearchLocationMark latitude={latitude} longitude={longitude} />
				}


			</MapContainer>
		</Fragment>
	)
};

const SearchLocationMark = ({ latitude, longitude }) => {

	// const coordinates = {
	// 	latitude: 29.9695,
	// 	longitude: 76.8783
	// }
console.log(latitude, longitude)
	// const coordinates = searchLocationCoordinates.coordinates;

	// States
	const map = useMap();
	const markerRef = useRef(null);
	const markerIcon = new L.icon({
		iconUrl: require("./marker.png"),
		iconSize: [25, 41],
		iconAnchor: [12, 41],
	});
	useEffect(() => {
		if ( latitude !== undefined && longitude !== undefined) {
			map.flyTo([latitude, longitude], 13, {
				duration: 2,
			});
		}
	}, [map, latitude, longitude]);

	if (latitude !== undefined && longitude !== undefined) {
		return null; // Handle case when coordinates are undefined
	}
	return (
		<Marker
			position={[latitude, longitude]}
			icon={markerIcon}
			ref={markerRef}
		></Marker>
	);
};

export default DashboardMap;
