import React, { useState } from "react";
import { API } from "../../api/Api";

function UseTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleTasks = async () => {
    try {
      await API.get("api/task").then((res) => {
        setTasks(res.data);
        setLoading(false);
      });
    } catch (err) {
      throw err;
    }
  };

  return { tasks, loading, handleTasks };
}

export default UseTasks;
