import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { API } from "../../api/Api";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Button, Grid, Snackbar, Typography } from "@mui/material";
import UseRegister from "../../hooks/users/UseRegister";

function Register() {
  const navigate = useNavigate();
  const { handleRegister } = UseRegister();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const isLogged = Cookies.get(".AspNetCore.Cookies");

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    surname: "",
    age: "",
    icon: null,
    password: "",
  });

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleRegister(formData);
      window.location.reload();
    } catch (err) {
      throw err;
    }
  };
  return (
    <>
      <form encType="multipart/form-data">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <input
              type="email"
              name="email"
              className="register-form"
              style={{ width: "100%" }}
              placeholder="მეილი"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <input
              type="text"
              name="name"
              className="register-form"
              style={{ width: "100%" }}
              placeholder="სახელი"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <input
              type="text"
              name="surname"
              className="register-form"
              style={{ width: "100%" }}
              placeholder="გვარი"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <input
              type="number"
              name="age"
              className="register-form"
              style={{ width: "100%" }}
              placeholder="ასაკი"
              value={formData.age}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <input
              type="file"
              name="icon"
              placeholder="ფოტო"
              className="register-form"
              style={{ width: "100%" }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <input
              type="password"
              name="password"
              placeholder="პაროლი"
              className="register-form"
              style={{ width: "100%" }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <button
              className="log-out"
              type="submit"
              onClick={handleSubmit}
              variant="contained"
              color="primary"
            >
              რეგისტრაცია
            </button>
          </Grid>
        </Grid>
      </form>

      {/* Snackbar for feedback */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
      >
        <Alert severity={severity} onClose={() => setOpen(false)}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Register;
