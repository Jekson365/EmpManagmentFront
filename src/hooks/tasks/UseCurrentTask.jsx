import React, { useState } from "react";
import { API } from "../../api/Api";

function UseCurrentTask() {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleCurrentTask = (userId) => {
    API.get(`api/task/${userId}`)
      .then((res) => {
        setTask(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        throw err;
      });
  };
  return { task, loading, handleCurrentTask };
}

export default UseCurrentTask;
