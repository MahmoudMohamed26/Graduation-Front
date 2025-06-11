import { Link } from "react-router-dom"
import wordCut from "../../helpers/WordCut";
import { CiWarning } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { useContext, useState } from "react";
import departmentMapper from "../../helpers/DepartmentMapper";
import dateFormater from "../../helpers/DateFormater";
import { Axios } from "../../API/Axios";
import { Bounce, toast } from "react-toastify";
import StatusMapper from "../../helpers/StatusMapper";
import { IconEdit } from '@tabler/icons-react';
import { IconEye } from '@tabler/icons-react';
import { AuthContext } from "../../Context/AuthContext";
export default function Table(props){
    const [showpop, setShowpop] = useState(false)
    const { user } = useContext(AuthContext)
    const [ removeId , setRemoveId] = useState(null)
    const [ removeType , setRemoveType] = useState(null)
    const [ lastDelete , setLastDelete] = useState(false)
    function HandleDeleteConfirmation(id , type){
        setShowpop(true)
        setRemoveId(id)
        setRemoveType(type)
    }

    async function HandleRemove(){
        setLastDelete(true)
        try{
            await Axios.delete(`${props.type === 'employees' ? `/employees/${removeId}` : `/admin/${removeId}/type/${removeType}`}`)
            toast.success('تمت العملية بنجاح', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
                transition: Bounce,
                });
                if(props.onDelete) {
                    props.onDelete(removeId, removeType);
                }
        }catch(err){
            console.log(err);
            toast.error('حدث خطأ اثناء التنفيذ', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
                transition: Bounce,
            });
        }
        setLastDelete(false)
        setShowpop(false)
    }
    const headersShow = props.headers.map((element , index) => (
        <th key={index} className="p-4 font-semibold text-right">
    {element.name}
    </th>
    ))
    const dataShow = props.data.map((item , index) => (
        <tr className="hover:bg-gray-200 border-none dark:bg-[#1D1F20] dark:hover:bg-[#191A1A] dark:odd:bg-[#191A1A] bg-[#F4F7FA] duration-300 odd:bg-gray-200" key={index}>
        <td className="p-4 text-[15px] border-none dark:text-white text-gray-800 ">{props.page * 10 + index + 1}</td>
        {props.headers.map((item2, index2) => (
            <td key={index2} className="p-4 text-sm dark:text-[#EEE] text-gray-800">
                {item2.key === 'currentStatus'
                ? (() => {
                    const { text: statusText, color: statusColor, bgColor: statusBgColor } = StatusMapper(item[item2.key]);
                    return (
                        <span
                            style={{
                            color: statusColor,
                            backgroundColor: statusBgColor,
                            padding: '2px 6px',
                            borderRadius: '4px'
                            }}>{statusText}</span>
                    );
                })()
                : item2.key === 'department'
                ? wordCut(departmentMapper(item[item2.key]), 15)
                : item2.key === 'createdAt'
                ? dateFormater(item[item2.key])
                : wordCut(item[item2.key], 30)
                }
            </td>
        ))}
        
        <td className="p-4 flex gap-2 items-center">
            {props.url === "reports" && (
            <Link to={`${item.reportId}`}>
                <IconEye stroke={2} className="cursor-pointer text-[#9788f8] hover:text-[#725DFE]" />
            </Link>
            )}

            {props.url === "employees" && (
            <>
                {props.adminType === "city" ? (
                user.type === 2000 ? (
                    <>
                    <Link to={`stats/${item.empId}`}>
                        <IconEye stroke={2} className="cursor-pointer text-[#9788f8] hover:text-[#725DFE]" />
                    </Link>
                    <Link to={`${item.empId}`} className="text-blue-500 hover:text-blue-700">
                        <IconEdit stroke={2} />
                    </Link>
                    <button
                        onClick={() => HandleDeleteConfirmation(item.empId, item.type)}
                        title="Delete"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
                        <path
                            d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                            data-original="#000000"
                        />
                        <path
                            d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                            data-original="#000000"
                        />
                        </svg>
                    </button>
                    </>
                ) : (
                    <span className="text-gray-400 text-sm italic min-h-[24px]">لا يوجد</span>
                )
                ) : (
                <>
                    <Link to={`stats/${item.empId}`}>
                    <IconEye stroke={2} className="cursor-pointer text-[#9788f8] hover:text-[#725DFE]" />
                    </Link>
                    {(user.type === 2000 || user.type === 1998) && (
                    <>
                        <Link to={`${item.empId}`} className="text-blue-500 hover:text-blue-700">
                        <IconEdit stroke={2} />
                        </Link>
                        <button
                        onClick={() => HandleDeleteConfirmation(item.empId, item.type)}
                        title="Delete"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
                            <path
                                d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                data-original="#000000"
                            />
                            <path
                                d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                data-original="#000000"
                            />
                        </svg>
                        </button>
                    </>
                    )}
                </>
                )}
            </>
            )}

            {props.url === "admins" && (
                <>
                    {user?.type === 2000 ? (
                    <>
                        <Link to={`${item.adminId}`} className="text-blue-500 hover:text-blue-700">
                        <IconEdit stroke={2} />
                        </Link>
                        <button
                        onClick={() => HandleDeleteConfirmation(item.adminId, item.type)}
                        title="Delete"
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 fill-red-500 hover:fill-red-700"
                            viewBox="0 0 24 24"
                        >
                            <path
                            d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                            />
                            <path
                            d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                            />
                        </svg>
                        </button>
                    </>
                    ) : (
                    <span className="dark:text-white text-sm text-gray-800 min-h-[24px]">لا يوجد</span>
                    )}
                </>
            )}
        </td>

        </tr>
    ))
    return(
        <div>
            {showpop && (<>
                <div onClick={(prev) => setShowpop(!prev)} className="fixed top-0 left-0 w-full h-full duration-300 bg-black opacity-30 z-50"></div>
                <div className={`bg-white fixed dark:bg-[#1D1F20] dark:text-white z-[51] translate-y-[-145%] opacity-1 top-1/2 w-[24rem] md:w-[28rem] rounded-md shadow-lg left-1/2 translate-x-1/2  duration-[3s] modaldown-animation`}>
                    <div className='ml-5 mt-5 flex justify-end'><RxCross1 onClick={(prev) => setShowpop(!prev)} className='cursor-pointer' color='#dc3545' size={15} /></div>
                    <div className="pb-10 dark:bg-[#1D1F20] dark:text-white px-4">
                        <h1 className="flex gap-3 text-3xl items-center"><CiWarning color="red" size={50} /> تحذير</h1>
                        <p className="mt-5">هل أنت متأكد من أنك ترغب في حذف هذا العنصر ؟</p>
                        <p className="mt-5">يرجى العلم أن هذه العملية نهائية ولا يمكن التراجع عنها .</p>
                        <div className="mt-10 flex gap-2">
                            <button onClick={HandleRemove} disabled={lastDelete} className="py-1 px-12 text-white font-semibold rounded-sm bg-red-600 duration-300 hover:bg-red-700">
                                {lastDelete ? <div role="status">
                                <svg aria-hidden="true" className="inline w-4 h-4 text-gray-200 animate-spin fill-[#711a19]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="mr-3">جاري التنفيذ...</span>
                        </div> : "حذف"}
                        </button>
                            <button onClick={(prev) => setShowpop(!prev)} className="py-1 flex-1 border duration-300 hover:border-[#333] text-sm px-4 font-semibold rounded-sm">تراجع</button>
                        </div>
                    </div>
                </div>
            </>)}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border-collapse dark:bg-[#121313]">
                    <thead className="bg-[#725DFE] text-sm text-white whitespace-nowrap">
                        <tr>
                        <th className="p-4 font-semibold text-right">#</th>
                            {headersShow}
                            <th className="p-4 font-semibold text-right">العمليات</th>
                        </tr>
                    </thead>
                    <tbody className="whitespace-nowrap">
                        {!props.debounce && dataShow}
                    </tbody>
                </table>
                {(props.loading || props.debounce) && <div className="min-h-[560px] flex justify-center items-center">
                    <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 dark:text-gray-600 animate-spin fill-[#725DFE]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                    </div>}
                {!props.loading && !props.debounce && props.data.length === 0 && <p className="text-lg flex dark:text-white justify-center items-center min-h-[545px]">لا يوجد بيانات</p>}
            </div>
        </div>
    )
}