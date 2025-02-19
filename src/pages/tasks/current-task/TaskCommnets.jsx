import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import UseTaskComment from "../../../hooks/comments/UseTaskComment";

function TaskCommnets({ taskId }) {
  const { comments, loading, handleUserComments } = UseTaskComment();
  useEffect(() => {
    if (taskId) {
      handleUserComments(taskId);
    }

    const interval = setInterval(() => {
      handleUserComments(taskId);
    }, 5000);

    return () => clearInterval(interval);
  }, [taskId]);

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
        </>
      )}
    </>
  );
}

export default TaskCommnets;
