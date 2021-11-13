import "tailwindcss/tailwind.css";
import { AuthContextProvider } from "../contexts/authContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp;
