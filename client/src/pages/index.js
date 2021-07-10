import Error from "next/error";
import Link from "next/link";
import React from "react";
import Style from "../../public/assets/css/home.module.css";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import OneArticle from "../components/OneArticle";
import axios from "../utilities/defaultAxios";
export default function index({ articles, error }) {
  const arrOfArticles = [
    { category: "news-world", link: "/news-world", title: "New World" },
    { category: "business", link: "/business", title: "Business" },
    { category: "sports", link: "/sports", title: "Sports" },
    { category: "travel", link: "/travel", title: "traveling" },
    { category: "health", link: "/health", title: "Be Healthy" },
    { category: "style", link: "/style", title: "Style Fashion" },
  ];
  return (
    <>
      <Layout
        title="FREEDOM"
        description="Freedom newspaper's application for share our article"
      />
      <div className={Style.HomePage}>
        {/* start main heading */}
        {/* start News World */}
        {articles && (
          <div className="container">
            {arrOfArticles.map((subCategory, i) => {
              return (
                <div className={Style.categoryArticle} key={i}>
                  <h3>{subCategory.title}</h3>
                  <div className={Style.containerCategory}>
                    {articles
                      .filter((categories) => {
                        return categories.category === subCategory.category;
                      })
                      .map((article, i) => {
                        return (
                          <React.Fragment key={i}>
                            <OneArticle oneArticle={article} />
                          </React.Fragment>
                        );
                      })}
                  </div>
                  <span className={Style.moreArticles}>
                    <Link href={subCategory.link}>
                      <a> ↪ more articles </a>
                    </Link>
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* error happened  server or network */}
        {error && <Error title={"something went wrong!"} statusCode={500} />}
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
          error: null,
        },
      };
    })
    .catch(() => {
      return {
        props: {
          articles: null,
          error: true,
        },
      };
    });
}
