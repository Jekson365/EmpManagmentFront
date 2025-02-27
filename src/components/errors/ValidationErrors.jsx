import { Alert, Snackbar } from "@mui/material";
import React from "react";

function ValidationErrors({ errors }) {
  const handleClose = () => {};
  console.log(errors);
  return (
    <>
      <Snackbar open={true} autoHideDuration={3000} onClose={handleClose}>
        {errors.length <= 0 &&
          errors.map((e) => {
            return (
              <>
                <h1>dasda</h1>
                {/* <Alert>dasda</Alert> */}
              </>
            );
          })}
      </Snackbar>
    </>
  );
}

export default ValidationErrors;
