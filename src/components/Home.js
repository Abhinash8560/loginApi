import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const Home = () => {
    const [users, setUser] = useState([]);
    useEffect(() => {
      loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:3005/users");
        console.log(result)
           setUser(result.data);
      };
    
      const deleteUser = async id => {
        await axios.delete(`http://localhost:3005/users/${id}`);
        loadUsers();
      };


  const classes = useStyles();
  const history = useHistory();
  const onButtonClick = () => {
    localStorage.removeItem('username');
    history.push('/');
    
  }
  return (
    <div>    <button className="logout"  onClick={onButtonClick} >Logout</button>

    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Username</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user,index) => (
            <TableRow>
              <TableCell component="th" scope="row">
              </TableCell>
              
              <TableCell align="center">{user.name}</TableCell>
              <TableCell align="center">{user.username}</TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="center"></TableCell>
              <Link className="btn btn-outline-light" to="/users/add">Add User</Link>

              <TableCell><Link class="btn btn-primary mr-5" to={`/users/${user.id}`}>
                    View
                  </Link>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/users/edit/${user.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    class="btn btn-danger"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                    </Link>
                    </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
export default Home;
