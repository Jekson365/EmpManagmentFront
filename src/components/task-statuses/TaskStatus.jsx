import { Box, Stack } from "@mui/material";
import React, { useEffect } from "react";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

function TaskStatus({ params }) {
  return (
    <>
      <Box className="task-status">
        <Stack direction={"row"} alignItems={"center"} gap={"5px"}>
          <RadioButtonCheckedIcon className={`task-status-${params.statusId}`} />
          <div className={`name`}>{params.status}</div>
        </Stack>
      </Box>
    </>
  );
}

export default TaskStatus;
