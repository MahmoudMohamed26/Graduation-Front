import React, { useState, useEffect, useRef, useContext } from "react";
import ReactApexChart from "react-apexcharts";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { AuthContext } from "../../../Context/AuthContext";
import { Axios } from "../../../API/Axios";
import Skeleton from "react-loading-skeleton";

const ws = process.env.REACT_APP_WS_URL;

export default function CityReportsPie(props) {
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);
    const [load , setLoad] = useState(true)
  const { user } = useContext(AuthContext);

  const stompClient = useRef(null);

  // Function to fetch initial data
  const fetchInitialData = async () => {
    try {
      setLoad(true)
      let id = ""
      let url = ""
      if(props.type === "gov"){
        id = props.govId !== '' ? props.govId : user?.governorateId;
        url = `/reports/analysis/init/report/pie-chart/gov/${id}`;
      } else if (props.type === "city"){
        id = props.cityId !== '' ? props.cityId : user?.cityId;
        url = `/reports/analysis/init/report/pie-chart/city/${id}`;
      }
      
      const res = await Axios.get(url);
      const cityData = res.data;
      
      // Extract labels and series from the response
      const newLabels = cityData.map(item => item.cityName);
      const newSeries = cityData.map(item => item.reportCount);

      setLabels(newLabels);
      setSeries(newSeries);
      setLoad(false)
    } catch (error) {
      console.error("Error fetching initial pie chart data:", error);
    }
  };

  useEffect(() => {
    // Fetch initial data
    fetchInitialData();

    // Setup WebSocket connection
    const socket = new SockJS(ws);
    stompClient.current = new Client({
      webSocketFactory: () => socket,

      onConnect: () => {
        const govId = props.govId !== '' ? props.govId : user?.governorateId;
        
        // Subscribe to real-time updates
        stompClient.current.subscribe(`/topic/reportsCountPerCitiesInGovernorate/${govId}`, (message) => {
          const cityData = JSON.parse(message.body);
          
          const newLabels = cityData.map(item => item.cityName);
          const newSeries = cityData.map(item => item.reportCount);

          setLabels(newLabels);
          setSeries(newSeries);
        });
      },
    });

    stompClient.current.activate();

    return () => {
      if (stompClient.current) stompClient.current.deactivate();
    };
    // eslint-disable-next-line
  }, [props.govId, user?.governorateId]);

  const options = {
    chart: {
      width: 380,
      type: 'pie',
    },
    dataLabels: {
      enabled: true
    },
    labels: labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 350
          },
          legend: {
            show: true
          }
        }
      },
      {
        breakpoint: 1150,
        options: {
          chart: {
            width: 320,
          }
        }
      }
    ],
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      offsetY: 0,
      offsetX: 0,
      fontSize: '14px',
      height: 50,
    }
  };

  return (
    load ? <Skeleton count={1} className="dark:[--base-color:_#202020_!important] h-[493px] py-4 dark:[--highlight-color:_#444_!important]"/> : <div className="chart-wrap h-full">
      <div id="chart" className="bg-white dark:bg-[#191A1A] rounded-md px-2 py-4 h-full">
        <h1 className="w-fit text-xl relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] mb-[3.45rem] after:right-0 dark:text-white before:dark:bg-[#363D3E]">شكاوي المدن</h1>
        <div className="flex justify-center items-center">
          <ReactApexChart options={options} series={series} type="pie" width={420} />
        </div>
      </div>
    </div>
  );
}