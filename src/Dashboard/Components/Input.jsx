import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
export default function Input({label , value , onchange , placeholder , password}){
    const pass = password || false;
    const [showpass, setShowPass] = useState(false);
    return(
        <>
            <div className="flex-1 mb-1">
            <label className="text-sm">{label}</label>
                <div className="relative">
                    <input autoComplete="true" type={!pass ? "text" : (showpass ? "text" : "password")} className="w-full border text-right duration-300  text-sm py-2 border-[#e2e6f1] special_shadow rounded-md outline-none p-2 my-2" placeholder={placeholder} value={value} onChange={(e) => onchange(e.target.value)} />
                    {pass && <span onClick={() => setShowPass(!showpass)} className="absolute p-1 rounded-md  text-[rgb(115_93_255)] top-1/2 left-2.5 transform translate-y-1/2 cursor-pointer">{showpass ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />
                    }</span>}
                </div>
            </div>
        </>
    )
}