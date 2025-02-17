import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";

function AssignedUsers({ params }) {
  const arr = [1, 2, 3, 4, 5, 6];
  return (
    <>
      {params.map((user) => {
        return (
          <>
            <Box className="emp-list-item">
              <Stack direction={"row"}>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  width={"100%"}
                  p={1}
                >
                  <Box
                    className="emp-item-image"
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50px",
                      backgroundImage: `url('${import.meta.env.VITE_API_URL}/uploads/${user.iconPath}')`,
                      backgroundColor: user.iconPath == null ? "#f29f67" : null,
                    }}
                  >
                    {user.iconPath === null
                      ? user.name[0] + " " + user.surname[0]
                      : null}
                  </Box>
                  <Typography color="white">
                    {/* {user.name} {user.surname} */}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </>
        );
      })}
    </>
  );
}

export default AssignedUsers;
