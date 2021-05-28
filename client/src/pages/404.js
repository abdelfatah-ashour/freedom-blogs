/* eslint-disable react/prop-types */
import Link from "next/link";
import React from "react";

export default function ErrorPage() {
  return (
    <div className="container">
      <div
        className="d-flex flex-column justify-content-center align-items-center w-100"
        style={{ minHeight: "100vh" }}
      >
        <span>🚨 😔 Sorry!</span>
        <span>there issue we try to fix it ♥</span>
        <Link href="/">
          <a>Retry</a>
        </Link>
      </div>
    </div>
  );
}
