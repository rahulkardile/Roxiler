export function GetMonth(month: string) {
    let CurrentMonth = "";
    switch (month) {
        case "Jan":
            CurrentMonth = "January";
            break;
        case "Feb":
            CurrentMonth = "February";
            break;
        case "Mar":
            CurrentMonth = "March";
            break;
        case "Apr":
            CurrentMonth = "April";
            break;
        case "May":
            CurrentMonth = "May";
            break;
        case "Jun":
            CurrentMonth = "June";
            break;
        case "Jul":
            CurrentMonth = "July";
            break;
        case "Aug":
            CurrentMonth = "August";
            break;
        case "Sep":
            CurrentMonth = "September";
            break;
        case "Oct":
            CurrentMonth = "October";
            break;
        case "Nov":
            CurrentMonth = "November";
            break;
        case "Dec":
            CurrentMonth = "December";
            break;
        default:
            CurrentMonth = "Invalid month";
            break;
    }

    return CurrentMonth;
}
