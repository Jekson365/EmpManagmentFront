import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { API } from "../../api/Api";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Snackbar, Stack, Typography } from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const isLogged = Cookies.get(".AspNetCore.Cookies");

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, []);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleForm = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData({ ...formData, [name]: value });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    if (formData.email == "" || formData.password == "") {
      setOpen(true);
    }
    try {
      await API.post("/auth/login", formData).then((res) => {
        window.location.reload();
      });
    } catch (e) {
      setOpen(true);
      throw e;
    }
  };
  return (
    <>
      <Stack
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        minHeight={"100vh"}
        gap={"20px"}
      >
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            open={open}
            onClose={handleClose}
            severity="error"
            variant="filled"
            style={{
              width: "300px",
            }}
          >
            danger
          </Alert>
        </Snackbar>
        <Stack
          className="login-form"
          width={"300px"}
          gap={"15px"}
          direction={"column"}
        >
          <Typography textAlign={"center"} variant="h6">
            სისტემაში შესვლა
          </Typography>
          <Stack direction={"column"} justifyContent={"center"} gap={"7px"}>
            <Typography fontSize={"13px"}>მეილი</Typography>
            <input
              className="input-field"
              name="email"
              onChange={handleForm}
              type="text"
              placeholder="მეილი"
            />
          </Stack>
          <Stack gap={"7px"}>
            <Typography fontSize={"13px"}>პაროლი</Typography>
            <input
              className="input-field"
              onChange={handleForm}
              name="password"
              type="password"
              placeholder="პაროლი"
            />
          </Stack>
          <button className="submit-button" onClick={handleSubmit}>
            შესვლა
          </button>
        </Stack>
      </Stack>
    </>
  );
}

export default Login;
