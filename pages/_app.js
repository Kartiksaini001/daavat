import "tailwindcss/tailwind.css";
import AuthContext from "../contexts/authContext";
import Header from "../components/Header";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const newUser = JSON.parse(localStorage.getItem("profile"));

    newUser && setUser(newUser);

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
    <AuthContext.Provider value={{ user, setUser }}>
      <Header />
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
