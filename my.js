let today = new Date();
let currentMonth = today.getMonth();
let formatter = { month: "long" };
//console.log(new Intl.DateTimeFormat("en-US", formatter).format(today));
let currentYear = today.getFullYear();
let monthAndYear = document.querySelector("month-and-year");
let currentWeekday = today.getDay();
let options = { weekday: "short" };
//console.log(new Intl.DateTimeFormat("en-US", options).format(today));
let currentDay = today.getDate();
//console.log(currentDay);

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

let monthSelection = document.querySelector(".month-selector");
let yearSelection = document.querySelector(".year-selector");
yearSelection.value = currentYear;
monthSelection.value = currentMonth;
showCalendar(currentMonth, currentYear);
function goToMonthYear() {
  let creationForm = document.querySelector(".create-view");
  let eventDetailsPlaceholder = document.querySelector(".event-details");
  monthSelection.addEventListener("change", () => {
    creationForm.style.display = "none";
    eventDetailsPlaceholder.style.display = "none";
    currentYear = yearSelection.value;
    currentMonth = monthSelection.value;
    showCalendar(currentMonth, currentYear);
    addEvents();
    viewEventDetails();
  });
  yearSelection.addEventListener("change", () => {
    creationForm.style.display = "none";
    eventDetailsPlaceholder.style.display = "none";
    currentYear = yearSelection.value;
    currentMonth = monthSelection.value;
    showCalendar(currentMonth, currentYear);
    addEvents();
    viewEventDetails();
  });
}
goToMonthYear();

