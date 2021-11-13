import React, {  useRef, useEffect, useState} from "react";
import tw from "tailwind-styled-components";
import mapboxgl from "!mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2FyYW50eWFnaSIsImEiOiJja3ZxYzh2dmVhaHB1MzBzN2hraGYwdmE0In0.f9yixYME3J5FeeXpw-CLJA";

const Map = (props) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState( 83.0298);
  const [lat, setLat] = useState(  24.0467);
  const [zoom, setZoom] = useState(4.6);
  const [ customMap, setMap ] = useState({ lat: 0, lng: 0})


  useEffect(() => {
    const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
         center: [lng, lat],
        zoom: zoom,
      });
      map.addControl(new mapboxgl.NavigationControl(), "top-right");
      map.on("move", () => {
        setLng(map.getCenter().lng.toFixed(4));
        setLat(map.getCenter().lat.toFixed(4));
        setZoom(map.getZoom().toFixed(2));
      });
      setMap(map);
  },[]);


  return (
    <div>
      <MapContainer ref={mapContainer}  >
          </MapContainer>
    </div>
  );
};

export default Map;

// const Map = (props) => {
// 	useEffect(() => {
//         const coordinates = document.getElementById('coordinates');
//         const map = new mapboxgl.Map({
//         container: 'map',
//         style: 'mapbox://styles/mapbox/streets-v11',
//         center: [75.8366318, 25.1389012],
// 			zoom: 5,
//         });
//         map.on('load', function () {
//             map.resize();
//         });

//         const marker = new mapboxgl.Marker({
//         draggable: true
//         })
//         .setLngLat([75.8366318, 25.1389012])
//         .addTo(map);

//         function onDragEnd() {
//         const lngLat = marker.getLngLat();
//         coordinates.style.display = 'block';
//         coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
//         }

//         marker.on('dragend', onDragEnd);
// 	});

// 	return (<div>
//         <Wrapper id="map">
//         {/* <pre id="coordinates" class="coordinates"></pre> */}
//     </Wrapper>
//     </div>);
// };

// export default Map;

const Wrapper = tw.div`
  flex-1 h-1/2
`;

const MapContainer= tw.div`
flex-1 h-screen
`