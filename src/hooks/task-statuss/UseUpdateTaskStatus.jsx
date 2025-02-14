import React, { useState } from "react";
import { API } from "../../api/Api";

function UseUpdateTaskStatus() {
  const [result, setResult] = useState();
  const [loadingResponse, setLoading] = useState(true);

  const handleUpdateTaskStatus = async (taskId, statusId) => {
    try {
      await API.put("/api/task/update_task_status", {
        taskId: taskId,
        statusId: statusId,
      }).then((res) => {
        setResult(res);
        setLoading(false);
      });
    } catch (err) {
      throw err;
    }
    setLoading(false);
  };

  return { result, loadingResponse, handleUpdateTaskStatus };
}

export default UseUpdateTaskStatus;
