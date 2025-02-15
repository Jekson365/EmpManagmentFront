import React, { useState } from "react";
import { API } from "../../api/Api";

function UseTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleTasks = async (statusId) => {
    try {
      await API.post("api/task/get_tasks_by_status", { statusId: statusId }).then(
        (res) => {
          setTasks(res.data);
          setLoading(false);
        }
      );
    } catch (err) {
      throw err;
    }
  };

  return { tasks, loading, setTasks, handleTasks };
}

export default UseTasks;
