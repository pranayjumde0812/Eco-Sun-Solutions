import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [adharNumber, setAdharNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    let valid = true;

    if (!firstName) {
      formErrors.firstName = 'First name is required';
      valid = false;
    }
    if (!lastName) {
      formErrors.lastName = 'Last name is required';
      valid = false;
    }
    if (!email) {
      formErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = 'Email is invalid';
      valid = false;
    }
    if (!password) {
      formErrors.password = 'Password is required';
      valid = false;
    }
    if (!panNumber) {
      formErrors.panNumber = 'PAN number is required';
      valid = false;
    }
    if (!adharNumber) {
      formErrors.adharNumber = 'Adhar number is required';
      valid = false;
    }
    if (!mobileNumber) {
      formErrors.mobileNumber = 'Mobile number is required';
      valid = false;
    }

    setErrors(formErrors);
    return valid;
  };

  const handleSignUp = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:9292/auth/signup', {
          firstName,
          lastName,
          email,
          panNumber,
          adharNumber,
          mobileNumber,
          password
        });

        if (response.status === 201 || response.status === 200) {
          console.log('User signed up:', response.data);
          navigate('/login');
        } else {
          console.error('Failed to sign up:', response.data);
        }
      } catch (error) {
        console.error('Error during sign up:', error);
        setErrors({ apiError: 'An error occurred while signing up. Please try again later.' });
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      <form>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
          />
          <div className="invalid-feedback">{errors.firstName}</div>
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
          />
          <div className="invalid-feedback">{errors.lastName}</div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
          <div className="invalid-feedback">{errors.email}</div>
        </div>
        <div className="form-group">
          <label htmlFor="panNumber">PAN Number</label>
          <input
            type="text"
            className={`form-control ${errors.panNumber ? 'is-invalid' : ''}`}
            id="panNumber"
            value={panNumber}
            onChange={(e) => setPanNumber(e.target.value)}
            placeholder="Enter PAN number"
          />
          <div className="invalid-feedback">{errors.panNumber}</div>
        </div>
        <div className="form-group">
          <label htmlFor="adharNumber">Adhar Number</label>
          <input
            type="text"
            className={`form-control ${errors.adharNumber ? 'is-invalid' : ''}`}
            id="adharNumber"
            value={adharNumber}
            onChange={(e) => setAdharNumber(e.target.value)}
            placeholder="Enter Adhar number"
          />
          <div className="invalid-feedback">{errors.adharNumber}</div>
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="text"
            className={`form-control ${errors.mobileNumber ? 'is-invalid' : ''}`}
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Enter mobile number"
          />
          <div className="invalid-feedback">{errors.mobileNumber}</div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <div className="invalid-feedback">{errors.password}</div>
        </div>
        {errors.apiError && (
          <div className="text-danger mt-3">
            {errors.apiError}
          </div>
        )}
        <button type="button" className="btn btn-primary mt-3" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
