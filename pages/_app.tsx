import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../hooks/useAuth";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <Component {...pageProps} />
        <Toaster
          toastOptions={{
            success: {
              style: {
                background: "green",
              },
            },
            error: {
              style: {
                background: "red",
                color: "white",
              },
              duration: 3000,
            },
          }}
        />
      </AuthProvider>
    </RecoilRoot>
  );
}

export default MyApp;
