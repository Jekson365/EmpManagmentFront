import React, { useState, useContext } from "react";
import { Stack } from "@mui/material";
import UseCreateComment from "../../comments/UseCreateComment";
import { CurrentUserContext } from "../../../App";
import UseTaskComment from "../../../hooks/comments/UseTaskComment";

function CreateComment({ userId, taskId }) {
  const [content, setContent] = useState("");
  const { comments, handleUserComments, setComments } = UseTaskComment();
  const { loading, setLoading, handleCommentCreate } = UseCreateComment();
  const { user } = useContext(CurrentUserContext);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setLoading(true);
    const newComment = await handleCommentCreate({ userId, taskId, content });
    setLoading(false);

    if (newComment) {
      setComments((prev) => [...prev, newComment]); // Optimistically update UI
      setContent(""); // Clear input after submitting
    }
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
