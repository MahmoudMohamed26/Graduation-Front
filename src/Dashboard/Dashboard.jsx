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
            <div onClick={() => menu.setIsOpen((prev) => !prev)} className={`${menu.isOpen ? 'visible' : 'invisible'} top-0 left-0 md:invisible w-full h-full bg-black fixed opacity-30 z-20`}></div>
            <div className="flex">
                <div className="flex-1 relative h-[8000px] bg-[#F4F7FA] p-5">
                    <Outlet /></div>
                <DashSide />
            </div>
        </>
    )
}