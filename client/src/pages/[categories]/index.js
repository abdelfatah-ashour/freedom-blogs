import { useRouter } from "next/router";
import React, { useState } from "react";
import Style from "../../../public/assets/css/categories.module.css";
import Article from "../../components/Article";
import Layout from "../../components/Layout";
import { toastError, toastWarn } from "../../components/toast";
import axios from "../../utilities/defaultAxios";
import Error from "next/error";

function index({ articles, params, error }) {
  const Router = useRouter().query;
  const [countPage, setCountPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [moreArticle, setMoreArticle] = useState([]);
  const [lastArticles, setLastArticles] = useState(false);

  const handleGetMoreArticle = async () => {
    setCountPage((prev) => {
      return prev + 1;
    });
    setLoading(true);
    await axios
      .get("/api/article/getArticlesWithCategory", {
        params: {
          category: Router.categories,
          count: countPage + 1,
        },
      })
      .then(({ data }) => {
        setMoreArticle([...moreArticle, ...data.message]);
        setLoading(false);

        if (data.message.length === 0) {
          setLastArticles(true);
        }
      })
      .catch((error) => {
        if (!error.response) {
          setLoading(false);
          toastWarn(error.message);
        } else if (error.request) {
          setLoading(false);
          toastError("server down...try again soon ♥");
        } else {
          setLoading(false);
          toastError(error.response.data.message);
        }
      });
  };

  return (
    <>
      <Layout
        title={String(params).toUpperCase()}
        category={params}
        description={`${params} page for share your articles and what is happened in your ahead`}
      />

      {error && <Error title={"something went wrong!"} statusCode={500} />}
      {articles && (
        <div className="container">
          <main className={Style.categories}>
            {articles.map((article, i) => {
              return (
                <React.Fragment key={i}>
                  <Article article={article} />
                </React.Fragment>
              );
            })}

            {moreArticle.map((article, i) => {
              return (
                <React.Fragment key={i}>
                  <Article article={article} />
                </React.Fragment>
              );
            })}

            {lastArticles ? (
              <p className="lead"> 😸 there last articles</p>
            ) : null}

            {loading ? <p className="lead">🔃 loading...</p> : null}
            {articles.length > 0 && !lastArticles ? (
              <section className={Style.seeMore}>
                <button onClick={handleGetMoreArticle} className="btn w-100">
                  🔥 get more articles
                </button>
              </section>
            ) : null}
            {articles.length < 5 ? (
              <p className="lead text-center py-3 my-3">
                😔💔 no more articles available
              </p>
            ) : null}
          </main>
        </div>
      )}
    </>
  );
}

export default index;

export async function getServerSideProps(ctx) {
  const { categories } = ctx.query;

  return await axios
    .get("/api/article/getArticlesWithCategory", {
      params: {
        category: categories,
      },
    })
    .then(({ data }) => {
      return {
        props: {
          articles: data,
          params: categories,
          error: null,
        },
      };
    })
    .catch(() => {
      return {
        props: {
          articles: null,
          params: categories,
          error: true,
        },
      };
    });
}
