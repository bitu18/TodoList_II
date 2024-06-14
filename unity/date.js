/* When you create a new Date object with a date string, it interprets the string in the local timezone, 
which can cause the date to appear as one day earlier or later, depending on your local time. 
Thus, we use UTC date to fix this problem. */

export default function dateFormat(date) {
    if (!date) {
        date = new Date();
    } else {
        // Ensure the date is interpreted as UTC
        const [year, month, day] = date.split('-').map(Number);
        date = new Date(Date.UTC(year, month - 1, day));
    }

    let day = date.getUTCDate();
    day = day < 10 ? `0${day}` : day;
    let daySuffix;

    // Avoid suffix st, nd, rd when it comes to 11, 12, 13
    if (day >= 11 && day <= 13) {
        daySuffix = 'th';
    } else {
        switch (day % 10) {
            case 1:
                daySuffix = 'st';
                break;
            case 2:
                daySuffix = 'nd';
                break;
            case 3:
                daySuffix = 'rd';
                break;
            default:
                daySuffix = 'th';
                break;
        }
    }
    day = `${day}${daySuffix}`;

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getUTCMonth()];

    const year = date.getUTCFullYear();

    return {
        formatDate: `${day} ${month} ${year}`,
        rawDate: date.toISOString().split('T')[0] // Return date in YYYY-MM-DD format
    };
}
