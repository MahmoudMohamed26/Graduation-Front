import { useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function DepartReports(){
    // eslint-disable-next-line
    const [state, setState] = useState({
        series: [
          {
            name: 'شكاوي الاقسام',
            data: [
              {
                x: 'Electricity',
                y: 80,
                goals: [
                  {
                    name: 'Expected',
                    value: 60,
                    strokeHeight: 5,
                    strokeColor: '#146C43'
                  }
                ]
              },
              {
                x: 'Water',
                y: 45,
                goals: [
                  {
                    name: 'Expected',
                    value: 30,
                    strokeHeight: 5,
                    strokeColor: '#146C43'
                  }
                ]
              },
              {
                x: 'Sanitation',
                y: 55,
                goals: [
                  {
                    name: 'Expected',
                    value: 45,
                    strokeHeight: 5,
                    strokeColor: '#146C43'
                  }
                ]
              },
              {
                x: 'Environment',
                y: 65,
                goals: [
                  {
                    name: 'Expected',
                    value: 60,
                    strokeHeight: 5,
                    strokeColor: '#146C43'
                  }
                ]
              },
              {
                x: 'Telecom',
                y: 75,
                goals: [
                  {
                    name: 'Expected',
                    value: 80,
                    strokeHeight: 5,
                    strokeColor: '#146C43'
                  }
                ]
              },
              {
                x: 'Housing',
                y: 70,
                goals: [
                  {
                    name: 'Expected',
                    value: 75,
                    strokeHeight: 5,
                    strokeColor: '#146C43'
                  }
                ]
              },
              {
                x: 'Complaints',
                y: 80,
                goals: [
                  {
                    name: 'Expected',
                    value: 85,
                    strokeHeight: 5,
                    strokeColor: '#146C43'
                  }
                ]
              },
              {
                x: 'Transport',
                y: 60,
                goals: [
                  {
                    name: 'Expected',
                    value: 50,
                    strokeHeight: 5,
                    strokeColor: '#146C43'
                  }
                ]
              }
            ]
          }
        ],
        options: {
          chart: {
            height: 350,
            type: 'bar',
            direction: 'rtl'
          },
          plotOptions: {
            bar: {
              columnWidth: '60%',
              borderRadius: 2,
            }
          },
          colors: ['#725DFE'],
          dataLabels: {
            enabled: false
          },
          legend: {
            show: true,
            showForSingleSeries: true,
            customLegendItems: ['الفعلي', 'المتوقع'],
            markers: {
              fillColors: ['#725DFE', '#146C43']
            }
          },
          yaxis: {
            max: 100,
          }
        }
      });
      
        
    return(
        <div>
            <div id="chart" className="bg-white rounded-md px-2 py-4">
                <h1 className="w-fit text-xl relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] after:right-0">معدل شكاوي الاقسام</h1>
                <div className="mt-10"><ReactApexChart options={state.options} series={state.series} type="bar" height={350} /></div>
            </div>
            <div id="html-dist"></div>
        </div>
    )
}