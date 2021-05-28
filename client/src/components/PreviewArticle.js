/* eslint-disable react/prop-types */
import React from "react";
import Style from "../../public/assets/css/createNewArticle.module.css";

export default function PreviewArticle({
    file,
    preview,
    handlePreview,
    headOfArticle,
}) {
    const dateArticle = new Date().toLocaleDateString();
    return (
        <div
            className={Style.relativeParent}
            style={{ zIndex: preview ? 100 : -1 }}>
            <div
                className={Style.overlayPreview}
                style={{ zIndex: preview ? 200 : -1 }}></div>
            <div
                className={Style.parentPreviewArticle}
                style={{ zIndex: preview ? 900 : -1 }}>
                <div className={Style.closePreview} onClick={handlePreview}>
                    ❌
                </div>
                <div className={Style.previewArticle}>
                    <div className={Style.prevImage}>
                        <img
                            src=""
                            id="imageArticle"
                            alt="source image"
                            style={{ visibility: !file ? "hidden" : "visible" }}
                            loading="lazy"
                        />
                        {!file ? (
                            <div className={Style.friendlyPrevMsgFile}>
                                <span>📁 upload new image</span>
                            </div>
                        ) : null}
                    </div>
                    <div className={Style.prevContentArticle}>
                        <span>🙋🏻‍♂️ author</span>
                        <span>⌚ {dateArticle}</span>
                        <h3>{"🚩 " + headOfArticle}</h3>
                        <pre
                            id="prevParagraph"
                            className={Style.prevParagraph}></pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
