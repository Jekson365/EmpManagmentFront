import { Box, CircularProgress, Grid, Stack } from "@mui/material";
import React, { use, useContext, useEffect } from "react";
import "../../../styles/profile.scss";
import { CurrentUserContext } from "../../../App";
import UseNoteByUser from "../../../hooks/notes/UseNoteByUser";
import Notes from "./Notes";
import About from "./About";

function Profile() {
  const { user } = useContext(CurrentUserContext);
  const { notes, notesLoading, handleNotes } = UseNoteByUser();

  useEffect(() => {
    handleNotes(user.id);
  }, []);
  return (
    <>
      <Grid container columnSpacing={3} sx={{ height: "100%" }}>
        <Grid item xs={3}>
          <About user={user} />
        </Grid>
        <Grid item xs={9} sx={{ minHeight: "100px" }}>
          <Grid container columnSpacing={3} height={"100%"}>
            <Grid item xs={6}>
              <Box className="column about-section">
                <Stack p={3} direction={"column"} gap={"10px"}>
                  <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
                    <div className="sec-title">დაბადების თარიღი: </div>
                    <div className="sec-value">
                      {new Date(user.birthDate).toLocaleDateString()}
                    </div>
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
                    <div className="sec-title">აყვანის თარიღი: </div>
                    <div className="sec-value">
                      {new Date(user.hiredDate).toLocaleDateString()}
                    </div>
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
                    <div className="sec-title">ტელეფონის ნომერი: </div>
                    <div className="sec-value">{user.phoneNumber}</div>
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
                    <div className="sec-title">სანდო კონტაქტი</div>
                    <div className="sec-value">{user.trustedContact}</div>
                  </Stack>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className="note-item-cover" mt={1} height={"350px"}>
                <Box height={"100%"}>
                  {notesLoading ? (
                    <CircularProgress />
                  ) : (
                    <>
                      <Notes notes={notes} />
                    </>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Profile;
