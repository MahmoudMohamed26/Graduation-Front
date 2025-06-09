import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export default function Normalstats(props){

    const ws = process.env.REACT_APP_WS_URL;
    const stompClient = useRef(null);
    const [count, setCount] = useState(null);
    useEffect(() => {
    const socket = new SockJS(ws);
    stompClient.current = new Client({
    webSocketFactory: () => socket,


    onConnect: () => {

    const dummyReport = {
        title: "Dummy Report Title",
        contactInfo: "01000000000",
        cityId: 46,
        description: "This is a dummy report for testing.",
        latitude: 30.1234,
        longitude: 31.5678,
        department: "Housing_and_Utilities_Department",
        citizenId: 123
    };

    const update = {
        reportId: 381,
        newStatus: "In_Progress",
        notes: "This is a dummy update for testing.",
        employeeId: 349
    }

    // const dummyReport = null

    const govId = 2
    const cityId = 46

    stompClient.current.publish({
        destination: `/app/${props.dest}`,
        body: JSON.stringify(props.dest === "createReport" ? dummyReport : update),
    });
    stompClient.current.subscribe(`/topic/${props.endpoint}/${props.type === "gov" ? govId : cityId}`, (message) => {
        const cityData = JSON.parse(message.body);
        console.log("reports count per gov", cityData);
        setCount(cityData)
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