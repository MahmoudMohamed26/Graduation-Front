export default function governoratesMapper(arabicName) {
    switch (arabicName.trim()) {
        case "القاهرة": return "Cairo";
        case "الجيزة": return "Giza";
        case "الإسكندرية": return "Alexandria";
        case "القليوبية": return "Qalyubia";
        case "الشرقية": return "Sharqia";
        case "الدقهلية": return "Dakahlia";
        case "البحيرة": return "Beheira";
        case "كفر الشيخ": return "Kafr El Sheikh";
        case "الغربية": return "Gharbia";
        case "المنوفية": return "Monufia";
        case "الفيوم": return "Faiyum";
        case "بني سويف": return "Beni Suef";
        case "المنيا": return "Minya";
        case "أسيوط": return "Assiut";
        case "سوهاج": return "Sohag";
        case "قنا": return "Qena";
        case "الأقصر": return "Luxor";
        case "أسوان": return "Aswan";
        case "البحر الأحمر": return "Red Sea";
        case "الوادي الجديد": return "New Valley";
        case "مطروح": return "Matrouh";
        case "شمال سيناء": return "North Sinai";
        case "جنوب سيناء": return "South Sinai";
        case "بورسعيد": return "Port Said";
        case "السويس": return "Suez";
        case "الإسماعيلية": return "Ismailia";
        case "دمياط": return "Damietta";
        default:
        return null; 
}
}