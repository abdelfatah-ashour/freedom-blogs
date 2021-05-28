/* eslint-disable react/prop-types */
/* eslint-disable sort-imports */
import React from "react";
import Link from "next/link";
import Style from "../../public/assets/css/article.module.css";
import { API } from "../utilities/KEYS";
import Image from "./Image";

export default function Article({ article }) {
	return (
		<article className={Style.article}>
			<div className={Style.containerArticle}>
				<div className={Style.containerImageArticle}>
					<Image
						src={`${API}/${article.imageArticle}`}
						alt={article.headArticle}
					/>
					<h6 className={Style.headArticle}>{article.headArticle}</h6>
				</div>
				<div className={Style.containerContentArticle}>
					<p>{article.contentArticle.slice(0, 512)}</p>
					<Link href={`/${article.category}/${article._id}`}>
						<a className={Style.linkSeeMore}> ↪ full article</a>
					</Link>
				</div>
			</div>
		</article>
	);
}
