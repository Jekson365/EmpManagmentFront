import React from "react";
import { API } from "../../api/Api";

function UseAssignTask() {
  const handleTaskAssign = async (params) => {
    try {
      await API.post("api/task/assign", params);
    } catch (err) {
      throw err;
    }
  };

  return { handleTaskAssign };
}

export default UseAssignTask;
