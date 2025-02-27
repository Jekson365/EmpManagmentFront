import React, { useState } from "react";
import { API } from "../../api/Api";

function UseRegister() {
  const [response, setResponse] = useState([]);
  const handleRegister = async (params) => {
    const response = await API.post("/api/user", params, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    }).then((res) => {
      console.log(res);
    });
    setResponse(response);
  };

  return { handleRegister, response };
}

export default UseRegister;
