import React, { useState } from "react";
import { API } from "../../api/Api";

function UseRemoveAssignedTask() {
  const [result, setResult] = useState();

  const handleRemoveAssigned = async (params) => {
    console.log(params);
    try {
      await API.delete("api/task/assign",{
        data: params,
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        setResult(res.data);
      });
    } catch (err) {
      throw err;
    }
  };
  return { result, handleRemoveAssigned };
}

export default UseRemoveAssignedTask;
