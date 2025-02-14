import React, { useState } from "react";
import { API } from "../../api/Api";

function UseCurrentTask() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleCurrentTask = (userId) => {
    API.get(`api/task/${userId}`)
      .then((res) => {
        setResult(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        throw err;
      });
  };
  return { result, loading, handleCurrentTask };
}

export default UseCurrentTask;
