import React, { Fragment, useEffect, useState } from "react";
import "./AddProject.css";
import { useAlert } from "react-alert";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { addProject, getProject, updateProject } from "../../redux/actions/projectAction";
import Loader from "../../component/Loader/Loader";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CreateFormSchema } from "../../schemas/CreateFormSchema";


import { BiArrowBack } from "react-icons/bi";
import { UPDATE_PROJECT_RESET } from "../../redux/constants/userConstants";
const inputValues = {
  projectName: "",
  description: "",
  textTag: "",
};
const AddProject = () => {
  const location =useLocation()
  const dispatch = useDispatch();
  const alert = useAlert();

  const navigate = useNavigate();
  const [val, setVal] = useState(inputValues);
  const { loading} = useSelector((state) => state.addProject);
  const { projects } = useSelector((state) => state.getProjects);
  const id=location?.state
 
  const handleInsert = () => {
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

  const handleUpdate = () => {
    if (Object.keys(errors).length === 0) {
        dispatch(updateProject(id, { ...values })).then((response) => {
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
            dispatch({ type: UPDATE_PROJECT_RESET});
          }
        });
      }
};
 
  

  const { handleChange, handleBlur, handleSubmit, values, errors, touched,setFieldValue } =
    useFormik({
      initialValues: val,
      onSubmit: id?handleUpdate:handleInsert,
      validationSchema: CreateFormSchema,
      enableReinitialize: true,
    });


  useEffect(()=>{
    if(id){
      dispatch(getProject(id));
    }
  },[id])
  useEffect(()=>{
    if (projects && id ) {
      setVal({
        projectName: projects?.projectName,
        textTag: projects?.textTag,
        description: projects?.description,
      });
    }
  },[projects])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="login-box">
          <h2>{id?'Update Project':'Add Project'}</h2>
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
            
            <input type="submit" />
          </form>
          <button onClick={()=>navigate("/projectpage")} className="btns-add-project">
            <BiArrowBack className="arrow-back" />
          </button>
        </div>
      )}
    </>
  );
};

export default AddProject;
