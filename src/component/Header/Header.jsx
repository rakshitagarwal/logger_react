import React, { useEffect, useState, useCallback } from "react";
import "./Header.css";
import logo from "../../assets/logo.png";
import profile from "../../assets/profile.webp";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {useDispatch} from 'react-redux'
import { logoutUser } from "../../redux/actions/userAction";

const Header = ({navigation}) => {
  const navigate = useNavigate();
  const [toggle, settoggle] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isLogin, setIsLogin] = useState(false);
const dispatch=useDispatch()
  const tog = () => {
    settoggle(!toggle);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
      navigation?.navigate("/projectpage");
    }
  }, []);

  const handleLogout = useCallback(() => {
    const token=localStorage.getItem("token")
    dispatch(logoutUser(token))
  }, [navigate]);

  useEffect(() => {}, [isLogin]);

  return (
    <>
      {isLogin && (
        <header>
          <Link to="/" className="logo">
            <img src={logo} alt="logo" />
            <span className="logo-text">Log Management</span>
          </Link>

          <div>
            <div onClick={tog}>
              <img
                className="profile"
                src={profile}
                alt="profile"
                height="40px"
                width="40px"
              />
            </div>
            {toggle ? (
              <div className="profile-btn">
                <button className="logoutbtn" onClick={handleShow}>
                  <Link to="#" className="icon">
                    <MdOutlineLogout />
                  </Link>
                  Logout
                </button>
              </div>
            ) : null}
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to logout?</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
        <div className="d-flex">
        <Button variant="secondary" className="btn-loggedout" onClick={handleLogout}>
            Logout
          </Button>
          <Button variant="primary" className="btn-loggedout" onClick={handleClose}>
            Cancel
          </Button>
        </div>
        </Modal.Footer>
      </Modal>
            {/* <Link li className="icon">
          <FaSignInAlt />
        </Link>
        <Link to="/registration">SignUp</Link> */}
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
