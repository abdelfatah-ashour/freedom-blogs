/* eslint-disable sort-imports */
import Head from "next/head";
import React from "react";
import { Socket } from "../pages/_app";
import HeadBody from "./HeadBody";
import Navbar from "./Navbar";

export default function layout({ title, description }) {
  Socket.on("connect", () => {
    console.log("connected");
  });

  Socket.on("disconnect", () => {
    console.log("disconnected");
  });

  Socket.on("error", (error) => {
    console.log(error);
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
    </>
  );
}
