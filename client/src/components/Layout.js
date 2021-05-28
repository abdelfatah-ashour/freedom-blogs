/* eslint-disable sort-imports */
import React, { useContext } from "react";
import Head from "next/head";
import HeadBody from "./HeadBody";
import Navbar from "./Navbar";
import { ConnectContext } from "../Context_API/stateConnection";
import { IO } from "../pages/_app";

export default function layout({ title, description }) {
    const { Connect, setConnect } = useContext(ConnectContext);

    IO.on("connect", () => {
        setConnect(true);
        console.log("connected");
    });

    IO.on("disconnect", () => {
        setConnect(false);
        console.log("disconnected");
    });

    const StateConnectStyleProps = {
        backgroundColor: "rgb(255 140 140)",
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 9999999,
    };

    return (
        <>
            <Head>
                <meta type="description" content={description} />
                <title>{title}</title>
            </Head>
            <HeadBody />
            <Navbar />
            {!Connect ? (
                <div className="w-100 d-flex" style={StateConnectStyleProps}>
                    <p className="lead text-center w-100 pt-1" style={{ color: "#000" }}>
            🚨 connection faild 🚨
                    </p>
                </div>
            ) : null}
        </>
    );
}
