import React, { useState } from "react";
import { API } from "../../api/Api";

function UseTaskComment() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleUserComments = async (taskId) => {
    try {
      await API.get(`api/comment/${taskId}`).then((res) => {
        setComments(res.data);
        setLoading(false);
      });
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  return { comments, loading, handleUserComments, setComments };
}

export default UseTaskComment;
