import CurrentReports from "../Components/Analysis/CurrentReports";
// import Fastest from "../Components/Analysis/Fastest";
import DepartReports from "../Components/Analysis/DepartReports";
import Normalstats from "../Components/Analysis/Normalstats";
import TopRated from "../Components/Analysis/TopRated";
import { CiWarning, CiClock2 } from "react-icons/ci";
import { MdDone } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import Fastest from "../Components/Analysis/Fastest";
import LastReports from "../Components/Analysis/LastReports";
import { useContext, useEffect, useState } from "react";
import { Axios } from "../../API/Axios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Context/AuthContext";
import Skeleton from "react-loading-skeleton";

const COUNT_TOUNLOAD = 4

export default function CityAnalysis() {

    const [govId , setGovId] = useState('');
    const [cityId , setCityId] = useState('')
    const [cityLoad , setCityLoad] = useState(true)
    const [cities , setCities] = useState([])
    const { user } = useContext(AuthContext);
    const [loadingCount, setLoadingCount] = useState(0);
    const increment = () => setLoadingCount(old => old + 1);

    useEffect(() => {
            document.title = "CivicEye | احصائيات المدينة";
            if(govId || user?.type === 1999){
			setCityLoad(true);
			Axios.get(`/cities/${user?.type === 1999 ? user?.governorateId : govId}`)
				.then((response) => {
					setCities(response.data);
					setCityLoad(false);
				})
				.catch((error) => {
					console.error("Error fetching cities:", error);
					setCityLoad(false);
				});
		}
        // eslint-disable-next-line
        } , [user?.governorateId , user?.cityId , govId])

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
            <div className="flex gap-1 items-center">
                {user?.type === 2000 && 
                <div className="relative flex-1">
                    <select
                        name="governorateId"
                        onChange={(e) => {setGovId(e.target.value); setLoadingCount(0); setCityId('')}}
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
                </div>
                }
                {(user?.type === 2000 || user?.type === 1999) && 
                <div className="relative flex-1">
                    <select
                        name="governorateId"
                        onChange={(e) => {setCityId(e.target.value); setLoadingCount(0)}}
                        value={cityId}
                        disabled={cityLoad}
                        className={`w-full border text-right duration-300 dark:bg-[#121313] text-sm dark:text-white dark:border-[#333] border-[#e2e6f1] rounded-md outline-none p-2 my-2  pl-8 pr-3 py-2 transition ease focus:outline-none shadow-sm appearance-none cursor-pointer`}>
                        <option disabled value="">{user?.type === 2000 && govId === '' ? "اختر محافظة اولا" : cityLoad ? "جاري تحميل المدن" : "اختر المدينة"}</option>
                        {cities?.map((el , index) => (
                            <option key={index} value={el.cityId}>{el.name}</option>
                        ))}
                    </select>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute translate-y-1/2 top-1/2 left-2.5 text-slate-700 dark:text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                    </svg>
                </div>
                }
            </div>
            {(cityId || user?.cityId) && <div>
                <div className="display grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-2">

                    {loadingCount < COUNT_TOUNLOAD 
                    && <Skeleton count={1} className="dark:[--base-color:_#202020_!important] py-4 dark:[--highlight-color:_#444_!important]" height={132}/>}
                    <div style={{display: loadingCount < COUNT_TOUNLOAD ? 'none' : 'block' }}>
                        <Normalstats 
                        title="عدد الشكاوي" 
                        icon={<div className="p-3 bg-red-100 rounded-full"><CiWarning className="text-red-600" size={28} /></div>} 
                        endpoint={"reportsCountPerCity"}
                        what={"all"}
                        type={"city"}
                        cityId={cityId}
                        dest={"createReport"}
                        increment={increment}
                        />
                    </div>

                    {loadingCount < COUNT_TOUNLOAD 
                    && <Skeleton count={1} className="dark:[--base-color:_#202020_!important] py-4 dark:[--highlight-color:_#444_!important]" height={132}/>}
                    <div style={{display: loadingCount < COUNT_TOUNLOAD ? 'none' : 'block' }}>
                        <Normalstats 
                            title="جاري الحل" 
                            icon={<div className="p-3 bg-blue-100 rounded-full"><CiClock2 className="text-blue-600" size={28} /></div>} 
                            endpoint={"inProgressReportsCountPerCity"}
                            what={"inprogress"}
                            type={"city"}
                            cityId={cityId}
                            dest={"updateStatus"}
                            increment={increment}
                        />
                    </div>

                    {loadingCount < COUNT_TOUNLOAD 
                    && <Skeleton count={1} className="dark:[--base-color:_#202020_!important] py-4 dark:[--highlight-color:_#444_!important]" height={132}/>}
                    <div style={{display: loadingCount < COUNT_TOUNLOAD ? 'none' : 'block' }}>
                        <Normalstats 
                            title="تم الحل" 
                            icon={<div className="p-3 bg-green-100 rounded-full"><MdDone className="text-green-600" size={28} /></div>} 
                            endpoint={"ResolvedReportsCountPerCity"}
                            what={"resolved"}
                            type={"city"}
                            cityId={cityId}
                            dest={"updateStatus"}
                            increment={increment}
                        />
                    </div>

                    {loadingCount < COUNT_TOUNLOAD 
                    && <Skeleton count={1} className="dark:[--base-color:_#202020_!important] py-4 dark:[--highlight-color:_#444_!important]" height={132}/>}
                    <div style={{display: loadingCount < COUNT_TOUNLOAD ? 'none' : 'block' }}>
                        <Normalstats 
                            title="تقييم الموظفيين" 
                            icon={<div className="p-3 bg-yellow-100 rounded-full"><GrUserWorker className="text-yellow-600" size={28} /></div>} 
                            count="3.9"
                            what={"rating"}
                            type={"city"}
                            cityId={cityId}
                            increment={increment}
                        />
                    </div>
                </div>

                <div className="display grid gap-2 mb-2 grid-cols-1 lg:grid-cols-5 items-stretch">
                    <div className="lg:col-span-2"><LastReports type={"city"} cityId={cityId} /></div>
                    <div className="lg:col-span-3"><CurrentReports /></div>
                </div>

                <div className="display grid grid-cols-1 lg:grid-cols-5 gap-2 mb-2 items-stretch">
                    <div className="lg:col-span-2"><TopRated /></div>
                    <div className="lg:col-span-3"><DepartReports /></div>
                </div>

                <div className="display grid grid-cols-1 gap-2 mb-2 items-stretch">
                    <div className=""><Fastest /></div>
                </div>
            </div>}
        </>
    );
}