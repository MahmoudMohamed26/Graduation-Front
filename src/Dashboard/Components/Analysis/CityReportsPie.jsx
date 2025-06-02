import { useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function CityReportsPie() {
  // eslint-disable-next-line
        const [state, setState] = useState({
          
            series: [44, 55, 13, 33, 44, 55, 13, 33, 44, 55, 13, 33],
            options: {
              chart: {
                width: 380,
                type: 'pie',
              },
              dataLabels: {
                enabled: true
              },
              labels: [
              'مدينة نصر', 'تجمع اول', 'تجمع خامس', 'زمالك', 
              'سيدة عيشه', 'عباسية', 'مطرية', 'حدايق القبة', 
              'شبرا مصر', 'عين شمس', 'مصر الجديدة', 'المرج'
              ],
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
            },
          
          
        });
  return(
    <div className="chart-wrap h-full">
      <div id="chart" className="bg-white dark:bg-[#191A1A] rounded-md px-2 py-4 h-full">
        <h1 className="w-fit text-xl relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] mb-[3.45rem] after:right-0 dark:text-white before:dark:bg-[#363D3E]">شكاوي المدن</h1>
        <div className="flex justify-center items-center"><ReactApexChart options={state.options} series={state.series} type="pie" width={420} /></div>
      </div>
    </div>
  )
}