import { Box, Stack } from "@mui/material";
import React from "react";

function About({ user }) {
  return (
    <>
      <Box className="column basic-info">
        <Stack
          direction={"column"}
          alignItems={"flex-start"}
          justifyContent={"center"}
          gap={"25px"}
        >
          <div
            className="profile-icon"
            style={{
              backgroundImage: `url('${import.meta.env.VITE_API_URL}/uploads/${user.iconPath}')`,
            }}
          ></div>
          <Stack direction={"column"} alignItems={"center"} gap={"7px"}>
            <div className="name">{user.name}</div>
            <div className="surname">{user.surname}</div>
            <div className="position">Front-end Developer</div>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default About;
