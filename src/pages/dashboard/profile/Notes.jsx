import { Box, Stack } from "@mui/material";
import React from "react";

function Notes({ notes }) {
  return (
    <>
      <Stack direction={"column"} gap={"5px"}>
        {notes &&
          notes.map((note) => {
            return (
              <>
                <Box className="comment">
                  <div
                    className="user-icon"
                    style={{
                      backgroundImage: `url('${import.meta.env.VITE_API_URL}/uploads/${note.iconPath}')`,
                    }}
                  ></div>
                  <div className="content">
                    <div className="date">
                      {new Date(note?.createdAt).toLocaleString()}
                    </div>
                    <div className="content-cover">{note.content}</div>
                  </div>
                </Box>
              </>
            );
          })}
      </Stack>
    </>
  );
}

export default Notes;
