import tw from "tailwind-styled-components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../contexts/authContext";
import i1 from "../img/test1.jpg";
import Head from "next/head";
const hotel = [
	{
		img: i1,
		name: "xyz",
	},
	{
		img: i1,
		name: "xyz",
	},
	{
		img: i1,
		name: "xyz",
	},
	{
		img: i1,
		name: "xyz",
	},
	{
		img: i1,
		name: "xyz",
	},
	{
		img: i1,
		name: "xyz",
	},
	{
		img: i1,
		name: "xyz",
	},
	{
		img: i1,
		name: "xyz",
	},
	{
		img: i1,
		name: "xyz",
	},
	{
		img: i1,
		name: "xyz",
	},
];

export default function Home() {
	const { user, setUser } = useContext(AuthContext);
	const router = useRouter();
	const [userId, setUserId] = useState("");
	useEffect(() => {
		const newUser = JSON.parse(localStorage.getItem("profile"));
		if (!newUser) router.push("/auth");
		OneSignal.push(function () {
			OneSignal.setExternalUserId(newUser.data.id);
		});

		OneSignal.push(function () {
			OneSignal.getExternalUserId().then(function (externalUserId) {
				console.log("externalUserId: ", externalUserId);
			});
		});

		setUserId(newUser.data.id);
	}, []);

	var sendNotification = function (data) {
		var headers = {
			"Content-Type": "application/json; charset=utf-8",
			Authorization: "Basic OTJlNWU2MTAtODIwNy00MzNkLTg0NTUtOWNhZTU1MWM3YjIw",
		};

		var options = {
			host: "onesignal.com",
			port: 443,
			path: "/api/v1/notifications",
			method: "POST",
			headers: headers,
		};

		var https = require("https");
		var req = https.request(options, function (res) {
			res.on("data", function (data) {
				console.log("Response:");
				console.log(JSON.parse(data));
			});
		});

		req.on("error", function (e) {
			console.log("ERROR:");
			console.log(e);
		});

		req.write(JSON.stringify(data));
		req.end();
	};

	var message = {
		app_id: "80641567-6862-4d4a-8a15-e4e6e83edeb1",
		contents: { en: "Kaise ho???" },
		channel_for_external_user_ids: "push",
		include_external_user_ids: [userId],
	};

	sendNotification(message);

	return (
		<>
			<Head>
				<title>Daavat</title>
				<meta
					name="description"
					content="Integrating OneSignal with a Next.js app."
				/>
				<link rel="icon" href="/favicon.ico" />
				<script
					src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
					async=""
				></script>
			</Head>
			<Wrapper>
				<Message>Hotels nearby you...</Message>
				<HotelGrid>
					{hotel.map((item, index) => {
						return (
							<Link href="/menu" key={index}>
								<HotelCard>
									<Image
										height="1000"
										src={item.img}
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
					})}
				</HotelGrid>
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
