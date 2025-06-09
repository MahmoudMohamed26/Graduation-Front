import React, { useState, useEffect, useRef } from "react";
import ReactApexChart from "react-apexcharts";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const ws = process.env.REACT_APP_WS_URL;

export default function CityReportsPie() {
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);

  const stompClient = useRef(null);

  useEffect(() => {
    const socket = new SockJS(ws);
    stompClient.current = new Client({
  webSocketFactory: () => socket,


  onConnect: () => {

    const dummyReport = {
      title: "Dummy Report Title",
      contactInfo: "01000000000",
      cityId: 45,
      description: "This is a dummy report for testing.",
      latitude: 30.1234,
      longitude: 31.5678,
      department: "Housing_and_Utilities_Department",
      citizenId: 123
    };

    const govId = 2

    stompClient.current.publish({
      destination: "/app/createReport",
      body: JSON.stringify(dummyReport),
    });

    stompClient.current.subscribe(`/topic/reportsCountPerCitiesInGovernorate/${govId}`, (message) => {
      const cityData = JSON.parse(message.body);
      // console.log("Received city data:", cityData);
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
  }, []);

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
    <div className="chart-wrap h-full">
      <div id="chart" className="bg-white dark:bg-[#191A1A] rounded-md px-2 py-4 h-full">
        <h1 className="w-fit text-xl relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] mb-[3.45rem] after:right-0 dark:text-white before:dark:bg-[#363D3E]">شكاوي المدن</h1>
        <div className="flex justify-center items-center"><ReactApexChart options={options} series={series} type="pie" width={420} /></div>
      </div>
    </div>
  );
}
