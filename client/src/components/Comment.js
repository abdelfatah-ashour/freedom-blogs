/* eslint-disable react/prop-types */
/* eslint-disable sort-imports */
import React from 'react';
import Style from '../../public/assets/css/comment.module.css';

export default function Comment({ OneComment, articleId, onDelete }) {
    return (
        <React.Fragment>
            <div className={Style.Comment}>
                <span className={Style.iconComment}>💬</span>
                <span className={Style.containerComment}>
                    <h4>{OneComment.userId}</h4>
                    <small>{OneComment.comment}</small>
                </span>
                <span
                    className={Style.deleteComment}
                    onClick={() => onDelete(articleId, OneComment._id)}>
                    ❌
                </span>
            </div>
        </React.Fragment>
    );
}
