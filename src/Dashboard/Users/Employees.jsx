import Table from "../Components/Table"
export default function Employees(){
    const headers = [{
        name: 'الأسم',
        key: 'name',
    },{
        name: 'الرقم القومي',
        key: 'natinalId',
    },{
        name: 'البريد الألكتروني',
        key: 'email',
    },{
        name: 'رقم الهاتف',
        key: 'phone',
    },{
        name: 'المحافظة',
        key: 'governorate',
    },{
        name: 'المدينة',
        key: 'city',
    },{
        name: 'القسم',
        key: 'department',
    }]
    const data = [
        {
            name: 'أحمد علي',
            natinalId: '12345678901234',
            email: 'ahmed.ali@gmail.com',
            governorate: 'القاهرة',
            city: 'مدينة نصر',
            department: 'الكهرباء',
            phone: '01012345678',
        },
        {
            name: 'سارة محمود',
            natinalId: '23456789012345',
            email: 'sara.mahmoud@gmail.com',
            governorate: 'الإسكندرية',
            city: 'سموحة',
            department: 'الماء',
            phone: '01023456789',
        },
        {
            name: 'خالد حسن',
            natinalId: '34567890123456',
            email: 'khaled.hassan@gmail.com',
            governorate: 'الجيزة',
            city: '6 أكتوبر',
            department: 'الاتصالات',
            phone: '01034567890',
        },
        {
            name: 'نور محمد',
            natinalId: '45678901234567',
            email: 'nour.mohamed@gmail.com',
            governorate: 'القليوبية',
            city: 'بنها',
            department: 'الغاز',
            phone: '01045678901',
        },
        {
            name: 'محمود عبد الله',
            natinalId: '56789012345678',
            email: 'mahmoud.abdullah@gmail.com',
            governorate: 'المنوفية',
            city: 'شبين الكوم',
            department: 'الكهرباء',
            phone: '01056789012',
        },
        {
            name: 'منى حسن',
            natinalId: '67890123456789',
            email: 'mona.hassan@gmail.com',
            governorate: 'الدقهلية',
            city: 'المنصورة',
            department: 'الماء',
            phone: '01067890123',
        },
        {
            name: 'ياسر إبراهيم',
            natinalId: '78901234567890',
            email: 'yasser.ibrahim@gmail.com',
            governorate: 'أسيوط',
            city: 'أسيوط',
            department: 'الاتصالات',
            phone: '01078901234',
        },
        {
            name: 'فاطمة يوسف',
            natinalId: '89012345678901',
            email: 'fatma.youssef@gmail.com',
            governorate: 'الفيوم',
            city: 'الفيوم',
            department: 'الغاز',
            phone: '01089012345',
        },
        {
            name: 'حسام صالح',
            natinalId: '90123456789012',
            email: 'hossam.salem@gmail.com',
            governorate: 'الإسماعيلية',
            city: 'الإسماعيلية',
            department: 'الكهرباء',
            phone: '01090123456',
        },
        {
            name: 'سلمى عادل',
            natinalId: '01234567890123',
            email: 'salma.adel@gmail.com',
            governorate: 'السويس',
            city: 'السويس',
            department: 'الماء',
            phone: '01001234567',
        },
        {
            name: 'فهد سامي',
            natinalId: '12345098765432',
            email: 'fahd.sami@gmail.com',
            governorate: 'أسوان',
            city: 'أسوان',
            department: 'الاتصالات',
            phone: '01012345098',
        },
        {
            name: 'علي إبراهيم',
            natinalId: '23456198765432',
            email: 'ali.ibrahim@gmail.com',
            governorate: 'القاهرة',
            city: 'الزمالك',
            department: 'الغاز',
            phone: '01023456198',
        },
        {
            name: 'مريم مصطفى',
            natinalId: '34567234567890',
            email: 'mariam.mostafa@gmail.com',
            governorate: 'الإسكندرية',
            city: 'الإسكندرية',
            department: 'الكهرباء',
            phone: '01034567234',
        },
        {
            name: 'طارق مصطفى',
            natinalId: '45678345678901',
            email: 'tareq.mostafa@gmail.com',
            governorate: 'دمياط',
            city: 'دمياط',
            department: 'الماء',
            phone: '01045678345',
        },
        {
            name: 'عبد الله محمد',
            natinalId: '56789456789012',
            email: 'abdallah.mohamed@gmail.com',
            governorate: 'الجيرة',
            city: 'الشيخ زايد',
            department: 'الاتصالات',
            phone: '01056789456',
        },
        {
            name: 'عادل حسين',
            natinalId: '67890567890123',
            email: 'adel.hossain@gmail.com',
            governorate: 'البحيرة',
            city: 'دمنهور',
            department: 'الغاز',
            phone: '01067890567',
        },
        {
            name: 'أميرة سامي',
            natinalId: '78901678901234',
            email: 'amira.samy@gmail.com',
            governorate: 'المنيا',
            city: 'المنيا',
            department: 'الكهرباء',
            phone: '01078901678',
        },
        {
            name: 'سليم حسام',
            natinalId: '89012789012345',
            email: 'salim.hossam@gmail.com',
            governorate: 'أسيوط',
            city: 'أسيوط',
            department: 'الماء',
            phone: '01089012789',
        },
        {
            name: 'نورا إبراهيم',
            natinalId: '90123890123456',
            email: 'nora.ibrahim@gmail.com',
            governorate: 'الشرقية',
            city: 'الزقازيق',
            department: 'الاتصالات',
            phone: '01090123890',
        },
        {
            name: 'محمود سعيد',
            natinalId: '01234901234567',
            email: 'mahmoud.said@gmail.com',
            governorate: 'البحر الأحمر',
            city: 'الغردقة',
            department: 'الغاز',
            phone: '01001234901',
        }
    ];
    
    
    
    return(
        <div>
            <div className="flex">
                <h1 className="w-fit text-4xl relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] after:right-0">الموظفين</h1>
            </div>
            <div className="mt-10">
                <Table headers={headers} data={data} />
            </div>
        </div>
    )
}