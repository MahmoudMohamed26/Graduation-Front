import React, { useState, useEffect, useContext, useRef } from "react";
import ReactApexChart from "react-apexcharts";
import { Axios } from "../../../API/Axios";
import Skeleton from "react-loading-skeleton";
import { AuthContext } from "../../../Context/AuthContext";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const ws = process.env.REACT_APP_WS_URL;

export default function CurrentReports(props) {
    const [state, setState] = useState({
        series: [],
        options: {
            colors: ["#725DFE"],
            chart: {
                id: "area-datetime",
                type: "area",
                height: 350,
                zoom: {
                    autoScaleYaxis: true,
                },
            },
            dataLabels: {
                enabled: false,
            },
            markers: {
                size: 0,
                style: "hollow",
            },
            xaxis: {
                type: "datetime",
                tickAmount: 6,
                labels: {
                    format: "MMM",
                },
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return Math.floor(value);
                    },
                },
                forceNiceScale: true,
                decimalsInFloat: 0,
            },
            tooltip: {
                x: {
                    format: "dd MMM yyyy",
                },
                y: {
                    formatter: function (value) {
                        return Math.floor(value) + " reports";
                    },
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.9,
                    stops: [0, 100],
                },
            },
        },
        selection: "one_year",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const stompClientRef = useRef(null);
    const subscriptionRef = useRef(null);

    const transformData = (reportsData) => {
        return reportsData?.map((item) => [
            new Date(item.date).getTime(),
            item.reportCount,
        ]);
    };

    const updateChartData = (data) => {
        const transformedData = transformData(data);
        setState((prevState) => ({
            ...prevState,
            series: [
                {
                    data: transformedData,
                },
            ],
        }));
    };

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const url = props.type === "gov"
                ? `/reports/analysis/init/report/count/per-day/gov/${props.govId !== '' ? props.govId : user?.governorateId}`
                : `/reports/analysis/init/report/count/per-day/city/${props.cityId !== '' ? props.cityId : user?.cityId}`;
                
            const response = await Axios.get(url);
            const reportsData = response.data;
            
            updateChartData(reportsData);

        } catch (err) {
            console.error("Error fetching initial data:", err);
            setError(err.message || "An error occurred while fetching data");
        } finally {
            setLoading(false);
        }
    };

    const setupWebSocketConnection = () => {
        try {

            const socketFactory = () => new SockJS(ws);
            
            const stompClient = Stomp.over(socketFactory);
            
            stompClient.debug = () => {};
            
            stompClient.connect({}, 
                (frame) => {
                    
                    const topic = props.type === "gov" 
                        ? `/topic/ReportsPerDepartment/gov/${props.govId !== '' ? props.govId : user?.governorateId}`
                        : `/topic/ReportsPerDepartment/city/${props.cityId !== '' ? props.cityId : user?.cityId}`;
                    
                    const subscription = stompClient.subscribe(topic, (message) => {
                        try {
                            const newData = JSON.parse(message.body);
                            updateChartData(newData);
                        } catch (parseError) {
                            console.error("Error parsing WebSocket message:", parseError);
                        }
                    });
                    
                    subscriptionRef.current = subscription;
                },
                (error) => {
                    console.error("WebSocket connection error:", error);
                }
            );
            
            stompClientRef.current = stompClient;
            
        } catch (connectionError) {
            console.error("Failed to setup WebSocket connection:", connectionError);
        }
    };

    const cleanupWebSocketConnection = () => {
        if (subscriptionRef.current) {
            subscriptionRef.current.unsubscribe();
            subscriptionRef.current = null;
        }
        
        if (stompClientRef.current && stompClientRef.current.connected) {
            stompClientRef.current.disconnect();
            stompClientRef.current = null;
        }
    };

    useEffect(() => {
        fetchInitialData();
        
        setupWebSocketConnection();
        
        return () => {
            cleanupWebSocketConnection();
        };
        // eslint-disable-next-line
    }, [props.cityId, props.govId, props.type, user?.governorateId, user?.cityId]);

    useEffect(() => {
        return () => {
            cleanupWebSocketConnection();
        };
    }, []);

    if (loading) {
        return (
            <Skeleton count={1} className="dark:[--base-color:_#202020_!important] h-full py-4 dark:[--highlight-color:_#444_!important]"/>
        );
    }

    if (error) {
        return (
            <div className="h-full">
                <div className="bg-white h-full dark:bg-[#191A1A] rounded-md px-2 py-4">
                    <h1 className="w-fit text-xl relative before:absolute before:h-[1px] before:w-[100%] before:bg-slate-300 before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] after:right-0 dark:text-white before:dark:bg-[#363D3E]">
                        معدل الشكاوي
                    </h1>
                    <div className="h-full flex justify-center items-center flex-1">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="text-red-500 text-4xl">⚠️</div>
                            <p className="text-red-500 text-center">
                                Error loading data: {error}
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 bg-[#725DFE] text-white rounded hover:bg-[#5a4acc] transition-colors"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full">
            <div className="bg-white h-full dark:bg-[#191A1A] rounded-md px-2 py-4">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="w-fit text-xl relative before:absolute before:h-[1px] before:w-[100%] before:bg-slate-300 before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] after:right-0 dark:text-white before:dark:bg-[#363D3E]">
                        معدل الشكاوي
                    </h1>
                </div>
                <div className="h-full flex justify-center items-center flex-1">
                    <div className="flex-1">
                        <ReactApexChart
                            options={state.options}
                            series={state.series}
                            type="area"
                            height={350}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}