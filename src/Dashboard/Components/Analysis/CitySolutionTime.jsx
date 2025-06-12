import { useState, useEffect, useRef } from "react";
import ReactApexChart from "react-apexcharts";

export default function CitySolutionTime() {
  const chartRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const chartData = {
    series: [{
      data: [30, 20, 30, 40, 100, 90, 70, 80, 90, 100 , 40 , 60 ]
    }],
    options: {
      colors: ['#725DFE'],
      chart: {
        type: 'bar',
        height: 350,
        animations: {
          enabled: true,
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: 'end',
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['مدينة نصر', 'التجمع الخامس', 'المعادي', 'مصر الجديدة', 'الزمالك', 'العباسية', 'شبرا', 'حلوان', 'المرج', 'عين شمس', 'الهرم', 'إمبابة']
      ,
      title: {
            text: "الدقائق",
        },
      }
      
    },
  };

  useEffect(() => {
    const currentRef = chartRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div ref={chartRef}>
      <div className="bg-white dark:bg-[#191A1A] rounded-md px-2 py-4">
        <h1 className="w-fit text-xl relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:dark:bg-[#363D3E] before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] after:right-0 dark:text-white">
          متوسط مدة الحل لكل مدينة
        </h1>
        <div className="mt-10 h-full">
          {isVisible && (
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type="bar"
              height={350}
            />
          )}
        </div>
      </div>
    </div>
  );
}
