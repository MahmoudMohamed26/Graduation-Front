export default function departmentMapper(department) {
    switch (department) {
        case "Roads_and_Transportation_Department":
            return "الطرق والنقل";
        case "Electricity_Authority":
            return "الكهرباء";
        case "Water_and_Sewage_Authority":
            return "المياه والصرف الصحي";
        case "Waste_Management_and_Sanitation_Authority":
            return "إدارة النفايات والصرف الصحي";
        case "Environmental_Affairs_Authority":
            return "شؤون البيئة";
        case "Telecommunication_Authority":
            return "الاتصالات";
        case "Housing_and_Utilities_Department":
            return "الإسكان والمرافق";
        case "Administrative_Complaints_and_Customer_Service":
            return "شكاوى الإدارة وخدمة العملاء";
        default:
            return "غير معروف";
    }
}