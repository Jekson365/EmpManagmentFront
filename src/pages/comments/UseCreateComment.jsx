import React, { useState } from "react";
import { API } from "../../api/Api";

function UseCreateComment() {
  const [loading, setLoading] = useState(true);
  const handleCommentCreate = async (params) => {
    try {
      await API.post("api/comment", params);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };
  return { loading,setLoading, handleCommentCreate };
}

export default UseCreateComment;
