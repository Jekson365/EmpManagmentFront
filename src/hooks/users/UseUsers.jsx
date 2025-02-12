import React, { useState } from "react";
import { API } from "../../api/Api";

function UseUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      await API.get("/api/user").then((res) => {
        setUsers(res.data);
        setLoading(false)
      });
    } catch (err) {
      throw err;
    }
  };

  return { users, getUsers,loading};
}

export default UseUsers;
