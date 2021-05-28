/* eslint-disable sort-imports */
import React, { useState } from 'react';
import Link from 'next/link';
import InputFormRegister from '../components/InputFormRegister';
import { checkLogin } from '../utilities/checkLogin';
import { toastSuccess, toastError, toastWarn } from '../components/toast';
import Layout from '../components/Layout';
import axios from '../utilities/defaultAxios';
import Style from '../../public/assets/css/Register.module.css';
import { set } from 'js-cookie';
import { useRouter } from 'next/router';

export default function Login() {
    const Router = useRouter();
    const [User, setUser] = useState({
        email: '',
        password: '',
    });

    const { email, password } = User;

    const handleChange = e => {
        setUser({
            ...User,
            [e.target.name]: e.target.value,
        });
    };

    const emailProps = {
        type: 'email',
        label: 'Email address',
        placeholder: 'type email address',
        name: 'email',
        value: email,
        handleChange,
        id: 'labelEmail',
    };

    const passwordProps = {
        type: 'password',
        name: 'password',
        label: 'password',
        placeholder: 'type password',
        value: password,
        handleChange,
        id: 'labelPassword',
    };

    const handleSubmit = async () => {
        const result = await checkLogin(User);
        if (result) {
            await axios
                .post('/api/auth/login', User)
                .then(resp => {
                    set('pi', resp.data.info, {
                        expires: 1,
                        path: '/',
                        sameSite: 'strict',
                    });
                    set('c_user', resp.headers.authorization, {
                        secure: true,
                        expires: 1,
                        path: '/',
                        sameSite: 'strict',
                    });
                    toastSuccess(resp.data.message);
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

    return (
        <>
            <Layout
                title="Login"
                description="login page to get more access and share more articles"
            />
            <div className="container">
                <main className={Style.Register}>
                    <section>
                        <div className={Style.ourForm}>
                            <InputFormRegister {...emailProps} />
                            <InputFormRegister {...passwordProps} />
                            <div className={Style.contentSubmit}>
                                <button onClick={handleSubmit} type="submit">
                                    submit
                                </button>
                                <span>
                                    do not have account ?{' '}
                                    <Link href="/signup">Sign-up free</Link>
                                </span>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
