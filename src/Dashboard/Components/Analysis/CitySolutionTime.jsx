import { useMemo, useContext } from "react";
import ReactApexChart from "react-apexcharts";
import { Axios } from "../../../API/Axios";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import { AuthContext } from "../../../Context/AuthContext";

export default function CitySolutionTime(props) {
  const { user } = useContext(AuthContext);

  const fetchData = async () => {
    let url = "";
    url = `/reports/analysis/init/report/cities/avg-time/gov/${props.govId !== '' ? props.govId : user?.governorateId}`

    const res = await Axios(url);
    return res.data;
  };

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["CitySolutionTime", props.govId, props.cityId],
    queryFn: fetchData,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  const chartData = useMemo(() => {
    if (!data || !isSuccess || !Array.isArray(data)) return [];

    const processedData = data.map((item) => ({
      y: parseFloat(item.averageTime) || 0,
      x: item.city || 'Unknown City'
    }));
    return processedData;
  }, [data, isSuccess]);

  // Fixed: Static chart options without dependencies
  const chartOptions = useMemo(() => ({
    chart: {
      type: "bar",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 1700,
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
        borderRadius: 4,
        borderRadiusApplication: 'end',
        horizontal: true,
        dataLabels: {
          position: "center",
        }
      },
    },
    colors: ["#725DFE"],
    dataLabels: {
      enabled: true,
      formatter: function(val) {
        return val.toFixed(1) + ' ساعة';
      },
      style: {
        fontSize: '12px',
        colors: ['#fff']
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    xaxis: {
      labels: {
        style: {
          fontSize: "12px",
        },
        formatter: (val) => {
          return typeof val === 'number' ? val.toFixed(1) : val;
        },
      },
      title: {
        text: "الساعات",
      },
      min: 0,
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      y: {
        formatter: function(val) {
          return val.toFixed(1) + ' ساعة';
        }
      }
    },
  }), []); // No dependencies to prevent recreation

  // Fixed: Separate series data that updates when chartData changes
  const chartSeries = useMemo(() => ([
    {
      name: "متوسط مدة الحل",
      data: chartData,
    }
  ]), [chartData]);

  if (isLoading) {
    return (
      <Skeleton
        count={1}
        className="dark:[--base-color:_#202020_!important] h-[450px] dark:[--highlight-color:_#444_!important]"
      />
    );
  }

  if (!isSuccess || !data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="min-h-[450px]">
        <div className="bg-white dark:bg-[#191A1A] rounded-md px-2 py-4 min-h-[450px]">
          <h1 className="w-fit text-xl relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:dark:bg-[#363D3E] before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] after:right-0 dark:text-white">
          متوسط مدة الحل لكل مدينة
          </h1>
          <p className="text-gray-500 dark:text-gray-400 justify-center flex flex-1 min-h-[450px] items-center">لا توجد بيانات متاحة</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="bg-white dark:bg-[#191A1A] rounded-md px-2 py-4 h-full">
        <h1 className="w-fit text-xl relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:dark:bg-[#363D3E] before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] after:right-0 dark:text-white">
          متوسط مدة الحل لكل مدينة
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