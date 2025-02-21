import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Input({ label, name, formik, placeholder, password }) {
    const [showPass, setShowPass] = useState(false);
    const isPassword = password || false;

    return (
        <div className="flex-1 mb-1">
            <label className="text-sm">{label}</label>
            <div className="relative">
                <input
                    autoComplete="true"
                    type={!isPassword ? "text" : showPass ? "text" : "password"}
                    className={`w-full border text-right duration-300 text-sm py-2 border-[#e2e6f1] rounded-md outline-none p-2 my-2 ${
                        formik.errors[name] && formik.touched[name] ? "border-red-500" : "special_shadow"
                    }`}
                    placeholder={placeholder}
                    name={name}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {isPassword && (
                    <span
                        onClick={() => setShowPass(!showPass)}
                        className="absolute p-1 rounded-md text-[#939393] top-1/2 left-2.5 transform translate-y-1/2 cursor-pointer"
                    >
                        {showPass ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                    </span>
                )}
            </div>
            {formik.errors[name] && formik.touched[name] && (
                <p className="text-xs text-red-500">{formik.errors[name]}</p>
            )}
        </div>
    );
}
