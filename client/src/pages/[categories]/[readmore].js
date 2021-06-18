import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Style from "../../../public/assets/css/readMore.module.css";
import Comment from "../../components/Comment";
import Image from "../../components/Image";
import Layout from "../../components/Layout";
import { toastError, toastWarn } from "../../components/toast";
import { AuthContext } from "../../Context_API/isAuth";
import axios from "../../utilities/defaultAxios";
import { API } from "../../utilities/KEYS.js";
import { Socket } from "../_app";

export default function ReadMore({ article, content }) {
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
    Socket.on("addedComment", (comment) => {
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
          toastWarn(error.message);
        } else {
          toastError(error.response.data.message);
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
        Socket.emit("addComment", {
          from: username,
          to: {
            _id: article.author._id,
            username: article.author.username,
          },
          articleId: article._id,
          category: article.category,
          comment: comment,
        });
        setComment("");
      }
    }
  };

  const handleDeleteComment = (articleId, commentId) => {
    Socket.emit("deleteComment", {
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
        <li>🚀 {article.author.username}</li>
        <li>⌚ {new Date(article.createdAt).toLocaleString()}</li>
      </ul>
    </aside>
  );
  const ContentArticle = (
    <section className={Style.containerContentArticle}>
      <h3>📢 {article.head}</h3>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
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
              src={`${API}/${article.imageOfArticle}`}
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
          {moreComments && moreComments.length > 0 && (
            <div className="w-100 d-flex py-4 my-4">
              <button
                className="btn text-center w-100"
                onClick={handleGetMoreComments}
              >
                🚀 ⏳ GET more comments...
              </button>
            </div>
          )}
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
          content: `<div>${data.message.content}</div>`,
        },
      };
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}
