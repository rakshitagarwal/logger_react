import React, { Fragment } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getProject } from "../../redux/actions/projectAction";
import Loader from "../../component/Loader/Loader";
import "./ProjectView.css";

import { Link, useNavigate } from "react-router-dom";
const ProjectView = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { loading, projects } = useSelector((state) => state.getProjects);
  const handleBack = () => {
   navigate.goBack();
  };
  useEffect(() => {
    dispatch(getProject(location?.state?.state));
  }, []);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="projectDetails d-flex">
          <ul>
            <li>{projects.description}</li>
            <li>{projects.projectName}</li>
          </ul>
        </div>
      )}
      <button onClick={handleBack} className="btn btn-primary mx-2">
        Go back
      </button>
    </Fragment>
  );
};

export default ProjectView;
