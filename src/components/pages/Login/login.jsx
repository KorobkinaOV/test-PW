import React from 'react';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';

import TextField from 'components/TextField';
import { SignupSchema, checkError } from 'utils/helpers';
import { login } from 'api';

const Wrapped = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
`;

const Login = ({ history }) => {

  const onLogin = (values) => {
    login(values).then((res) => {
      if (res.id_token) {
        localStorage.setItem('token', res.id_token);
        history.push('/profile');
      }
    });
  };

  return(
    <div className='container p-4 mt-5'>
      <Wrapped className='card p-3'>
        <h5 className='pb-3'>Parrot Wings</h5>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => onLogin(values)}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                name="email"
                component={TextField}  />
              <Field
                name="password"
                component={TextField}  />
              <div className='d-flex'>
                <button
                  className='btn btn-primary'
                  onClick={() => checkError(errors, touched)}
                  type="submit">
                    Submit
                </button>
                <Link to='/registration'>
                  <div className='btn btn-link ml-3'>
                    Registration
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

export default withRouter(Login);