import React from 'react';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from 'components/TextField';
import { createUser } from 'api';
import { getToastrMessage } from 'actions';
import { RegistrationSchema, checkError } from 'utils/helpers';

const Wrapped = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
`;

const Registration = ({ getToastrMessage, history }) => {

  const onCreateUser = ({ name, email, password}) => {
    createUser({ username: name, email, password}).then((res) => {
      if (res.id_token) {
        localStorage.setItem('token', res.id_token);
        history.push('/');
        getToastrMessage({ type: 'success', message: 'Registration is success' });
      }
    })
  }

  return(
    <div className='container p-4 mt-5'>
      <Wrapped className='card p-3'>
        <h5 className='pb-3'>Parrot Wings registration</h5>
        <Formik
          initialValues={{
            email: '',
            name: '',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={RegistrationSchema}
          onSubmit={(values) => onCreateUser(values)}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                name="email"
                component={TextField}  />
              <Field
                name="name"
                component={TextField}  />
              <Field
                name="password"
                component={TextField}  />
              <Field
                name="confirmPassword"
                component={TextField}  />
              <div className='d-flex'>
                <button
                  className='btn btn-primary'
                  onClick={() => checkError(errors, touched)}
                  type="submit">
                    Submit
                </button>
                <Link to='/'>
                  <div className='btn btn-link ml-3'>
                    login
                  </div>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </Wrapped>
    </div>
  );
};

const mapDispatchToProps = {
  getToastrMessage
};

export default withRouter(connect(null, mapDispatchToProps)(Registration));