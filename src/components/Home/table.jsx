import { useState, useEffect } from "react";
import { addData } from "../../Redux/Data/action.js";
import {useSelector, useDispatch} from "react-redux";


import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



 export const Taable = ({toggleShow, show, setshow}) => {
  const {data} = useSelector((store) => (store.data))
  const dispatch = useDispatch();

  const getData = () => {
    fetch("https://city-countries.herokuapp.com/cities")
      .then((res) => res.json())
      .then((value) => dispatch(addData(value)));
  };

  const handleDelete = (id) => {
    fetch(`https://city-countries.herokuapp.com/cities/${id}`, {
      method: "DELETE"
    })
    .then(alert("Proceed To Delete ?"))
    .then(getData())
  }

  useEffect(() => {
    getData();
  }, []);
  console.log(data)
  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
        <StyledTableCell>id</StyledTableCell>
        <StyledTableCell>Country</StyledTableCell>
          <StyledTableCell>City</StyledTableCell>
          <StyledTableCell>Population</StyledTableCell>
          <StyledTableCell>Edit</StyledTableCell>
          <StyledTableCell>Delete</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((e) => (
          <StyledTableRow key={e.id}>
            <StyledTableCell scope="row">{e.id}</StyledTableCell>
            <StyledTableCell scope="row">{e.country}</StyledTableCell>
            <StyledTableCell scope="row">{e.city}</StyledTableCell>
            <StyledTableCell scope="row">{e.population}</StyledTableCell>
            <StyledTableCell scope="row">
              <button onClick = {() => {toggleShow(e)}} style = {{backgroundColor: "#757575", color: "white", fontWeight: "bold", fontSize: "14px", borderRadius:"3px"}}>Edit</button>
            </StyledTableCell>
            <StyledTableCell scope="row">
              <button onClick = {() => {handleDelete(e.id)}} style = {{backgroundColor: "#455a64", color: "white", fontWeight: "bold", fontSize: "14px", borderRadius:"3px"}}>Delete</button>
              </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
    </TableContainer>
  );
};
