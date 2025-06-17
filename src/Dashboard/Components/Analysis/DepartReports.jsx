import { useMemo, useContext, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Axios } from "../../../API/Axios";
import { useQuery } from "@tanstack/react-query";
import departmentMapper from "../../../helpers/DepartmentMapper";
import Skeleton from "react-loading-skeleton";
import { AuthContext } from "../../../Context/AuthContext";
import { useWebSocketSubscription } from "../../../Context/WebSocketContex";

export default function DepartReports(props) {
  const { user } = useContext(AuthContext);
  const [realtimeData, setRealtimeData] = useState(null);

  const actualGovId = useMemo(() => {
    return props.govId !== '' ? props.govId : user?.governorateId;
  }, [props.govId, user?.governorateId]);

  const actualCityId = useMemo(() => {
    return props.cityId !== '' ? props.cityId : user?.cityId;
  }, [props.cityId, user?.cityId]);

  const fetchData = async () => {
    let url = "";
    url = props.type === "gov" 
      ? `/init/department/report/numbers/gov/${actualGovId}`
      : `/init/department/report/numbers/city/${actualCityId}`;
    const res = await Axios(url);
    return res.data;
  };

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["DepartReports", props.type, actualGovId, actualCityId],
    queryFn: fetchData,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    enabled: props.type === "gov" ? !!actualGovId : !!actualCityId,
  });

  const wsTopicKey = useMemo(() => {
    if (props.type === "gov") {
      return actualGovId ? `depart-reports-gov-${actualGovId}` : null;
    } else {
      return actualCityId ? `depart-reports-city-${actualCityId}` : null;
    }
  }, [props.type, actualGovId, actualCityId]);

  const wsTopic = useMemo(() => {
    if (props.type === "gov") {
      return actualGovId ? `/topic/ReportsPerDepartment/gov/${actualGovId}` : null;
    } else {
      return actualCityId ? `/topic/ReportsPerDepartment/city/${actualCityId}` : null;
    }
  }, [props.type, actualGovId, actualCityId]);

  const handleWebSocketMessage = useMemo(() => (data, message, error) => {
    if (error) {
      console.error("❌ Error processing WebSocket message for DepartReports:", error);
      return;
    }
    setRealtimeData(data);
  }, []);

  // eslint-disable-next-line
  const { isConnected: wsConnected } = useWebSocketSubscription(
    wsTopic,
    handleWebSocketMessage,
    [props.type, actualGovId, actualCityId],
    wsTopicKey
  );

  const currentData = realtimeData || data;

  const chartData = useMemo(() => {
    if (!currentData || (!isSuccess && !realtimeData)) return [];
    
    if (typeof currentData === 'object' && !Array.isArray(currentData)) {
      const processedData = Object.entries(currentData).map(([department, reportCount]) => ({
        x: departmentMapper(department),
        y: reportCount || 0,
      }));
      return processedData;
    }
    
    const raw = Array.isArray(currentData)
      ? currentData
      : currentData?.data && Array.isArray(currentData.data)
      ? currentData.data
      : [];

    const processedData = raw.map((item) => ({
      x: departmentMapper(item.department),
      y: item.reportCount || 0,
    }));
    return processedData;
  }, [currentData, isSuccess, realtimeData]);

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
  }), []);

  const chartSeries = useMemo(() => ([
    {
      name: "شكاوي الاقسام",
      data: chartData,
    },
  ]), [chartData]);

  if (isLoading && !realtimeData) {
    return (
      <Skeleton
        count={1}
        className="dark:[--base-color:_#202020_!important] h-full dark:[--highlight-color:_#444_!important]"
      />
    );
  }

  if (!isSuccess && !realtimeData) {
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
        <div className="flex justify-between items-center mb-2">
          <h1 className="w-fit text-xl relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:dark:bg-[#363D3E] before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] after:right-0 dark:text-white">
            معدل شكاوي الاقسام
          </h1>
        </div>
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