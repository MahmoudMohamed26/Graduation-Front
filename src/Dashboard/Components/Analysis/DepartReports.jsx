import { useMemo, useContext } from "react";
import ReactApexChart from "react-apexcharts";
import { Axios } from "../../../API/Axios";
import { useQuery } from "@tanstack/react-query";
import departmentMapper from "../../../helpers/DepartmentMapper";
import Skeleton from "react-loading-skeleton";
import { AuthContext } from "../../../Context/AuthContext";

export default function DepartReports(props) {
  const { user } = useContext(AuthContext)

  const fetchData = async () => {
    let url = "";
    url = props.type === "gov" ?
    `/init/department/report/numbers/gov/${props.govId !== '' ? props.govId : user?.governorateId}`
    : `/init/department/report/numbers/city/${props.cityId !== '' ? props.cityId : user?.cityId}`
    const res = await Axios(url);
    return res.data;
  };

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["DepartReports", props.govId, props.cityId],
    queryFn: fetchData,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  const chartData = useMemo(() => {
    if (!data || !isSuccess) return [];
    
    // Handle object format (your current data structure)
    if (typeof data === 'object' && !Array.isArray(data)) {
      return Object.entries(data).map(([department, reportCount]) => ({
        x: departmentMapper(department),
        y: reportCount || 0,
      }));
    }
    
    // Handle array format (your previous data structure)
    const raw = Array.isArray(data)
      ? data
      : data?.data && Array.isArray(data.data)
      ? data.data
      : [];

    return raw.map((item) => ({
      x: departmentMapper(item.department),
      y: item.reportCount || 0,
    }));
  }, [data, isSuccess]);

  // Fixed: Separate chartOptions from series data
  const chartOptions = useMemo(() => ({
    chart: {
      type: "bar",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 1200,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
      redrawOnParentResize: true,
      redrawOnWindowResize: true,
    },
    plotOptions: {
      bar: {
        columnWidth: "60%",
        borderRadius: 0,
        dataLabels: {
          position: "top",
        }
      },
    },
    colors: ["#725DFE"],
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
        },
        formatter: (val) => Number.isInteger(val) ? val : "",
      },
    },
    xaxis: {
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    tooltip: {
      enabled: true,
      theme: "dark",
    },
  }), []); // Fixed: Remove chartData dependency to prevent constant re-creation

  // Fixed: Separate series data
  const chartSeries = useMemo(() => ([
    {
      name: "شكاوي الاقسام",
      data: chartData,
    },
  ]), [chartData]);

  if (isLoading) {
    return (
      <Skeleton
        count={1}
        className="dark:[--base-color:_#202020_!important] h-full dark:[--highlight-color:_#444_!important]"
      />
    );
  }

  if (!isSuccess || !data) {
    return (
      <div className="h-full">
        <div className="bg-white dark:bg-[#191A1A] rounded-md px-2 py-4 h-full">
          <h1 className="w-fit text-xl relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:dark:bg-[#363D3E] before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] after:right-0 dark:text-white">
            معدل شكاوي الاقسام
          </h1>
          <p className="text-gray-500 dark:text-gray-400 justify-center flex flex-1 h-full items-center">لا توجد بيانات متاحة</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="bg-white dark:bg-[#191A1A] rounded-md px-2 py-4 h-full">
        <h1 className="w-fit text-xl relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:dark:bg-[#363D3E] before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] after:right-0 dark:text-white">
          معدل شكاوي الاقسام
        </h1>
        <div className="mt-10 flex justify-center items-center">
          <div className="flex-1">
            <ReactApexChart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height={350}
            />
          </div>
        </div>
      </div>
    </div>
  );
}