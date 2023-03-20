import React, { useEffect, useState, useLocation } from "react";
import Loader from "../../component/Loader/Loader";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { CreateFormSchema } from "../../schemas/CreateFormSchema";
import { useFormik } from "formik";
import { BiArrowBack, BiLoader } from "react-icons/bi";
// arman
import {
  updateProject,
  clearErrors,
  getProject,
} from "../../redux/actions/projectAction";
import { UPDATE_PROJECT_RESET } from "../../redux/constants/userConstants";
import { useNavigate, useParams } from "react-router";
const inputValues = {
  projectName: "",
  description: "",
  textTag: "",
};

const UpdateProject = ({ navigation }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const [val, setVal] = useState(inputValues);
  const alert = useAlert();

  const navigate = useNavigate();
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.updateProject);

  const { projects } = useSelector((state) => state.getProjects);
  const projectId = params.id;

  useEffect(() => {
    dispatch(getProject(projectId));
  }, [projectId]);

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

  const handleUpdate = () => {
      if (Object.keys(errors).length === 0) {
          dispatch(updateProject(projectId, { ...values })).then((response) => {
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
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: val,
      onSubmit: handleUpdate,
      validationSchema: CreateFormSchema,
      enableReinitialize: true,
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="login-box">
          <h2>Update project</h2>
          {!values.projectName ? (
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
                />
                <label htmlFor="textTag">textTag:</label>
                {
                  <p className="text-orange error-message">
                    {errors.textTag && touched.textTag ? errors.textTag : null}
                  </p>
                }
              </div>
              <input type="submit" value="Submit" />
            </form>
          )}
          <button onClick={() => navigate(-1)} className="btns-add-project">
            <BiArrowBack className="arrow-back" />
          </button>
        </div>
      )}
    </>
  );
};

export default UpdateProject;
