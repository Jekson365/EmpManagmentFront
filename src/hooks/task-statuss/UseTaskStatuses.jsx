import React, { useState } from "react";
import { API } from "../../api/Api";

function UseTaskStatuses() {
  const [taskStatuses, setTaskStatuses] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleTaskStatuses = async () => {
    try {
      await API.get("api/task_status")
      .then((res) => {
        setTaskStatuses(res.data);
        setLoading(false);
      });
    } catch (err) {
      throw err;
    }
  };

  return { taskStatuses, loading, handleTaskStatuses };
}

export default UseTaskStatuses;
