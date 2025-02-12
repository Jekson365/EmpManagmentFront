import { Box, Grid } from "@mui/material";
import React, { useContext } from "react";
import Navigation from "../components/navigation/Navigation";
import PageLoader from "../PageLoader";
import { CurrentUserContext } from "../App";
import Login from "./auth/Login";
import Header from "../components/Header";

function MainLayout() {
  const { user, page } = useContext(CurrentUserContext);
  return (
    <>
      {user.id ? (
        <>
          <Grid container height={"100vh"}>
            <Grid xs={2} item p={2} className="layout-col-1">
              <Navigation />
            </Grid>
            <Grid xs={10} item p={2} className="layout-col-2">
              <Header />
              <PageLoader params={page} />
            </Grid>
          </Grid>
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

export default MainLayout;
