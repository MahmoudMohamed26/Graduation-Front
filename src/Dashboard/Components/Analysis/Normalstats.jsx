import { useContext, useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { Axios } from "../../../API/Axios";
import { AuthContext } from "../../../Context/AuthContext";

export default function Normalstats(props){
    const ws = process.env.REACT_APP_WS_URL;
    const stompClient = useRef(null);
    const [count, setCount] = useState(props.initial);
    const { user } = useContext(AuthContext)

    // Function to fetch initial data
    const fetchInitialData = async () => {
        try {
            let url = "";

            if (props.what === "rating") {
            url = props.type === "gov"
                ? `/init/employees/rate/gov/${props.govId !== '' ? props.govId : user?.governorateId}`
                : `/init/employees/rate/city/${props.cityId !== '' ? props.cityId : user?.cityId}`;
            } else {
            url = props.type === "gov"
                ? `/reports/analysis/init/report/numbers/gov/${props.govId !== '' ? props.govId : user?.governorateId}`
                : `/reports/analysis/init/report/numbers/city/${props.cityId !== '' ? props.cityId : user?.cityId}`;
            }
            
            const res = await Axios.get(url);

            // Set initial count based on endpoint
            let initialCount;
            if (props.what === "resolved") {
                initialCount = res.data.allResolvedReports;
            } else if (props.what === "inprogress") {
                initialCount = res.data.allInProgressReports;
            } else if (props.what === "all") {
                initialCount = res.data.allReports;
            } else if (props.what === "rating"){
                initialCount = res.data
            }
            setCount(initialCount);
            props.increment()
        } catch (error) {
            console.error("Error fetching initial data:", error);
        }
    };

    useEffect(() => {
        
        fetchInitialData();

        const socket = new SockJS(ws);
        stompClient.current = new Client({
            webSocketFactory: () => socket,

            onConnect: () => {

                stompClient.current.subscribe(`/topic/${props.endpoint}/${props.type === "gov" ? props.govId !== '' ? props.govId : user?.governorateId : props.cityId !== '' ? props.cityId : user?.cityId}`, (message) => {
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
    }, [props.govId , props.cityId]);

    return(
        <div className="bg-white dark:bg-[#191A1A] rounded-md py-4 px-3">
            <div className="flex justify-between items-center">
                <h2 className="text-sm text-[#98a5c3] dark:text-white">{props.title}</h2>
                {props.icon}
            </div>
            <div className="mt-2">
                <h3 className="text-4xl font-semiboldbold dark:text-white">{count}</h3>
                {/* count !== undefined ? Number(count.toFixed(1)) : '...' */}
            </div>
        </div>
    )
}