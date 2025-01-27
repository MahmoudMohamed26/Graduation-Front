import { NavLink } from 'react-router-dom';
import { Elements , categories } from './SideElements';
import logo from '../../images/logo.png';
import { useContext } from 'react';
import { RxCross1 } from "react-icons/rx";
import { Menu } from '../../Context/MenuContext';

export default function DashSide() {
    const menu = useContext(Menu)
    const groupedElements = categories.map(category => ({
        ...category,
        items: Elements.filter(element => element.category === category.name),
    }));

    return (
        <div
    className={`fixed md:sticky bg-white duration-300 top-0 md:top-[74px] z-20 shadow-md w-[270px] h-[100vh] md:h-[calc(100vh-74px)] pt-5 border-l-[1px] border [#e5e5e5] ${menu.isOpen ? 'right-[0px]' : 'right-[-270px]'}`}>
            <div className='ml-5 mb-5 block md:hidden'><RxCross1 onClick={() => menu.setIsOpen((prev) => !prev)} color='#dc3545' size={25} /></div>
            <div className='flex md:hidden justify-center mb-10'><img src={logo} alt='logo' width='200px' /></div>
            <ul className='px-5 items-end'>
                {groupedElements.map((category, index) => (
                    <div key={index}>
                        <p className="text-xs text-right px-2 mb-3 text-[#61748f]">{category.name}</p>
                        {category.items.map((element, idx) => (
                            <NavLink
                                onClick={() => menu.setIsOpen((prev) => !prev)}
                                key={idx}
                                to={element.to}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-white bg-[#725DFE] py-2 px-2 rounded-[0.2rem] mb-3 duration-300 flex gap-3 items-center justify-end'
                                        : 'text-[#61748f] py-2 px-2 rounded-[0.2rem] mb-3 duration-300 hover:text-white hover:bg-[#725DFE] flex gap-3 items-center justify-end'
                                }
                            >
                                {element.name}
                                <li>{element.icon}</li>
                            </NavLink>
                        ))}
                    </div>
                ))}
            </ul>
        </div>
    );
}