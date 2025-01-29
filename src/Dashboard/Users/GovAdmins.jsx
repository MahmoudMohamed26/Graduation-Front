import Table from "../Components/Table"
export default function GovAdmins(){
    const headers = [{
        name: 'الأسم',
        key: 'name',
    },{
        name: 'البريد الألكتروني',
        key: 'email',
    },{
        name: 'المحافظة',
        key: 'governorate',
    }]
    const data = [
        {
            id: 1,
            name: 'محمود عبد الله',
            email: 'mahmoud.abdullah@gmail.com',
            governorate: 'القليوبية',
        },
        {
            id: 2,
            name: 'منى حسن',
            email: 'mona.hassan@gmail.com',
            governorate: 'القاهرة',
        },
        {
            id: 3,
            name: 'ياسر إبراهيم',
            email: 'yasser.ibrahim@gmail.com',
            governorate: 'القاهرة',
        },
        {
            id: 4,
            name: 'فاطمة يوسف',
            email: 'fatma.youssef@gmail.com',
            governorate: 'القليوبية',
        },
        {
            id: 5,
            name: 'محمود عبدالله',
            email: 'mahmoud.abdullah@gmail.com',
            governorate: 'القليوبية',
        }
    ];
    
    
    return(
        <div>
            <div className="flex">
                <h1 className="w-fit text-4xl relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] after:right-0">مشرفين المحافظات</h1>
            </div>
            <div className="mt-10">
                <Table headers={headers} data={data} />
            </div>
        </div>
    )
}