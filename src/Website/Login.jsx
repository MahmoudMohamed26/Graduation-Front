import { useFormik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import white_logo from "../images/logo-white.png"
import bg_image from "../images/bg-image.jpg"
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Axios } from "../API/Axios";

export default function SignIn() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showpass , setShowPass] = useState(false);
    const validationSchema = Yup.object({
        username: Yup.string()
            .email("البريد الإلكتروني غير صالح")
            .required("البريد الإلكتروني مطلوب"),
        password: Yup.string()
            .required("كلمة المرور مطلوبة"),
    });
    console.log("BASE_URL:", process.env.REACT_APP_BASE_URL);
    const login = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                setError("");
                await Axios.post(`/login`, values);
                toast.success('تم تسجيل الدخول بنجاح', {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
                    transition: Bounce,
                    });
                window.location.href = "/dashboard";
                setLoading(false);
            } catch (err) {
                console.log(err)
            setError("خطأ في البريد الإلكتروني أو كلمة المرور");
            login.setFieldValue("password", "");
            setLoading(false);
            }
        },
    });

    return (
        <>
            <ToastContainer />
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
                            data-testid="email-input"
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
                                data-testid="password-input"
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
                            data-testid="login-button"
                            className="mt-5 w-full text-sm text-center text-white hover:bg-[#604CC7] bg-[#725DFE] duration-300 px-4 py-2 rounded disabled:opacity-50 "
                            >
                            {loading ? (
                                <div role="status">
                                    <svg aria-hidden="true" className="inline w-4 h-4 text-gray-200 animate-spin fill-[#725DFE]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    <span className="mr-3">جاري التنفيذ...</span>
                                </div>
                            ) : (
                                "تسجيل الدخول"
                            )}
                            </button>
                            <div className="text-red-500 h-[20px] mt-2 text-sm">{error}</div>
                        </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
  );
}