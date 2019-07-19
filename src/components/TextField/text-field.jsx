import React from 'react';

class TextField extends React.Component {
  state = {
    error: false,
  }
  render() {
    const {
      field, // { name, value, onChange, onBlur }
      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
      ...props
    } = this.props

    const { error } = this.state;

    const onBlur = () => {
      if (errors[field.name] && errors[field.name]) {
        this.setState({ error: true });
      } else this.setState({ error: false });
    }
    return(
      <div className='form-group'>
        <label>{`${field.name.charAt(0).toUpperCase()}${field.name.slice(1)}`}</label>
        <input
          {...field}
          {...props}
          onBlur={onBlur}
          className={`form-control ${(error || (!error && errors[field.name] && touched[field.name])) && 'is-invalid'}`}  />
        {
          touched[field.name] &&
          errors[field.name] &&
          <small className="text-danger">{errors[field.name]}</small>
        }
      </div>
    );
  }
};

export default TextField;

