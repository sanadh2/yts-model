import React, { useContext, useState } from "react";
import axios from "axios";

import inputSvg from "../svg/input-icon.svg";
import passwordSvg from "../svg/password.svg";
import { useNavigate } from "react-router-dom";
import SearchContext from "../context/SearchContext";
const LogIn = () => {
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    sendData();
  };
  const { logged, setlogged } = useContext(SearchContext);
  const sendData = async () => {
    try {
      const rawData = {
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
        .post("http://localhost:2222/user/login", jsondata, options)
        .then((res) => {
          if (res.data.success === true)
            console.log(`welcome,${res.data.user} `);
          setlogged(true);
          navigate("/");
        });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center min-h-screen flex-col">
        <div className="border-2 px-2 border-white backdrop-blur  h-fit py-4  w-[80vw] lg:w-[30vw] backdrop-brightness-150 m-auto flex items-center justify-center flex-col gap-[2vh] md:gap[3vh]">
          <h1 className="text-4xl sm:text-xl xl:font-extrabold  lg:text-3xl text-green-500">
            Login
          </h1>
          <form
            action=""
            className="flex flex-col gap-[2vh] lg:gap-[3vh]  text-white"
            onSubmit={submit}
          >
            <div className="flex items-center gap-4 ">
              <img
                src={inputSvg}
                alt="email"
                className=" align-middle lg:h-10 h-8"
              />
              <input
                type="text"
                placeholder="Email:"
                className="pl-4 bg-slate-700 h-12 sm:h-8 xl:h-12 text-lg  w-[60vw] md:w-[30vw] lg:w-[20vw] xl:w-[20vw]"
                value={mail}
                required
                onChange={(e) => setMail(e.target.value)}
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
                placeholder="Password:"
                required
                value={password}
                className="pl-4 bg-slate-700 h-12 sm:h-8 xl:h-12 text-lg  w-[60vw] md:w-[30vw] lg:w-[20vw] xl:w-[20vw]"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-base lg-text-lg py-2 px-4 active:px-2 active:py-0  self-center cursor-pointer shadow-none hover:shadow-md transition-all hover:shadow-slate-600"
            >
              Submit
            </button>
            <div className="flex gap-2 justify-center items-center ">
              <p> First Time?</p>
              <button
                className="border py-1 px-2 hover:bg-green-500 hover:text-black"
                onClick={() => navigate("/signup")}
              >
                Sign-up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LogIn;
