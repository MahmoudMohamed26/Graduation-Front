// import { useEffect, useState } from "react";
import Table from "../Components/Table"
import { Axios } from "../../API/Axios";
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react";
import useDebounce from "../../helpers/Debounce";
export default function CityAdmins(){

    useEffect(() => {
            document.title = "CivicEye | مشرفين المدن";
        } , [])

    const queryClient = useQueryClient()
    const [page, setPage] = useState(0)
    const {debouncedValue , isDebouncing} = useDebounce(page , 500)
    const [refetch , setRefetch] = useState(false)

    const fetchData = async () => {
        const res = await Axios.get(`/cityadmins?page=${page}`)
        return {
            content: res.data.content,
            totalPages: res.data.totalPages
        }
    }

    const {data , isLoading} = useQuery({
        queryKey: ['cityAdmins' , debouncedValue , refetch],
        queryFn: fetchData,
        staleTime: 1000 * 60,
    })

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

    const handleDelete = (removeId, type) => {
        queryClient.setQueryData(['cityAdmins'], (oldData) => {
            if (!oldData) return oldData
            return oldData.filter((item) => item.adminId !== removeId)
        })
        setRefetch((prev) => !prev)
    }
    
    return(
        <div>
            <div className="flex">
                <h1 className="w-fit text-4xl relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] after:right-0 before:dark:bg-[#363D3E] dark:text-[#EEE]">مشرفين المدن</h1>
            </div>
            <div className="mt-10">
                <Table headers={headers} type="admins" admintype={"city"} url={"admins"} change={true} data={data?.content || []} page={page} loading={isLoading} debounce={isDebouncing} onDelete={handleDelete} />
                <div>
                    <div className="flex justify-end gap-10 items-center mt-5">
                        <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                            className="px-4 py-1 bg-[#725DFE] enabled:hover:bg-[#604CC7] text-white duration-300 text-sm rounded-sm disabled:opacity-50"
                            disabled={page === 0 || isDebouncing || isLoading}>السابق</button>
                        <p className="text-sm text-[#333] dark:text-white">{page + 1}</p>
                        <button onClick={() => setPage((prev) => prev + 1)} disabled={page + 1 >= data?.totalPages || isDebouncing || isLoading} className="px-4 py-1 text-sm duration-300 bg-[#725DFE] text-white enabled:hover:bg-[#604CC7] disabled:opacity-50 rounded-sm">التالي</button>
                    </div>
                </div>
            </div>
        </div>
    )
}