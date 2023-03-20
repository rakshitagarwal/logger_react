import React, { Fragment, useState, useEffect, memo } from "react";
import "./Login.css";
import Loader from "../../component/Loader/Loader";
import { login, clearErrors } from "../../redux/actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import logo from "../../assets/logo.png";
import flatmountains from "../../assets/flat-mountains.jpg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Navigate, useNavigate } from "react-router-dom";

const validation = (formData) => {
  const errors = {};

  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email is not valid";
  }

  if (!formData.password) {
    errors.password = "Password is required.";
  }
  return errors;
};

const Login = ({ isAuthenticated: authentication }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [navigated, setNavigated] = useState(false);

  // for disable form submit button
  const [formFilled, setFormFilled] = useState(false);

  const handleInputChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
    setFormFilled(formData.email !== "" && formData.password !== "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validation(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      dispatch(login(formData.email, formData.password)).then((response) => {
        if (response?.type !== "LOGIN_FAIL") {
          setformData({
            email: "",
            password: "",
          });
          alert.success(response?.payload?.data?.message);
          navigate("/projectpage");
        }

        setErrors({});
      });
    }
  };

  // useEffect(() => {
  //   if (error) {
  //     alert.error(error);
  //     dispatch(clearErrors());
  //   }
  //   if (isAuthenticated) {
  //     history.push("/projectpage");
  //   }
  // }, [dispatch, error, alert, history, isAuthenticated]);

  // useEffect(() => {
  //   if (isAuthenticated && !navigated) setNavigated(true);
  //   if (isAuthenticated && navigated) {
  //     setTimeout(() => {
  //       console.log("isAuthenticated", isAuthenticated);
  //       navigate("/projectpage");
  //     }, 2000);
  //   }
  // }, [isAuthenticated, navigated]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Fragment>
      <div className="bg-mountain">
        <img src={flatmountains} alt="" height="100%" width="100%" />
      </div>
      {loading ? (
        <Loader />
      ) : (
        //     <div className="form">
        //       <div className="background">
        //     <div className="shape"></div>
        //     <div className="shape"></div>
        // </div>

        //       <form onSubmit={handleSubmit}>
        //       <div className="d-flex align-items-center mb-3 position-relative">
        //         <img src={logo} alt="logo" width="60" height="60" className="title-logo"/>
        //         <div className="title-name">
        //         <h3>welcome to </h3>
        //         <h2>Logger Management</h2>
        //         </div>
        //       </div>
        //       <div className="err-msg-sec">
        //         <label htmlFor="email">Username</label>
        //         <input
        //           type="email"
        //           id="email"
        //           name="email"
        //           value={formData.email}
        //           onChange={handleInputChange}
        //         />
        //         {errors.email && (
        //           <div className="error-message email-err">{errors.email}</div>
        //         )}
        //       </div>

        //       <div className="err-msg-sec">
        //         <label htmlFor="password">Password</label>

        //         <div className="password-input-container">
        //           <input
        //             type={showPassword ? "text" : "password"}
        //             id="password"
        //             name="password"
        //             value={formData.password}
        //             onChange={handleInputChange}
        //           />
        //           <div
        //             className="password-toggle-icon"
        //             onClick={togglePasswordVisibility}
        //           >
        //             {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
        //           </div>
        //         </div>

        //         {errors.password && (
        //           <div className="error-message pass-err">{errors.password}</div>
        //         )}
        //         </div>

        //         <div className="d-flex justify-center w-100 flex-column align-items-center">
        //         <button type="submit" className="btn btn-primary btn-md"  >Log In</button>
        //         </div>
        //       </form>
        //     </div>
        <>
          <div className="container-fluid">
            <div className="row main-content bg-success text-center">
              <div className="col-md-5 text-center company__info"></div>
              <div className="col-md-7 col-xs-12 col-sm-12 login_form ">
                <div className="container-fluid">
                  <h4 className="p-2">Logger Management</h4>
                  <div>
                    <form
                      control=""
                      className="form-group"
                      onSubmit={handleSubmit}
                    >
                      <div className="mb-2">
                        <div className="err-msg-sec">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            style={{ height: "35px" }}
                          />
                          {errors.email && (
                            <div className="error-message email-err">
                              {errors.email}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="err-msg-sec">
                          <label htmlFor="password">Password</label>

                          <div className="password-input-container">
                            <input
                              type={showPassword ? "text" : "password"}
                              id="password"
                              name="password"
                              value={formData.password}
                              onChange={handleInputChange}
                              style={{ height: "35px" }}
                            />
                            <div
                              className="password-toggle-icon"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? (
                                <AiFillEye />
                              ) : (
                                <AiFillEyeInvisible />
                              )}
                            </div>
                          </div>

                          {errors.password && (
                            <div className="error-message pass-err">
                              {errors.password}
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <input type="submit" value="Submit" className="btn" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default memo(Login);
