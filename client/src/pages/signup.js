import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Style from "../../public/assets/css/Register.module.css";
import InputFormRegister from "../components/InputFormRegister";
import Layout from "../components/Layout";
import { toastError, toastSuccess, toastWarn } from "../components/toast";
import { checkRegister } from "../utilities/checkSignup";
import axios from "../utilities/defaultAxios";
export default function Signup() {
  const Router = useRouter();
  const [User, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = User;

  const handleChange = (e) => {
    setUser({
      ...User,
      [e.target.name]: e.target.value,
    });
  };
  const usernameProps = {
    type: "text",
    label: "username",
    placeholder: "type username",
    name: "username",
    value: username,
    handleChange,
    id: "labelUsername",
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
    const result = await checkRegister(User);
    if (result) {
      await axios
        .post("/api/auth/signup", User)
        .then(({ data }) => {
          toastSuccess(data.message);
          setTimeout(() => {
            Router.push("/login");
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
        title="sign up"
        description="sign up page free to get more access and share more articles"
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
            <InputFormRegister {...usernameProps} />
            <InputFormRegister {...emailProps} />
            <InputFormRegister {...passwordProps} />
            <div className={Style.contentSubmit}>
              <button onClick={handleSubmit}>submit</button>
              <span>
                already have an account ? <Link href="/login">Login</Link>
              </span>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
