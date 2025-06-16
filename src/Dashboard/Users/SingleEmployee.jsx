import { useParams } from "react-router-dom";
import { Axios } from "../../API/Axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CiWarning } from "react-icons/ci";
import Skeleton from "react-loading-skeleton";
import departmentMapper from "../../helpers/DepartmentMapper";
import EmpStats from "../Components/Analysis/EmpStats";
import { FaCar, FaRegStar } from "react-icons/fa";
import { LuLoader } from "react-icons/lu";
import { IoStop } from "react-icons/io5";
import { MdBlock, MdDone } from "react-icons/md";

export default function SingleEmployee() {
  const { id } = useParams();
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const res = await Axios.get(`/employees/${id}`);
      return res.data;
    } catch (err) {
      setError('لم يتم العثور على الموظف');
    }
  };

  const { data: empData, isLoading: empLoad } = useQuery({
    queryKey: ['employee', id],
    queryFn: fetchData,
    staleTime: 3e3 * 60,
  });

  const fetchEmpStats = async () => {
    if (!empData?.empId) return;
    try {
      const res = await Axios.get(`reports/status/employee/${empData.empId}`);
      return res.data;
    } catch (err) {
      setError('حدث خطأ أثناء تحميل الإحصائيات');
    }
  };

  const { data: empStats, isLoading: empStatsLoad } = useQuery({
    queryKey: ['employeeStats', empData?.empId],
    queryFn: fetchEmpStats,
    staleTime: 3e3 * 60,
    enabled: !!empData?.empId,
  });

  return (
    <div>
      <div className="flex">
        <h1 className="w-fit text-4xl relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] after:right-0 before:dark:bg-[#363D3E] dark:text-[#EEE]">
          تفاصيل الموظف
        </h1>
      </div>

      <div className="bg-white mt-10 px-2 text-right rounded-sm dark:border-[#363D3E] dark:bg-[#191A1A]">
        <h2 className="text-2xl py-5 border-b border-[#f3f2f9] dark:border-[#363D3E] dark:text-white">
          البيانات
        </h2>

        {empLoad || empStatsLoad ? (
          <div className="mt-5">
            <Skeleton height={20} width={160} className="mb-5 dark:[--base-color:_#202020_!important] dark:[--highlight-color:_#444_!important]" />
            <Skeleton height={20} width={140} className="mb-5 dark:[--base-color:_#202020_!important] dark:[--highlight-color:_#444_!important]" />
            <Skeleton height={20} width={280} className="mb-5 dark:[--base-color:_#202020_!important] dark:[--highlight-color:_#444_!important]" />
            <Skeleton height={20} width={260} className="mb-5 dark:[--base-color:_#202020_!important] dark:[--highlight-color:_#444_!important]" />
            <Skeleton height={20} width={400} className="mb-5 dark:[--base-color:_#202020_!important] dark:[--highlight-color:_#444_!important]" />
            <Skeleton height={20} width={300} className="mb-5 dark:[--base-color:_#202020_!important] dark:[--highlight-color:_#444_!important]" />
            <Skeleton height={20} width={260} className="mb-5 dark:[--base-color:_#202020_!important] dark:[--highlight-color:_#444_!important]" />
          </div>
        ) : error ? (
          <p className="py-4 text-sm dark:text-white">{error}</p>
        ) : (
          <div className="py-5 text-sm dark:text-[#EEE]">
            <p className="mb-5">رقم الموظف : <span className="text-[#666] dark:text-[#acabab]">{id}</span></p>
            <p className="mb-5">اسم الموظف : <span className="text-[#666] dark:text-[#acabab]">{empData.fullName}</span></p>
            <p className="mb-5">الرقم القومي : <span className="text-[#666] dark:text-[#acabab]">{empData.nationalId}</span></p>
            <p className="mb-5">البريد الإلكتروني : <span className="text-[#666] dark:text-[#acabab]">{empData.email}</span></p>
            <p className="mb-5">المحافظة : <span className="text-[#666] dark:text-[#acabab]">{empData.governorate}</span></p>
            <p className="mb-5">المدينة : <span className="text-[#666] dark:text-[#acabab]">{empData.city}</span></p>
            <p className="mb-5">القسم : <span className="text-[#666] dark:text-[#acabab]">{departmentMapper(empData.department)}</span></p>
          </div>
        )}
      </div>

      {!error && (
        <>
          <div className="bg-white mt-5 px-2 text-right rounded-sm dark:border-[#363D3E] dark:bg-[#191A1A]">
            <h2 className="text-2xl py-5 border-b border-[#f3f2f9] dark:border-[#363D3E] dark:text-white">
              احصائيات الموظف
            </h2>
          </div>

          {empLoad || empStatsLoad ? (
            <div className="mt-5 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-md">
              <Skeleton count={1} className="dark:[--base-color:_#202020_!important] h-[132px] py-4 dark:[--highlight-color:_#444_!important]" />
              <Skeleton count={1} className="dark:[--base-color:_#202020_!important] h-[132px] py-4 dark:[--highlight-color:_#444_!important]" />
              <Skeleton count={1} className="dark:[--base-color:_#202020_!important] h-[132px] py-4 dark:[--highlight-color:_#444_!important]" />
              <Skeleton count={1} className="dark:[--base-color:_#202020_!important] h-[132px] py-4 dark:[--highlight-color:_#444_!important]" />
              <Skeleton count={1} className="dark:[--base-color:_#202020_!important] h-[132px] py-4 dark:[--highlight-color:_#444_!important]" />
              <Skeleton count={1} className="dark:[--base-color:_#202020_!important] h-[132px] py-4 dark:[--highlight-color:_#444_!important]" />
              <Skeleton count={1} className="dark:[--base-color:_#202020_!important] h-[132px] py-4 dark:[--highlight-color:_#444_!important]" />
            </div>
          ) : (
            <div className="mt-5 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-md">
              <EmpStats 
                title="متوسط التقييم" 
                count={empData?.rating}
                icon={
                  <div className="p-3 bg-orange-100 rounded-full">
                    <FaRegStar className="text-orange-600" size={28} />
                  </div>
                }
              />

              <EmpStats 
                title="جميع الشكاوي المستلمة" 
                count={empStats?.totalCount}
                icon={
                  <div className="p-3 bg-red-100 rounded-full">
                    <CiWarning className="text-red-600" size={28} />
                  </div>
                }
              />

              <EmpStats 
                title="المستلمة" 
                count={empStats?.reportsCount.Submitted}
                icon={
                  <div className="p-3 bg-blue-100 rounded-full">
                    <FaCar className="text-blue-600" size={28} />
                  </div>
                }
              />

              <EmpStats 
                title="قيد التنفيذ" 
                count={empStats?.reportsCount.In_Progress}
                icon={
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <LuLoader className="text-yellow-600" size={28} />
                  </div>
                }
              />

              <EmpStats 
                title="معلقة" 
                count={empStats?.reportsCount.On_Hold}
                icon={
                  <div className="p-3 bg-gray-100 rounded-full">
                    <IoStop className="text-gray-600" size={28} />
                  </div>
                }
              />

              <EmpStats 
                title="تم حلها" 
                count={empStats?.reportsCount.Resolved}
                icon={
                  <div className="p-3 bg-green-100 rounded-full">
                    <MdDone className="text-green-600" size={28} />
                  </div>
                }
              />

              <EmpStats 
                title="تم إلغاءها" 
                count={empStats?.reportsCount.Cancelled}
                icon={
                  <div className="p-3 bg-red-100 rounded-full">
                    <MdBlock className="text-red-600" size={28} />
                  </div>
                }
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
