import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from "@material-ui/core/Fab";
import ContentCreate from "@material-ui/icons/Create";
import ActionDelete from "@material-ui/icons/Delete";
import { pink, grey, green } from "@material-ui/core/colors";
import { Tooltip } from "@material-ui/core";
import ContentAdd from "@material-ui/icons/Add";

const green400 = green["400"];
const grey500 = grey["500"];
const pink500 = pink['500'];

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  }
});

const styles = {
  editButton: {
    color: '#fff',
    backgroundColor: green400,
  },
  deleteButton: {
    color: "grey",
    fill: grey500,
  },
  fab: {
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    marginRight: 20,
    backgroundColor: pink500,
  },
}

export default function SimpleTable({ list, headers, addLead, onHandleDelete, onHandleEdit }) {
  const classes = useStyles();

  return (
    <div>
      <Tooltip title="Add" aria-label="add">
        <Fab
          size="small"
          color="secondary"
          style={styles.fab}
          onClick={addLead}
        >
          <ContentAdd />
        </Fab>
      </Tooltip>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map(h => (
                <TableCell key={h.key}>{h.name}</TableCell>
              ))}
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell >{row.email}</TableCell>
                <TableCell >{row.phone}</TableCell>
                <TableCell>
                  <Tooltip title="Edit" aria-label="edit" onClick={() => onHandleEdit(row)}>
                    <Fab
                      size="small"
                      style={styles.editButton}
                      href=''
                    >
                      <ContentCreate />
                    </Fab>
                  </Tooltip>

                </TableCell>
                <TableCell>
                  <Tooltip title="Delete" aria-label="delete" onClick={() => onHandleDelete(row._id, i)}>
                    <Fab
                      size="small"
                      style={styles.deleteButton}
                    >
                      <ActionDelete />
                    </Fab>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}