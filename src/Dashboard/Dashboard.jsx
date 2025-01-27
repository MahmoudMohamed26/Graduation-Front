import { useContext } from "react";
import { Menu } from "../Context/MenuContext";
import DashNav from "./Components/DashNav";
import DashSide from "./Components/DashSide";
import { Outlet } from "react-router-dom";

export default function Dashboard(){
    const menu = useContext(Menu)
    return(
        <>
            <DashNav />
            <div className="flex">
                <div className="flex-1 relative h-[8000px] bg-[#F4F7FA]">
                    <div onClick={() => menu.setIsOpen((prev) => !prev)} className={`${menu.isOpen ? 'visible' : 'invisible'} md:invisible w-full h-full bg-black absolute opacity-30 z-20`}></div>
                    <Outlet /></div>
                <DashSide />
            </div>
        </>
    )
}