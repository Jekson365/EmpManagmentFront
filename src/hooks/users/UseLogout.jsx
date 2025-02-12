import React from "react";
import { API } from "../../api/Api";

function UseLogout() {
  const handleLogout = async () => {
    await API.post("/auth/logout").then((res) => {
      window.location.reload();
    });
  };

  return { handleLogout };
}

export default UseLogout;
