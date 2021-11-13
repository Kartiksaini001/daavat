import "tailwindcss/tailwind.css";
import { AuthContextProvider } from "../contexts/authContext";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Header />
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp;
