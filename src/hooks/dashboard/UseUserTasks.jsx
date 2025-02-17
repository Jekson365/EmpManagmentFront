import React, { useState } from "react";
import { API } from "../../api/Api";

function UseUserTasks() {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleUserTasks = (userId) => {
    try {
      API.get(`api/task/get_task_by_user/${userId}`).then((res) => {
        setResult(res.data);
        setLoading(false);
      });
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  return { result, loading, handleUserTasks };
}

export default UseUserTasks;
