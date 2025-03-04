import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../../App";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../../styles/vacation.scss";
import { Grid, Stack, Typography } from "@mui/material";
import UseCreateVacation from "../../../hooks/vacation/UseCreateVacation";
import UseUsers from "../../../hooks/users/UseUsers";
import UseSupers from "../../../hooks/users/UseSupers";
function VacationCalendar() {
  const { user } = useContext(CurrentUserContext);
  const { users, getUsers, loading } = UseSupers();
  const { createVacation } = UseCreateVacation();
  const [assigneedUser, setAssignedUser] = useState(null);
  const [selectedDates, setSelectedDates] = useState({
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });
  const handleChangeCalendar = (e) => {
    setSelectedDates({
      startDate: e[0].toISOString().split("T")[0],
      endDate: e[1].toISOString().split("T")[0],
    });
  };
  const disableWeekends = ({ date }) => {
    return date.getDay() === 0 || date.getDay() === 6;
  };

  const handleVacationSubmit = async () => {
    var result = await createVacation({
      fromDate: selectedDates.startDate,
      toDate: selectedDates.endDate,
      createdById: user.id,
      assignedUserId: assigneedUser,
    });
    window.location.reload();
  };
  useEffect(() => {
    getUsers();
  }, []);
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
              {loading ? (
                <></>
              ) : (
                <>
                  <Typography mt={1}>მიმგარება</Typography>
                  <Stack direction={"row"} gap={"5px"}>
                    {users &&
                      users.map((e) => {
                        return (
                          <>
                            <div
                              onClick={() => setAssignedUser(e.id)}
                              className={`super-user ${e.id == assigneedUser ? "selected-super-user" : null}`}
                            >
                              <Stack
                                direction={"row"}
                                pl={2}
                                pr={2}
                                pt={0.5}
                                pb={0.5}
                                alignItems={"center"}
                                gap={"10px"}
                              >
                                <Stack direction={"row"}>
                                  {e.name} {e.surname}
                                </Stack>
                                <div
                                  className="assigned-to"
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    backgroundImage: `url('${import.meta.env.VITE_API_URL}/uploads/${e.iconPath}`,
                                  }}
                                ></div>
                              </Stack>
                            </div>
                          </>
                        );
                      })}
                  </Stack>
                </>
              )}
              <button
                className="primary-button-danger"
                onClick={handleVacationSubmit}
              >
                მოთხოვნა
              </button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default VacationCalendar;
