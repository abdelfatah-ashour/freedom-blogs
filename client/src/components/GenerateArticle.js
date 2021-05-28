/* eslint-disable react/prop-types */
/* eslint-disable sort-imports */
import React from "react";
import Style from "../../public/assets/css/createNewArticle.module.css";
import SelectCategory from "./SelectCategory";

export default function GenerateArticle(props) {
    const {
        file,
        message,
        headOfArticle,
        handleFile,
        handleOnChange,
        handleSubmit,
        handleHeadOfArticle,
        preview,
        handlePreview,
        setCategory,
        Category,
    } = props;

    const textAreaProps = {
        minLength: "55",
        name: "message",
        autoComplete: "false",
        autoFocus: true,
        onChange: handleOnChange,
        id: "textArea",
    };

    const inputHeadingProps = {
        type: "text",
        name: "headArticle",
        id: "headArticle",
        placeholder: "type head of article",
        value: headOfArticle,
        onChange: handleHeadOfArticle,
    };

    const inputFileProps = {
        type: "file",
        name: "imageArticle",
        className: Style.inputFile,
        onChange: handleFile,
        id: "inputFile",
    };

    return (
        <div
            className={Style.relativeParent}
            style={{ zIndex: !preview ? 700 : -1 }}>
            <div
                className={Style.containerGenerateArticle}
                style={{ zIndex: !preview ? 900 : -1 }}>
                <div className={Style.openPreview} onClick={handlePreview}>
                    👁
                </div>
                <div className={Style.containerOfArticleContent}>
                    <div className={Style.headArticle}>
                        <label htmlFor="headArticle">
                            <small>Head of article 🎭 : </small>
                        </label>
                        <input {...inputHeadingProps} />
                    </div>
                    <div className={Style.labelFile}>
                        <label htmlFor="inputFile">
                            <small> image of article : </small>
                            {file ? "📁" + file.name : "📁 choose file"}
                        </label>
                        <input {...inputFileProps} />
                    </div>
                    <div className={Style.SelectCategory}>
                        <SelectCategory
                            setCategory={setCategory}
                            Category={Category}
                        />
                    </div>
                    <div className={Style.textArea}>
                        <textarea {...textAreaProps} />
                    </div>
                    <div className={Style.labelCharacters}>
                        <span
                            disabled={
                                message.length > 0 && file ? false : true
                            }>
                            {message.length >= 255 && file
                                ? "  🚩 you can post now  "
                                : "🔒  "}
                            <small
                                style={{
                                    color: "#008000",
                                }}>
                                (characters {message.length})
                            </small>
                        </span>
                    </div>
                    <div className={Style.SubmitArticle}>
                        <button onClick={handleSubmit}>POST</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
