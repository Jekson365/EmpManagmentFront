import React, { useState } from "react";
import { API } from "../../api/Api";

function UseFilterTask() {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [taskFilterLoading, setTaskFilterLoading] = useState(true);

  const handleFilterTask = async (statusId) => {
    try {
      await API.post(`api/task`, { statusId: statusId }).then((res) => {
        setFilteredTasks(res.data);
        setTaskFilterLoading(false);
      });
    } catch (err) {
      throw err;
    }
  };

  return { filteredTasks, taskFilterLoading, handleFilterTask };
}

export default UseFilterTask;
