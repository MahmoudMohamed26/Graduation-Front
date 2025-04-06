import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import white_logo from "../images/logo-white.png"
import bg_image from "../images/bg-image.jpg"
import axios from "axios";
import { baseURL2 } from "../API/Api";

export default function SignIn() {
    // eslint-disable-next-line
  const [error, setError] = useState("");
  // eslint-disable-next-line
  const [successMessage, setSuccessMessage] = useState("");
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [showpass , setShowPass] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  const validationSchema = Yup.object({
    username: Yup.string()
      .email("البريد الإلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    password: Yup.string()
        .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/,
        "كلمة المرور يجب أن تحتوي على حرف كبير وحرف صغير ورقم ورمز خاص"
        )
        .required("كلمة المرور مطلوبة"),
  });

  const login = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
        const sendData = async () => {
            const res = await axios.post(`${baseURL2}/login` , values )
            console.log(res);
            window.localStorage.setItem("token" , res.data.jwttoken)
        }
        sendData()
    //   window.location.href = "/dashboard";
    // console.log(values);
    },
  });

  return (
    <div className={`bg-cover h-[100vh] bg-center`} style={{backgroundImage: `url(${bg_image})`}}>
        <div className="absolute top-0 left-0 w-full h-full bg-[#725DFE] opacity-70"></div>d
        <div
            className="flex relative mt-[-80px] flex-col container items-center overflow-y-auto justify-center w-screen h-screen"
            >
            <div className="mb-5 h-[67px] min-w-1">
                <img src={white_logo} alt="logo" width={130} />
            </div>
            <div className="w-full py-[60px] flex items-center max-w-md bg-white p-8 rounded-lg shadow-lg text-right">
                <div className="flex-1">
                <h2 className="text-2xl font-bold mb-6 text-center">
                تسجيل الدخول
                </h2>
                <form onSubmit={login.handleSubmit}>
                <label htmlFor="username" className="block">
                    البريد الإلكتروني :
                </label>
                <input
                    autoComplete="true"
                    placeholder="example@gmail.com"
                    value={login.values.username}
                    onSubmit={login.handleBlur}
                    type="email"
                    onChange={login.handleChange}
                    name="username"
                    id="username"
                    className={`w-full border text-right duration-300 text-sm py-2 border-[#e2e6f1] special_shadow rounded-md outline-none p-2 my-2 ${
                    login.errors.username && login.touched.username
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                />
                {login.errors.username && login.touched.username && (
                    <div className="text-red-500 text-sm mb-4">
                    {login.errors.username}
                    </div>
                )}

                <label htmlFor="password" className="block">
                    كلمة المرور :
                </label>
                <div className="relative">
                    <input
                        autoComplete="true"
                        placeholder="************"
                        value={login.values.password}
                        onSubmit={login.handleBlur}
                        type={showpass ? "text" : "password"}
                        onChange={login.handleChange}
                        name="password"
                        id="password"
                        className={`w-full border text-right duration-300 text-sm py-2 border-[#e2e6f1] special_shadow rounded-md outline-none p-2 my-2 ${
                        login.errors.password && login.touched.password
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                    />
                    <span onClick={() => setShowPass(!showpass)} className="absolute p-1 rounded-md  text-[rgb(115_93_255)] top-1/2 left-2.5 transform translate-y-1/2 cursor-pointer">{showpass ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />
                    }</span>
                </div>
                {login.errors.password && login.touched.password && (
                    <div className="text-red-500 text-sm mb-4">
                    {login.errors.password}
                    </div>
                )}

                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                {successMessage && (
                    <div className="text-green-500 text-sm mb-4">{successMessage}</div>
                )}

                <div>
                    <p className="flex justify-end">
                        <Link
                        to="/forgetpassword"
                        className="cursor-pointer text-red-600 text-left text-sm hover:underline"
                        >
                        نسيت كلمة المرور ؟
                        </Link>
                    </p>
                    <button
                    type="submit"
                    className="mt-5 w-full text-sm text-center text-white hover:bg-[#604CC7] bg-[#725DFE] duration-300 px-4 py-2 rounded disabled:opacity-50 "
                    >
                    {loading ? (
                        <i className="fa fa-spinner fa-spin mr-2"></i>
                    ) : (
                        "تسجيل الدخول"
                    )}
                    </button>
                </div>
                </form>
                </div>
            </div>
        </div>
    </div>
  );
}