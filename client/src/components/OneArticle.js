import Link from "next/link";
import React from "react";
import { FaLink } from "react-icons/fa";
import Style from "../../public/assets/css/home.module.css";
import { API } from "../utilities/KEYS";
export default function OneArticle({ oneArticle }) {
  return (
    <div className={Style.subCategory + " col-lg-3 col-md-6 col-11 mb-2"}>
      <div className={Style.link}>
        <Link href={"/" + oneArticle.category + "/" + oneArticle._id}>
          <a>
            <FaLink />
          </a>
        </Link>
      </div>
      <div className={Style.ContainerImage}>
        <img
          src={`${API}/${oneArticle.imageOfArticle}`}
          alt={oneArticle.head}
          loading="lazy"
        />
      </div>
      <div className={Style.ContainerContent}>
        📢 <span>{oneArticle.head}</span>
      </div>
    </div>
  );
}
