import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { Axios } from "../../../API/Axios";

export default function Normalstats(props){

    const ws = process.env.REACT_APP_WS_URL;
    const stompClient = useRef(null);
    const [count, setCount] = useState(null);

    // Function to fetch initial data
    const fetchInitialData = async () => {
        try {
            const govId = 2;
            const cityId = 46;
            
            const res = await Axios.get(`/reports/analysis/init/report/numbers/${props.type === "gov" ? `gov/${govId}` : `city/${cityId}`}`);
            console.log(res);
            // Set initial count based on endpoint
            let initialCount;
            if (props.what === "resolved") {
                initialCount = res.data.allResolvedReports;
            } else if (props.what === "inprogress") {
                initialCount = res.data.allInProgressReports;
            } else if (props.what === "all") {
                initialCount = res.data.allReports;
            }

            setCount(initialCount);
        } catch (error) {
            console.error("Error fetching initial data:", error);
        }
    };

    useEffect(() => {
        // Fetch initial data first
        fetchInitialData();

        const socket = new SockJS(ws);
        stompClient.current = new Client({
            webSocketFactory: () => socket,

            onConnect: () => {
                const govId = 2;
                const cityId = 46;

                stompClient.current.subscribe(`/topic/${props.endpoint}/${props.type === "gov" ? govId : cityId}`, (message) => {
                    const cityData = JSON.parse(message.body);
                    console.log("reports count per gov", cityData);
                    setCount(cityData);
                });
            },
        });

        stompClient.current.activate();

        return () => {
            if (stompClient.current) stompClient.current.deactivate();
        };
        // eslint-disable-next-line
    }, []);

    return(
        <div className="bg-white dark:bg-[#191A1A] rounded-md py-4 px-3">
            <div className="flex justify-between items-center">
                <h2 className="text-sm text-[#98a5c3] dark:text-white">{props.title}</h2>
                {props.icon}
            </div>
            <div className="mt-2">
                <h3 className="text-4xl font-semiboldbold dark:text-white">{count}</h3>
                <p className="mt-4 text-sm">
                    <span className="text-[#98a5c3] dark:text-white">{props.state === "down" ? "قلت" : "زادت"}</span>
                    <span className={`${props.state === "down" ? "text-red-600" : "text-green-600"}`}> {props.percentage}%</span>
                </p>
            </div>
        </div>
    )
}