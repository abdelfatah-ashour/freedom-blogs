/* eslint-disable sort-imports */
import React, { useContext, useEffect } from 'react';
import Style from '../../public/assets/css/headingBody.module.css';
import Link from 'next/link';
import { AuthContext } from '../Context_API/isAuth';
import { getJSON, remove } from 'js-cookie';
import ToastContainer from './ToastContainer';
import axios from '../utilities/defaultAxios';
import { useRouter } from 'next/router';
import { toastSuccess } from '../components/toast';
export default function HeadBody() {
    const Router = useRouter();
    const { AuthUser, setIsAuth } = useContext(AuthContext);
    const USER_INFO = getJSON('pi');

    const handleLogout = async () => {
        await axios
            .get('/api/auth/logout')
            .then((resp) => {
                setIsAuth({
                    isLogin: false,
                    isAuth: false,
                    isAdmin: false,
                    username: '',
                    email: '',
                    role: false,
                });
                remove('pi');
                remove('c_user');
                toastSuccess(resp.data.message);
                setTimeout(() => {
                    Router.push('/');
                }, 2000);
            })
            .catch(error => {
                if (!error.response) {
                    alert('something wrong... try again');
                } else {
                    alert(error.response.data.message);
                }
            });
    };

    useEffect(() => {
        if (USER_INFO) {
            const { username, email, role } = USER_INFO;
            setIsAuth({
                ...AuthUser,
                isLogin: true,
                isAuth: true,
                username,
                email,
                role,
            });
        }
        return () => null;
    }, []);

    return (
        <div className={Style.headingBody}>
            <ToastContainer />
            <ul>
                {!AuthUser.isLogin ? (
                    <li className={Style.signupFree}>
                        <Link href="/signup">signup free</Link>
                    </li>
                ) : (
                    <>
                        <li className={Style.createNewArticle}>
                            <span>+</span>
                            <Link href="/create-article">
                                create new Article
                            </Link>
                        </li>
                        <li className={Style.logout} onClick={handleLogout}>
                            👋🏻 logout
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}
