export default function dateFormater(isoDate) {
    const date = new Date(isoDate);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayOfMonth = date.getUTCDate(); // Day of the month (1-31)
    const monthName = months[date.getUTCMonth()]; // Month (Jan, Feb, Mar, ...)
    const year = date.getUTCFullYear();

    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'AM' : 'PM';

    hours = hours % 12;
    hours = hours ? hours : 12; // hour '0' should be '12'

    return `${monthName}-${dayOfMonth}-${year} ${hours}:${minutes} ${ampm}`;
}
