import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DataTable from '../components/List';
import UserForm from '../components/UserForm';
import { getUsers, createUser, deleteUser, updateUser } from '../utils/api';

const headers = [{ name: 'Name', key: 'name' }, { name: 'Email', key: 'email' }, { name: 'Role', key: 'isAdmin' }];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

const formValues = { _id: null, name: '', email: '', password: '', isAdmin: '' };

function HomePage() {

  const [users, setUsers] = React.useState([]);
  const [editState, setEditState] = React.useState(false);
  const [formData, setFormData] = React.useState(formValues);
  const classes = useStyles();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getUsers().then(data => {
      console.log(data);
      if (!data.err) {
        setUsers(data.users);
      }
    })
  }

  const addOrUpdateUser = data => {
    setEditState(true);
    setFormData({ ...data, password: '', isAdmin: data.isAdmin ? 'admin' : 'staff' });
  }

  const onSubmit = data => {
    if (data._id) {
      updateUser(data).then(result => {
        if (!result.err) {
          setEditState(false);
          getData();
        }
      });
    } else {
      createUser(data).then(result => {
        if (!result.err) {
          setEditState(false);
          getData();
        }
      });
    }
  }

  const onHandleDelete = (id, index) => {
    const updatedArr = [...users];
    deleteUser(id).then(data => {
      if (!data.err) updatedArr.splice(index, 1);
      setUsers(updatedArr);
    });
  };

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {!editState && (
        <DataTable
          list={users}
          headers={headers}
          addUser={() => addOrUpdateUser(formValues)}
          onHandleDelete={onHandleDelete}
          onHandleEdit={addOrUpdateUser}
        />
      )}
      {editState && (
        <UserForm
          data={formData}
          onSubmit={onSubmit}
          onBackClick={() => setEditState(false)}
        />
      )}
    </main>
  );
}

export default HomePage;