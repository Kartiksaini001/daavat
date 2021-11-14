import tw from "tailwind-styled-components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../contexts/authContext";
import i1 from "../img/test1.jpg";
import Head from "next/head";
import axios from "axios";

export default function Home() {
	const { user, setUser } = useContext(AuthContext);
	const [hotel, setHotel] = useState(null);
	const router = useRouter();
	const [userId, setUserId] = useState("");
	const [load, setLoad] = useState(true);
	const [coord, setCoord] = useState({});

	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			return "Geolocation is not supported by this browser.";
		}
	}

	function showPosition(position) {
		setCoord({
			lat: position.coords.latitude,
			lng: position.coords.longitude,
		});
	}

	function calcDistance(loc1, loc2) {
		let lat1 = (loc1.lat * Math.PI) / 180;
		let lng1 = (loc1.lng * Math.PI) / 180;
		let lat2 = (loc2.lat * Math.PI) / 180;
		let lng2 = (loc2.lng * Math.PI) / 180;

		let dlng = lng2 - lng1;
		let dlat = lat2 - lat1;

		let ans =
			Math.pow(Math.sin(dlat / 2), 2) +
			Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlng / 2), 2);

		ans = 2 * Math.asin(Math.sqrt(ans));

		ans = ans * 6371;

		return ans;
	}

	const allHotel = async (res) => {
		const result = { googleId: sessionStorage.getItem("googleId") };
		console.log(result);
		try {
			await axios
				.get("./api/hotel")
				.then((response) => {
					setHotel(response.data);
					setLoad(false);
					console.log(response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const newUser = JSON.parse(localStorage.getItem("profile"));
		if (!newUser) {
			router.push("/auth");
		} else {
			if (newUser.isHotel) router.push("/hotel/dashboard");
			allHotel();

			setUserId(newUser?.data?.id);

			getLocation();
		}
	}, []);

	return (
		<>
			<Head>
				<title>Daavat</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Wrapper>
				<Message>Hotels nearby you...</Message>
				{load && (
					<div
						className={
							"border-4 border-transparent h-8 w-8 rounded-full border-t-black animate-spin mt-8 block mx-auto"
						}
					></div>
				)}
				<HotelGrid>
					{!load &&
						hotel.map((item, index) => {
							// console.log(item.mapLocation);
							const distance = calcDistance(coord, item.mapLocation);
							// console.log(distance);
							if (distance <= 3) {
								return (
									<Link href={`/menu/${item.id}`} key={index}>
										<HotelCard>
											<Image
												height="1000"
												src={i1}
												alt="Sunset in the mountains"
												placeholder="blur"
												priority
											/>
											<HotelBody>
												<div className="font-bold text-xl mb-2 text-center">
													{item.name}
												</div>
											</HotelBody>
										</HotelCard>
									</Link>
								);
							}
						})}
				</HotelGrid>
				<Footer>&copy;2021 Made by Alpha_zero</Footer>
			</Wrapper>
		</>
	);
}
// flex bg-white text-black h-screen items-center justify-center
const Wrapper = tw.div`
  p-4 pt-24
`;
const Message = tw.div`
  text-3xl font-medium px-4 mb-2
`;
const HotelCard = tw.div`
  max-w-sm rounded overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 hover:bg-blue-200 transition m-auto my-4
`;
const HotelBody = tw.div`
px-6 py-4 h-2/5
`;

const HotelGrid = tw.div`
px-10 grid md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-6 sm:grid-cols-1
`;
const Footer = tw.div`
	flex justify-center text-sm mt-8 text-transparent font-medium bg-gradient-to-r from-green-700 to-blue-800 bg-clip-text font-bold font-serif
`;
