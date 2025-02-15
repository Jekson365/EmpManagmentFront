import React, { useEffect, useState } from "react";
import UseTaskStatuses from "../../hooks/task-statuss/UseTaskStatuses";
import { Stack, Typography } from "@mui/material";
import { API } from "../../api/Api";
import UseUpdateTaskStatus from "../../hooks/task-statuss/UseUpdateTaskStatus";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

function UpdateTaskStatus({
  currentTaskId,
  _currentStatusId,
  _currentStatusName,
}) {
  const [currentStatusData, setCurrentStatusData] = useState({
    statusId: "",
    statusName: "",
  });
  const [statusesOn, setStatusesOn] = useState(false);
  const { taskStatuses, loading, handleTaskStatuses } = UseTaskStatuses();
  const { result, loadingResponse, handleUpdateTaskStatus } =
    UseUpdateTaskStatus();

  const handleStatusChange = async (statuId, taskId, stName) => {
    // setCurrentStatusId(statuId);
    setCurrentStatusData({ statusId: statuId, statusName: stName });
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
              direction={"row"}
              gap={"10px"}
              // justifyContent={'center'}
              alignItems={"center"}
              pl={1}
              onClick={() => setStatusesOn(!statusesOn)}
            >
              <RadioButtonCheckedIcon
                className={`task-status-element task-status-${currentStatusData.statusId || _currentStatusId}`}
              />
              <Typography style={{ fontSize: "13px" }}>
                {currentStatusData.statusName || _currentStatusName}
              </Typography>
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
                    onClick={() =>
                      handleStatusChange(ts.id, currentTaskId, ts.name)
                    }
                  >
                    <Stack
                      p={1}
                      direction={"row"}
                      gap={"10px"}
                      alignItems={"flex-start"}
                    >
                      <RadioButtonCheckedIcon
                        className={`task-status-element task-status-${ts.id}`}
                      />
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
