import Input from "../Components/Input";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { Axios } from "../../API/Axios";

export default function EditAdmin() {
    const url = window.location.href.split('/')[window.location.href.split('/').length - 2]
    const [cities, setCities] = useState([]);
    const [govs, setGovs] = useState([]);
    const [load , setLoad] = useState(true)
    const [data , setData] = useState([])
    const [cityLoad , setCityLoad] = useState(true)
    const [btnLoad , setBtnLoad] = useState(false)
    const { id } = useParams();
    useEffect(() => {
        setLoad(true);
        const fetchData = async () => {
            await Axios.get(`${url === "city-admins" ? `/cityadmin/${id}` : `/GovernorateAdmin/${id}`}`)
            .then((response) => {
                setData(response.data);
            })
        }
        fetchData()
    } , [id , url])
    useEffect(() => {
        setCityLoad(true)
        setLoad(true);
        const fetchData = async () => {
            await Axios.get(`/governorates`)
            .then((response) => {
                setGovs(response.data)
            })
        }
        fetchData()
    } , [])

    useEffect(() => {
        setLoad(true);
        if (data.governorateId) {
            setCityLoad(true);
            const fetchData = async () => {
                await Axios.get(`/cities/${data.governorateId}`)
                .then((response) => {
                    setCities(response.data);
                    setCityLoad(false);
                    setLoad(false);
                })
            }
            fetchData();
        }
    }, [data.governorateId]);
    async function GetCities(id){
        form.setFieldValue('cityId', '');
        setCityLoad(true);
        await Axios.get(`/cities/${id}`)
        .then((response) => {
            setCities(response.data);
            setCityLoad(false);
        })
    }
    const form = useFormik({
        enableReinitialize: true,
        initialValues: {
            adminId: id,
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            hashPassword: '',
            type: data.type || '',
            governorateId: data.governorateId || '',
            cityId: data.cityId || '',
            nationalId: data.nationalId || '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('هذا الحقل مطلوب'),
            lastName: Yup.string().required('هذا الحقل مطلوب'),
            email: Yup.string().email('بريد إلكتروني غير صالح').required('هذا الحقل مطلوب'),
            hashPassword: Yup.string()
                    .matches(
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%?&]).{8,}$/,
                        "كلمة المرور يجب أن تكون أكثر من 8 حروف وتحتوي على حرف كبير وحرف صغير ورقم ورمز خاص"
                    ),
            type: Yup.string().required('هذا الحقل مطلوب'),
            governorateId: Yup.string().when('type', {
                is: (val) => val === '1999' || val === '1998',
                then: (schema) => schema.required('هذا الحقل مطلوب')
            }),
            cityId: Yup.string().when(['type', 'gov'], {
                is: (type, gov) => type === '1998' && gov !== '',
                then: (schema) => schema.required('هذا الحقل مطلوب')
            })  ,
            nationalId: Yup.string()
                .matches(/^\d+$/, "يجب أن يحتوي على أرقام فقط")
                .required("هذا الحقل مطلوب"),
        }),
        onSubmit: (values) => {
            const sendData = async () => {
                setBtnLoad(true)
                try{
                    await Axios.put("/admin", values)
                    .then((res) => {
                        console.log(res);
                        setBtnLoad(false)
                        toast.success('تمت العملية بنجاح', {
                            position: "top-left",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: false,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
                            });
                    })
                }
                catch(err){
                    console.log(err);
                    setBtnLoad(false)
                    toast.error('حدث خطأ اثناء التنفيذ', {
                        position: "top-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                        });
                }
            }
            sendData()
        },
    });

    return (
        <div>
            <div className="flex">
                <h1 className="w-fit text-4xl relative before:absolute before:h-[1px] before:w-full before:bg-slate-300 before:right-0 before:bottom-[-15px] after:absolute after:w-[40%] after:h-[2px] after:bg-[#725DFE] after:bottom-[-15px] after:right-0 before:dark:bg-[#363D3E] dark:text-[#EEE]">
                    تعديل مشرف
                </h1>
            </div>
            {load ? <div className="mt-10"><Skeleton count={1} className="dark:[--base-color:_#202020_!important] dark:[--highlight-color:_#444_!important]" height={380} width="100%" /></div> : <div className="bg-white mt-10 px-2 text-right rounded-sm dark:border-[#363D3E] dark:bg-[#191A1A]">
                <h2 className="text-2xl py-5 border-b border-[#f3f2f9] dark:border-[#363D3E] dark:bg-[#191A1A] dark:text-white">البيانات</h2>
                
                <form className="py-5" onSubmit={form.handleSubmit}>
                    <div className="flex flex-col lg:flex-row lg:gap-5">
                        <Input label="الأسم الأول:" name="firstName" formik={form} placeholder='ادخل الأسم' />
                        <Input label="الأسم الأخير:" name="lastName" formik={form} placeholder='ادخل الأسم' />
                    </div>
                    <div className="flex flex-col lg:flex-row lg:gap-5">
                        <Input label="البريد الألكتروني:" name="email" disabled={true} formik={form} placeholder='ادخل الرقم' />
                        <Input label="الرقم القومي:" name="nationalId" disabled={true} formik={form} placeholder='ادخل الرقم' />
                        <Input label="كلمة السر" name="hashPassword" optional={true} formik={form} placeholder='************' password={true} />
                    </div>
                    <div className="flex flex-col lg:flex-row lg:gap-5">
                    <div className="flex-1">
                                <div className="relative">
                                    <select
                                        name="type"
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                        value={form.values.type}
                                        className={`w-full border text-right duration-300  text-sm border-[#e2e6f1] dark:bg-[#121313] dark:text-white dark:border-[#333] rounded-md outline-none p-2 my-2  pl-8 pr-3 py-2 transition ease focus:outline-none shadow-sm appearance-none cursor-pointer ${form.errors.type && form.touched.type ? '!border-red-500' : 'special_shadow'}`}>
                                        <option disabled value="">نوع المشرف</option>
                                        {form.values.type === 1999 ? <option value="1999">مشرف محافظة</option>
                                        : <option value="1998">مشرف مدينة</option>}
                                    </select>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute translate-y-1/2 top-1/2 left-2.5 text-slate-700">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                    </svg>
                                </div>
                                {form.errors.type && form.touched.type && (
                                    <p className="text-xs text-red-500">{form.errors.type}</p>
                                )}
                            </div>

                        {form.values.type && (
                            <div className="relative flex-1">
                                <div className="relative">
                                    <select
                                        name="governorateId"
                                        onChange={(e) => { GetCities(e.target.value); form.handleChange(e);}}
                                        onBlur={form.handleBlur}
                                        value={form.values.governorateId}
                                        className={`w-full border text-right duration-300  text-sm border-[#e2e6f1] dark:bg-[#121313] dark:text-white dark:border-[#333] rounded-md outline-none p-2 my-2  pl-8 pr-3 py-2 transition ease focus:outline-none shadow-sm appearance-none cursor-pointer ${form.errors.governorateId && form.touched.governorateId ? '!border-red-500' : 'special_shadow'}`}>
                                        <option disabled value="">اختر المحافظة</option>
                                        {govs.map((gov , index) => (
                                            <option key={index} value={gov.governorateId}>{gov.name}</option>
                                        ))}
                                    </select>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute translate-y-1/2 top-1/2 left-2.5 text-slate-700">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                    </svg>
                                </div>
                                {form.errors.governorateId && form.touched.governorateId && (
                                    <p className="text-xs text-red-500">{form.errors.governorateId}</p>
                                )}
                            </div>
                        )}
                        {(form.values.type === '1998' || form.values.type === 1998) && form.values.governorateId &&  (
                            <div className="relative flex-1">
                                <div className="relative">
                                    <select
                                    disabled={cityLoad}
                                        name="cityId"
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                        value={form.values.cityId}
                                        className={`w-full border text-right duration-300  text-sm border-[#e2e6f1] dark:bg-[#121313] dark:text-white dark:border-[#333] rounded-md outline-none p-2 my-2  pl-8 pr-3 py-2 transition ease focus:outline-none shadow-sm appearance-none ${cityLoad ? "" : "cursor-pointer"} ${form.errors.cityId && form.touched.cityId ? '!border-red-500' : 'special_shadow'}`}>
                                        <option disabled value=''>{cityLoad ? "جاري تحميل المدن..." : "اختر المدينة"}</option>
                                        {cities.map((city , index) => (
                                            <option key={index} value={city.cityId}>{city.name}</option>
                                        ))}
                                    </select>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute translate-y-1/2 top-1/2 left-2.5 text-slate-700">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                    </svg>
                                </div>
                                {form.errors.cityId && form.touched.cityId && (
                                    <p className="text-xs text-red-500">{form.errors.cityId}</p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="mt-5">
                        <button type="submit" disabled={btnLoad} className="rounded-[0.2rem] duration-300 hover:bg-[#604CC7] text-white bg-[#725DFE] px-4 py-1">
                            {btnLoad ? <div role="status">
                            <svg aria-hidden="true" className="inline w-4 h-4 text-gray-200 animate-spin fill-[#725DFE]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="mr-3">جاري التنفيذ...</span>
                        </div> : "تعديل المشرف"}
                        </button>
                    </div>
                </form>
            </div>}
        </div>
    );
}