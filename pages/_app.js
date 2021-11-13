import "tailwindcss/tailwind.css";
import { AuthContextProvider } from "../contexts/authContext";
import Header from "../components/Header";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		window.OneSignal = window.OneSignal || [];
		OneSignal.push(function () {
			OneSignal.init({
				appId: "80641567-6862-4d4a-8a15-e4e6e83edeb1",
				safari_web_id:
					"web.onesignal.auto.4ed285de-faf5-4c6c-a346-3ff91e5aded6",
				notifyButton: {
					enable: true,
				},
				allowLocalhostAsSecureOrigin: true,
			});
		});

		return () => {
			window.OneSignal = undefined;
		};
	}, []);
	return (
		<AuthContextProvider>
			<Header />
			<Component {...pageProps} />
		</AuthContextProvider>
	);
}

export default MyApp;
