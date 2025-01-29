import { useState } from "react";
import Input from "../Components/Input";

export default function AddEmployee() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gov, setGov] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [department, setDepartment] = useState('');
    return (
        <div>
            <div className="flex">
                <h1 className="w-fit text-4xl relative before:absolute before:h-[1px] before:w-[calc(100%)] before:bg-slate-300 before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] after:right-0">اضافة موظف</h1>
            </div>
            <div className="bg-white mt-10 px-2 text-right rounded-sm">
                <h2 className="text-2xl py-5 border-b border-[#f3f2f9]">البيانات</h2>
                <form className="py-5">
                    <div className="flex flex-col lg:flex-row lg:gap-5">
                        <Input label="الأسم الأول" value={firstName} onchange={(e) => setFirstName(e)} placeholder='ادخل الأسم' />
                        <Input label="الأسم الأخير" value={lastName} onchange={(e) => setLastName(e)} placeholder='ادخل الأسم' />
                    </div>
                    <div className="flex flex-col mb-1 lg:items-end lg:flex-row lg:gap-5">
                        <Input label="الرقم القومي" value={email} onchange={(e) => setEmail(e)} placeholder='ادخل الرقم' />
                        <Input label="رقم الهاتف" value={phone} onchange={(e) => setPhone(e)} placeholder='ادخل الرقم' />
                        <div className="relative flex-1 mb-1">
                            <select onChange={(e) => setDepartment(e.target.value)} value={department}
                                className="w-full border text-right duration-300  text-sm border-[#e2e6f1] special_shadow rounded-md outline-none p-2 my-2  pl-8 pr-3 py-2 transition ease focus:outline-none shadow-sm appearance-none cursor-pointer">
                                <option>اختر القسم</option>
                                <option>الكهرباء</option>
                                <option>المياه</option>
                                <option>الغاز</option>
                                <option>الاتصالات</option>
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute translate-y-1/2 top-1/2 left-2.5 text-slate-700">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:gap-5">
                        <Input label="البريد الألكتروني" value={email} onchange={(e) => setEmail(e)} placeholder='example@gmail.com' />
                        <Input label="كلمة السر" value={password} onchange={(e) => setPassword(e)} placeholder='************' />
                    </div>
                    <div className="flex flex-col lg:flex-row-reverse lg:gap-5">
                        <div className="relative flex-1">
                            <select onChange={(e) => setGov(e.target.value)} value={gov}
                                className="w-full border text-right duration-300  text-sm border-[#e2e6f1] special_shadow rounded-md outline-none p-2 my-2  pl-8 pr-3 py-2 transition ease focus:outline-none shadow-sm appearance-none cursor-pointer">
                                <option disabled value=''>اختر المحافظة</option>
                                <option>القليوبية</option>
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute translate-y-1/2 top-1/2 left-2.5 text-slate-700">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </div>
                        {gov !== '' && <div className="relative flex-1">
                            <select onChange={(e) => setCity(e.target.value)} value={city}
                                className="w-full border text-right duration-300  text-sm border-[#e2e6f1] special_shadow rounded-md outline-none p-2 my-2  pl-8 pr-3 py-2 transition ease focus:outline-none shadow-sm appearance-none cursor-pointer">
                                <option disabled value=''>اختر المدينة</option>
                                <option>بنها</option>
                                <option>قليوب</option>
                                <option>القناطر الخيريه</option>
                                <option>شبرا الخيمة</option>
                                <option>الخانكة</option>
                                <option>كفر شكر</option>
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute translate-y-1/2 top-1/2 left-2.5 text-slate-700">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </div>}
                    </div>
                    <div className="mt-5">
                        <button type="submit" className="rounded-[0.2rem] duration-300 hover:bg-[#604CC7] text-white bg-[#725DFE] px-4 py-1">اضافة الموظف</button>
                    </div>
                </form>
            </div>
        </div>
    )
}