import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function TopRated(){
    const data = [
        {
            name: 'أحمد علي',
            rating: 4.8,
        },
        {
            name: 'سارة محمود',
            rating: 4.6,
        },
        {
            name: 'خالد حسن',
            rating: 4.2,
        },
        {
            name: 'نور محمد',
            rating: 4.2,
        },
        {
            name: 'محمود عبد الله',
            rating: 3.9,
        },
        {
            name: 'ابراهيم طارق',
            rating: 3.8,
        }
        ,
        {
            name: 'مهران علي',
            rating: 3.6,
        }
        ,
        {
            name: 'اسامة محي',
            rating: 3.6,
        }
    ];

    const showData = data.map((el , index) => (
        <div key={index} className={`flex justify-between items-center py-[0.81rem] px-2 ${index % 2 === 0 ? "": "dark:bg-[#1D1F20] bg-[#F4F7FA]"}`}>
            <h2 className="text-sm">{el.name}</h2>
            <p className="flex items-center text-sm gap-1">
                <span>{el.rating}</span>
                <span><FaStar color="#ff9800" /></span>
            </p>
        </div>
    ))

    return(
        <div className="bg-white h-full dark:bg-[#191A1A] rounded-md flex flex-col justify-stretch pt-4">
            <h1 className="w-fit text-2xl mx-2 relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:dark:bg-[#363D3E] before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] dark:text-white after:bottom-[-15px] after:right-0">اعلى الموظفيين تقييماً</h1>
            <div className="mt-5 flex-1">
                <div className="text-black dark:text-white">
                    {showData}
                    <Link to="/dashboard/employees" className="hover:bg-[#604CC7] mt-auto text-center text-white px-4 bg-[#725DFE] w-full block duration-300 rounded-b-md py-[0.54rem]">جميع الموظفين</Link>
                </div>
            </div>
        </div>
    )
}