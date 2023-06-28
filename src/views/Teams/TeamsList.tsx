import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createMuiTheme, ThemeProvider } from '@mui/material/styles';

const theme2 = createMuiTheme({
  palette: {
    primary: {
      main: '#DAEFB3', // Custom primary color
    },
    secondary: {
      main: '#EEF4D4', // Custom secondary color
    },
  },
  typography: {
    fontFamily: 'Helvetica',
    }
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme2.palette.primary.main,
    color: theme2.palette.common.black,
    // do font changes here
    fontSize: 18,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&': {
    backgroundColor: theme2.palette.secondary.main,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  teamNumber: number,
  location: string,
  division: string,
) {
  return { name, teamNumber, location, division};
}

const rows = [
  createData('Roboeagles', 4828, 'Raleigh, NC', 'FIRST NC'),
  createData('Terrorbytes', 4561, 'Raleigh, NC', 'FIRST NC'),
  createData('The Zebracorns', 900, 'Durham, NC', 'FIRST, NC'),
  createData('Pitt Pirates', 2642, 'Greenville, NC', 'FIRST NC'),
  createData('Eastbots', 4795, 'Chapel Hill, NC', 'FIRST NC'),
];


export default function CustomizedTables() {
  return (
    <ThemeProvider theme={theme2}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Team Number</StyledTableCell>
            <StyledTableCell align="right">Team Name</StyledTableCell>
            <StyledTableCell align="right">Location</StyledTableCell>
            <StyledTableCell align="right">Division</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.teamNumber}
              </StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.location}</StyledTableCell>
              <StyledTableCell align="right">{row.division}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </ThemeProvider>
  );
}
