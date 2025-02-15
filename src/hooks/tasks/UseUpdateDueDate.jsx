import React from "react";
import { API } from "../../api/Api";

function UseUpdateDueDate() {
  const handleDueDateUpdate = async (params) => {
    try {
      await API.put("api/task/update_due_date", params);
    } catch (err) {
      throw err;
    }
  };

  return { handleDueDateUpdate };
}

export default UseUpdateDueDate;
