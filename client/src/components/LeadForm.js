import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from "@material-ui/icons/Save";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { LinearProgress, Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field } from "formik";
import Divider from "@material-ui/core/Divider";
import { TextField } from "formik-material-ui";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '75ch',
    },
  },
  paper: {
    padding: '10px'
  },
  btn: {
    marginLeft: '5px'
  },
}));

const styles = {
  container: {
    marginTop: '2em',
  },
  cell: {
    padding: '1em',
  },
  buttons: {
    marginTop: 30,
  },
  saveButton: {
    marginLeft: 5,
  },
}


export default function LeadForm({data, onSubmit, onBackClick}) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <h1>Leads</h1>
      <Formik
      initialValues={data}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        if(!values.name) {
          errors.name = 'Required';
        }
        if(!values.phone) {
          errors.phone = 'Required';
        } else if(isNaN(values.phone)) {
          errors.phone = 'Should be numbers';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          onSubmit(values)
        }, 500);
      }}
    >
      {({ submitForm, isSubmitting }) => (
      <Form>
        <Grid container style={styles.container} spacing={3}>
          <Grid item style={styles.cell} xs={12} md={6}>
            <Field
              variant="outlined"
              component={TextField}
              name="name"
              label="Name"
              fullWidth={true}
              required
            />
          </Grid>
          <Grid item style={styles.cell} xs={12} md={6}>
            <Field
              variant="outlined"
              component={TextField}
              name="email"
              type="email"
              label="Email"
              fullWidth={true}
              required
            />
          </Grid>
          <Grid item style={styles.cell} xs={12} md={6}>
            <Field
              variant="outlined"
              component={TextField}
              type="phone"
              label="phone"
              name="phone"
              fullWidth={true}
              required
            />
          </Grid>
          </Grid>

          {isSubmitting && <LinearProgress />}
          <br />
          <Divider />
          <div style={styles.buttons}>
            <Button variant="contained" onClick={() => onBackClick()}>
              <ArrowBackIosIcon /> Back{" "}
            </Button>
            <Button
              variant="contained"
              style={styles.saveButton}
              onClick={submitForm}
              color="primary"
              disabled={isSubmitting}
            >
              <SaveIcon /> {data._id ? 'Update': 'Save'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
    </Paper>
  );
}