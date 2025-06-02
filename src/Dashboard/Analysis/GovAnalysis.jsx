import CurrentReports from "../Components/Analysis/CurrentReports";
import Fastest from "../Components/Analysis/Fastest";
import DepartReports from "../Components/Analysis/DepartReports";
import Normalstats from "../Components/Analysis/Normalstats";
// import TopRated from "../Components/Analysis/TopRated";
import { CiWarning, CiClock2 } from "react-icons/ci";
import { GrUserWorker } from "react-icons/gr";

export default function GovAnalysis() {
    return (
        <div className="flex gap-3 flex-col lg:flex-row">
            <div className="grid grid-cols-1 flex-1 lg:grid-cols-2 xl:grid-cols-4 gap-3">
                <Normalstats 
                    title="عدد البلاغات" 
                    icon={<div className="p-3 bg-red-100 rounded-full"><CiWarning className="text-red-600" size={28} /></div>} 
                    count="48"
                    state="down" 
                    percentage="0.866" 
                />

                <Normalstats 
                    title="متوسط استلام البلاغ" 
                    icon={<div className="p-3 bg-blue-100 rounded-full"><CiClock2 className="text-blue-600" size={28} /></div>} 
                    count="3hrs"
                    state="up" 
                    percentage="2.36" 
                />

                <Normalstats 
                    title="تقييم الموظفيين" 
                    icon={<div className="p-3 bg-yellow-100 rounded-full"><GrUserWorker className="text-yellow-600" size={28} /></div>} 
                    count="3.9"
                    state="up" 
                    percentage="0.2" 
                />

                <Normalstats 
                    title="متوسط حل البلاغ" 
                    icon={<div className="p-3 bg-blue-100 rounded-full"><CiClock2 className="text-blue-600" size={28} /></div>} 
                    count="5hrs"
                    state="down" 
                    percentage="0.668" 
                />

                <div className="lg:col-span-2 xl:col-span-4 col-span-1 row-span-2">
                    <DepartReports />
                </div>

                <div className="lg:col-span-2 xl:col-span-4 col-span-1 row-start-5 lg:row-start-3 row-span-2">
                    <CurrentReports />
                </div>
            </div>
            <div className="lg:w-[270px] flex flex-col gap-3">
                <div>
                    <Fastest />
                </div>
                <div>
                    <Fastest />
                </div>
            </div>
        </div>
    );
}