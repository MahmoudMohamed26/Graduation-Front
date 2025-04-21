import { useEffect, useState } from "react";
import Table from "../Components/Table"
import { Axios } from "../../API/Axios";
import Skeleton from "react-loading-skeleton";
export default function CityAdmins(){
    const [data , setData] = useState([])
    const [load , setLoad] = useState(true)
    useEffect(() => {
        setLoad(true)
        const fetchData = async () => {
            await Axios.get(`/cityadmins`)
            .then((response) => {
                setData(response.data)
                setLoad(false)
            })
        }
        fetchData()
    } , [])


    const headers = [{
        name: 'الأسم',
        key: 'fullName',
    },{
        name: 'البريد الألكتروني',
        key: 'email',
    },{
        name: 'المحافظة',
        key: 'governorateName',
    },{
        name: 'المدينة',
        key: 'cityName',
    }]


    
    return(
        <div>
            <div className="flex">
                <h1 className="w-fit text-4xl relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] after:right-0 before:dark:bg-[#363D3E] dark:text-[#EEE]">مشرفين المدن</h1>
            </div>
            <div className="mt-10">
                {load ? 
                <>
                <Skeleton count={1} className="dark:[--base-color:_#202020_!important] dark:[--highlight-color:_#444_!important]" height={770} width="100%"/>
                </>
                : 
                <Table headers={headers} data={data} />}
            </div>
        </div>
    )
}