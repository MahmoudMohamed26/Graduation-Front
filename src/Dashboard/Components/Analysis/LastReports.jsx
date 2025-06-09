import { Link } from "react-router-dom";
import StatusMapper from "../../../helpers/StatusMapper";
import wordCut from "../../../helpers/WordCut";

export default function LastReports() {

  const data =[
    {
      id: 1,
      title: "تسرب مياه",
      describtion: "بلاغ عن تسرب مياه في الشارع الرئيسي بالقرب من المدرسة",
      status: "Submitted"
    },
    {
      id: 2,
      title: "انقطاع كهرباء",
      describtion: "بلاغ عن انقطاع كهرباء في حي الهرم",
      status: "Submitted"
    },
    {
      id: 3,
      title: "مشكلة في الصرف الصحي",
      describtion: "بلاغ عن مشكلة في الصرف الصحي في منطقة المعادي",
      status: "In_Progress"
    },{
      id: 4,
      title: "تسرب غاز",
      describtion: "بلاغ عن تسرب غاز في منطقة الزمالك",
      status: "Resolved"
    }
  ]

  const showData = data.map((el , index) => {
    const {text, color} = StatusMapper(el.status);
    return(
      <Link key={index} className="block px-2 py-5 dark:hover:bg-[#121313] duration-300 hover:bg-gray-100" to={`/dashboard/reports/209`}>
        <div className="flex justify-between">
          <div>
            <h3 className="text-xs">رقم الشكوى: <span className="text-[#666] dark:text-[#acabab]">{el.id}</span></h3>
            <h3 className="text-xs mt-2">عنوان الشكوى: <span className="text-[#666] dark:text-[#acabab]">{el.title}</span></h3>
            <p className="text-xs">تفاصيل الشكوى: <span className="text-[#666] dark:text-[#acabab]">{wordCut(el.describtion , 20)}</span></p>
          </div>
          <p className="text-xs">الحاله: <span style={{color: color}}>{text}</span></p>
        </div>
      </Link>
    )
  })

  return(
    <div className="bg-white dark:bg-[#191A1A] rounded-md pt-4 w-full">
        <h1 className="w-fit text-2xl mx-2 relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:dark:bg-[#363D3E] before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] dark:text-white after:bottom-[-15px] after:right-0">اخر البلاعات</h1>
        <div className="mt-5">
            <div className="text-black dark:text-white">
                <div >
                  {showData}
                </div>
                <Link to="/dashboard/employees" className="hover:bg-[#604CC7] text-center text-white px-4 bg-[#725DFE] w-full block duration-300 rounded-b-md py-[0.54rem]">جميع البلاغات</Link>
            </div>
        </div>
    </div>
  )
}