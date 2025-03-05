import { useEffect, useState } from "react";
import Table from "../Components/Table"
import axios from "axios";
import Skeleton from "react-loading-skeleton";
export default function CityAdmins(){
    const [data , setData] = useState([])
    const [load , setLoad] = useState(true)
    useEffect(() => {
        setLoad(true)
        const fetchData = async () => {
            await axios.get("http://localhost:9090/api/V1/cityadmins", {
                withCredentials: true
            })
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
                <h1 className="w-fit text-4xl relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] after:right-0">مشرفين المدن</h1>
            </div>
            <div className="mt-10">
                {load ? 
                <>
                <Skeleton count={1} height={770} width="100%"/>
                </>
                : 
                <Table headers={headers} data={data} />}
            </div>
        </div>
    )
}