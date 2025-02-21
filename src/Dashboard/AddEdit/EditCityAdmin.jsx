import axios from "axios";
import Input from "../Components/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditCityAdmin() {
    const [data , setData] = useState([])
    const { id } = useParams();
    console.log(data);
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`http://localhost:9090/api/V1/cityadmin/${id}`)
            .then((response) => {
                setData(response.data)
            })
        }
        fetchData()
    } , [id])
    const form = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            nationalId: '',
            adminType: '',
            gov: '',
            city: ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('هذا الحقل مطلوب'),
            lastName: Yup.string().required('هذا الحقل مطلوب'),
            email: Yup.string().email('بريد إلكتروني غير صالح').required('هذا الحقل مطلوب'),
            password: Yup.string()
                    .matches(
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/,
                    "كلمة المرور يجب أن تحتوي على حرف كبير وحرف صغير ورقم ورمز خاص"
                    )
                    .required("هذا الحقل مطلوب"),
            adminType: Yup.string().required('هذا الحقل مطلوب'),
            gov: Yup.string().when('adminType', {
                is: (val) => val === 'gov' || val === 'city',
                then: (schema) => schema.required('هذا الحقل مطلوب')
            }),
            city: Yup.string().when(['adminType', 'gov'], {
                is: (adminType, gov) => adminType === 'city' && gov !== '',
                then: (schema) => schema.required('هذا الحقل مطلوب')
            })            
        }),
        onSubmit: (values , {resetForm}) => {
            console.log(values);
            resetForm();
        },
    });

    return (
        <div>
            <div className="flex">
                <h1 className="w-fit text-4xl relative before:absolute before:h-[1px] before:w-full before:bg-slate-300 before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] after:right-0">
                    اضافة مشرف
                </h1>
            </div>
            <div className="bg-white mt-10 px-2 text-right rounded-sm">
                <h2 className="text-2xl py-5 border-b border-[#f3f2f9]">البيانات</h2>
                <form className="py-5" onSubmit={form.handleSubmit}>
                    <div className="flex flex-col lg:flex-row lg:gap-5">
                        <Input label="الأسم الأول:" name="firstName" formik={form} placeholder='ادخل الأسم' />
                        <Input label="الأسم الأخير:" name="lastName" formik={form} placeholder='ادخل الأسم' />
                    </div>
                    <div className="flex flex-col lg:flex-row lg:gap-5">
                        <Input label="البريد الألكتروني:" name="email" formik={form} placeholder='example@gmail.com' />
                        <Input label="الرقم القومي" name="nationalId" formik={form} placeholder='example@gmail.com' />
                        <Input label="كلمة السر:" name="password" formik={form} placeholder='************' password={true} />
                    </div>
                    <div className="flex flex-col lg:flex-row lg:gap-5">
                    <div className="flex-1">
                                <div className="relative">
                                    <select
                                        name="adminType"
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                        value={form.values.adminType}
                                        className={`w-full border text-right duration-300  text-sm border-[#e2e6f1] special_shadow rounded-md outline-none p-2 my-2  pl-8 pr-3 py-2 transition ease focus:outline-none shadow-sm appearance-none cursor-pointer ${form.errors.adminType && form.touched.adminType ? 'border-red-500' : ''}`}>
                                        <option disabled value="">نوع المشرف</option>
                                        <option value="gov">مشرف محافظة</option>
                                        <option value="city">مشرف مدينة</option>
                                    </select>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute translate-y-1/2 top-1/2 left-2.5 text-slate-700">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                    </svg>
                                </div>
                                {form.errors.adminType && form.touched.adminType && (
                                    <p className="text-xs text-red-500">{form.errors.adminType}</p>
                                )}
                            </div>

                        {form.values.adminType && (
                            <div className="relative flex-1">
                                <div className="relative">
                                    <select
                                        name="gov"
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                        value={form.values.gov}
                                        className={`w-full border text-right duration-300  text-sm border-[#e2e6f1] special_shadow rounded-md outline-none p-2 my-2  pl-8 pr-3 py-2 transition ease focus:outline-none shadow-sm appearance-none cursor-pointer ${form.errors.gov && form.touched.gov ? 'border-red-500' : ''}`}>
                                        <option disabled value=''>اختر المحافظة</option>
                                        <option value="cairo">القاهرة</option>
                                        <option value="qal">القليوبية</option>
                                        <option value="giza">الجيزة</option>
                                    </select>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute translate-y-1/2 top-1/2 left-2.5 text-slate-700">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                    </svg>
                                </div>
                                {form.errors.gov && form.touched.gov && (
                                    <p className="text-xs text-red-500">{form.errors.gov}</p>
                                )}
                            </div>
                        )}
                        {form.values.adminType === 'city' && form.values.gov  && (
                            <div className="relative flex-1">
                                <div className="relative">
                                    <select
                                        name="city"
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                        value={form.values.city}
                                        className={`w-full border text-right duration-300  text-sm border-[#e2e6f1] special_shadow rounded-md outline-none p-2 my-2  pl-8 pr-3 py-2 transition ease focus:outline-none shadow-sm appearance-none cursor-pointer ${form.errors.city && form.touched.city ? 'border-red-500' : ''}`}>
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
                                </div>
                                {form.errors.city && form.touched.city && (
                                    <p className="text-xs text-red-500">{form.errors.city}</p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="mt-5">
                        <button type="submit" className="rounded-[0.2rem] duration-300 hover:bg-[#604CC7] text-white bg-[#725DFE] px-4 py-1">
                            اضافة المشرف
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
