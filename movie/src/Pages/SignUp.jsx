import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import nameSvg from "../svg/SignUp.svg";
import inputSvg from "../svg/input-icon.svg";
import passwordSvg from "../svg/password.svg";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");

  const [isemailCorrect, setEmail] = useState(true);
  const emailValidator =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const passwordValidator =
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const validateEmail = () => {
    setEmail(emailValidator.test(mail));
    console.log(isemailCorrect);
  };
  const validatePassword = () => passwordValidator.test(password);
  const submit = (e) => {
    e.preventDefault();
    sendData();
  };

  const sendData = async () => {
    try {
      const rawData = {
        name: name,
        email: mail,
        password: password,
      };
      const jsondata = JSON.stringify(rawData);

      const options = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios
        .post("http://localhost:2222/user/signin", jsondata, options)
        .then(() => navigate("/login"));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex justify-center min-h-screen flex-col">
        <div className="border-2 px-2 border-white backdrop-blur  h-fit py-2 w-[80vw] lg:w-[30vw] backdrop-brightness-150 m-auto flex items-center justify-center flex-col gap-[2vh] md:gap[3vh]">
          <h1 className="text-4xl sm:text-xl xl:ont-extrabold  xl:text-3xl text-green-500">
            SignUp
          </h1>
          <form
            action=""
            className="flex flex-col gap-[2vh] lg:gap-[3vh]  text-white"
            onSubmit={submit}
          >
            <div className="flex items-center gap-4 ">
              <img
                src={nameSvg}
                alt="name"
                className=" lg:h-10 align-middle  h-8 "
              />
              <input
                type="text"
                placeholder="Name:"
                className="pl-4 bg-slate-700 h-12 md:h-8 xl:h-12 text-lg  w-[60vw] md:w-[30vw] lg:w-[20vw] xl:w-[20vw]"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4 ">
              <img
                src={inputSvg}
                alt="email"
                className=" lg:h-10 align-middle  h-8"
              />
              <input
                type="email"
                required
                placeholder="Email:"
                className="pl-4 bg-slate-700 h-12 md:h-8 xl:h-12 text-lg  w-[60vw] md:w-[30vw] lg:w-[20vw] xl:w-[20vw]"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                onBlur={validateEmail}
              />
            </div>
            <div className="flex items-center  gap-4">
              <img
                src={passwordSvg}
                alt="password"
                className="lg:h-10 align-middle  h-8"
              />
              <input
                type="password"
                required
                placeholder="Password:"
                value={password}
                className="pl-4 bg-slate-700 h-12 md:h-8 xl:h-12 text-lg  w-[60vw] md:w-[30vw] lg:w-[20vw] xl:w-[20vw]"
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
              />
            </div>
            <ToastContainer />
            <button
              type="submit"
              className="bg-green-500 text-base lg-text-lg py-2 px-4 active:px-2 active:py-0  self-center cursor-pointer shadow-none hover:shadow-md transition-all hover:shadow-slate-600"
            >
              Submit
            </button>
            <div className="flex gap-2  justify-center items-center ">
              <p>Already an user?</p>
              <button
                className="border py-1 px-2 hover:bg-green-500 hover:text-black"
                onClick={() => navigate("/login")}
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
