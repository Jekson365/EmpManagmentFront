import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import UseTaskComment from "../../../hooks/comments/UseTaskComment";
import UseCreateComment from "../../comments/UseCreateComment";

function TaskCommnets({ taskId, userId }) {
  const [content, setContent] = useState("");
  const [commented, setCommented] = useState(false);
  const { setLoading, handleCommentCreate } = UseCreateComment();
  const { comments, loading, handleUserComments } = UseTaskComment();

  useEffect(() => {
    if (taskId) {
      handleUserComments(taskId);
    }
  }, [taskId, commented]);

  const handleSubmit = async () => {
    setCommented(false);
    if (!content.trim()) return;

    setLoading(true);
    const newComment = await handleCommentCreate({ userId, taskId, content });
    setLoading(false);
    setCommented(true);

    if (newComment) {
      setComments((prev) => [...prev, newComment]);
      setContent("");
    }
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Box height={"600px"} className="comments">
            <Stack
              direction={"column"}
              justifyContent={"space-between"}
              alignItems="flex-start"
              width={"100%"}
              gap={"20px"}
            >
              {comments?.map((e) => {
                return (
                  <>
                    <Grid container className="comment-box">
                      <Grid item xs={10}>
                        <Stack m={2} direction={"column"}>
                          <Typography
                            style={{
                              fontWeight: "bold",
                              fontSize: "13px",
                              color: "rgba(0,0,0,0.4)",
                              wordBreak: "break-all",
                              whiteSpace: "normal",
                            }}
                          >
                            {new Date(e?.createdAt).toLocaleString()}
                          </Typography>
                          <Stack direction={"row"} gap={"4px"}>
                            <Typography
                              style={{
                                fontSize: "12px",
                              }}
                            >
                              {e.user.name}
                            </Typography>
                            <Typography
                              style={{
                                fontSize: "12px",
                              }}
                            >
                              {e.user.surname}
                            </Typography>
                          </Stack>
                          <Typography
                            style={{
                              wordBreak: "break-word",
                              overflowWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                            mt={1}
                          >
                            {e?.content}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={2}>
                        <Box
                          mt={2.3}
                          className="user-icon"
                          style={{
                            backgroundImage: `url('${import.meta.env.VITE_API_URL}/uploads/${e?.user.iconPath}')`,
                            backgroundColor:
                              e?.user.iconPath == null ? "#FF9D23" : null,
                          }}
                        >
                          {e?.user.iconPath == null ? (
                            <>
                              <Typography style={{ color: "white" }}>
                                {e?.user.name[0]} {e?.user.surname[0]}
                              </Typography>
                            </>
                          ) : null}
                        </Box>
                      </Grid>
                    </Grid>
                  </>
                );
              })}
            </Stack>
          </Box>
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
      )}
    </>
  );
}

export default TaskCommnets;
