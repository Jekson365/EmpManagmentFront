import React, { useEffect, useState } from "react";
import UseTaskStatuses from "../../hooks/task-statuss/UseTaskStatuses";
import { Stack, Typography } from "@mui/material";
import { API } from "../../api/Api";
import UseUpdateTaskStatus from "../../hooks/task-statuss/UseUpdateTaskStatus";

function UpdateTaskStatus({ currentTaskId, _currentStatusId }) {
  const [currentStatusId, setCurrentStatusId] = useState(null);
  const [statusesOn, setStatusesOn] = useState(false);
  const { taskStatuses, loading, handleTaskStatuses } = UseTaskStatuses();
  const { result, loadingResponse, handleUpdateTaskStatus } =
    UseUpdateTaskStatus();

  const handleStatusChange = async (statuId, taskId) => {
    setCurrentStatusId(statuId);
    await handleUpdateTaskStatus(taskId, statuId);
  };
  useEffect(() => {
    async function fetchData() {
      await handleTaskStatuses();
    }
    fetchData();
  }, []);
  return (
    <>
      <div className="status-container">
        <div className="select-bar">
          <div className="status-bar-element">
            <Stack
              p={1}
              direction={"row"}
              gap={"10px"}
              alignItems={"flex-start"}
              onClick={() => setStatusesOn(!statusesOn)}
            >
              <div
                className={`task-status-element task-status-${currentStatusId || _currentStatusId}`}
              ></div>
              <Typography style={{ fontSize: "13px" }}>დასრულებული</Typography>
            </Stack>
          </div>
        </div>
        <Stack
          gap="0px"
          mt={1}
          direction={"column"}
          className="statuses"
          display={statusesOn ? "flex" : "none"}
        >
          {taskStatuses &&
            taskStatuses.map((ts) => {
              return (
                <>
                  <div
                    className="status-bar-element"
                    onClick={() => handleStatusChange(ts.id, currentTaskId)}
                  >
                    <Stack
                      p={1}
                      direction={"row"}
                      gap={"10px"}
                      alignItems={"flex-start"}
                    >
                      <div
                        className={`task-status-element task-status-${ts.id}`}
                      ></div>
                      <Typography style={{ fontSize: "13px" }}>
                        {ts.name}
                      </Typography>
                    </Stack>
                  </div>
                </>
              );
            })}
        </Stack>
      </div>
    </>
  );
}

export default UpdateTaskStatus;
