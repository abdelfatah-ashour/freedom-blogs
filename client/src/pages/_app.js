import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";
import "../../public/assets/css/bootstrap.min.css";
import "../../public/assets/css/global.css";
import "../../public/assets/css/navbar.css";
import { CreateArticleProvider } from "../Context_API/createArticle.context";
import { AuthProvider } from "../Context_API/isAuth";
import { API } from "../utilities/KEYS";

export const Socket = io(`${API}`, {
  transports: ["websocket"],
  secure: true,
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <CreateArticleProvider>
          <Component {...pageProps} />
        </CreateArticleProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
