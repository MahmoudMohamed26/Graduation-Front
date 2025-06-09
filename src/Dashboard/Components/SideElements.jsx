import React from 'react';
import { GrUserWorker } from "react-icons/gr";
import { PiCity } from "react-icons/pi";
import { RiGovernmentLine } from "react-icons/ri";
import { IoPersonAddOutline } from "react-icons/io5";
import { FaShieldHalved } from "react-icons/fa6";
import { TbHomeStats } from "react-icons/tb";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineReportProblem } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { ImStatsDots } from "react-icons/im";

const categories =[{
    name: 'الرئيسية',
    role: [2000 , 1999 , 1998]
}, {
    name: 'الأضافه',
    role: [2000 , 1998]
} ,{
    name: 'المستخدمين',
    role: [2000 , 1999 , 1998]
}, {
    name: 'العرض',
    role: [2000 , 1999 , 1998]
}, {
    name: 'الاعدادات',
    role: [2000 , 1999 , 1998]
}]

const Elements = [{
    name: 'اضافة مشرف',
    category: 'الأضافه',
    to: '/dashboard/add-admin',
    icon: <FaShieldHalved size={20} />,
    role: [2000]
} , {
    name: 'اضافة موظف',
    category: 'الأضافه',
    to: '/dashboard/add-employee',
    icon: <IoPersonAddOutline size={20} />,
    role: [2000 , 1998]
}, {
    name: 'مشرفين المدن',
    category: 'المستخدمين',
    to: '/dashboard/city-admins',
    icon: <PiCity size={20} />,
    role: [2000 , 1999 , 1998]
}, {
    name: 'مشرفين المحافظات',
    category: 'المستخدمين',
    to: '/dashboard/governorate-admins',
    icon: <RiGovernmentLine size={20} />,
    role: [2000 , 1999]
}, {
    name: 'الموظفين',
    category: 'المستخدمين',
    to: '/dashboard/employees',
    icon: <GrUserWorker size={20} />,
    role: [2000 , 1999 , 1998]
}, {
    name: 'احصائيات المحافظة',
    category: 'الرئيسية',
    to: '/dashboard/governorate-data',
    icon: <ImStatsDots size={20} />,
    role: [2000 , 1999]
}, {
    name: 'احصائيات المدينة',
    category: 'الرئيسية',
    to: '/dashboard/city-data',
    icon: <TbHomeStats size={20} />,
    role: [2000 , 1999 , 1998]
}, {
    name: 'الشكاوي',
    category: 'الرئيسية',
    to: '/dashboard/reports',
    icon: <MdOutlineReportProblem size={20} />,
    role: [2000 , 1999 , 1998]
},  {
    name: 'الخريطة',
    category: 'العرض',
    to: '/dashboard/map',
    icon: <FiMapPin size={20} />,
    role: [2000 , 1999 , 1998]
}, {
    name: 'الملف الشخصي',
    category: 'الاعدادات',
    to: '/dashboard/settings',
    icon: <IoSettingsOutline size={20} />,
    role: [2000 , 1999 , 1998]
}]

export { categories , Elements };
