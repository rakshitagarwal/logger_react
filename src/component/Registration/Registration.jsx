import React, { useState } from "react";
import "./Registration.css";

const validation = (formData) => {
  // Validation form fields
  const errors = {};
  if (!formData.name) {
    errors.name = "Name is required ";
  }
  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email is not valid";
  }

  if (!formData.password) {
    errors.password = "Password is required.";
  }
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  return errors;
};

const Registration = () => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validation(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // submit form
      setformData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="form">
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {errors.name && <div className="error-message">{errors.name}</div>}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <div className="error-message">{errors.email}</div>}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && (
          <div className="error-message">{errors.password}</div>
        )}

        <label htmlFor="confirmPassword">confirmPassword:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        {errors.confirmPassword && (
          <div className="error-message">{errors.confirmPassword}</div>
        )}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Registration;
