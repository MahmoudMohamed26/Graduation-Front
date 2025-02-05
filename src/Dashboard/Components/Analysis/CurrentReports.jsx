import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function CurrentReports() {
    // eslint-disable-next-line
    const [state, setState] = useState({
        options: {
        colors: ['#725DFE'],
        chart: {
            type: "area",
            height: 350,
            zoom: {
            enabled: false,
            },
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: "straight",
        },
        labels: ["Sep 24", "Oct 24", "Nov 24", "Dec 24", "Jan 25", "Feb 25", "Mar 25"],
        xaxis: {
            title: {
            text: "الشهر",
            },
        },
        yaxis: {
            max: 100,
            min: 0,
            title: {
                text: "عدد الشكاوي",
            },
        },
        },
        series: [
        {
            name: "Reports",
            data: [40, 60, 40, 80, 60, 50, 70],
        },
        ],
    });

    return (
        <div>
            <div id="chart" className="bg-white rounded-md px-2 py-4">
                <h1 className="w-fit text-xl relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] after:right-0">معدل الشكاوي</h1>
                <div className="mt-10"><ReactApexChart options={state.options} series={state.series} type="area" height={350} /></div>
            </div>
            <div id="html-dist"></div>
        </div>
    );
}
