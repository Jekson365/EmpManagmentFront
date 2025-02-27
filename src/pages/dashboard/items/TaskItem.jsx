import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import UpdateTaskStatus from "../../../components/task-statuses/UpdateTaskStatus";
import AssignedUsers from "../../../components/users/AssignedUsers";
import AssignedTo from "../../../components/tasks/AssignedTo";

function TaskItem({ params, setCurrentTaskId }) {
  const [assignedUsers, setAssignedUsers] = useState(params.assignedUsers);

  const handleUpdateTasks = (taskId, userId) => {
    setAssignedUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== userId)
    );
  };
  return (
    <div className={`task-item task-background-status-${params.statusId}`}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"98%"}
      >
        <Typography
          onClick={() => setCurrentTaskId(params.id)}
          className="title"
        >
          {params.title}
        </Typography>
        <Stack direction={"row"} gap={"12px"}>
          {assignedUsers.map((user) => {
            return (
              <>
                <AssignedTo
                  key={user.id}
                  emp={user}
                  taskId={params.id}
                  updateTasks={handleUpdateTasks}
                />
              </>
            );
          })}
        </Stack>
      </Stack>
    </div>
  );
}

export default TaskItem;
