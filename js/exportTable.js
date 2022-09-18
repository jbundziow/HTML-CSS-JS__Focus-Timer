//source: https://github.com/rusty1s/table2excel
function exportTableToExcel(tableID) {
var table2excel = new Table2Excel();
  table2excel.export(document.getElementById(tableID), "TimerData" + currentDate());
}


//Returns date in format "[01-01-2000]_[12;00]"
function currentDate() {
     const d = new Date();
    const day = addLeadingZeros(d.getDate(),2);
    const month = addLeadingZeros(d.getMonth()+1,2);
    const year = d.getFullYear();
    const hour = addLeadingZeros(d.getHours(),2);
    const mins = addLeadingZeros(d.getMinutes(),2);

    return `[${day}-${month}-${year}]_[${hour};${mins}]`;
}