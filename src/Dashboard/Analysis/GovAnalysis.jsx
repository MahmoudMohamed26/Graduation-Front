import CurrentReports from "../Components/Analysis/CurrentReports";
import DepartReports from "../Components/Analysis/DepartReports";
import Normalstats from "../Components/Analysis/Normalstats";
import TopRated from "../Components/Analysis/TopRated";
import { CiWarning, CiClock2 } from "react-icons/ci";
import { MdDone } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import CityReportsPie from "../Components/Analysis/CityReportsPie";
import CitySolutionTime from "../Components/Analysis/CitySolutionTime";
import Fastest from "../Components/Analysis/Fastest";
import { AuthContext } from "../../Context/AuthContext";
import LastReports from "../Components/Analysis/LastReports";
import { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Axios } from "../../API/Axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const COUNT_TOUNLOAD = 4

export default function CityAnalysis() {
    const [govId , setGovId] = useState('');
    const { user } = useContext(AuthContext);
    const [loadingCount, setLoadingCount] = useState(0);
    const increment = () => setLoadingCount(old => old + 1);

    useEffect(() => {
            document.title = "CivicEye | احصائيات المحافظة";
    } , [])

    const fetchData = async () => {
        const res = await Axios.get(`/governorates`)
        return res.data
    }

    const {data: govs , isLoading: govLoad} = useQuery({
        queryKey: ['governorates'],
        queryFn: fetchData,
        staleTime: 3e3 * 60,
    })


    return (
        <>
            <div className="flex gap-5 items-center">
                {user?.type === 2000 && 
                <div className="relative flex-1">
                    <select
                        name="governorateId"
                        onChange={(e) => {setGovId(e.target.value); setLoadingCount(0)}}
                        value={govId}
                        disabled={govLoad}
                        className={`w-full border text-right duration-300 dark:bg-[#121313] text-sm dark:text-white dark:border-[#333] border-[#e2e6f1] rounded-md outline-none p-2 my-2  pl-8 pr-3 py-2 transition ease focus:outline-none shadow-sm appearance-none cursor-pointer`}>
                        <option disabled value="">{govLoad ? "جاري تحميل المحافظات" : "اختر المحافظة"}</option>
                        {govs?.map((gov , index) => (
                            <option key={index} value={gov.governorateId}>{gov.name}</option>
                        ))}
                    </select>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute translate-y-1/2 top-1/2 left-2.5 text-slate-700 dark:text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                    </svg>
                </div>}
                {user?.type === 2000 && <Link to={`http://localhost:9090/api/V1/download-report`} className="rounded-[0.2rem] block duration-300 hover:bg-[#604CC7] text-sm text-white bg-[#725DFE] px-4 py-2">تحميل تقرير كامل</Link>}
            </div>
            {((user.type !== 2000 && !govId) || (user.type === 2000 && govId)) && <div>
                <div className="display grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
                    {loadingCount < COUNT_TOUNLOAD 
                    && <Skeleton count={1} className="dark:[--base-color:_#202020_!important] py-4 dark:[--highlight-color:_#444_!important]" height={132}/>}
                    <div style={{display: loadingCount < COUNT_TOUNLOAD ? 'none' : 'block' }}>
                        <Normalstats 
                            initial={0}
                            title="عدد الشكاوي" 
                            icon={<div className="p-3 bg-red-100 rounded-full"><CiWarning className="text-red-600" size={28} /></div>} 
                            endpoint={"reportsCountPerGovernorate"}
                            what={"all"}
                            type={"gov"}
                            govId={govId}
                            dest={"createReport"}
                            increment={increment}
                        />
                    </div>

                    {loadingCount < COUNT_TOUNLOAD 
                    && <Skeleton count={1} className="dark:[--base-color:_#202020_!important] py-4 dark:[--highlight-color:_#444_!important]" height={132}/>}
                    <div style={{display: loadingCount < COUNT_TOUNLOAD ? 'none' : 'block' }}>
                        <Normalstats 
                            initial={0}
                            title="جاري الحل"
                            icon={<div className="p-3 bg-blue-100 rounded-full"><CiClock2 className="text-blue-600" size={28} /></div>} 
                            endpoint={"inProgressReportsCountPerGovernorate"}
                            what={"inprogress"}
                            type={"gov"}
                            govId={govId}
                            dest={"updateStatus"}
                            increment={increment}
                        />
                    </div>

                    {loadingCount < COUNT_TOUNLOAD 
                    && <Skeleton count={1} className="dark:[--base-color:_#202020_!important] py-4 dark:[--highlight-color:_#444_!important]" height={132}/>}
                    <div style={{display: loadingCount < COUNT_TOUNLOAD ? 'none' : 'block' }}>
                        <Normalstats 
                            initial={0}
                            title="تم الحل" 
                            icon={<div className="p-3 bg-green-100 rounded-full"><MdDone className="text-green-600" size={28} /></div>} 
                            endpoint={"ResolvedReportsCountPerGovernorate"}
                            what={"resolved"}
                            type={"gov"}
                            govId={govId}
                            dest={"updateStatus"}
                            increment={increment}
                        />
                    </div>

                    {loadingCount < COUNT_TOUNLOAD 
                    && <Skeleton count={1} className="dark:[--base-color:_#202020_!important] py-4 dark:[--highlight-color:_#444_!important]" height={132}/>}
                    <div style={{display: loadingCount < COUNT_TOUNLOAD ? 'none' : 'block' }}>
                        <Normalstats 
                            initial={0}
                            title="تقييم الموظفيين" 
                            icon={<div className="p-3 bg-yellow-100 rounded-full"><GrUserWorker className="text-yellow-600" size={28} /></div>} 
                            count="3.9"
                            type={"gov"}
                            what={"rating"}
                            govId={govId}
                            increment={increment}
                        />
                    </div>
                </div>
                <div className="display grid gap-2 mb-2 grid-cols-1 lg:grid-cols-4 items-stretch">
                    <div className="lg:col-span-2"><LastReports type={"gov"} govId={govId} /></div>
                    <div className="lg:col-span-2"><CityReportsPie govId={govId} type={"gov"} /></div>
                </div>
                <div className="display grid grid-cols-1 lg:grid-cols-5 gap-2 mb-2 items-stretch">
                    <div className="lg:col-span-3 h-full"><CurrentReports govId={govId} type={"gov"} /></div>
                    <div className="lg:col-span-2"><TopRated govId={govId} type={"gov"} /></div>
                </div>
                <div className="display grid grid-cols-1 lg:grid-cols-5 gap-2 mb-2 items-stretch">
                    <div className="lg:col-span-2 h-full"><Fastest type={"gov"} govId={govId} /></div>
                    <div className="lg:col-span-3 h-full"><DepartReports govId={govId} type={"gov"} /></div>
                </div>
                <div className="display grid grid-cols-1 lg:grid-cols-4 gap-2 mb-2 items-stretch">
                    <div className="lg:col-span-4"><CitySolutionTime govId={govId} type={"gov"} /></div>
                </div>
            </div>}
        </>
    );
}