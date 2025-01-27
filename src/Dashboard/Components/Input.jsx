export default function Input({label , value , onchange , placeholder}){
    return(
        <>
            <div className="flex-1 mb-1">
            <label className="text-sm">{label}</label>
                <div>
                    <input type="text" className="w-full border text-right duration-300  text-sm py-2 border-[#e2e6f1] special_shadow rounded-md outline-none p-2 my-2" placeholder={placeholder} value={value} onChange={(e) => onchange(e.target.value)} />
                </div>
            </div>
        </>
    )
}