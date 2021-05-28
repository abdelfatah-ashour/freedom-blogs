/* eslint-disable sort-imports */
import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { CgMenuRight } from "react-icons/cg";
import { useRouter } from "next/router";
import { Notification } from "./Notification";
import axios from "../utilities/defaultAxios";
import {AuthContext} from "../Context_API/isAuth";
export default function Navbar() {
    const { asPath } = useRouter();
    const {AuthUser} = useContext(AuthContext);
    const [ReceiveAllNotification, setReceiveAllNotification] = useState([]);

    const handleGetAllNotification = async () => {
        return await axios
            .get("/api/article/getAllNotifications")
            .then(({ data }) => {
                setReceiveAllNotification(data.message);
            })
            .catch(error => {
                if (!error.response) {
                    console.log("network error");
                } else {
                    console.log(error.message);
                }
            });
    };


    useEffect(() => {
        if(AuthUser.isLogin){
            handleGetAllNotification();
        }
        return () => null;
    }, []);

    
    const listMenu = [
        {
            title: "Home",
            url: "/",
        },
        {
            title: "News-World",
            url: "/news-world",
        },
        {
            title: "Sports",
            url: "/sports",
        },
        {
            title: "Business",
            url: "/business",
        },
        {
            title: "Style",
            url: "/style",
        },
        {
            title: "Health",
            url: "/health",
        },
        {
            title: "Traveling",
            url: "/travel",
        },
    ];

    return (
        <nav className="navbarUI navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link href="/">
                    <a className="navbarBrand navbar-brand">freedom</a>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="toggleIcon navbar-toggler-icon">
                        <CgMenuRight />
                    </span>
                </button>
                <div
                    className="collapse navbar-collapse justify-content-around"
                    id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        {listMenu.map((link, i) => {
                            return (
                                <React.Fragment key={i}>
                                    <li
                                        className={
                                            asPath === link.url
                                                ? "activePath nav-item"
                                                : "nav-item"
                                        }>
                                        <Link href={link.url}>
                                            <a
                                                className="nav-link"
                                                aria-current="page"
                                            >
                                                {link.title}
                                            </a>
                                        </Link>
                                    </li>
                                </React.Fragment>
                            );
                        })}
                    </ul>
                    {
                        AuthUser.isLogin ? <Notification AllNotification={ReceiveAllNotification} />:null
                    }

                </div>
            </div>
        </nav>
    );
}
