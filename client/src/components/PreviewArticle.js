import React, { useContext, useEffect, useRef } from "react";
import Style from "../../public/assets/css/createNewArticle.module.css";
import { ArticleContext } from "../Context_API/createArticle.context";
export default function PreviewArticle({ handlePreview }) {
  const { article } = useContext(ArticleContext);
  const review = useRef(null);
  useEffect(() => {
    review.current.innerHTML = article;
    return () => {
      return;
    };
  }, [article]);
  return (
    <div className={Style.previewArticle}>
      <button
        className={Style.closePreview + " btn btn-danger p-1"}
        onClick={() => handlePreview(false)}
      >
        ✖
      </button>
      <div className={Style.previewArticle} ref={review}></div>
    </div>
  );
}
