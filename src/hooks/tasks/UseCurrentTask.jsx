import React, { useState } from "react";
import { API } from "../../api/Api";

function UseCurrentTask() {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleCurrentTask = (userId) => {
    API.get(`api/task/${userId}`).then((res) => {
      setResult(res.data);
      setLoading(false);
    });
  };
  return { result, loading, handleCurrentTask };
}

export default UseCurrentTask;
