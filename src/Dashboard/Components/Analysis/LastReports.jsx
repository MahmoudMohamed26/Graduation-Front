import { Link } from "react-router-dom";
import StatusMapper from "../../../helpers/StatusMapper";
import wordCut from "../../../helpers/WordCut";
import { Axios } from "../../../API/Axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const ws = process.env.REACT_APP_WS_URL;

export default function LastReports(props) {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const stompClient = useRef(null);
  const [newDataIds, setNewDataIds] = useState(new Set());
  
  const fetchData = async () => {
    let url = "";
    url = props.type === "gov"
        ? `/reports/analysis/init/report/top-4-reports/gov/${props.govId !== '' ? props.govId : user?.governorateId}`
        : `/reports/analysis/init/report/top-4-reports/city/${props.cityId !== '' ? props.cityId : user?.cityId}`;

    const res = await Axios.get(url);
    return res.data;
  }
  
  const { data, isLoading } = useQuery({
    queryKey: ['lastReports', props.govId, props.cityId],
    queryFn: fetchData,
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    if (!user) return;

    stompClient.current = new Client({
      webSocketFactory: () => new SockJS(ws),
      onConnect: () => {
        
        let url = "";
        url = props.type === "gov"
          ? `/topic/latestReports/gov/${props.govId !== '' ? props.govId : user?.governorateId}`
          : `/topic/latestReports/city/${props.cityId !== '' ? props.cityId : user?.cityId}`;

        const subscription = stompClient.current.subscribe(url, (message) => {
          try {
            const newData = JSON.parse(message.body);
            
            const currentData = queryClient.getQueryData(['lastReports', props.govId, props.cityId]) || [];
            const currentIds = new Set(currentData.map(item => item.reportId));
            
            const newIds = new Set();
            newData.forEach(item => {
              if (!currentIds.has(item.reportId)) {
                newIds.add(item.reportId);
              }
            });
            
            setNewDataIds(prev => new Set([...prev, ...newIds]));
            
            queryClient.setQueryData(['lastReports', props.govId, props.cityId], newData);
            
            if (newIds.size > 0) {
              setTimeout(() => {
                setNewDataIds(prev => {
                  const updated = new Set(prev);
                  newIds.forEach(id => updated.delete(id));
                  return updated;
                });
              }, 5000);
            }
            
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        });

        stompClient.current.subscription = subscription;
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame);
      },
      onWebSocketError: (error) => {
        console.error('WebSocket error:', error);
      }
    });

    stompClient.current.activate();

    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate();
      }
    };
    // eslint-disable-next-line
  }, [props.type, props.govId, props.cityId, user?.governorateId, user?.cityId]);
  
  if (isLoading) {
    return <Skeleton count={1} className="dark:[--base-color:_#202020_!important] h-[493px] py-4 dark:[--highlight-color:_#444_!important]"/>
  }

  const isEmpty = !data || data.length === 0;

  const showData = (data || []).map((el, index) => {
    const {text, color} = StatusMapper(el?.currentStatus);
    const isNew = newDataIds.has(el?.reportId);
    
    return (
      <Link key={index} className={`block px-2 py-5 dark:hover:bg-[#121313] duration-300 hover:bg-gray-100 relative ${isNew ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`} to={`/dashboard/reports/${el?.reportId}`}>
        <div className="flex justify-between">
          <div>
            <h3 className="text-xs">رقم الشكوى: <span className="text-[#666] dark:text-[#acabab]">{el?.reportId}</span></h3>
            <h3 className="text-xs mt-2">عنوان الشكوى: <span className="text-[#666] dark:text-[#acabab]">{el?.title}</span></h3>
            <p className="text-xs">تفاصيل الشكوى: <span className="text-[#666] dark:text-[#acabab]">{wordCut(el?.description, 40)}</span></p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-xs">الحاله: <span style={{color: color}}>{text}</span></p>
            {isNew && (
              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded mt-1 animate-pulse">
                جديد
              </span>
            )}
          </div>
        </div>
      </Link>
    )
  });

  return (
    <div className="bg-white dark:bg-[#191A1A] rounded-md pt-4 min-h-[493px] h-full flex flex-col">
      <h1 className="w-fit text-2xl mx-2 relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:dark:bg-[#363D3E] before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] dark:text-white after:bottom-[-15px] after:right-0">اخر الشكاوي</h1>
      
      <div className="mt-5 flex-1 flex flex-col text-black dark:text-white">
        <div className="flex-1">
          {isEmpty ? 
            <p className="text-sm h-full flex items-center justify-center text-gray-500 dark:text-gray-400">لا يوجد شكاوي</p> 
            : showData
          }
        </div>
        <Link to="/dashboard/reports" className="hover:bg-[#604CC7] text-center text-white px-4 bg-[#725DFE] w-full duration-300 rounded-b-md py-[0.54rem] mt-auto">جميع الشكاوي</Link>
      </div>
    </div>
  )
}