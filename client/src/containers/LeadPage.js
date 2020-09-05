import React, { useEffect, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DataTable from '../components/LeadList';
import LeadForm from '../components/LeadForm';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getLeads, createLead, deleteLead, updateLead } from '../utils/api';

const headers = [{ name: 'Client Name', key: 'name' }, { name: 'Email', key: 'email' }, { name: 'Phone', key: 'phone' }];

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

const formValues = { _id: null, name: '', email: '', phone: '' };
function LeadPage({ user }) {

  const [leads, setLeads] = React.useState([]);
  const [editState, setEditState] = React.useState(false);
  const [formData, setFormData] = React.useState(formValues);
  const classes = useStyles();


  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getLeads(user.id).then(data => {
      console.log(data);
      if (!data.err) {
        setLeads(data.leads);
      }
    })
  }

  const addOrUpdateLead = data => {
    setEditState(true);
    setFormData(data);
  }

  const onHandleDelete = (id, index) => {
    const updatedArr = [...leads];
    deleteLead(id).then(data => {
      if (!data.err) updatedArr.splice(index, 1);
      setLeads(updatedArr);
    });
  };


  const onSubmit = data => {
    const withUser = { ...data, user: user.id, id: data._id }
    if (data._id) {
      updateLead(withUser).then(result => {
        if (!result.err) {
          setEditState(false);
          getData();
        }
      });
    } else {
      createLead(withUser).then(result => {
        if (!result.err) {
          setEditState(false);
          getData();
        }
      });
    }
  }

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {!editState && (
        <DataTable
          list={leads}
          headers={headers}
          addLead={() => addOrUpdateLead(formValues)}
          onHandleDelete={onHandleDelete}
          onHandleEdit={data => addOrUpdateLead(data)}
        />
      )}
      {editState && (
        <LeadForm
          onSubmit={onSubmit}
          data={formData}
          onBackClick={() => setEditState(false)}
        />
      )}
    </main>
  );
}

const mapStateToProps = state => ({
  user: state.user ? state.user : null,
});

const withConnect = connect(
  mapStateToProps,
  {},
);

export default compose(
  withConnect,
  memo,
)(LeadPage);