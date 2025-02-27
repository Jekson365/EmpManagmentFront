import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../../styles/vacation.scss";
import { Grid, Stack } from "@mui/material";
function VacationCalendar() {
  const [selectedDates, setSelectedDates] = useState({
    startDate: new Date().toLocaleDateString(),
    endDate: new Date().toLocaleDateString(),
  });
  const handleChangeCalendar = (e) => {
    setSelectedDates({
      startDate: e[0].toLocaleDateString(),
      endDate: e[1].toLocaleDateString(),
    });
  };
  const disableWeekends = ({ date }) => {
    return date.getDay() === 0 || date.getDay() === 6;
  };
  return (
    <>
      <Grid container columnSpacing={3}>
        <Grid item xs={3}>
          <Calendar
            className={"calendar"}
            onChange={handleChangeCalendar}
            selectRange={true}
            tileDisabled={disableWeekends}
          />
        </Grid>
        <Grid item xs={9}>
          <Stack gap={"10px"} direction={"column"}>
            <Stack
              direction={"row"}
              gap={"10px"}
              justifyContent={"space-between"}
              className="filled-dates-data"
            >
              <Stack direction={"row"} gap={"10px"}>
                <div className="date">
                  <div className="title">დაწყების თარიღი</div>
                  <div className="dt">{selectedDates?.startDate}</div>
                </div>
                <div className="date">
                  <div className="title">დასრულების თარიღი</div>
                  <div className="dt">{selectedDates?.endDate}</div>
                </div>
              </Stack>
            </Stack>
            <Stack
              mt={3}
              direction={"column"}
              gap={"10px"}
              alignItems={"flex-start"}
            >
              <label>შვებულების მიზეზი</label>
              <input
                type="text"
                className="reason"
                placeholder="შვებულების მიზეზი"
              />
              <button className="log-out">მოთხოვნა</button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default VacationCalendar;
