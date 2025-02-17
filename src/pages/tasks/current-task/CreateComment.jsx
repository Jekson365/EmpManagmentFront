import React, { useState, useContext } from "react";
import { Stack } from "@mui/material";
import UseCreateComment from "../../comments/UseCreateComment";
import { CurrentUserContext } from "../../../App";

function CreateComment({ userId, taskId, addCommentToState }) {
  const [content, setContent] = useState("");
  const { loading, setLoading, handleCommentCreate } = UseCreateComment();
  const { user } = useContext(CurrentUserContext);

  const handleSubmit = async () => {
    setLoading(true);
    const newComment = await handleCommentCreate({
      userId: userId,
      taskId: taskId,
      content: content,
    });
    setLoading(false);

    addCommentToState(newComment);
    window.location.reload()
};

  return (
    <>
      <Stack
        className="make-comment"
        direction={"row"}
        justifyContent={"space-between"}
        gap={"10px"}
      >
        <input
          type="text"
          onChange={(e) => setContent(e.target.value)}
          style={{ width: "100%" }}
        />
        <button onClick={handleSubmit} style={{ cursor: "pointer" }}>
          გაგზავნა
        </button>
      </Stack>
    </>
  );
}

export default CreateComment;
