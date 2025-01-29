import Table from "../Components/Table"
export default function CityAdmins(){
    const headers = [{
        name: 'الأسم',
        key: 'name',
    },{
        name: 'البريد الألكتروني',
        key: 'email',
    },{
        name: 'المحافظة',
        key: 'governorate',
    },{
        name: 'المدينة',
        key: 'city',
    }]
    const data = [
        {
            id: 1,
            name: 'أحمد علي',
            email: 'ahmed.ali@gmail.com',
            governorate: 'القاهرة',
            city: 'مدينة نصر',
        },
        {
            id: 2,
            name: 'سارة محمود',
            email: 'sara.mahmoud@gmail.com',
            governorate: 'القاهرة',
            city: 'الشروق',
        },
        {
            id: 3,
            name: 'خالد حسن',
            email: 'khaled.hassan@gmail.com',
            governorate: 'القليوبيه',
            city: 'العبور',
        },
        {
            id: 4,
            name: 'نور محمد',
            email: 'nour.mohamed@gmail.com',
            governorate: 'القليوبيه',
            city: 'بنها',
        }
    ];
    
    return(
        <div>
            <div className="flex">
                <h1 className="w-fit text-4xl relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] after:right-0">مشرفين المدن</h1>
            </div>
            <div className="mt-10">
                <Table headers={headers} data={data} />
            </div>
        </div>
    )
}