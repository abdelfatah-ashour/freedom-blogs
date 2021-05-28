/* eslint-disable react/prop-types */
/* eslint-disable sort-imports */
import React from "react";
import Category from "../components/Category";
import axios from "../utilities/defaultAxios";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import Style from "../../public/assets/css/home.module.css";

export default function index({ articles }) {
	const categoryUIProps = [
		{
			categories: articles.newsWorld,
			pathToCategory: "/business",
			title: "News World",
		},
		{
			categories: articles.business,
			pathToCategory: "/business",
			title: "Business",
		},
		{ categories: articles.style, pathToCategory: "/style", title: "Stylish" },
		{ categories: articles.health, pathToCategory: "/health", title: "Health" },
		{ categories: articles.sports, pathToCategory: "/sports", title: "Sports" },
		{ categories: articles.travel, pathToCategory: "/travel", title: "Travel" },
	];

	return (
		<>
			<Layout
				title="FREEDOM"
				description="Freedom newspaper's application for share our article"
			/>
			<div className={Style.HomePage}>
				{/* start main heading */}
				<div className="container">
					{/* start categories */}
					{categoryUIProps.map((category, i) => {
						return (
							<React.Fragment key={i}>
								<Category
									categories={category.categories}
									pathToCategory={category.pathToCategory}
									title={category.title}
								/>
							</React.Fragment>
						);
					})}
				</div>
				<Footer />
			</div>
		</>
	);
}

export async function getServerSideProps() {
	return await axios
		.get("/api/article/getHomeArticles")
		.then(({ data }) => {
			return {
				props: {
					articles: data.message,
				},
			};
		})
		.catch((error) => {
			throw new Error(error.message);
		});
}
