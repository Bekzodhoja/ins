import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";

// icons
import { ImFacebook2 as FacebookIcon } from "react-icons/im";
import { AiFillEye as EyeIcon } from "react-icons/ai";
import { AiFillEyeInvisible as EyeInvisibleIcon } from "react-icons/ai";
import { ImSpinner3 as SpinnerIcon } from "react-icons/im";

// utilities
import { isValidEmail } from "../utility";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/config";

const Register = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { user, signUp } = useContext(AuthContext);

  if (user) navigate("/");

  const showError = (error) => {
    setErrorMsg(error);
    setTimeout(() => {
      setErrorMsg("");
    }, 3000);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) showError("Invalid email address");
    else if (password.length < 6)
      showError("Password must be at least 6 characters");
    if (isValidEmail(email) && password.length > 6) {
      setFormLoading(true);

      const userQuery = query(
        collection(firestore, "user"),
        where("username", "==", username)
      );

      const users = await getDocs(userQuery);
      if (!users.empty) {
        setErrorMsg("User with this username already exists");
        setFormLoading(false);
      }
      if (users.empty) {
        const user = await signUp(email, password, username, fullname);
        if (user) {
          setEmail("");
          setFullname("");
          setUsername("");
          setPassword("");
          setFormLoading(false);
        }

        if (!user)
          showError(
            "Sorry, your password was incorrect. Please double-check your password."
          );
      }
    }
  };

  useEffect(() => {
    setDisabled(email.length > 0 && password.length > 0 ? false : true);
  }, [email, password]);

  return (
    <>
      <div className="h-screen w-screen flex flex-wrap items-center justify-center p-3">
        <div className="flex items-center">
          <div className="flex flex-col flex-shrink-0 w-[350px]">
            <div className="flex flex-col items-center justify-center rounded-xl w-full border-[1px] bg-white p-4 shadow-2xl">
              <div className="w-full">
                <img
                  src="/images/logo-full.png"
                  className="h-20 mt-2 mx-auto my-2"
                  alt="instagram"
                />
              </div>
              <p className="text-center font-bold  text-lg text-slate-800">
              Register To Make Friends.
              </p>
             
              <div className="flex items-center my-3 w-full">
                <div className="border-b-[1px] border-black h-0 w-full"></div>
              </div>
              <div className="w-full px-5">
                <form
                  className=""
                  method="POST"
                  onSubmit={(e) => submitForm(e)}
                >
                  <span>Email</span>
                  <div className="w-full">
                    <div className="w-full">
                      <div className="w-full mb-3">
                        <input
                          placeholder="Enter Your Email"
                          type="text"
                          className="text-xs p-3 border-[1px] rounded bg-white w-full border-black"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />

                      </div>
                    </div>
                    <span>Full Name</span>
                    <div className="w-full">
                      <div className="w-full mb-3">
                        <input
                          placeholder="Enter Your Full Name"
                          type="text"
                          className="text-xs p-3 border-[1px] rounded bg-white w-full border-black"
                          onChange={(e) => setFullname(e.target.value)}
                          value={fullname}
                        />
                      
                      </div>
                    </div>
                    <span>Username</span>
                    <div className="w-full">
                      <div className="w-full mb-3">
                        <input
                          placeholder="Enter Your Username"
                          type="text"
                          className="text-xs p-3 border-[1px] rounded bg-white w-full border-black"
                          onChange={(e) => setUsername(e.target.value)}
                          value={username}
                        />
                      </div>
                    </div>
                    <span>Password</span>
                    <div className="">
                      <div className="relative">
                        <input
                          type={showPassword ? "password" : "text"}
                          className="text-xs p-3 border-[1px] rounded bg-white w-full border-black"
                          placeholder="Enter Your Password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                        />
                        {password.length > 0 && (
                          <div className="absolute top-0 right-2 h-full flex items-center">
                            <button
                              className="cursor-pointer text-slate-800"
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeIcon />
                              ) : (
                                <EyeInvisibleIcon />
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-full mt-4">
                      <button
                        className="w-full bg-blue-500 text-x text-white font-semibold p-1 rounded-2xl"
                        disabled={disabled}
                        type="submit"
                      >
                        {formLoading ? (
                          <SpinnerIcon className="w-3 h-3 animate-spin my-1 mx-auto" />
                        ) : (
                          "Sign up"
                        )}
                      </button>
                    </div>
                  </div>
                  {errorMsg?.length > 0 && (
                    <div className="text-center text-xs my-4 text-red-600">
                      {errorMsg}
                    </div>
                  )}
                  <div className="text-blue-500 text-center w-full text-x font-thin my-3">
                    <a href="/accounts/password/reset/">Forgot password?</a>
                  </div>
                  <div className="flex flex-col items-center justify-center">
              <div className="text-sm">
                <Link to="/login" className="text-blue-500 text-xl font-semibold">
                  Log in
                </Link>
              </div>
            </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
