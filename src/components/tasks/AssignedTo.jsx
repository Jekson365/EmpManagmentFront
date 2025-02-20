import React, { useContext } from "react";
import UseRemoveAssignedTask from "../../hooks/tasks/UseRemoveAssignedTask";
import CloseIcon from "@mui/icons-material/Close";
import { Stack, Typography } from "@mui/material";
import { TaskItemContext } from "../../pages/tasks/Tasks";

function AssignedTo({ emp, taskId, setTasks }) {
  const { handleRemoveAssigned } = UseRemoveAssignedTask();
  const removeEmployee = async () => {
    await handleRemoveAssigned({ userId: emp.id, taskId });
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              assignedUsers: task.assignedUsers.filter(
                (user) => user.id !== emp.id
              ),
            }
          : task
      )
    );
  };

  return (
    <>
      <div
        className="assigned-to"
        style={{
          backgroundImage: `url('${import.meta.env.VITE_API_URL}/uploads/${emp.iconPath}')`,
          backgroundColor: emp.iconPath == null ? "#f29f67" : null,
        }}
      >
        <div className="remove-icon" onClick={removeEmployee}>
          <CloseIcon />
        </div>
        {emp.iconPath == null ? emp.name[0] + "" + emp.surname[0] : null}
        <Stack className="emp-info">
          <Typography>
            {emp.name} {emp.surname}
          </Typography>
        </Stack>
      </div>
    </>
  );
}

export default AssignedTo;
