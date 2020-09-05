import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import ThemeDefault from '../theme-default';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { LinearProgress } from '@material-ui/core';
import Alert from "@material-ui/lab/Alert";

const styles = {
  
  loginContainer: {
    minWidth: 320,
    maxWidth: 400,
    height: 'auto',
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    margin: 'auto',
  },
  formHeader: {
    color: 'blue',
    fontColor: 'navy',
    fontSize: 20,
    maxWidth: 500,
  },
  paper: {
    padding: 20,
    overflow: 'auto',
  },
  loginBtn: {
    float: 'right',
  },
};

function SignInPage({onSignInClick, err}) {
  return (
    <MuiThemeProvider theme={ThemeDefault}>
      <div>
        <div style={styles.loginContainer}>
          <Paper style={styles.paper}>
            <p style={styles.formHeader}>CRM</p>
            <Formik
              initialValues={{
                email: 'qbhatti143@gmail.com',
                password: '12345678',
              }}
              validate={values => {
                const errors = {};
                if (!values.email) {
                  errors.email = 'Required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                  errors.email = 'Invalid email address';
                }

                if (!values.password) {
                  errors.password = 'Required';
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false);
                  onSignInClick(values);
                }, 500);
              }}
            >
              {({ submitForm, isSubmitting }) => (
                <Form>
                  <div>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="test@test.com"
                      name="email"
                      label="Login ID"
                      fullWidth={true}
                      required
                    />
                  </div>
                  <br />
                  <div>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Password"
                      name="password"
                      label="Password"
                      fullWidth={true}
                      type="password"
                      required
                    />
                  </div>
                  {isSubmitting && <LinearProgress />}
                  <br />
                  <div>
                      <Button variant="contained" color="primary" onClick={submitForm} style={styles.loginBtn} disabled={isSubmitting}>
                        SignIn
                      </Button>
                  </div>
                 
                  
               </Form>
              )}
            </Formik>
          </Paper>
          {err && (
          <Alert severity="error">
            {err}
          </Alert>
          )}
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default SignInPage;
