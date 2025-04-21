import { FaStar } from "react-icons/fa";

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
            name: 'فارس احمد',
            rating: 3.4,
        }
        
    ];

    const showData = data.map((el , index) => (
        <div key={index} className={`flex justify-between items-center py-5 ${index === 0 ? "" : "border-t dark:border-[#363D3E]"}`}>
            <h2 className="text-sm">{el.name}</h2>
            <p className="flex items-center text-sm gap-1">
                <span>{el.rating}</span>
                <span><FaStar color="#ff9800" /></span>
            </p>
        </div>
    ))

    return(
        <div className="bg-white dark:bg-[#191A1A] rounded-md px-4 py-4">
            <h1 className="w-fit text-sm relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:dark:bg-[#363D3E] before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] dark:text-white after:bottom-[-15px] after:right-0">اعلى الموظفيين تقييماً</h1>
            <div className="mt-10">
                <div className="text-black dark:text-white">
                    {showData}
                </div>
            </div>
        </div>
    )
}