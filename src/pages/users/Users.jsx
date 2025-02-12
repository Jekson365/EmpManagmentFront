import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import UseUsers from "../../hooks/users/UseUsers";
import { Box, CircularProgress } from "@mui/material";
import UpdateRoleDialog from "../../components/users/UpdateRoleDialog";
import "../../styles/components.scss";
import "../../styles/users.scss";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Users() {
  const { users, getUsers, loading } = UseUsers();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedUSer, setSelectedUser] = React.useState();

  React.useEffect(() => {
    getUsers();
  }, []);

  const handleRoleChange = (user) => {
    setOpenDialog(true);
    setSelectedUser(user);
  };
  return (
    <>
      <UpdateRoleDialog
        open={openDialog}
        setOpen={setOpenDialog}
        user={selectedUSer}
      />
      {loading ? (
        <>
          <CircularProgress />
        </>
      ) : null}
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 830, overflowY: "auto" }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableRowHead align="left" className="table-head">
                სახელი
              </TableRowHead>
              <TableRowHead className="table-head" align="left">
                მეილი
              </TableRowHead>
              <TableRowHead className="table-head" align="left">
                ასაკი
              </TableRowHead>
              <TableRowHead className="table-head" align="left">
                როლი
              </TableRowHead>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading == false &&
              users.map((row) => (
                <StyledTableRow
                  key={row.id}
                  onClick={() => handleRoleChange(row)}
                >
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.email}</StyledTableCell>
                  <StyledTableCell align="left">{row.age}</StyledTableCell>
                  <StyledTableCell align="left">
                    <Box
                      className={`role-button
                       role-button-${row.role.name}
                      
                      `}
                    >
                      {row.role.name}
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

const TableRowHead = styled(StyledTableCell)``;
