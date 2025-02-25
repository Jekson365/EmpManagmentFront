import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Alert, Grid, Snackbar } from "@mui/material";
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
    phone: "",
    birthdate: "",
    position: "",
    trustedContact: "",
    hiredDate: "",
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
            <label>მეილი</label>
            <input
              className="register-form"
              type="email"
              name="email"
              style={{ width: "100%" }}
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <label>სახელი</label>
            <input
              className="register-form"
              type="text"
              name="name"
              style={{ width: "100%" }}
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <label>გვარი</label>
            <input
              className="register-form"
              type="text"
              name="surname"
              style={{ width: "100%" }}
              value={formData.surname}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <label>ასაკი</label>
            <input
              className="register-form"
              type="number"
              name="age"
              style={{ width: "100%" }}
              value={formData.age}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <label>ტელეფონი</label>
            <input
              className="register-form"
              type="text"
              name="phone"
              style={{ width: "100%" }}
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <label>დაბადების თარიღი</label>
            <input
              className="register-form"
              type="date"
              name="birthdate"
              style={{ width: "100%" }}
              value={formData.birthdate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <label>თანამდებობა</label>
            <input
              className="register-form"
              type="text"
              name="position"
              style={{ width: "100%" }}
              value={formData.position}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <label>სანდო კონტაქტი</label>
            <input
              className="register-form"
              type="text"
              name="trustedContact"
              style={{ width: "100%" }}
              value={formData.trustedContact}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <label>დასაქმების თარიღი</label>
            <input
              className="register-form"
              type="date"
              name="hiredDate"
              style={{ width: "100%" }}
              value={formData.hiredDate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <label>ფოტო</label>
            <input
              className="register-form"
              type="file"
              name="icon"
              style={{ width: "100%" }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <label>პაროლი</label>
            <input
              className="register-form"
              type="password"
              name="password"
              style={{ width: "100%" }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <button className="log-out" type="submit" onClick={handleSubmit}>
              რეგისტრაცია
            </button>
          </Grid>
        </Grid>
      </form>

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
