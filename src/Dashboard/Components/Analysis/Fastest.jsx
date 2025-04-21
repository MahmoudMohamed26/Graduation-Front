import { CiClock2 } from "react-icons/ci";

export default function Fastest(){
    const data = [
        {
            name: 'أحمد علي',
            rating: 2,
        },
        {
            name: 'سارة محمود',
            rating: 2.5,
        },
        {
            name: 'خالد حسن',
            rating: 2.6,
        },
        {
            name: 'نور محمد',
            rating: 4,
        },
        {
            name: 'محمود عبد الله',
            rating: 4.2,
        },
        {
            name: 'ابراهيم طارق',
            rating: 4.3,
        }
        ,
        {
            name: 'مهران علي',
            rating: 4.6,
        }
        ,
        {
            name: 'فارس احمد',
            rating: 5.4,
        }
    ];

    const showData = data.map((el , index) => (
        <div key={index} className={`flex justify-between items-center py-5 ${index === 0 ? "" : "border-t dark:border-[#363D3E]"}`}>
            <h2 className="text-sm">{el.name}</h2>
            <p className="flex items-center text-sm gap-1">
                <span>{el.rating}h</span>
                <span className="text-[#725DFE]"><CiClock2 /></span>
            </p>
        </div>
    ))

    return(
        <div className="bg-white dark:bg-[#191A1A] rounded-md px-4 py-4">
            <h1 className="w-fit text-sm relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:dark:bg-[#363D3E] before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] text-black dark:text-white after:bottom-[-15px] after:right-0">أسرع الموظفين في حل البلاغات</h1>
            <div className="mt-10">
                <div className="light:text-black dark:text-white">
                    {showData}
                </div>
            </div>
        </div>
    )
}