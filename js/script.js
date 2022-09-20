//GLOBAL VARIABLES
let timeWhenStartButtonWasClicked;

document.getElementById("stop-button").disabled = true; //disable button 'Stop' on the beginning

/* SHOW MESSAGE WHEN USER TRIES TO CLOSE THE BROWSER WINDOW (MAYBE ACCIDENTALY) */
      window.onbeforeunload = function () {
        return "Did you save your stuff?";
      };

/* FUNCTION THAT CONVERTS MINUTES INTO '#h #min' */
convertMinutesToHours = (mins) => parseInt(mins/60) +"h " + parseInt(mins%60) + " min";

/* FUNCTION THAT CONVERTS Date() INTO HH:MM */
function convertDateObjectIntoHHMM(MilisecondsSince1970) {
  let d = new Date(MilisecondsSince1970);
  return addLeadingZeros(d.getHours(),2) + ":" + addLeadingZeros(d.getMinutes(),2);
}

/* FUNCTION THAT CONVERTS MILISECONDS INTO MINUTES */
convertMilisecondsToMinutes = (miliseconds) => parseInt(miliseconds/1000/60);

  /* RETURN ID OF THE NEXT RECORD IN TABLE */
  function nextTableID () {
    let myTable = document.getElementById("history-table");
    return myTable.rows.length; /* this is ID */
  }

  /* FUNCTION THAT CONVERTS E.G. '3' MINS INTO '03' MINS */
  function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
  }

  /* FUNCTION THAT ADDS NEXT RECORDS TO THE TABLE 'history-table' */
  function addRecordToTheTable(from, to, mins, comment) {
  
    let table = document.querySelector("#history-table tbody");
    table.innerHTML +=
        "<tr><td>" + nextTableID() + 
        "</td><td>" + from + "</td><td>" + to + "</td><td>" +
        mins +
        "</td><td>" +
        comment +
        "</td></tr>";
  }

  /* FUNCTION THAT ADDS RECORD TO THE TABLE IF USER CLICKS CTRL+ENTER IN TEXTAREA */
  function ctrlEnterAddRecordToTheTable(event) {
    //If ctrl+enter is pressed
    if (event.ctrlKey) {
      let mins_text = document.getElementById("manual-entered-minutes").value;
      let textarea_text = document.getElementById("textarea-comment").value;

      if (mins_text != "" && textarea_text != "") {
      addButtonPushed();
      }
  }
}

/* COUNT TOTAL ELAPSED TIME FROM TABLE AND DISPLAY IT ON SCREEN */
setInterval(function () {
    let myTable = document.getElementById("history-table");
  
      let sum = 0;
      for (let i=1; i<myTable.rows.length; i++) //all rows in cell 'Mins'
      {
          sum += parseInt(myTable.rows[i].cells[3].innerHTML); //sum up minutes in #history-table
      }
      document.getElementById("total-elapsed-time").textContent = convertMinutesToHours(sum); //sum coverted into hours and displayed on screen
    
  }, 100); //repeat every 100ms

  /* SHOW 'Export table' BUTTON WHILE TABLE ISN'T EMPTY */
setInterval(function () {
  if (nextTableID() > 1) {
    document.getElementById("export-table-button").style.display = "initial";
  }
  else {
    document.getElementById("export-table-button").style.display = "none";
  }
  
}, 100); //repeat every 100ms

  /* SHOW CURRENT ELAPSED TIME SINCE START BUTTON IS CLICKED IN AUTO MODE */
setInterval(function () {
  if (document.getElementById("start-button").disabled == true)
  {
  const currentDate = new Date();
  let actualFocusingTimeInMinutes = convertMilisecondsToMinutes(currentDate.getTime() - timeWhenStartButtonWasClicked);
  document.getElementById("auto-elapsed-time").textContent = convertMinutesToHours(actualFocusingTimeInMinutes);
  }
  else
  {
    document.getElementById("auto-elapsed-time").textContent = " - ";
  }
}, 100); //repeat every 100ms

  /* SELECT MODE -> SWITCHING WINDOWS */
  setInterval(function () {
    let selectedOption = document.getElementById("dropdown-auto-manual").value;
  if (selectedOption == 1) //auto mode
  {
    document.getElementById("auto").style.display="block";
    document.getElementById("manual").style.display="none";
  }
  else { //manual mode
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



  function addButtonPushed() {
    //get elements
    let minutesFromInput = document.getElementById(
      "manual-entered-minutes"
    ).value;
    let commentFromInput = document.getElementById("textarea-comment").value;

    //enter record to the table
      addRecordToTheTable(" - ", " - ", minutesFromInput, commentFromInput);

      //clear input 'min' and 'comment'
      document.getElementById("manual-entered-minutes").value = "";
      document.getElementById("textarea-comment").value = "";
  }


  function startButtonPushed () {
    //disable buttons and enable stop-button
    document.getElementById("start-button").disabled = true;
    document.getElementById("dropdown-auto-manual").disabled = true;
    document.getElementById("stop-button").disabled = false;

    //save time of click start button in global variable
    const currentDate = new Date();
    timeWhenStartButtonWasClicked = currentDate.getTime();
    
    //show hour when start button was clicked in 'started at' field
    const actualTime = addLeadingZeros(currentDate.getHours(), 2) + ":" + addLeadingZeros(currentDate.getMinutes(), 2);
    document.getElementById("auto-hour-start").textContent = actualTime;

    //current elapsed time counts by one of setInterval function above
  }

  function stopButtonPushed () {
    //save time of click stop button in variable
    const currentDate = new Date();
    let timeWhenStopButtonWasClicked = currentDate.getTime();
    
    //alert -> user can type comment or not
    let userComment = prompt("Enter a comment:", "AUTO MODE");

    //add record into the table
    let from = convertDateObjectIntoHHMM(timeWhenStartButtonWasClicked);
    let to = convertDateObjectIntoHHMM(timeWhenStopButtonWasClicked);
    let mins = convertMilisecondsToMinutes(timeWhenStopButtonWasClicked-timeWhenStartButtonWasClicked);
    addRecordToTheTable(from, to, mins, userComment);


    //disable and enable buttons
    document.getElementById("dropdown-auto-manual").disabled = false;
    document.getElementById("start-button").disabled = false;
    document.getElementById("stop-button").disabled = true;


    //clear 'Started at:'
    document.getElementById("auto-hour-start").textContent = " - ";

    //at the end assign 0 to variables
    timeWhenStartButtonWasClicked = 0;
    timeWhenStopButtonWasClicked = 0;
  }
