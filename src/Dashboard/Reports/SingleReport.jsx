import { useParams } from "react-router-dom"

export default function SingleReport(){
    const {id} = useParams()
    return(
        <div>
            <div className="flex">
                <h1 className="w-fit text-4xl relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] after:right-0 before:dark:bg-[#363D3E] dark:text-[#EEE]">تفاصيل الشكوى</h1>
            </div>
            <div className="bg-white mt-10 px-2 text-right rounded-sm dark:border-[#363D3E] dark:bg-[#191A1A]">
                <h2 className="text-2xl py-5 border-b border-[#f3f2f9] dark:border-[#363D3E] dark:bg-[#191A1A] dark:text-white">البيانات</h2>
                <div className="py-5 text-sm dark:text-[#EEE]">
                    <p className="mb-5">رقم البلاغ : <span className="text-[#666] dark:text-[#acabab]">{id}</span></p>
                    <p className="mb-5">اسم القائم على البلاغ : <span className="text-[#666] dark:text-[#acabab]">محمود محمد</span></p>
                    <p className="mb-5">الرقم القومي للقائم على البلاغ : <span className="text-[#666] dark:text-[#acabab]">12345678901234</span></p>
                    <p className="mb-5">عنوان البلاغ : <span className="text-[#666] dark:text-[#acabab]">توسيع الإنترنت في الجيزة</span></p>
                    <p className="mb-5">وصف البلاغ : <span className="text-[#666] dark:text-[#acabab]">الإنترنت بطيء وغير مستقر في بعض المناطق بسبب الضغط على الشبكة</span></p>
                    <p className="mb-5">المحافظة : <span className="text-[#666] dark:text-[#acabab]">الجيزة</span></p>
                    <p className="mb-5">المدينة : <span className="text-[#666] dark:text-[#acabab]">السادس من اكتوبر</span></p>
                    <p className="mb-5">القسم : <span className="text-[#666] dark:text-[#acabab]">الاتصالات</span></p>
                    <p className="mb-5">استلمها : <span className="text-[#666] dark:text-[#acabab]">23456789012345</span></p>
                    <p className="mb-5">الحالة : <span className="text-yellow-600">قيد التنفيذ</span></p>
                </div>
            </div>
        </div>
    )
}