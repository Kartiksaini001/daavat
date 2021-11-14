import "tailwindcss/tailwind.css";
import AuthContext from "../contexts/authContext";
import Header from "../components/Header";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const newUser = JSON.parse(localStorage.getItem("profile"));

    newUser && setUser(newUser);
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Header />
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
