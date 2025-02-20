import React, { useEffect, useState } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import UseTasks from "../../../hooks/tasks/UseTasks";
import AssignedTo from "../../../components/tasks/AssignedTo";
import { Stack } from "@mui/system";
import TaskStatus from "../../../components/task-statuses/TaskStatus";
import { Table } from "flowbite-react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { Typography } from "@mui/material";
function MyTask() {
  const columns = [
    {
      field: "სტატუსი",
      title: "სტატუსი",
      sortable: false,
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <TaskStatus params={params.row} />
          </>
        );
      },
    },
    {
      field: "დასახელება",
      sortable: false,
      title: "დასახელება",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <Typography>{params.row.title}</Typography>
          </>
        );
      },
    },
    {
      field: "აღწერა",
      sortable: false,
      title: "აღწერა",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <Typography>{params.row.description}</Typography>
          </>
        );
      },
    },
    {
      field: "მიმაგრებულია",
      sortable: false,
      title: "მიმაგრებულია",
      width: 250,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          {params.row.assignedUsers?.map((user) => (
            <AssignedTo key={user.id} emp={user} taskId={params.row.id} />
          )) || "No Assignee"}
        </Stack>
      ),
    },
    {
      field: "შექმნის თარიღი",
      sortable: false,
      title: "შექმნის თარიღი",
      width: 250,
      renderCell: (params) => (
        <Typography>
          {new Date(params.row.createdAt).toLocaleString()}
        </Typography>
      ),
    },
    {
      field: "დასრულების თარიღი",
      sortable: false,
      title: "დასრულების თარიღი",
      width: 250,
      renderCell: (params) => (
        <Typography>
          {new Date(params.row.endDate).toLocaleString()}
        </Typography>
      ),
    },
  ];
  const { tasks, loading, handleTasks } = UseTasks();

  useEffect(() => {
    handleTasks();
  }, []);

  const paginationModel = { page: 2, pageSize: 5 };

  return (
    <>
      <Paper sx={{ height: "90vh", width: "100%" }}>
        <DataGrid
          rows={tasks}
          columns={columns}
          sortable={false}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{
            border: 0,
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
            },
            "& .MuiDataGrid-columnHeader": {
              alignItems: "center",
              textAlign: "center",
            },
          }}
        />
      </Paper>
    </>
  );
}

export default MyTask;
