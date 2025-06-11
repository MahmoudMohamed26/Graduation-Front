import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Axios } from "../../API/Axios"

import Table from "../Components/Table"
import { useEffect, useState } from "react"
import useDebounce from "../../helpers/Debounce"
import { IconChevronLeftPipe, IconChevronRightPipe } from "@tabler/icons-react"
export default function GovAdmins(){

    useEffect(() => {
            document.title = "CivicEye | مشرفين المحافظات";
        } , [])

    const queryClient = useQueryClient()
    const [page, setPage] = useState(0)
    const [refetch , setRefetch] = useState(false)
    const {debouncedValue , isDebouncing} = useDebounce(page , 500)
    const headers = [{
        name: 'الأسم',
        key: 'fullName',
    },{
        name: 'البريد الألكتروني',
        key: 'email',
    },{
        name: 'المحافظة',
        key: 'governorateName',
    }]

    const fetchData = async () => {
        const res = await Axios.get(`/GovernorateAdmin?page=${page}`)
        return {
            content: res.data.content,
            totalPages: res.data.totalPages
        }
    }

    const {data , isLoading} = useQuery({
        queryKey: ['governorateAdmins' , debouncedValue , refetch],
        queryFn: fetchData,
        staleTime: 1000 * 60,
    })

    const handleDelete = (removeId, type) => {
        queryClient.setQueryData(['governorateAdmins'], (oldData) => {
            if (!oldData) return oldData
            return oldData.filter((item) => item.adminId !== removeId)
        })
        setRefetch((prev) => !prev)
    }
    
    return(
        <div>
            <div className="flex">
                <h1 className="w-fit text-4xl relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] after:right-0 before:dark:bg-[#363D3E] dark:text-[#EEE]">مشرفين المحافظات</h1>
            </div>
            <div className="mt-10">
                <Table headers={headers} type="admins" admintype={"gov"} url={"admins"} change={true} page={page} loading={isLoading} debounce={isDebouncing} data={data?.content || []} onDelete={handleDelete} />
                <div>
                    <div className="flex justify-end gap-10 items-center mt-5">
                        <div className="flex gap-2">
                            <button onClick={() => setPage(0)} disabled={page === 0|| isDebouncing || isLoading} className="px-4 py-1 bg-[#725DFE] enabled:hover:bg-[#604CC7] text-white duration-300 text-sm rounded-sm disabled:opacity-50">
                            <IconChevronRightPipe stroke={3} size={15} />
                            </button>
                            <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                            className="px-4 py-1 bg-[#725DFE] enabled:hover:bg-[#604CC7] text-white duration-300 text-sm rounded-sm disabled:opacity-50"
                            disabled={page === 0 || isDebouncing || isLoading}>السابق</button>
                        </div>
                        <p className="text-sm text-[#333] dark:text-white">{page+1}</p>
                        <div className="flex gap-2">
                            <button onClick={() => setPage((prev) => prev + 1)} disabled={page + 1 >= data?.totalPages || isDebouncing || isLoading} className="px-4 py-1 text-sm duration-300 bg-[#725DFE] text-white enabled:hover:bg-[#604CC7] disabled:opacity-50 rounded-sm">التالي</button>
                            <button onClick={() => setPage(data?.totalPages - 1)} disabled={page === data?.totalPages - 1 || isDebouncing || isLoading} className="px-4 py-1 text-sm duration-300 bg-[#725DFE] text-white enabled:hover:bg-[#604CC7] disabled:opacity-50 rounded-sm "><IconChevronLeftPipe stroke={3} size={15} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}