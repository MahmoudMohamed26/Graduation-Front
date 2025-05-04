import { useState } from "react";
import Table from "../Components/Table"
import { Axios } from "../../API/Axios";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
export default function Reports(){
    const [status, setStatus] = useState('all');
    const headers = [{
        name: 'العنوان',
        key: 'title',
    },{
        name: 'الوصف',
        key: 'description',
    },{
        name: 'المدينه',
        key: 'cityName',
    },{
        name: 'رقم الهاتف',
        key: 'contactInfo',
    },{
        name: 'تاريخ الإنشاء',
        key: 'createdAt',
    },{
        name: 'استلمها',
        key: 'assignedEmployeeName',
    },{
        name: 'القسم',
        key: 'department',
    },{
        name: 'الحاله',
        key: 'currentStatus',
    }]
    
    const fetchData = async () => {
        const res = await Axios.get(`/reports`)
        return res.data
    }

    const {data , isLoading} = useQuery({
        queryKey: ['reports'],
        queryFn: fetchData,
        staleTime: 1000 * 60
    })

    // const filteredData = data.filter((item) => {
    //     if(item.currentStatus === 'all') return true;
    //     return item.status.toLowerCase() === status.toLowerCase();
    // })
    return(
        <div>
            <div className="flex justify-between items-center">
                <h1 className="w-fit text-4xl relative before:absolute before:h-[1px] before:w-[calc(100%)] before:dark:bg-[#363D3E] dark:text-[#EEE] before:bg-slate-300 before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] after:right-0">الشكاوي</h1>
                <div className="relative">
                    <select onChange={(e) => setStatus(e.target.value)} value={status}
                        className="w-[200px] border dark:bg-[#121313] dark:text-[#EEE] dark:border-[#333] text-right duration-300  text-sm border-[#e2e6f1] special_shadow rounded-md outline-none  pl-8 pr-3 py-2 transition ease focus:outline-none shadow-sm appearance-none cursor-pointer">
                        <option value="all">جميع الحالات</option>
                        <option value="On Hold">معلق</option>
                        <option value="In Progress">قيد التنفيذ</option>
                        <option value="Completed">مكتمل</option>
                    </select>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute translate-y-1/2 top-1/2 left-2.5 text-slate-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                    </svg>
                </div>
            </div>
            <div className="mt-10">
                {isLoading ? 
                    <>
                        <Skeleton count={1} className="dark:[--base-color:_#202020_!important] dark:[--highlight-color:_#444_!important]" height={770} width="100%"/>
                    </>
                    : 
                    <Table headers={headers} data={data} />}
            </div>
        </div>
    )
}