import React, { Fragment, useEffect, useState } from "react";
import "./AddProject.css";
import { useAlert } from "react-alert";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { addProject, updateProject } from "../../redux/actions/projectAction";
import Loader from "../../component/Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateFormSchema } from "../../schemas/CreateFormSchema";
import { BiArrowBack } from "react-icons/bi";
import { clearErrors, getProject } from "../../redux/actions/projectAction";
import { UPDATE_PROJECT_RESET } from "../../redux/constants/userConstants";
const inputValues = {
  projectName: "",
  description: "",
  textTag: "",
};
const AddProject = () => {
  const [val, setVal] = useState(inputValues);

  const location = useLocation();
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.addProject);
  const { error: updateError } = useSelector((state) => state.updateProject);
  const { projects } = useSelector((state) => state.getProjects);

  const updateId = location?.state?.updateId;
  //prefilled data
  useEffect(() => {
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (projects) {
      setVal({
        projectName: projects?.projectName,
        textTag: projects?.textTag,
        description: projects?.description,
      });
    }
  }, [dispatch, alert, updateError, projects]);

  useEffect(() => {
    dispatch(getProject(updateId));
  }, [updateId]);
  const handleAdd = () => {
    if (Object.keys(errors).length === 0) {
      // submit form
      dispatch(
        addProject(values.projectName, values.description, values.textTag)
      ).then((response) => {
        alert.success(response?.payload);
        navigate("/projectpage");
        setVal({
          projectName: "",
          description: "",
          textTag: "",
        });
      });
    }
  };
  const handleEdit = () => {
    if (Object.keys(errors).length === 0) {
      dispatch(updateProject(updateId, { ...values })).then((response) => {
        console.log(response);
        if (response?.error) {
          alert.error(response.error);
        } else {
          setVal({
            projectName: "",
            description: "",
            textTag: "",
          });
          alert.success("Project Updated successfully");
          navigate("/projectpage");
          dispatch({ type: UPDATE_PROJECT_RESET });
        }
      });
    }
  };

  const handleInsert = () => {
    updateId ? handleEdit() : handleAdd();
  };
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: val,
      onSubmit: handleInsert,
      validationSchema: CreateFormSchema,
      enableReinitialize: true,
    });
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="login-box">
          <h2>{updateId ? "Upadte Project" : "Add Project"}</h2>
          {!values.projectName && updateId ? (
            <Loader />
          ) : (
            <form onSubmit={handleSubmit}>
              <div class="user-box">
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  value={values.projectName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autocomplete="off"
                />
                <label htmlFor="projectName">Project Name:</label>
                {
                  <p className="text-orange error-message">
                    {errors.projectName && touched.projectName
                      ? errors.projectName
                      : null}
                  </p>
                }
              </div>
              <div class="user-box">
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autocomplete="off"
                />
                <label htmlFor="Description">Description:</label>
                {
                  <p className="text-orange error-message">
                    {errors.description && touched.description
                      ? errors.description
                      : null}
                  </p>
                }
              </div>
              <div class="user-box">
                <input
                  type="text"
                  id="textTag"
                  name="textTag"
                  value={values.textTag}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autocomplete="off"
                />
                <label htmlFor="textTag">textTag:</label>
                {
                  <p className="text-orange error-message">
                    {errors.textTag && touched.textTag ? errors.textTag : null}
                  </p>
                }
              </div>

              <input type="submit" />
            </form>
          )}
          <button
            onClick={() => navigate("/projectpage")}
            className="btns-add-project"
          >
            <BiArrowBack className="arrow-back" />
          </button>
        </div>
      )}
    </>
  );
};

export default AddProject;
