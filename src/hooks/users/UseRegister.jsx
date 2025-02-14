import React from "react";
import { API } from "../../api/Api";

function UseRegister() {
  const handleRegister = async (params) => {
    await API.post("/api/user", params, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    }).then((res) => {
      console.log(res);
    });
  };

  return { handleRegister };
}

export default UseRegister;
