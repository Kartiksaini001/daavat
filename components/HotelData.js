import tw from "tailwind-styled-components";

export default function HotelData(props){
    const lat=props.lat;
    const lng=props.lng;
    const minOrder=props.min;

   return(
    <Hotel>
       <strong> Your Current Settings </strong><br/>
        Latitude: {lat}<br/>
     Longitude: {lng}<br/>
     Mininmum Order Value: {minOrder}  
  </Hotel>
   );
}


const Hotel = tw.div`
  max-w-sm rounded h-40 p-9 pt-4 overflow-hidden shadow-lg text-lg text-bold transform hover:scale-105 hover:bg-blue-200 transition m-auto mt-10 mb-24
`;