function showCalendar(month, year) {
  //https://dzone.com/articles/determining-number-days-month
  daysInMonth = 32 - new Date(year, month, 32).getDate();

  let dayCells = document.getElementById("day-cells");
  dayCells.innerHTML = "";

  let date = 1;

  for (let i = 0; i < 6; i++) {
    let firstDayOfTheMonth = new Date(year, month).getDay();
    //console.log(firstDayOfTheMonth);
    let dayNames = ["Sund", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let dayName = dayNames[firstDayOfTheMonth];
    //console.log(dayName);

    let row = document.createElement("tr");
    dayCells.appendChild(row);
    for (let j = 0; j < 7; j++)
      if (i === 0 && j < firstDayOfTheMonth - 1) {
        let cell = document.createElement("td");
        dayCells.appendChild(cell);
      } else if (date > daysInMonth) {
        break;
      } else {
        let cell = document.createElement("td");

        dayCells.appendChild(cell);

        cell.insertAdjacentHTML(
          `beforeend`,
          `<p class="date-value" >${date}</p>`
        );
        date++;
      }
  }
}

//open form on click
let openFormButton = document.querySelectorAll(".create-entry-open-form");
//console.log(openFormButton);
openFormButton.forEach((el) => {
  el.addEventListener("click", function () {
    let creationForm = document.querySelector(".create-view");
    creationForm.style.display = "block";
  });
});
//save events to sessionStorage
//sessionStorage.clear();
function addEventsToStorage() {
  let submitFormButton = document.querySelector(".create-entry-button");

  if (sessionStorage.events) {
    events = JSON.parse(sessionStorage.getItem("events"));
  } else {
    events = [
      {
        date: "2021-12-29",
        description: "Evaluation of the year",
        endTime: "18:35",
        startTime: "15:45",
        title: "Evaluation",
        type: "meeting",
      },

      {
        date: "2021-12-18",
        description: "make sure the email is set to autoreply",
        endTime: "18:35",
        startTime: "08:45",
        title: "Christmas day off",
        type: "out-of-office",
      },
      {
        date: "2022-01-12",
        description: "We are going to Vistos Koja restaurant",
       endTime: "13:35",
        startTime: "12:45",
        title: "Lunch with fam",
        type: "out-of-office",
      },
      {
        date: "2022-01-15",
        description: "Prep a pitch",
        endTime: "19:45",
        startTime: "18:35",
        title: "Discuss next workation",
        type: "call",
      },
      {
        date: "2022-01-02",
        description: "Goals for the new year",
        endTime: "18:35",
        startTime: "16:45",
        title: "Goals 2022",
        type: "call",
      },
      {
        date: "2022-02-15",
        description: "Goals for 2022 vol.2",
        endTime: "18:35",
        startTime: "16:45",
        title: "Goals 2022 vol2",
        type: "call",
      },
    ];

    sessionStorage.setItem("events", JSON.stringify(events));
  }
  submitFormButton.addEventListener("click", () => {
    if (document.querySelector(".end-time").value === "") {
      document
        .querySelector(".end-time")
        .setCustomValidity("Please fill out this field");
      //return false;
    } else if (
      document.querySelector(".start-time").value >=
      document.querySelector(".end-time").value
    ) {
      console.log(document.querySelector(".end-time").value);
      document
        .querySelector(".end-time")
        .setCustomValidity("End date should be greater than Start date");
      //return false;
    } else {
      document.querySelector(".end-time").setCustomValidity("");
      let newEvent = new Object();
      newEvent.title = document.querySelector(".title").value;
      //console.log(newEvent.title);
      newEvent.date = document.querySelector(".date").value;
      newEvent.startTime = document.querySelector(".start-time").value;
      newEvent.endTime = document.querySelector(".end-time").value;
      newEvent.type = document.querySelector(".type").value;
      newEvent.description = document.querySelector(".description").value;
      events.push(newEvent);
      sessionStorage.setItem("events", JSON.stringify(events));
      //return true;
    }
  });
}
addEventsToStorage();
//console.log(addEventsToStorage());

//add event to the calendar
function addEvents() {
  events = JSON.parse(sessionStorage.getItem("events"));
  console.log(events);
  let dayCell = document.querySelectorAll("td");
  let dayCellDate = document.querySelectorAll(".date-value");

  //console.log(data);
  //console.log(newEvent.date[8] + newEvent.date[9]);
  console.log(dayCell);
  console.log(events);

  dayCellDate.forEach((el) => {
    //console.log(el.childNodes[0].nodeValue);
    events.forEach((elel) => {
      //console.log(currentMonth);
      //console.log(monthSelection.value);
      //console.log(elel.date[5] + elel.date[6]);
      console.log(elel.date);
      if (
        el.innerHTML === elel.date[8] + elel.date[9] &&
        elel.date[5] + elel.date[6] == 01 &&
        monthSelection.value == 0 &&
        elel.date[0] + elel.date[1] + elel.date[2] + elel.date[3] == 2022
      ) {
        //console.log(eventTitle);

        el.insertAdjacentHTML(
          `afterend`,
          `<div class="calendar-event-entry"><p value="${elel.title}" class="${elel.type} view-event"> ${elel.title}</p> </div>`
        );
      } else if (
        el.innerHTML === elel.date[8] + elel.date[9] &&
        elel.date[5] + elel.date[6] == 02 &&
        monthSelection.value == 1 &&
        elel.date[0] + elel.date[1] + elel.date[2] + elel.date[3] == 2022
      ) {
        el.insertAdjacentHTML(
          `afterend`,
          `<div class="calendar-event-entry"><p value="${elel.title}" class="${elel.type} view-event"> ${elel.title}</p> </div>`
        );
      } else if (
        el.innerHTML === elel.date[8] + elel.date[9] &&
        elel.date[5] + elel.date[6] == 12 &&
        monthSelection.value == 11 &&
        yearSelection.value == 2021 &&
        elel.date[0] + elel.date[1] + elel.date[2] + elel.date[3] == 2021
      ) {
        el.insertAdjacentHTML(
          `afterend`,
          `<div class="calendar-event-entry"><p value="${elel.title}" class="${elel.type} view-event"> ${elel.title}</p> </div>`
        );
      } else if (el.innerHTML.length == 1) {
        let cellDateValue = 0 + el.innerHTML;
        //console.log(cellDateValue);
        if (
          cellDateValue == elel.date[8] + elel.date[9] &&
          elel.date[5] + elel.date[6] == 02 &&
          monthSelection.value == 1 &&
          elel.date[0] + elel.date[1] + elel.date[2] + elel.date[3] == 2022
        ) {
          el.insertAdjacentHTML(
            `afterend`,
            `<div class="calendar-event-entry"><p value="${elel.title}" class="${elel.type} view-event"> ${elel.title}</p> </div>`
          );
        }
        if (
          cellDateValue == elel.date[8] + elel.date[9] &&
          elel.date[5] + elel.date[6] == 01 &&
          monthSelection.value == 0 &&
          elel.date[0] + elel.date[1] + elel.date[2] + elel.date[3] == 2022
        ) {
          el.insertAdjacentHTML(
            `afterend`,
            `<div class="calendar-event-entry"><p value="${elel.title}" class="${elel.type} view-event"> ${elel.title}</p> </div>`
          );
        }
      } else {
        console.log("unfinished business");
      }

      let calendarEventColor = document.querySelectorAll(
        ".calendar-event-entry"
      );
      calendarEventColor.forEach((element) => {
        //console.log(element.childNodes[0].classList[0]);
        if (element.childNodes[0].classList[0] === "meeting") {
          element.childNodes[0].style.backgroundColor = "#fffdd0";
        }
        if (element.childNodes[0].classList[0] === "call") {
          element.childNodes[0].style.backgroundColor = "#E6BE8A";
        }
        if (element.childNodes[0].classList[0] === "out-of-office") {
          element.childNodes[0].style.backgroundColor = "#f5deb3";
        }
      });
    });
  });
}
addEvents();

function viewEventDetails() {
  //view event details on click
  let viewEventButton = document.querySelectorAll(".view-event");

  let eventDetailsPlaceholder = document.querySelector(".event-details");
  //let eventCalendarEntry = document.querySelectorAll(".calendar-event-entry");
  //console.log(eventCalendarEntry);

  viewEventButton.forEach((elem) => {
    elem.addEventListener("click", function (elem) {
      //adding this condition to only show one event at once
      if (document.querySelector(".event-details-shown") != null) {
        document.querySelector(".event-details-shown").remove();
      }
      elem.currentTarget.classList.add("active");
      console.log(elem.currentTarget.innerText);
      //let eventsData = sessionStorage.getItem("events");
      eventDetailsPlaceholder.style.display = "block";
      //console.log(viewEventButton);

      events.forEach((elel) => {
        //console.log(el.childNodes[0].nodeValue);
        //console.log(elel.date[8] + elel.date[9]);
        //console.log(el.childNodes[0].innerText);
        if (elem.currentTarget.innerText === elel.title) {
          //console.log(eventTitle);

          eventDetailsPlaceholder.insertAdjacentHTML(
            `beforeend`,
            `<div class="event-details-shown"><p> Title: ${elel.title}</p>
          <p> Date: ${elel.date}</p>
          <p> Start time: ${elel.startTime}</p>
          <p> End time: ${elel.endTime}</p>
          <p class="type"> Type: ${elel.type}</p>
          <p> Description: ${elel.description}</p>
          <button class="delete-event">Delete event</button></div>`
          );
        }
      });
      //delete event
      //console.log(elem.currentTarget);
      let eventToBeDeleted = elem.currentTarget;
      //console.log(eventToBeDeleted);
      let deleteEventButton = document.querySelector(".delete-event");
      deleteEventButton.addEventListener("click", function () {
        events.forEach((elelel) => {
          if (eventToBeDeleted.innerText === elelel.title) {
            //console.log(eventToBeDeleted);
            // console.log(elelel);
            // console.log(events.indexOf(elelel));
            //console.log(events);
            let confirmationPopup = document.querySelector(
              ".confirmation-pop-up"
            );
            confirmationPopup.style.display = "block";

            document.querySelector(".yes").onclick = function () {
              //console.log(sessionData);
              events.splice(events.indexOf(elelel), 1);
              eventToBeDeleted.remove();
              let eventDetailsPlaceholder =
                document.querySelector(".event-details");
              eventDetailsPlaceholder.style.display = "none";

              //console.log(events);
              sessionStorage.events = JSON.stringify(events);
              //console.log(events);
              confirmationPopup.style.display = "none";
            };
            document.querySelector(".no").onclick = function () {
              eventDetailsPlaceholder.style.display = "none";
              confirmationPopup.style.display = "none";
              eventToBeDeleted.classList.remove("active");
              //console.log(eventDetailsPlaceholder);
              document.querySelector(".event-details-shown").remove();
            };
          }
        });
      });
    });
  });
}
viewEventDetails();
