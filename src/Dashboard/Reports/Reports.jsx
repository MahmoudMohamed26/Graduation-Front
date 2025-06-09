import { useEffect, useState } from "react";
import Table from "../Components/Table"
import { Axios } from "../../API/Axios";
import { useQuery } from "@tanstack/react-query";
import StatusMapper from "../../helpers/StatusMapper";
import useDebounce from "../../helpers/Debounce";
import departmentMapper from "../../helpers/DepartmentMapper";
export default function Reports(){
    const [status, setStatus] = useState('');

    useEffect(() => {
        document.title = "CivicEye | الشكاوي";
    } , [])

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
    
    const [page, setPage] = useState(0)
    const {debouncedValue , isDebouncing} = useDebounce(page , 500)
    const [sortDir, setSortDir] = useState('desc');
    const [currentDepartment, setCurrentDepartment] = useState('');

    const fetchData = async () => {
        const res = await Axios.get(`/reports?page=${page}&currentStatus=${status}&sortDir=${sortDir}&department=${currentDepartment}`);
        return {
            content: res.data.content,
            totalPages: res.data.totalPages
        }
    }

    const fetchDepartments = async () => {
        const res = await Axios.get(`/departments`);
        return res.data;
    }

    const {data: departments, isLoading: departmentsLoading} = useQuery({
        queryKey: ['departments'],
        queryFn: fetchDepartments,
        staleTime: 1000 * 60
    })

    const {data , isLoading} = useQuery({
        queryKey: ['reports' , debouncedValue , status , sortDir , currentDepartment],
        queryFn: fetchData,
        staleTime: 1000 * 60
    })
    const fetchStatusData = async () => {
        const res = await Axios.get(`/report-statuses`)
        return res.data
    }

    const {data: statusData, isLoading: statusLoading} = useQuery({
        queryKey: ['report-statuses'],
        queryFn: fetchStatusData,
        staleTime: 1000 * 60
    })
    
    return(
        <>
            <div>
                <div className="flex flex-col xl:flex-row gap-10 xl:gap-0 xl:justify-between xl:items-center">
                    <h1 className="w-fit text-4xl relative before:absolute before:h-[1px] before:w-[calc(100%)] before:dark:bg-[#363D3E] dark:text-[#EEE] before:bg-slate-300 before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] after:right-0">الشكاوي</h1>
                    <div className="flex gap-5 flex-wrap items-center">
                        <div className="relative">
                            <select disabled={isLoading} onChange={(e) => {
                                setStatus(e.target.value);
                                setPage(0);
                            }}
                                className="w-[200px] border dark:bg-[#121313] dark:text-[#EEE] dark:border-[#333] text-right duration-300  text-sm border-[#e2e6f1] special_shadow rounded-md outline-none  pl-8 pr-3 py-2 transition ease focus:outline-none shadow-sm appearance-none cursor-pointer">
                                <option value="">جميع الحالات</option>
                                {statusLoading ? <option value="loading">جاري التحميل...</option> : statusData.map((item, index) => {
                                    const {text: statusText} = StatusMapper(item);
                                    return (
                                    <option key={index} value={item}>{statusText}</option>
                                )})}
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute translate-y-1/2 top-1/2 left-2.5 text-slate-700 dark:text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </div>
                        <div className="relative">
                            <select disabled={isLoading} onChange={(e) => {
                                setCurrentDepartment(e.target.value);
                                setPage(0);
                                }}
                                className="w-[200px] border dark:bg-[#121313] dark:text-[#EEE] dark:border-[#333] text-right duration-300  text-sm border-[#e2e6f1] special_shadow rounded-md outline-none  pl-8 pr-3 py-2 transition ease focus:outline-none shadow-sm appearance-none cursor-pointer">
                                <option value="">جميع الأقسام</option>
                                {departmentsLoading ? <option value="loading">جاري التحميل...</option> : departments.map((item, index) => {
                                    return (
                                    <option key={index} value={item}>{departmentMapper(item)}</option>
                                )})}
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute translate-y-1/2 top-1/2 left-2.5 text-slate-700 dark:text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </div>
                        <div className="relative">
                            <select disabled={isLoading} onChange={(e) => {
                                setSortDir(e.target.value);
                                setPage(0);
                                }}
                                className="w-[200px] border dark:bg-[#121313] dark:text-[#EEE] dark:border-[#333] text-right duration-300  text-sm border-[#e2e6f1] special_shadow rounded-md outline-none  pl-8 pr-3 py-2 transition ease focus:outline-none shadow-sm appearance-none cursor-pointer">
                                <option value="desc">الأحدث</option>
                                <option value="asc">الأقدم</option>
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute translate-y-1/2 top-1/2 left-2.5 text-slate-700 dark:text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <Table headers={headers} data={data?.content || []} debounce={isDebouncing} page={page} url={"reports"} loading={isLoading} />
                    <div>
                        <div className="flex justify-end gap-10 items-center mt-5">
                            <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                                className="px-4 py-1 bg-[#725DFE] enabled:hover:bg-[#604CC7] text-white duration-300 text-sm rounded-sm disabled:opacity-50"
                                disabled={page === 0 || isDebouncing || isLoading}>السابق</button>
                            <p className="text-sm text-[#333] dark:text-white">{page+1}</p>
                            <button onClick={() => setPage((prev) => prev + 1)} disabled={page + 1 >= data?.totalPages || isDebouncing || isLoading} className="px-4 py-1 text-sm duration-300 bg-[#725DFE] text-white enabled:hover:bg-[#604CC7] disabled:opacity-50 rounded-sm">التالي</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}