import { Box, Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useContext, useEffect } from "react";
import UseVacationIndex from "../../../hooks/vacation/UseIndexVacation";
import { CurrentUserContext } from "../../../App";

function VacationReport() {
  const { user } = useContext(CurrentUserContext);
  const { vacations, useVacation } = UseVacationIndex();
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
    createData("Cheesecake", 321, 14.2, 52, 5.1),
    createData("Donut", 452, 25.0, 51, 4.9),
    createData("Brownie", 435, 22.0, 48, 4.5),
    createData("Muffin", 398, 21.0, 45, 5.0),
  ];

  useEffect(() => {
    useVacation(user.id);
    console.log(vacations);
  }, []);
  return (
    <Grid container mt={3}>
      <Grid item xs={12}>
        <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
          <Table stickyHeader sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>მომხმარებლის ID</TableCell>
                <TableCell align="right">დაწყების თარიღი</TableCell>
                <TableCell align="right">დასრულების თარიღი</TableCell>
                <TableCell align="right">მიმგარებულია</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vacations &&
                vacations.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.fromDate}</TableCell>
                    <TableCell align="right">{row.toDate}</TableCell>
                    <TableCell align="right">
                      {row.assignedToUser?.name} {row.assignedToUser.surname}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default VacationReport;
