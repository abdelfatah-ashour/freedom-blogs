/* eslint-disable react/prop-types */
/* eslint-disable sort-imports */
import React from "react";
import Link from "next/link";
import Style from "../../public/assets/css/home.module.css";
import { API } from "../utilities/KEYS";
import Image from "./Image";

export default function Category({ categories, pathToCategory, title }) {
  return (
    <div className={Style.categoryArticle}>
      <h3>{title}</h3>
      <div className={Style.containerCategory}>
        {categories.map((article, i) => {
          return (
            <React.Fragment key={i}>
              <div className={Style.subCategory}>
                <div className={Style.ContainerImage}>
                  <Image
                    src={`${API}/${article.imageArticle}`}
                    alt={article.headArticle}
                  />
                </div>
                <div className={Style.overlaySubArticle}></div>
                <span className={Style.fullArticle}>
                  <Link
                    href={`/${article.category}/${article._id}`}
                    
                  >
                    <a>full Article</a>
                  </Link>
                </span>
                <div className={Style.ContainerContent}>
                  <span>{article.headArticle}</span>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <span className={Style.moreArticles}>
        <Link href={pathToCategory}>
          <a> ↪ more articles </a>
        </Link>
      </span>
    </div>
  );
}
