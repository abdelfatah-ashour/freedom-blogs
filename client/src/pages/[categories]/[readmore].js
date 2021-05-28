/* eslint-disable sort-imports */
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Context_API/isAuth";
import { useRouter } from "next/router";
import { IO } from "../_app";
import Layout from "../../components/Layout";
import Comment from "../../components/Comment";
import axios from "../../utilities/defaultAxios";
import Style from "../../../public/assets/css/readMore.module.css";
import { API } from "../../utilities/KEYS.js";
import Image from "../../components/Image";

export default function ReadMore({ article }) {
  const [count, setCount] = useState(1);
  const [allComments, setAllComments] = useState([]);
  const [moreComments, setMoreComments] = useState(null);
  const { AuthUser } = useContext(AuthContext);
  const { isLogin, isAuth, username } = AuthUser;
  const Router = useRouter();
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (article) setAllComments([...article.comments]);
  }, []);

  useEffect(() => {
    IO.on("addedComment", (comment) => {
      console.log(comment);
      setAllComments([...allComments, { userId: username, comment }]);
    });
  }, []);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleGetMoreComments = async (e) => {
    e.preventDefault();
    setCount((prev) => ++prev);
    await axios
      .get("/api/article/getOneArticle", {
        params: {
          articleId: article._id,
          count: count,
        },
      })
      .then(({ data }) => setMoreComments(data.message))
      .catch((error) => {
        if (!error.response) {
          console.log("network error");
        } else {
          console.log(error.message);
        }
      });
  };

  const handleAddComment = (e) => {
    e.preventDefault();

    // anyone can't comment so must be authenticated
    if (!isLogin && !isAuth) {
      Router.push("/login");
    } else {
      if (comment.length <= 2) {
        alert("comment must be more than 2");
      } else {
        IO.emit("addComment", {
          from: username,
          to: { _id: article.author._id, username: article.author.username },
          articleId: article._id,
          category: article.category,
          comment: comment,
        });
        setComment("");
      }
    }
  };

  const handleDeleteComment = (articleId, commentId) => {
    IO.emit("deleteComment", {
      articleId,
      commentId,
    });
    const resultAfterDeleteComment = allComments.filter((comment) => {
      return comment._id !== commentId;
    });
    setAllComments(resultAfterDeleteComment);
  };

  const commentProps = {
    type: "text",
    name: "comment",
    onChange: handleChange,
    placeholder: "comment..",
    value: comment,
  };

  const InfoAboutArticle = (
    <aside className={Style.containerInfo}>
      <ul>
        <li>{"🚀 " + article.author.username}</li>
        <li>{"⌚ " + new Date(article.createdAt).toLocaleString()}</li>
      </ul>
    </aside>
  );
  const ContentArticle = (
    <section className={Style.containerContentArticle}>
      <h3>{article.headArticle}</h3>
      <p>{article.contentArticle}</p>
    </section>
  );

  const NewComment = (
    <section className={Style.makeComment}>
      <div>
        <input {...commentProps} />
        <span onClick={handleAddComment}>🐾</span>
      </div>
    </section>
  );

  const ListComment = (
    <div className={Style.listComments}>
      {allComments.map((OneComment, i) => {
        return (
          <React.Fragment key={i}>
            <Comment
              OneComment={OneComment}
              articleId={article._id}
              onDelete={handleDeleteComment}
            />
          </React.Fragment>
        );
      })}
    </div>
  );

  return (
    <>
      <Layout title={article.headArticle} description={article.headArticle} />
      <div className="container">
        <main className={Style.seeMore}>
          <section className={Style.containerImage}>
            <Image
              src={`${API}/${article.imageArticle}`}
              alt={article.imageArticle}
            />
          </section>
          {InfoAboutArticle}
          {ContentArticle}
          {NewComment}
          {ListComment}
          {moreComments ? (
            <div className={Style.listComments}>
              {moreComments.comments.map((OneComment, i) => {
                return (
                  <React.Fragment key={i}>
                    <Comment
                      OneComment={OneComment}
                      articleId={article._id}
                      onDelete={handleDeleteComment}
                    />
                  </React.Fragment>
                );
              })}
            </div>
          ) : null}
          <div className="w-100 d-flex py-4 my-4">
            <button
              className="btn text-center w-100"
              onClick={handleGetMoreComments}
            >
              🚀 ⏳ GET more comments...
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  return await axios
    .get("/api/article/getOneArticle", {
      params: {
        articleId: ctx.params.readmore,
      },
    })
    .then(({ data }) => {
      return {
        props: {
          article: data.message,
        },
      };
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}
