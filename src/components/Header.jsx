import { Box, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { CurrentUserContext } from "../App";

function Header() {
  const { user } = useContext(CurrentUserContext);
  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        className="head"
        mb={2}
      >
        <Box>
          <Typography className="header-name">{user.name}</Typography>
        </Box>
        <Box>
          <div
            className="icon"
            style={{
              backgroundImage: `url('${import.meta.env.VITE_API_URL}/uploads/${user.iconPath}')`,
            }}
          ></div>
        </Box>
      </Stack>
    </>
  );
}

export default Header;
