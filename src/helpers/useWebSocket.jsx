import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export default function useWebSocket(onConnect) {
    const ws = process.env.REACT_APP_WS_URL;
    const stompClient = useRef(null);

    useEffect(() => {
        const socket = new SockJS(ws);
        stompClient.current = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                if (onConnect && typeof onConnect === "function") {
                    onConnect(stompClient.current);
                }
            },
        });

        stompClient.current.activate();

        return () => {
            if (stompClient.current) stompClient.current.deactivate();
        };
        // eslint-disable-next-line
    }, [onConnect]);

    return stompClient;
}