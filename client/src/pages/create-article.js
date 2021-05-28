/* eslint-disable sort-imports */
import React, { useState } from 'react';
import Layout from '../components/Layout';
import axios from '../utilities/defaultAxios';
import GenerateArticle from '../components/GenerateArticle';
import PreviewArticle from '../components/PreviewArticle';
import { checkCreateArticle } from '../utilities/checkCreateArticle';
import Style from '../../public/assets/css/createNewArticle.module.css';
import { toastError, toastSuccess, toastWarn } from '../components/toast';
import { ProtectRoutes } from '../utilities/ProtectRoutes';
import { useRouter } from 'next/router';

export default function createArticle() {
    const Router = useRouter();
    const [message, setMessage] = useState('');
    const [headOfArticle, setHeadOfArticle] = useState('');
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(false);
    const [Category, setCategory] = useState('DEFAULT');

    const handleOnChange = () => {
        const prevParagraph = document.querySelector('#prevParagraph');
        const textArea = document.querySelector('#textArea').value;
        textArea.replace('/\n/g', '<br/>');
        textArea.concat(55, '<br/>');
        prevParagraph.innerHTML = textArea;
        setMessage(textArea);
    };

    const handleHeadOfArticle = e => {
        setHeadOfArticle(e.target.value);
    };

    const handleFile = e => {
        const imageArticle = document.querySelector('#imageArticle');
        imageArticle.src = window.URL.createObjectURL(e.target.files[0]);
        setFile(e.target.files[0]);
    };

    const handlePreview = () => {
        if (preview) {
            setPreview(false);
        } else {
            setPreview(true);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('headArticle', headOfArticle);
        formData.append('contentArticle', message);
        formData.append('imageArticle', file);
        formData.append('category', Category);

        const result = await checkCreateArticle({
            headArticle: headOfArticle,
            contentArticle: message,
            imageArticle: file ? file.name : '',
            category: Category === 'DEFAULT' ? '' : Category,
        });

        if (result) {
            await axios
                .post('/api/article/create-article', formData)
                .then(({ data }) => {
                    toastSuccess(data.message);
                    setTimeout(() => {
                        Router.push('/');
                    }, 2000);
                })
                .catch(error => {
                    if (!error.response) {
                        toastWarn(error.message);
                    } else {
                        toastError(error.response.data.message);
                    }
                });
        }
    };

    const GenerateArticleProps = {
        file,
        message,
        headOfArticle,
        handleOnChange,
        handleSubmit,
        handleFile,
        handleHeadOfArticle,
        preview,
        handlePreview,
        setCategory,
        Category,
    };

    return (
        <>
            <Layout
                title="create new article"
                description="Freedom newspaper's application for share our article"
            />
            <div className="container">
                <main className={Style.mainCreateArticle}>
                    <GenerateArticle {...GenerateArticleProps} />
                    <PreviewArticle
                        file={file}
                        handlePreview={handlePreview}
                        preview={preview}
                        headOfArticle={headOfArticle}
                    />
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
                destination: '/login',
            },
        };
    }

    return {
        props: {},
    };
}
