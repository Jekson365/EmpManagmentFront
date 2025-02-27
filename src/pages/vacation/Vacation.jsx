import React from "react";
import "react-calendar/dist/Calendar.css";
import "../../styles/vacation.scss";
import VacationCalendar from "./calendar/VacationCalendar";
import VacationReport from "./report/VacationReport";

function Vacation() {
  return (
    <>
      <VacationCalendar />
      <VacationReport />
    </>
  );
}

export default Vacation;
