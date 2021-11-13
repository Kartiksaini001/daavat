import tw from "tailwind-styled-components";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header.js";
import Map from "../../components/Map.js";


export default function Home() {

   
	return (
    <Wrapper>
        <Header/>
      <Map/>
		</Wrapper>
	);
}
// flex bg-white text-black h-screen items-center justify-center
const Wrapper = tw.div`
  p-4 flex flex-col h-screen
`;

const MapContainer= tw.div`
h-1/2`;
