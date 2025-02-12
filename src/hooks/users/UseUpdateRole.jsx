import React, { useState } from "react";
import { API } from "../../api/Api";

function UseUpdateRole() {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(true);

  const handleUpdateRole = async (userId, roleId) => {
    try {
      await API.put("/api/user/update_role", {
        userId: userId,
        roleId: roleId,
      }).then((res) => {
        setResult(res);
        setLoading(false);
      });
    } catch (err) {
      throw err;
    }
    setLoading(false)
  };

  return { result, loading, handleUpdateRole };
}

export default UseUpdateRole;
