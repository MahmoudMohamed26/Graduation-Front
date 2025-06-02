export default function StatusMapper(status) {
    switch (status) {
        case 'Submitted':
            return { 
                text: 'تم الإرسال (مُكلف)', 
                color: '#007bff',
                bgColor: '#e7f1ff'
            };
        case 'In_Progress':
            return { 
                text: 'قيد التنفيذ', 
                color: '#ffc107',
                bgColor: '#fff8e1'
            };
        case 'Resolved':
            return { 
                text: 'تم الحل', 
                color: '#4caf50',
                bgColor: '#e8f5e9'
            };
        case 'Cancelled':
            return { 
                text: 'مرفوض', 
                color: '#f44336',
                bgColor: '#ffebee'
            };
        case 'Closed':
            return { 
                text: 'مغلق', 
                color: '#6c757d',
                bgColor: '#f1f3f4'
            };
        case 'On_Hold':
            return { 
                text: 'في الانتظار', 
                color: '#6c757d',
                bgColor: '#f1f3f4'
            };
        default:
            return { 
                text: 'غير معروف', 
                color: '#9e9e9e',
                bgColor: '#f5f5f5'
            };
    }
}
