import React from 'react';
import { NavLink } from 'react-router-dom';
import { Elements , categories } from './SideElements';
import logo from '../../images/logo.png';
import logoDark from '../../images/logo-dark.png';
import { useContext } from 'react';
import { RxCross1 } from "react-icons/rx";
import { Menu } from '../../Context/MenuContext';
import { AuthContext } from '../../Context/AuthContext';

export default function DashSide() {
    const menu = useContext(Menu)
    const {user} = useContext(AuthContext)
    const groupedElements = categories.map(category => ({
        ...category,
        items: Elements.filter(element => element.category === category.name),
    }));
    
    return (
        <div
        className={`fixed md:sticky bg-white dark:bg-[#191A1A] duration-300 top-0 md:top-[74px] transition-[right] z-40 shadow-md w-[270px] h-[100vh] md:h-[calc(100vh-74px)] pt-5 border-l-[1px] border-[#e5e5e5] dark:border-[#363D3E] 
            ${menu.isOpen ? 'right-[0px]' : 'right-[-270px]'} overflow-y-auto special-scroll1`}>
            <div className='ml-5 mb-5 flex justify-end rtl md:hidden'><RxCross1 onClick={() => menu.setIsOpen((prev) => !prev)} className='cursor-pointer' color='#dc3545' size={25} /></div>
            <div className='flex md:hidden justify-center mb-10'>
                <img src={logo} alt='logo' className="dark:hidden" width='200px' />
                <img src={logoDark} alt='logo' className="hidden dark:block" width='200px' />
            </div>
            <ul className='px-5 items-end rtl'>
                {groupedElements.map((category, index) => {
                    const allowedItems = category.items.filter((element) =>
                        element.role.includes(user.type)
                    );

                    if (!category.role.includes(user.type) || allowedItems.length === 0) {
                        return null;
                    }

                    return (
                        <div className='py-2' key={index}>
                            <p className="text-xs text-right px-2 mb-3 text-[#61748f] dark:text-white">
                                {category.name}
                            </p>

                            {allowedItems.map((element, idx) => (
                                <NavLink
                                    onClick={() => {
                                        if (window.innerWidth < 768) {
                                            menu.setIsOpen((prev) => !prev);
                                        }
                                    }}
                                    key={idx}
                                    to={element.to}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-white bg-[#725DFE] py-2 px-2 rounded-[0.2rem] mb-3 duration-300 flex gap-3 items-center'
                                            : 'text-[#61748f] dark:text-white py-2 px-2 rounded-[0.2rem] mb-3 duration-300 hover:text-white hover:bg-[#725DFE] flex gap-3 items-center'
                                    }
                                >
                                    <li>{element.icon}</li>
                                    {element.name}
                                </NavLink>
                            ))}
                        </div>
                    );
                })}
            </ul>

        </div>
    );
}