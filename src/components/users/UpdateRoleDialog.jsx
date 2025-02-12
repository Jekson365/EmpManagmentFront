import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Snackbar, Stack } from "@mui/material";
import UseUpdateRole from "../../hooks/users/UseUpdateRole";

export default function UpdateRoleDialog({ open, setOpen, user }) {
  const [selectedRole, setSelectedRole] = React.useState(1);
  const [messageBar, setMessageBar] = React.useState(false);
  const { result, loadingRole, handleUpdateRole } = UseUpdateRole();
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    await handleUpdateRole(user.id, selectedRole);
    setOpen(false);
  };

  const handleCloseSnack = () => {
    setMessageBar(false);
  };

  React.useEffect(() => {
    if (result && result.status == 200) {
      setMessageBar(true);
    }
  }, [result]);

  return (
    <>
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Update Role"}</DialogTitle>
          <DialogContent>
            <Stack direction={"row"} gap={"10px"}>
              <Button
                onClick={() => setSelectedRole(1)}
                variant={selectedRole === 1 ? "contained" : "outlined"}
                color="error"
              >
                user
              </Button>
              <Button
                onClick={() => setSelectedRole(2)}
                variant={selectedRole === 2 ? "contained" : "outlined"}
                color="error"
              >
                admin
              </Button>
              <Button
                onClick={() => setSelectedRole(3)}
                variant={selectedRole === 3 ? "contained" : "outlined"}
                color="error"
              >
                superadmin
              </Button>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit}>update</Button>
            <Button onClick={handleClose} autoFocus>
              cancel
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      <Snackbar
        open={messageBar}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
        message="user updated"
      />
    </>
  );
}
