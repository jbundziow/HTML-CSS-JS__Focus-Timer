/* BUTTONS DISABLED */
/* /*   document.getElementById("start-button").disabled = true;
  document.getElementById("stop-button").disabled = true;
  document.getElementById("add-button").disabled = true;
  document.getElementById("dropdown-auto-manual").disabled = true; */


  //TEST!!!! - clock

  function addLeadingZeros(num, totalLength) { //it converts eg. '3' mins into '03' mins
    return String(num).padStart(totalLength, '0');
  }
  const currentDate = new Date();
  const actualTime = addLeadingZeros(currentDate.getHours(), 2) + ":" + addLeadingZeros(currentDate.getMinutes(), 2);
  document.getElementById("auto-hour-start").textContent = actualTime; //new text

/* FUNCTION THAT CONVERTS MINUTES INTO '#h #min' */
convertMinutesToHours = (mins) => parseInt(mins/60) +"h " + parseInt(mins%60) + " min";

/* COUNT TOTAL ELAPSED TIME AND DISPLAY IT ON SCREEN */
setInterval(function () {
    var myTable = document.getElementById("history-table");
  
      let sum = 0;
      for (let i=1; i<myTable.rows.length; i++) //all rows in cell 'Mins'
      {
          sum += parseInt(myTable.rows[i].cells[3].innerHTML); //sum up minutes in #history-table
      }
      document.getElementById("total-elapsed-time").textContent = convertMinutesToHours(sum); //sum coverted into hours and displayed on screen
    
  }, 100); //repeat every 100ms

  /* SELECT MODE -> SWITCHING WINDOWS */
  setInterval(function () {
    let selectedOption = document.getElementById("dropdown-auto-manual").value;
  if (selectedOption == 1) //auto
  {
    document.getElementById("auto").style.display="block";
    document.getElementById("manual").style.display="none";
  }
  else {
    document.getElementById("auto").style.display="none";
    document.getElementById("manual").style.display="block";
  }
  }, 100); //repeat every 100ms
  
  /* IN MANUAL MODE IF THERE ARE EMPTY INPUT FIELDS => DISABLE BUTTON 'ADD'*/
  setInterval(function () {
      let mins = document.getElementById("manual-entered-minutes").value;
      let textarea = document.getElementById("textarea-comment").value;
  
      if (mins == "" || textarea == "")
      {
          document.getElementById("add-button").disabled = true;
          }
          else
          {
              document.getElementById("add-button").disabled = false;
          }
  }, 100);


  //modify table


  function addRecord_ManualMode() {

      /* count rows in table */
      var myTable = document.getElementById("history-table");
      var totalRowCount = myTable.rows.length; /* this is ID */

    let minutesFromInput = document.getElementById(
      "manual-entered-minutes"
    ).value;
    let commentFromInput = document.getElementById("textarea-comment").value;
    let table = document.querySelector("#history-table tbody");
    table.innerHTML +=
      "<tr><td>" + totalRowCount + 
      "</td><td>-</td><td>-</td><td>" +
      minutesFromInput +
      "</td><td>" +
      commentFromInput +
      "</td></tr>";

      //clear input 'min' and 'comment'
      document.getElementById("manual-entered-minutes").value = "";
      document.getElementById("textarea-comment").value = "";
  }




function addRecord_AutoMode(from, to, comment) {
  //TODO
  let table = document.querySelector("#history-table tbody");
  table.innerHTML +=
    "<tr><td>Lp</td><td>From</td><td>To</td><td>Mins</td><td>Comment</td></tr>";
}