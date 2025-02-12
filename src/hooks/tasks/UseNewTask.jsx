import React, { useState } from "react";
import { API } from "../../api/Api";

function UseNewTask() {
  const [result, setResult] = useState();
  const handleTaskAdd = async (params) => {
    try {
      await API.post("api/task", params);
    } catch (err) {
      throw err;
    }
  };

  return { result, handleTaskAdd };
}

export default UseNewTask;
