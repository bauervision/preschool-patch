import React, { useState, useEffect } from 'react';
import { Loader } from '../Components';

const styles = {
  form: {
    border: 'solid 1px grey',
    borderRadius: '1em',
    padding: '1em',
    margin: '1em'
  },
  label: {
    paddingLeft: '1em',
    paddingBottom: 5,
    alignText: 'left',
    paddingRight: '1em',
    color: 'grey',
    fontSize: '0.85em',
    fontStyle: 'italic'
  },
  input: {
    padding: '1em',
    borderRadius: '0.2em',
    border: 'solid 1px grey'
  },
  inputBase: {
    display: 'flex',
    flexDirection: 'column',
    margin: '1em'
  },
  error: {
    padding: '1em',
    borderRadius: '0.2em',
    border: 'solid 1px red'
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    marginBottom: 2,
    alignText: 'center'
  },
  flex: {
    display: 'flex'
  }
};

// simple input component
const Input = ({
  type,
  label,
  handleData,
  error,
  errorMessage,
  placeholder
}) => {
  return (
    <div style={styles.inputBase}>
      {/* Label and warning */}
      <div style={styles.flex}>
        <label style={styles.label}>{label}</label>
        {error && <div style={styles.errorText}>{errorMessage}</div>}
      </div>

      <input
        type={type}
        style={error ? styles.error : styles.input}
        onChange={(e) => handleData(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};


const ContactForm = ({ handleFormData }) => {
  const [formFirstName, setFormFirstName] = useState(null);
  const [formLastName, setFormLastName] = useState(null);
  const [formEmail, setEmail] = useState(null);
  const [formComments, setFormComments] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [fNameError, setfNameError] = useState(false);
  const [lNameError, setlNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFirstName = (fname) => {
    if (fname.length > 1) {
      setfNameError(false);
      setFormFirstName(fname);
    } else {
      setfNameError(true);
    }
  };

  const handleLastName = (lname) => {
    if (lname.length > 1) {
      setlNameError(false);
      setFormLastName(lname);
    } else {
      setlNameError(true);
    }
  };

  const handleEmail = (email) => {
    const validEmailRegex = RegExp(
      // eslint-disable-next-line
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );

    const error = validEmailRegex.test(email) ? '' : 'Email is not valid!';
    setEmailError(error);
    if (!error) {
      setEmail(email);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      firstName: formFirstName,
      lastName: formLastName,
      email: formEmail,
      comments: formComments
    };
    handleFormData(formData);
    setSubmitted(true);
  };

  // monitor when we enable the submit button
  useEffect(() => {
    if (
      formFirstName
      && !fNameError
      && (formLastName && !lNameError)
      && (formEmail && !emailError)
      && formComments
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [
    formFirstName,
    formLastName,
    formEmail,
    fNameError,
    lNameError,
    emailError,
    formComments
  ]);

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h2>Contact Form</h2>
      <div>
        <Input
          type="name"
          label="First Name"
          handleData={handleFirstName}
          error={fNameError}
          errorMessage="Need at least 2 characters"
          placeholder="Please enter at least 2 characters for your first name"
        />
        <Input
          type="name"
          label="Last Name"
          handleData={handleLastName}
          error={lNameError}
          errorMessage="Need at least 2 characters"
          placeholder="Please enter at least 2 characters for your last name"
        />
        <Input
          type="email"
          label="Email"
          handleData={handleEmail}
          error={emailError}
          errorMessage="Not yet a valid email"
          placeholder="Please enter a valid email"
        />
        <Input
          type="text"
          label="Comments"
          handleData={setFormComments}
          placeholder="Please enter some reason for contacting us"
        />
      </div>
      {!submitted ? (
        <button
          disabled={submitDisabled}

        >
        Submit
        </button>
      ) : (
        <Loader />
      )}

    </form>
  );
};
export default ContactForm;
