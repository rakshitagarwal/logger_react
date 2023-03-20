import React, { Fragment, useState } from "react";
import "./ForgotPassword.css";
import Loader from "../../component/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../redux/actions/userAction";
import { useAlert } from "react-alert";
import { useEffect } from "react";
const validation = (formData) => {
  // Validation form fields
  const errors = {};

  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email is not valid";
  }

  return errors;
};

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { message, error, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [formData, setformData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validation(formData);
    if (Object.keys(newErrors).length === 0) {
      dispatch(forgotPassword(formData.email)).then((response) => {
        setformData({
          email: "",
        });
        setErrors({});
      });
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }
    if(message){
        alert.success(message)
    }
  }, [dispatch,error,alert,message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="form">
          <h2>Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}

            <input type="submit" value="Submit" />
            <div className="login-link"></div>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
