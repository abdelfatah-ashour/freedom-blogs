import { set } from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Style from "../../public/assets/css/Register.module.css";
import InputFormRegister from "../components/InputFormRegister";
import Layout from "../components/Layout";
import { toastError, toastSuccess, toastWarn } from "../components/toast";
import { checkLogin } from "../utilities/checkLogin";
import axios from "../utilities/defaultAxios";

export default function Login() {
  const Router = useRouter();
  const [User, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = User;

  const handleChange = (e) => {
    setUser({
      ...User,
      [e.target.name]: e.target.value,
    });
  };

  const emailProps = {
    type: "email",
    label: "Email address",
    placeholder: "type email address",
    name: "email",
    value: email,
    handleChange,
    id: "labelEmail",
  };

  const passwordProps = {
    type: "password",
    name: "password",
    label: "password",
    placeholder: "type password",
    value: password,
    handleChange,
    id: "labelPassword",
  };

  const handleSubmit = async () => {
    const result = await checkLogin(User);
    if (result) {
      await axios
        .post("/api/auth/login", User)
        .then((resp) => {
          set("pi", resp.data.info, {
            expires: 1,
            path: "/",
            sameSite: "strict",
          });
          set("c_user", resp.headers.authorization, {
            secure: true,
            expires: 1,
            path: "/",
            sameSite: "strict",
          });
          toastSuccess(resp.data.message);
          setTimeout(() => {
            Router.push("/");
          }, 2000);
        })
        .catch((error) => {
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
        <main
          className={
            Style.Register +
            " row w-100 d-flex justify-content-center align-items-center"
          }
        >
          <div
            className={
              Style.ourForm +
              " d-flex flex-wrap col-lg-6 col-md-9 col-12 justify-content-center"
            }
          >
            <InputFormRegister {...emailProps} />
            <InputFormRegister {...passwordProps} />
            <div className={Style.contentSubmit}>
              <button onClick={handleSubmit} type="submit">
                submit
              </button>
              <span>
                do not have account ? <Link href="/signup">Sign-up free</Link>
              </span>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
