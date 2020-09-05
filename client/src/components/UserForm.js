import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import SaveIcon from "@material-ui/icons/Save";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { LinearProgress, Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Formik, Form, Field } from "formik";
import Divider from "@material-ui/core/Divider";
import { TextField, RadioGroup } from "formik-material-ui";

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


export default function UserForm({onSubmit, onBackClick, data}) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <h1>Admin and Staffs</h1>
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
        if(!values.password) {
          errors.password = 'Required';
        } else if (!(values.password.length > 6)) {
          errors.password = 'Password length should be greater than 8';
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
              type="password"
              label="Password"
              name="password"
              fullWidth={true}
              required
            />
          </Grid>
          <Grid item style={styles.cell} xs={12} md={12}>
            <Field component={RadioGroup} name="isAdmin">
              <FormControlLabel
                value='admin'
                control={<Radio disabled={isSubmitting} />}
                label="Admin"
                disabled={isSubmitting}
              />
              <FormControlLabel
                value='staff'
                control={<Radio disabled={isSubmitting} />}
                label="Staff"
                disabled={isSubmitting}
              />
            </Field>
          </Grid>
          </Grid>

          {isSubmitting && <LinearProgress />}
          <br />
          <Divider />
          <div style={styles.buttons}>
            <Link to="/">
              <Button variant="contained">
                <ArrowBackIosIcon /> Back{" "}
              </Button>
            </Link>
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