import { FaBars } from "react-icons/fa6";
import logo from '../../images/logo.png';
import { Menu } from "../../Context/MenuContext";
import { useContext } from "react";
export default function DashNav(){
    const menu = useContext(Menu)
    function toggleMenu(){
        menu.setIsOpen(!menu.isOpen)
    }
    return(
        <div  className="bg-white sticky top-0 z-10 shadow-sm select-none">
            <div className="px-[20px] flex justify-between items-center h-[74px] border-b-[1px]">
                <div className="flex flex-row-reverse gap-5"><h1 className="text-xl">مرحباً , <span className="text-sm">محمود محمد</span></h1>
                    <button onClick={() => menu.setIsOpen((prev) => !prev)} className="rounded-[0.2rem] duration-300 hover:bg-[#604CC7] text-white bg-[#725DFE] px-4 py-1">تسجيل خروج</button>
                </div>
                <div className="flex gap-[30px] items-center">
                    <div className="md:pointer-events-none"><FaBars onClick={toggleMenu} color="#9DA8B8" size={20} className="cursor-pointer"/></div>
                    <div className='border-l-[1px] hidden md:flex pl-[15px] border-[#e5e5e5] w-[250px] justify-center items-center h-[73px]'><img src={logo} alt="Logo" width={130}/></div>
                </div>
            </div>
        </div>
    )
}