import React, { Fragment, useState } from "react";
import "./ResetPassword.css";
import Loader from "../../component/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../redux/actions/userAction";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const validation = (formData) => {
  // Validation form fields
  const errors = {};

  if (!formData.password) {
    errors.password = "Password is required.";
  }
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

const ResetPassword = ({ navigation, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {search}= useLocation()
  const token=new URLSearchParams(search).get('token')
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const navigate=useNavigate()

  const [formData, setformData] = useState({
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
      dispatch(
        resetPassword(
          token,
            formData?.password,
        )
      ).then((response) => {
        setformData({
          password: "",
          confirmPassword: "",
        });
        setErrors({});
      });
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Password updated successfully");
      navigate("/login");
    }
  }, [dispatch, alert, error, navigation, success]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="form">
          <h2>Reset Password</h2>
          <form onSubmit={handleSubmit}>
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
      )}
    </Fragment>
  );
};

export default ResetPassword;
