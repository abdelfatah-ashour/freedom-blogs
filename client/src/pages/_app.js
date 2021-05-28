/* eslint-disable react/prop-types */
/* eslint-disable sort-imports */
import React from "react";
import { AuthProvider } from "../Context_API/isAuth";
import {ConnectionProvider} from "../Context_API/stateConnection";
import { io } from "socket.io-client";
import { API } from "../utilities/KEYS";
import "../../public/assets/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "../../public/assets/css/global.css";
import "../../public/assets/css/navbar.css";


export const IO = io(`${API}`, {
    transports: ["websocket"],
});




function MyApp({ Component, pageProps }) {

    
    return (
        <>
            <AuthProvider>
                <ConnectionProvider>
                    <Component {...pageProps} />
                </ConnectionProvider>
            </AuthProvider>
        </>
    );
}

export default MyApp;
