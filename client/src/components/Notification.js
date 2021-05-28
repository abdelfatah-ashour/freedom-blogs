/* eslint-disable react/prop-types */
/* eslint-disable sort-imports */
import React, { useState } from "react";
import Link from "next/link";
import { IO } from "../pages/_app";
import { useRouter } from "next/router";
export function Notification(props) {
    const [newNotification, setNewNotification] = useState([]);

    const Router = useRouter();

    
    IO.on("receiveNewNotification", data => {
        // return object;
        if (newNotification.length > 0) {
            setNewNotification([...newNotification, data]);
        } else {
            setNewNotification([data]);
        }
    });

    const handlePushToArticle = (category, articleId) => {
        Router.push(`/${category}/${articleId}`);
    };

    return (
        <div className="listNotification dropdown">
            <span
                className="dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                🔔
            </span>
            <div
                className="dropdown-menu dropdown-menu-notification"
                aria-label="navbarDropdown">
                {
                    newNotification.length > 0 && props.AllNotification && props.AllNotification.lenght > 0 ? null : <small>no available notifications</small>
                }
                {newNotification.length > 0
                    ? newNotification.map((notification, i) => {
                        return (
                            <React.Fragment key={i}>
                                <div
                                    className="d-flex flex-column one-notification"
                                    onClick={() =>
                                        handlePushToArticle(
                                            notification.category,
                                            notification.articleId,
                                        )
                                    }>
                                    <span
                                        style={{
                                            fontSize: "75%",
                                            textAlign: "center",
                                        }}>
                                        <b>
                                            {
                                                notification.to.username + " comment at "
                                            }
                                            {String(
                                                notification.category,
                                            ).toUpperCase() + " : "}
                                        </b>
                                        <small>
                                            {notification.comment.slice(
                                                0,
                                                50,
                                            )}
                                              ...
                                        </small>
                                    </span>
                                </div>
                            </React.Fragment>
                        );
                    })
                    : null}

                {props.AllNotification
                    ? props.AllNotification.map((notification, i) => {
                        return (
                            <React.Fragment key={i}>
                                <Link
                                    href={`/${notification.category}/${notification.articleId}`}>
                                    <div className="d-flex flex-column one-notification">
                                        <span
                                            style={{
                                                fontSize: "75%",
                                                textAlign: "center",
                                            }}>
                                            <b>
                                                {notification.from.username}{" "}
                                            </b>
                                            <small>
                                                  comment :
                                                {notification.contentNotification.slice(
                                                    0,
                                                    50,
                                                )}
                                                  ...
                                            </small>
                                        </span>
                                    </div>
                                </Link>
                            </React.Fragment>
                        );
                    })
                    : null}
            </div>
        </div>
    );
}
