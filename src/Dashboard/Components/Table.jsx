import { Link } from "react-router-dom"
import { FaRegEye } from "react-icons/fa";
import wordCut from "../../helpers/WordCut";
import { CiWarning } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import departmentMapper from "../../helpers/DepartmentMapper";
import dateFormater from "../../helpers/DateFormater";
import { Axios } from "../../API/Axios";
import { Bounce, toast } from "react-toastify";
export default function Table(props){
    const url = window.location.pathname.split("/")[window.location.pathname.split("/").length-1]
    const [showpop, setShowpop] = useState(false)
    const [data , setData] = useState(props.data)
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
                setData((old) => {
                    return old.filter((item) => props.type === "employees" ? item.empId !== removeId : item.adminId !== removeId)
                })
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
    const dataShow = data.map((item , index) => (
        <tr className="hover:bg-gray-200 dark:bg-[#1D1F20] dark:hover:bg-[#191A1A] dark:odd:bg-[#191A1A] bg-[#F4F7FA] duration-300 odd:bg-gray-200" key={index}>
        <td className="p-4 text-[15px] dark:text-white text-gray-800 ">{index + 1}</td>
        {props.headers.map((item2, index2) => (
            <td key={index2} className="p-4 text-sm dark:text-[#EEE] text-gray-800">
            {item2.key === 'status' ? (item[item2.key] === 'Completed' ? <span className="px-2 py-1 bg-green-200 text-green-800 rounded-md">مكتمل</span> : item[item2.key] === 'On Hold' ? <span className="px-2 py-1 bg-red-200 text-red-800 rounded-md">معلق</span> : <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-md">قيد التنفيذ</span>) : item2.key === 'department' ? wordCut(departmentMapper(item[item2.key]) , 15) : item2.key === 'createdAt' ? dateFormater(item[item2.key]) : wordCut(item[item2.key], 30)}
            </td>
        ))}
        
            {url === 'reports' ? (<td className="py-4 flex justify-center"><Link to={`${item.reportId}`}><FaRegEye className="cursor-pointer !hover:text-[#604CC7]" color="#725DFE" size={20} /></Link></td>) : (<td><Link to={`${props.url === "admins" ? item.adminId : item.empId}`}>
            <button className="mr-4" title="Edit">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 fill-blue-500 hover:fill-blue-700"
                viewBox="0 0 348.882 348.882"
                >
                <path
                    d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                    data-original="#000000"
                />
                <path
                    d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                    data-original="#000000"
                />
                </svg>
            </button>
            </Link>
            <button
                onClick={() => HandleDeleteConfirmation(props.type === "employees" ? item.empId : item.adminId , item.type)}
                className="mr-4"
                title="Delete"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 fill-red-500 hover:fill-red-700"
                viewBox="0 0 24 24"
                >
                <path
                    d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                    data-original="#000000"
                />
                <path
                    d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                    data-original="#000000"
                />
                </svg>
            </button></td>)}
        </tr>
    ))
    return(
        <div>
            {showpop && (<>
                <div onClick={(prev) => setShowpop(!prev)} className="fixed top-0 left-0 w-full h-full duration-300 bg-black opacity-30 z-50"></div>
                <div className={`bg-white fixed z-[51] translate-y-[-145%] opacity-1 top-1/2 w-[24rem] md:w-[28rem] rounded-md shadow-lg left-1/2 translate-x-1/2  duration-[3s] modaldown-animation`}>
                    <div className='ml-5 mt-5 flex justify-end'><RxCross1 onClick={(prev) => setShowpop(!prev)} className='cursor-pointer' color='#dc3545' size={15} /></div>
                    <div className="pb-10 px-4">
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
            <div className="overflow-x-auto ">
                <table className="min-w-full bg-white">
                    <thead className="bg-[#725DFE] text-sm text-white whitespace-nowrap">
                        <tr>
                        <th className="p-4 font-semibold text-right">#</th>
                            {headersShow}
                            <th className="p-4 font-semibold text-right">العمليات</th>
                        </tr>
                    </thead>
                    <tbody className="whitespace-nowrap">
                        {dataShow}
                    </tbody>
                </table>
            </div>
        </div>
    )
}