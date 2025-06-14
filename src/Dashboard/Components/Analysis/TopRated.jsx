import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Axios } from "../../../API/Axios";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";

export default function TopRated(props){

    const { user } = useContext(AuthContext);

    const fetchData = async () => {
        let url = ""
        url = props.type === "gov"
        ? `/init/employees/rate/top-8/gov/${props.govId !== '' ? props.govId : user?.governorateId}`
        : `/init/employees/rate/top-8/city/${props.cityId !== '' ? props.cityId : user?.cityId}`;
        const res = await Axios.get(url)
        return res.data
    }

    const {data , isLoading, error} = useQuery({
        queryKey: ['topRated' , props.govId , props.cityId],
        queryFn: fetchData,
        staleTime: 1000 * 60,
    })

    // Handle loading state
    if (isLoading) {
        return (
            <Skeleton count={1} className="dark:[--base-color:_#202020_!important] h-[476.5px] py-4 dark:[--highlight-color:_#444_!important]"/>
        );
    }

    // Handle error state
    if (error) {
        return (
            <div className="bg-white dark:bg-[#191A1A] rounded-md min-h-[476.5px] pt-4 flex flex-col">
                <h1 className="w-fit text-2xl mx-2 relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:dark:bg-[#363D3E] before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] dark:text-white after:bottom-[-15px] after:right-0">اعلى الموظفيين تقييماً</h1>
                <div className="mt-5 flex justify-center items-center flex-grow">
                    <div className="text-sm text-gray-500 dark:text-gray-400">حدث خطأ في تحميل البيانات</div>
                </div>
                <Link to="/dashboard/employees" className="hover:bg-[#604CC7] text-center text-white px-4 bg-[#725DFE] w-full block duration-300 rounded-b-md py-[0.54rem] mt-auto">جميع الموظفين</Link>
            </div>
        );
    }
    
    const showData = data?.length > 0 ? data?.map((el, index) => (
        <div key={index} className={`flex justify-between items-center py-[0.81rem] px-2 ${index % 2 === 0 ? "": "dark:bg-[#1D1F20] bg-[#F4F7FA]"}`}>
            <h2 className="text-sm">{el.fullName || 'غير محدد'}</h2>
            <p className="flex items-center text-sm gap-1">
                <span>{el.rating !== undefined ? el.rating : 0}</span>
                <span><FaStar color="#ff9800" /></span>
            </p>
        </div>
    )) : (
        <div className="flex justify-center items-center py-[140px] text-sm">
            <div className="text-gray-500 dark:text-gray-400">لا توجد بيانات متاحة</div>
        </div>
    );

    return(
        <div className="bg-white dark:bg-[#191A1A] rounded-md min-h-[476.5px] pt-4 flex flex-col">
            <h1 className="w-fit text-2xl mx-2 relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:dark:bg-[#363D3E] before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] dark:text-white after:bottom-[-15px] after:right-0">اعلى الموظفيين تقييماً</h1>
            <div className="mt-5 flex-grow">
                <div className="text-black dark:text-white">
                    {showData}
                </div>
            </div>
            <Link to="/dashboard/employees" className="hover:bg-[#604CC7] text-center text-white px-4 bg-[#725DFE] w-full block duration-300 rounded-b-md py-[0.54rem] mt-auto">جميع الموظفين</Link>
        </div>
    )
}