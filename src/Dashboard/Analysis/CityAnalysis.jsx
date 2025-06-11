import CurrentReports from "../Components/Analysis/CurrentReports";
// import Fastest from "../Components/Analysis/Fastest";
import DepartReports from "../Components/Analysis/DepartReports";
import Normalstats from "../Components/Analysis/Normalstats";
import TopRated from "../Components/Analysis/TopRated";
import { CiWarning, CiClock2 } from "react-icons/ci";
import { MdDone } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import CityReportsPie from "../Components/Analysis/CityReportsPie";
import CitySolutionTime from "../Components/Analysis/CitySolutionTime";
import Fastest from "../Components/Analysis/Fastest";
import LastReports from "../Components/Analysis/LastReports";
import { useEffect } from "react";

export default function CityAnalysis() {

    useEffect(() => {
            document.title = "CivicEye | احصائيات المدينة";
        } , [])

    return (
        <>
            <div>
                <div className="display grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
                    <Normalstats 
                    title="عدد الشكاوي" 
                    icon={<div className="p-3 bg-red-100 rounded-full"><CiWarning className="text-red-600" size={28} /></div>} 
                    endpoint={"reportsCountPerCity"}
                    what={"all"}
                    type={"city"}
                    dest={"createReport"}
                    state="down" 
                    percentage="0.866" 
                    />

                    <Normalstats 
                        title="جاري الحل" 
                        icon={<div className="p-3 bg-blue-100 rounded-full"><CiClock2 className="text-blue-600" size={28} /></div>} 
                        endpoint={"inProgressReportsCountPerCity"}
                        what={"inprogress"}
                        type={"city"}
                        dest={"updateStatus"}
                        state="up" 
                        percentage="2.36" 
                    />

                    <Normalstats 
                        title="تم الحل" 
                        icon={<div className="p-3 bg-green-100 rounded-full"><MdDone className="text-green-600" size={28} /></div>} 
                        endpoint={"ResolvedReportsCountPerCity"}
                        what={"resolved"}
                        type={"city"}
                        dest={"updateStatus"}
                        state="down" 
                        percentage="0.668" 
                    />

                    <Normalstats 
                        title="تقييم الموظفيين" 
                        icon={<div className="p-3 bg-yellow-100 rounded-full"><GrUserWorker className="text-yellow-600" size={28} /></div>} 
                        count="3.9"
                        state="up" 
                        percentage="0.2" 
                    />
                </div>
                <div className="display grid gap-2 mb-2 grid-cols-1 lg:grid-cols-4 items-stretch">
                    <div className="lg:col-span-2"><LastReports /></div>
                    <div className="lg:col-span-2"><CityReportsPie /></div>
                </div>
                <div className="display grid grid-cols-1 lg:grid-cols-5 gap-2 mb-2 items-stretch">
                    <div className="lg:col-span-3 h-full"><CurrentReports /></div>
                    <div className="lg:col-span-2"><TopRated /></div>
                </div>
                <div className="display grid grid-cols-1 lg:grid-cols-5 gap-2 mb-2 items-stretch">
                    <div className="lg:col-span-2 h-full"><Fastest /></div>
                    <div className="lg:col-span-3 h-full"><DepartReports /></div>
                </div>
                <div className="display grid grid-cols-1 lg:grid-cols-4 gap-2 mb-2 items-stretch">
                    <div className="lg:col-span-4"><CitySolutionTime /></div>
                </div>
            </div>
        </>
    );
}