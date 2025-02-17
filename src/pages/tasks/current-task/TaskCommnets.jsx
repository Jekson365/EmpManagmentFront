import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";

function TaskCommnets({ comments }) {
    useEffect(()=> {
        console.log(comments)
    },[comments])
    return (
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
                    <Typography m={2}>{e?.content}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Box mt={2.3} className="user-icon"
                        style={{
                            backgroundImage:`url('${import.meta.env.VITE_API_URL}/uploads/${e?.user.iconPath}')`,
                            backgroundColor: e?.user.iconPath == null ? 'green' : null
                        }}
                    ></Box>
                  </Grid>
                </Grid>
              </>
            );
          })}
        </Stack>
      </Box>
    </>
  );
}

export default TaskCommnets;
