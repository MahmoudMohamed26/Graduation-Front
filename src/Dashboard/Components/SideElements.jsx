import { GrUserWorker } from "react-icons/gr";
import { PiCity } from "react-icons/pi";
import { RiGovernmentLine } from "react-icons/ri";
import { IoPersonAddOutline } from "react-icons/io5";
import { RiAdminLine } from "react-icons/ri";
import { ImStatsDots } from "react-icons/im";
import { TbHomeStats } from "react-icons/tb";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineReportProblem } from "react-icons/md";



const categories =[{
    name: 'المستخدمين',
} ,{
    name: 'الأضافه',
}, {
    name: 'البيانات'
}, {
    name: 'العرض'
}]

const Elements = [{
    name: 'اضافة مشرف',
    category: 'الأضافه',
    to: '/dashboard/add-admin',
    icon: <RiAdminLine size={20} />
} , {
    name: 'اضافة موظف',
    category: 'الأضافه',
    to: '/dashboard/add-employee',
    icon: <IoPersonAddOutline size={20} />
}, {
    name: 'مشرفين المدن',
    category: 'المستخدمين',
    to: '/dashboard/city-admins',
    icon: <PiCity size={20} />
}, {
    name: 'مشرفين المحافظات',
    category: 'المستخدمين',
    to: '/dashboard/governorate-admins',
    icon: <RiGovernmentLine size={20} />
}, {
    name: 'الموظفين',
    category: 'المستخدمين',
    to: '/dashboard/employees',
    icon: <GrUserWorker size={20} />
}, {
    name: 'البلاغات',
    category: 'البيانات',
    to: '/dashboard/reports',
    icon: <MdOutlineReportProblem size={20} />
}, {
    name: 'انشاء احصائيات',
    category: 'البيانات',
    to: '/dashboard/generate-stats',
    icon: <ImStatsDots size={20} />
}, {
    name: 'احصائيات المدينه',
    category: 'البيانات',
    to: '/dashboard/city-data',
    icon: <TbHomeStats size={20} />
}, {
    name: 'احصائيات المحافظه',
    category: 'البيانات',
    to: '/dashboard/governorate-data',
    icon: <TbHomeStats size={20} />
}, {
    name: 'الخريطة',
    category: 'العرض',
    to: '/dashboard/map',
    icon: <FiMapPin />
}]

export { categories , Elements };