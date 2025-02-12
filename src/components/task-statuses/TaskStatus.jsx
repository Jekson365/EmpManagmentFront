import { Box, Stack } from "@mui/material";
import React from "react";

function TaskStatus({ params }) {
  return (
    <>
      <Box className="task-status">
        <Stack direction={"row"} alignItems={"center"} gap={"5px"}>
          <div className={`icon task-status-${params.statusId}`}></div>
          <div className={`name`}>{params.status}</div>
        </Stack>
      </Box>
    </>
  );
}

export default TaskStatus;
