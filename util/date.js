export function getFormattedDate(date){
    // return  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return  date.toISOString().slice(0, 10); // alternate method for getting the date by using the js practice method for fetching date
}

export function getDateMinusDays(date, days){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}