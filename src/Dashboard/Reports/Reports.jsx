import { useState } from "react";
import Table from "../Components/Table"
export default function Reports(){
    const [status, setStatus] = useState('all');
    const headers = [{
        name: 'العنوان',
        key: 'title',
    },{
        name: 'الوصف',
        key: 'description',
    },{
        name: 'المحافظة',
        key: 'governorate',
    },{
        name: 'المدينه',
        key: 'city',
    },{
        name: 'رقم الهاتف',
        key: 'phone',
    },{
        name: 'القسم',
        key: 'department',
    },{
        name: 'الحاله',
        key: 'status',
    }]
    
    const data = [
        {
            id: 1,
            title: 'مشروع الكهرباء في حي مصر الجديدة',
            description: 'انقطاع الكهرباء المستمر في المنطقة بسبب ضعف المحولات.',
            governorate: 'القاهرة',
            city: 'مصر الجديدة',
            phone: '01012345678',
            department: 'الكهرباء',
            status: 'Completed',
        },
        {
            id: 2,
            title: 'مشروع صيانة شبكات المياه في الجيزة',
            description: 'تسرب المياه في بعض المناطق بسبب تهالك الشبكات.',
            governorate: 'الجيزة',
            city: 'الهرم',
            phone: '01023456789',
            department: 'الماء',
            status: 'In Progress',
        },
        {
            id: 3,
            title: 'تحسين خدمات الإنترنت في الإسماعيلية',
            description: 'تدني سرعة الإنترنت في معظم المناطق بسبب ضغط الشبكة.',
            governorate: 'الإسماعيلية',
            city: 'الإسماعيلية',
            phone: '01034567890',
            department: 'الاتصالات',
            status: 'On Hold',
        },
        {
            id: 4,
            title: 'إمدادات الغاز في مدينة دمياط',
            description: 'انقطاع الغاز في بعض المناطق لفترات طويلة بسبب الأعطال.',
            governorate: 'دمياط',
            city: 'دمياط',
            phone: '01045678901',
            department: 'الغاز',
            status: 'Completed',
        },
        {
            id: 5,
            title: 'مشروع الكهرباء في حي المعادي',
            description: 'الأعطال المتكررة في شبكة الكهرباء تسبب انقطاعات طويلة.',
            governorate: 'القاهرة',
            city: 'المعادي',
            phone: '01056789012',
            department: 'الكهرباء',
            status: 'In Progress',
        },
        {
            id: 6,
            title: 'مشروع تحسين المياه في المنوفية',
            description: 'المياه غير الصالحة للاستخدام بسبب التلوث في بعض المناطق.',
            governorate: 'المنوفية',
            city: 'شبين الكوم',
            phone: '01067890123',
            department: 'الماء',
            status: 'Completed',
        },
        {
            id: 7,
            title: 'توسعة شبكات الإنترنت في الأسكندرية',
            description: 'عدم توفر الإنترنت بسرعة كافية في بعض الأحياء.',
            governorate: 'الإسكندرية',
            city: 'الإسكندرية',
            phone: '01078901234',
            department: 'الاتصالات',
            status: 'On Hold',
        },
        {
            id: 8,
            title: 'شبكة الغاز في منطقة الجيزة',
            description: 'عدم وصول الغاز الطبيعي لبعض المناطق الجديدة.',
            governorate: 'الجيزة',
            city: '6 أكتوبر',
            phone: '01089012345',
            department: 'الغاز',
            status: 'Completed',
        },
        {
            id: 9,
            title: 'مشروع الكهرباء في العبور',
            description: 'زيادة انقطاع الكهرباء بسبب الضغط الزائد على الشبكة.',
            governorate: 'القليوبية',
            city: 'العبور',
            phone: '01090123456',
            department: 'الكهرباء',
            status: 'In Progress',
        },
        {
            id: 10,
            title: 'إمدادات المياه في القاهرة الجديدة',
            description: 'ارتفاع منسوب المياه في بعض الأماكن بسبب مشاكل في الصرف.',
            governorate: 'القاهرة',
            city: 'القاهرة الجديدة',
            phone: '01001234567',
            department: 'الماء',
            status: 'Completed',
        },
        {
            id: 11,
            title: 'توسعة شبكة الإنترنت في أسيوط',
            description: 'الإنترنت غير مستقر في بعض الأحياء مما يسبب انقطاع الخدمة.',
            governorate: 'أسيوط',
            city: 'أسيوط',
            phone: '01012345098',
            department: 'الاتصالات',
            status: 'On Hold',
        },
        {
            id: 12,
            title: 'إمدادات الغاز في منطقة المنيا',
            description: 'عدم وجود شبكة غاز طبيعي في بعض الأحياء الجديدة.',
            governorate: 'المنيا',
            city: 'المنيا',
            phone: '01023456198',
            department: 'الغاز',
            status: 'Completed',
        },
        {
            id: 13,
            title: 'تطوير الكهرباء في قنا',
            description: 'العجز في تزويد الكهرباء للأحياء بسبب نقص المحولات.',
            governorate: 'قنا',
            city: 'قنا',
            phone: '01034567234',
            department: 'الكهرباء',
            status: 'In Progress',
        },
        {
            id: 14,
            title: 'مشروع تحسين المياه في البحر الأحمر',
            description: 'تلوث مياه الشرب في بعض المناطق بسبب ضعف الصرف الصحي.',
            governorate: 'البحر الأحمر',
            city: 'الغردقة',
            phone: '01045678345',
            department: 'الماء',
            status: 'Completed',
        },
        {
            id: 15,
            title: 'توسيع الإنترنت في الجيزة',
            description: 'الإنترنت بطيء وغير مستقر في بعض المناطق بسبب الضغط على الشبكة.',
            governorate: 'الجيزة',
            city: 'الشيخ زايد',
            phone: '01056789456',
            department: 'الاتصالات',
            status: 'On Hold',
        }
    ];    
    
    const filteredData = data.filter((item) => {
        if(status === 'all') return true;
        return item.status.toLowerCase() === status.toLowerCase();
    })
    return(
        <div>
            <div className="flex justify-between items-center">
                <h1 className="w-fit text-4xl relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] after:right-0">البلاغات</h1>
                <div className="relative">
                    <select onChange={(e) => setStatus(e.target.value)} value={status}
                        className="w-[200px] border text-right duration-300  text-sm border-[#e2e6f1] special_shadow rounded-md outline-none  pl-8 pr-3 py-2 transition ease focus:outline-none shadow-sm appearance-none cursor-pointer">
                        <option value="all">جميع الحالات</option>
                        <option value="On Hold">معلق</option>
                        <option value="In Progress">قيد التنفيذ</option>
                        <option value="Completed">مكتمل</option>
                    </select>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute translate-y-1/2 top-1/2 left-2.5 text-slate-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                    </svg>
                </div>
            </div>
            <div className="mt-10">
                <Table headers={headers} data={filteredData} />
            </div>
        </div>
    )
}