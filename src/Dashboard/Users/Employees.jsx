import { useQuery } from "@tanstack/react-query"
import { Axios } from "../../API/Axios"
import Table from "../Components/Table"
import Skeleton from "react-loading-skeleton"
export default function Employees(){
    const headers = [{
        name: 'الأسم',
        key: 'fullName',
    },{
        name: 'الرقم القومي',
        key: 'nationalId',
    },{
        name: 'البريد الألكتروني',
        key: 'email',
    },{
        name: 'المحافظة',
        key: 'governorate',
    },{
        name: 'المدينة',
        key: 'city',
    },{
        name: 'القسم',
        key: 'department',
    }]

    const fetchData = async () => {
        const res = await Axios.get(`/employees`)
        return res.data
    }

    const {data , isLoading} = useQuery({
        queryKey: ['employees'],
        queryFn: fetchData,
        staleTime: 1000 * 60,
    })

    return(
        <div>
            <div className="flex">
                <h1 className="w-fit text-4xl relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] after:right-0 before:dark:bg-[#363D3E] dark:text-[#EEE]">الموظفين</h1>
            </div>
            <div className="mt-10">
                {isLoading ? 
                <>
                <Skeleton count={1} className="dark:[--base-color:_#202020_!important] dark:[--highlight-color:_#444_!important]" height={770} width="100%"/>
                </>
                : 
                <Table headers={headers} type="employees" url={"employees"} data={data} />}
            </div>
        </div>
    )
}