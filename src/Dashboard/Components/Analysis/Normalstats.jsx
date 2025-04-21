export default function Normalstats(props){
    return(
        <div className="bg-white dark:bg-[#191A1A] rounded-md py-4 px-3">
            <div className="flex justify-between items-center">
                <h2 className="text-sm text-[#98a5c3] dark:text-white">{props.title}</h2>
                {props.icon}
            </div>
            <div className="mt-2">
                <h3 className="text-4xl font-semiboldbold dark:text-white">{props.count}</h3>
                <p className="mt-4 text-sm">
                    <span className="text-[#98a5c3] dark:text-white">{props.state === "down" ? "قلت" : "زادت"}</span>
                    <span className={`${props.state === "down" ? "text-red-600" : "text-green-600"}`}> {props.percentage}%</span>
                </p>
            </div>
        </div>
    )
}