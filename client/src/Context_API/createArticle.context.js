import React, { createContext, useState } from "react";

export const ArticleContext = createContext("");

export function CreateArticleProvider({ children }) {
  const [article, setArticle] = useState({
    head: null,
    imageOfArticle: null,
    category: "DEFAULT",
  });
  const [content, setContent] = useState({
    content: "",
  });
  return (
    <ArticleContext.Provider
      value={{
        article,
        setArticle,
        content,
        setContent,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
}
