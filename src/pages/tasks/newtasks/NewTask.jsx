import { Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import UseNewTask from "../../../hooks/tasks/UseNewTask";
import { CurrentUserContext } from "../../../App";

function NewTask() {
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const { page, setPage } = useContext(CurrentUserContext);
  const [error, setError] = useState("");
  const { result, handleTaskAdd } = UseNewTask();
  const handleSubmit = async () => {
    setError("");
    if (newTask.title == "" || newTask.description == "" || newTask.endDate == '') {
      setError("ველი არ შეიძლება იყოს ცარიელი");
      return 0;
    }
    try {
      await handleTaskAdd(newTask);
      setPage({ sectionId: 3, pageId: 1 });
    } catch (err) {
      setError("შეცდომა: " + err.message);
    }
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <input
            type="text"
            name="title"
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="register-form"
            style={{ width: "100%" }}
            placeholder="დასახელება"
          />
        </Grid>
        <Grid item xs={6}>
          <input
            type="datetime-local"
            name="endDate"
            onChange={(e) => setNewTask({ ...newTask, endDate: e.target.value })}
            className="register-form"
            style={{ width: "100%" }}
            placeholder="დასრულების თარიღი"
          />
        </Grid>
        <Grid item xs={12}>
          <textarea
            style={{
              width: "100%",
              boxSizing: "border-box",
            }}
            p={2}
            type="email"
            name="description"
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            rows={20}
            className="register-form"
            placeholder="აღწერა"
          />
        </Grid>
      </Grid>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button className="log-out" onClick={handleSubmit}>
        შქმნა
      </button>
    </>
  );
}

export default NewTask;
