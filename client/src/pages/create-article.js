import React, { useState } from "react";
import Style from "../../public/assets/css/createNewArticle.module.css";
import GenerateArticle from "../components/GenerateArticle";
import Layout from "../components/Layout";
import PreviewArticle from "../components/PreviewArticle";
import { ProtectRoutes } from "../utilities/ProtectRoutes";
export default function createArticle() {
  const [preview, setPreview] = useState(false);

  return (
    <>
      <Layout
        title="create new article"
        description="Freedom newspaper's application for share our article"
      />
      <div className="container">
        <main className={Style.mainCreateArticle}>
          {!preview && <GenerateArticle handlePreview={setPreview} />}
          {preview && <PreviewArticle handlePreview={setPreview} />}
        </main>
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const Protected = ProtectRoutes(req);
  if (!Protected) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  return {
    props: {},
  };
}
