import { FaBars } from "react-icons/fa6";
import logoDark from '../../images/logo-dark.png';
import logo from '../../images/logo.png';
import { Menu } from "../../Context/MenuContext";
import { useContext, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Axios } from "../../API/Axios";
import Skeleton from "react-loading-skeleton";
import { TiWeatherSunny } from "react-icons/ti";
import { IoMoonOutline } from "react-icons/io5";

export default function DashNav(){
    const [isDark , setIsDark] = useState(localStorage.getItem("theme") === "dark" ? true : false)
    const menu = useContext(Menu)
    const [logoutLoading, setLogoutLoading] = useState(false)
    const { user } = useAuth()
    function toggleMenu(){
        menu.setIsOpen(!menu.isOpen)
    }
    async function handleLogout(){
        setLogoutLoading(true)
        await Axios.get('/logout')
        window.location.href = "/login"
    }

    function handleThemeChange(){
        const currentTheme = localStorage.getItem("theme")
        if(currentTheme === "dark"){
            setIsDark(false)
            localStorage.setItem("theme", "light")
            document.documentElement.classList.remove("dark")
        }else{
            setIsDark(true)
            localStorage.setItem("theme", "dark")
            document.documentElement.classList.add("dark")
        }
    }


    return(
        <div  className="bg-white dark:bg-[#191A1A] sticky top-0 z-20 shadow-sm select-none">
            <div className="px-[20px] flex justify-between items-center h-[74px] dark:border-[#363D3E] border-b-[1px]">
                <div className="flex gap-[20px] items-center">
                    <div className='border-l-[1px] hidden md:flex pl-[15px] border-[#e5e5e5] dark:border-[#363D3E] w-[250px] justify-center items-center h-[73px]'>
                        <img src={logo} alt="Logo" className="dark:hidden" width={130}/>
                        <img src={logoDark} className="hidden dark:block" alt="Logo" width={130}/>
                    </div>
                    <div className="md:pointer-events-none"><FaBars onClick={toggleMenu} color="#9DA8B8" size={20} className="cursor-pointer"/></div>
                    <div className="p-2 rounded-full duration-300 hover:bg-[#EEE] dark:hover:bg-[#333] cursor-pointer" onClick={handleThemeChange}>
                        {isDark ? <IoMoonOutline size={22} color="#9DA8B8" /> : <TiWeatherSunny color="#9DA8B8" size={22}/>}
                    </div>
                </div>
                <div className="flex flex-row-reverse gap-5">
                <button
                    onClick={handleLogout}
                    className="rounded-[0.2rem] duration-300 hover:bg-[#604CC7] text-white bg-[#725DFE] px-4 py-1"
                    >
                    {logoutLoading ? (
                        <div role="status">
                            <svg aria-hidden="true" className="inline w-4 h-4 text-gray-200 animate-spin fill-[#725DFE]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="mr-3"> تسجيل الخروج...</span>
                        </div>
                    ) : (
                        "تسجيل خروج"
                    )}
                    </button>
                    <h1 className="text-xl dark:text-white">مرحباً , <span className="text-sm">{user.fullName ? user.fullName : 
                            <Skeleton width={100} className="dark:[--base-color:_#202020_!important] dark:[--highlight-color:_#444_!important]" height={15} />}
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    )
}