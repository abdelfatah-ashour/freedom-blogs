import Link from "next/link";
import React from "react";
import Style from "../../public/assets/css/article.module.css";
import { API } from "../utilities/KEYS";
import Image from "./Image";

export default function Article({ article }) {
  return (
    <article className={Style.article + " row w-100"}>
      <div
        className={
          Style.containerImageArticle +
          " col-lg-5 col-md-6 col-12 d-flex justify-content-center align-items-center"
        }
      >
        <Image
          src={`${API}/${article.imageOfArticle}`}
          alt={article.headArticle}
        />
      </div>
      <div
        className={Style.containerContentArticle + " col-lg-7 col-md-6 col-12"}
      >
        <h6 className={Style.headArticle}>📢 {article.head}</h6>
        <div
          dangerouslySetInnerHTML={{ __html: article.content }}
          style={{ maxHeight: "150px", overflow: "hidden" }}
        ></div>
        <Link href={`/${article.category}/${article._id}`}>
          <a className={Style.linkSeeMore}> ↪ full article</a>
        </Link>
      </div>
    </article>
  );
}
