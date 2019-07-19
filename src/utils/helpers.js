import * as Yup from "yup";
import store from 'store';
import { getToastrMessage } from 'actions';

export const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});

export const RegistrationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  name: Yup.string()
    .required('Required'),
  password: Yup.string()
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

export const checkError = (errors, touched) => {
  if (Object.keys(errors).length > 0) {
    store.dispatch(
      getToastrMessage({type:'error', message: 'Fill in all the fields correct'})
    );
  }
}
