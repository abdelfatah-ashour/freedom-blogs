import dynamic from "next/dynamic";
import React, { useContext } from "react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import Style from "../../public/assets/css/createNewArticle.module.css";
import { toastError, toastSuccess, toastWarn } from "../components/toast";
import { ArticleContext } from "../Context_API/createArticle.context";
import { checkCreateArticle } from "../utilities/checkCreateArticle";
import defaultAxios from "../utilities/defaultAxios";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

function handleImageUpload(
  targetImgElement,
  index,
  state,
  imageInfo,
  remainingFilesCount
) {
  console.log(targetImgElement, index, state, imageInfo, remainingFilesCount);
}

function handleImageUploadError(errorMessage, result) {
  console.log(errorMessage, result);
}

function handleVideoUploadBefore(files, info) {
  // uploadHandler is a function
  console.log(files, info);
}

const TextEditor = ({ handlePreview }) => {
  const { article, setArticle, content, setContent } =
    useContext(ArticleContext);
  const categories = [
    { title: "News World", name: "NewsWorld" },
    { title: "Business", name: "business" },
    { title: "Style", name: "style" },
    { title: "Healthy", name: "health" },
    { title: "Sporting", name: "sports" },
    { title: "Traveling", name: "travel" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    for (const key in article) {
      if (Object.hasOwnProperty.call(article, key)) {
        const element = article[key];
        formData.append(key, element);
      }
    }
    formData.append("content", content.content);

    await checkCreateArticle({
      ...article,
      ...content,
    })
      .then(async () => {
        await defaultAxios
          .post("/api/article/create-article", formData)
          .then((resp) => {
            console.log(resp.data);
            toastSuccess(resp.data.message);
          })
          .catch((error) => {
            if (!error.response) {
              toastError(error.message );
            } else {
              error(error.response.data.message);
            }
          });
      })
      .catch((e) => {
        toastWarn(e.message);
      });
  };

  return (
    <div className={Style.generateNewArticle}>
      <button
        className={Style.openPreview + " btn btn-warning"}
        onClick={() => handlePreview(true)}
      >
        👁
      </button>
      <div className="alert alert-heading text-center w-100">
        <h3>📢 create new Article</h3>
      </div>

      <div className="input-group flex-nowrap mb-3">
        <span className="input-group-text" id="addon-wrapping">
          Head Of Article
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="write a heading of article"
          aria-label="Username"
          aria-describedby="addon-wrapping"
          onChange={(e) => {
            setArticle({
              ...article,
              head: e.target.value,
            });
          }}
        />
      </div>
      <select
        className="form-select mb-3"
        aria-label="Default select example"
        defaultValue={article.category}
        onChange={(e) => {
          setArticle({
            ...article,
            category: e.target.value,
          });
        }}
      >
        <option value="DEFAULT" disabled>
          Select Section Of Article
        </option>
        {categories.map((category, i) => {
          return (
            <option value={category.name} key={i}>
              {category.title}
            </option>
          );
        })}
      </select>
      <div className="mb-3 w-100">
        <label htmlFor="formFile" className="form-label">
          Image of Article* (required)
        </label>
        <input
          className="form-control"
          type="file"
          id="formFile"
          onChange={(e) =>
            setArticle({ ...article, imageOfArticle: e.target.files[0] })
          }
          multiple={false}
        />
      </div>
      <SunEditor
        height="300px"
        minHeight="300px"
        defaultValue={content.content}
        className={Style.TextEditor}
        autoFocus={true}
        placeholder="Please type here..."
        onChange={(contentEditor) => {
          setContent({
            ...content,
            content: contentEditor,
          });
        }}
        onImageUpload={handleImageUpload}
        onImageUploadError={handleImageUploadError}
        onVideoUploadBefore={handleVideoUploadBefore}
        setOptions={{
          katex: "window.katex",
          buttonList: [
            [
              "undo",
              "redo",
              "font",
              "fontSize",
              "formatBlock",
              "paragraphStyle",
              "blockquote",
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript",
              "fontColor",
              "hiliteColor",
              "textStyle",
              "removeFormat",
              "outdent",
              "indent",
              "align",
              "horizontalRule",
              "list",
              "lineHeight",
              "table",
              "link",
              "image",
              "video",
              "audio",
              "math",
              "imageGallery",
              "fullScreen",
              "showBlocks",
              "codeView",
              "preview",
              "print",
              "save",
              "template",
            ],
          ],
          height: "300px",
          minHeight: "300px",
          defaultStyle: Style.areaTextEditor,
        }}
      />
      <button className="btn btn-primary w-100 p-2 mt-3" onClick={handleSubmit}>
        POST
      </button>
    </div>
  );
};
export default TextEditor;
