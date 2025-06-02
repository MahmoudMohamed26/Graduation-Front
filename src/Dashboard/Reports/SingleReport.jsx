import { useParams } from "react-router-dom"
import { Axios } from "../../API/Axios"
import { useQuery } from "@tanstack/react-query"
import Skeleton from "react-loading-skeleton"
import departmentMapper from "../../helpers/DepartmentMapper"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import StatusMapper from "../../helpers/StatusMapper"
import dateFormater from "../../helpers/DateFormater"

export default function SingleReport(){
    const {id} = useParams()
    const fetchData = async () => {
        const res = await Axios.get(`/reports/${id}`)
        return res.data
    }

    const {data , isLoading} = useQuery({
        queryKey: ['report', id],
        queryFn: fetchData,
        staleTime: 1000 * 60,
    })
    const { text: statusText, color: statusColor } = data ? StatusMapper(data.currentStatus) : { text: '', color: '' };
    console.log(data);
    return(
        <div>
            <div className="flex">
                <h1 className="w-fit text-4xl relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] after:right-0 before:dark:bg-[#363D3E] dark:text-[#EEE]">تفاصيل الشكوى</h1>
            </div>
            <div className="bg-white mt-10 px-2 text-right rounded-sm dark:border-[#363D3E] dark:bg-[#191A1A]">
                <h2 className="text-2xl py-5 border-b border-[#f3f2f9] dark:border-[#363D3E] dark:bg-[#191A1A] dark:text-white">البيانات</h2>
                {isLoading ? <div className="mt-5">
                    <Skeleton count={1} className="dark:[--base-color:_#202020_!important] mb-5 dark:[--highlight-color:_#444_!important]" height={20} width={160}/>
                    <Skeleton count={1} className="dark:[--base-color:_#202020_!important] mb-5 dark:[--highlight-color:_#444_!important]" height={20} width={140}/>
                    <Skeleton count={1} className="dark:[--base-color:_#202020_!important] mb-5 dark:[--highlight-color:_#444_!important]" height={20} width={280}/>
                    <Skeleton count={1} className="dark:[--base-color:_#202020_!important] mb-5 dark:[--highlight-color:_#444_!important]" height={20} width={260}/>
                    <Skeleton count={1} className="dark:[--base-color:_#202020_!important] mb-5 dark:[--highlight-color:_#444_!important]" height={20} width={400}/>
                    <Skeleton count={1} className="dark:[--base-color:_#202020_!important] mb-5 dark:[--highlight-color:_#444_!important]" height={20} width={300}/>
                    <Skeleton count={1} className="dark:[--base-color:_#202020_!important] mb-5 dark:[--highlight-color:_#444_!important]" height={20} width={260}/>
                    <Skeleton count={1} className="dark:[--base-color:_#202020_!important] mb-5 dark:[--highlight-color:_#444_!important]" height={20} width={240}/>
                    <Skeleton count={1} className="dark:[--base-color:_#202020_!important] mb-5 dark:[--highlight-color:_#444_!important]" height={20} width={530}/>
                </div> : <div className="py-5 text-sm dark:text-[#EEE]">
                    <p className="mb-5">رقم الشكوى : <span className="text-[#666] dark:text-[#acabab]">{id}</span></p>
                    <p className="mb-5">تم الانشاء في : <span className="text-[#666] dark:text-[#acabab]">{dateFormater(data.createdAt)}</span></p>
                    <p className="mb-5">اخر تحديث في : <span className="text-[#666] dark:text-[#acabab]">{dateFormater(data.updatedAt)}</span></p>
                    <p className="mb-5">اسم القائم على الشكوى : <span className="text-[#666] dark:text-[#acabab]">{data.citizenName}</span></p>
                    <p className="mb-5">رقم الهاتف للقائم على الشكوى :<span className="text-[#666] dark:text-[#acabab]">{data.contactInfo}</span></p>
                    <p className="mb-5">موضوع الشكوى : <span className="text-[#666] dark:text-[#acabab]">{data.title}</span></p>
                    <p className="mb-5">وصف الشكوى : <span className="text-[#666] dark:text-[#acabab]">{data.description}</span></p>
                    <p className="mb-5">المحافظة : <span className="text-[#666] dark:text-[#acabab]">{data.governorateName}</span></p>
                    <p className="mb-5">المدينة : <span className="text-[#666] dark:text-[#acabab]">{data.cityName}</span></p>
                    <p className="mb-5">القسم : <span className="text-[#666] dark:text-[#acabab]">{departmentMapper(data.department)}</span></p>
                    <p className="mb-5">استلمها : <span className="text-[#666] dark:text-[#acabab]">{data.assignedEmployeeName}</span></p>
                    <p className="mb-5">الحالة : <span style={{ color: statusColor }}>{statusText}</span></p>
                </div>}
            </div>
            <div className="bg-white mt-5 px-2 text-right rounded-sm dark:border-[#363D3E] dark:bg-[#191A1A]">
                <h2 className="text-2xl py-5 border-b border-[#f3f2f9] dark:border-[#363D3E] dark:bg-[#191A1A] dark:text-white">مكان البلاغ</h2>
                {isLoading ? <Skeleton count={1} className="dark:[--base-color:_#202020_!important] mt-5 dark:[--highlight-color:_#444_!important]" height={424} width="100%"/> : <div className="mt-5 h-[400px] rounded-md overflow-hidden">
                    <MapContainer
                        center={[data.latitude, data.longitude]}
                        zoom={13}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[data.latitude, data.longitude]}>
                            <Popup>
                                <div className="text-sm">
                                    <p>بلاغ: {data.title}</p>
                                    <p>وصف: {data.description}</p>
                                </div>
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>}
                </div>
        </div>
    )
}