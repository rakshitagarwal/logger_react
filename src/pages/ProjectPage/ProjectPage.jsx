import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProjectPage.css";
import {
  findAllproject,
  clearErrors,
  deleteProject,
  projectSecretKey,
} from "../../redux/actions/projectAction";
import { getProject } from "../../redux/actions/projectAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { DELETE_PROJECT_RESET } from "../../redux/constants/userConstants";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import Loader from "../../component/Loader/Loader";
import { FaTrash, FaEdit, FaEye, FaCopy, FaEyeSlash } from "react-icons/fa";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import {
  Modal,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import useStyle from "./ModalStyle";

const ProjectPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(0);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState("");
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [openSecondModal, setOpenSecondModal] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [copiedSecretKey, setCopiedSecretKey] = useState(false);
  const [copiedProjectId, setCopiedProjectId] = useState(false);
  const [openDeleteDialogBox, setOpenDeleteDialogBox] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const setCurrentPageNumber = (e) => {
    setCurrentPage(e - 1);
  };

  const { loading, error, projects, projectsCount, activePage, resultPerPage } =
    useSelector((state) => state.findAllProjects);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteProject
  );

  const deleteProjectHandler = async (val) => {
    setOpenDeleteDialogBox(true);
    setDeleteData(val);
  };

  const viewErrorLogs = (id) => {
    navigate("errorLog", { state: id });
  };
  const handleResultPerPage = (e) => {
    const value = e.target.value;
    setDataPerPage(value);
    setCurrentPage(0);
  };

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
    setCurrentPage(0);
  };
  const { loading: Loading, projects: Projects } = useSelector(
    (state) => state.getProjects
  );

  const {
    loading: Load,
    error: Error,
    projectId,
  } = useSelector((state) => state.getProjectSecretKey);

  // modal

  const handleShowKey = () => {
    setShowKey(!showKey);
  };

  const handleSecretKeyCopyClick = () => {
    navigator.clipboard.writeText(projectId?.data?.data?.secretKey);
    setCopiedSecretKey(true);
    setTimeout(() => {
      setCopiedSecretKey(false);
    }, 1000);
  };

  const handleProjectIdCopyClick = () => {
    navigator.clipboard.writeText(projectId?.data?.data?.projectId);
    setCopiedProjectId(true);
    setTimeout(() => {
      setCopiedProjectId(false);
    }, 1000);
  };

  const handleOpen = (id) => {
    setOpen(true);
    dispatch(getProject(id));
    dispatch(projectSecretKey(id));
  };

  const handleClose = () => {
    setOpen(false);
    setShowKey(false);
  };

  const handleCloseSecondModal = () => {
    setOpenSecondModal(false);
  };

  const handleDelete = async () => {
    await dispatch(deleteProject(deleteData?.id));
    setOpenDeleteDialogBox(false);
    setDeleteData({ id: "", projectName: "" });
    await dispatch(
      findAllproject({
        skip: currentPage,
        limit: dataPerPage,
        search: searchKeyword,
      })
    );
  };
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Project Delete Successfully");
      dispatch({ type: DELETE_PROJECT_RESET });
    }
    dispatch(
      findAllproject({
        skip: currentPage,
        limit: dataPerPage,
        search: searchKeyword,
      })
    );
  }, [
    dispatch,
    error,
    alert,
    deleteError,
    isDeleted,
    currentPage,
    dataPerPage,
    searchKeyword,
  ]);

  return (
    <div className="projectpage">
      <div className="heading-title">
        <p className="m-0">Project details</p>
      </div>
      <div className="search-contain px-5 pt-0">
        <input
          type="text"
          placeholder="Search your project "
          value={searchKeyword}
          onChange={handleSearch}
          className="search_name mr-5"
        />
        <Link
          className="btns border-0"
          to={{
            pathname: "createproject",
          }}
        >
          <button className="btns w-100">Add Project</button>
        </Link>
      </div>
      {loading ? (
        <Loader />
      ) : projects && projects.length === 0 ? (
        <p>No Data Found</p>
      ) : (
        <div className="table-container px-5 ">
          <table className="table m-0">
            <thead class="thead-dark">
              <tr scope="row">
                <th>SN</th>
                <th>Project Name</th>
                <th>Description</th>
                <th className="px-5  mr-5 text-right">Action</th>
              </tr>
            </thead>
          </table>
          <div className="table-data">
            <table className="table">
              <tbody class="tbody-dark">
                {projects &&
                  projects.map((project, index) => (
                    <tr key={project.id} scope="row">
                      <td className="px-2">
                        {resultPerPage * (activePage - 1) + index + 1}
                      </td>
                      <td className="px-2 view-error-btn w-25">
                      <Link
                        to={{
                          pathname: "errorLog",
                        }}
                        state={{ id: project.id }}
                        className='view-error-btn'
                      >
                          {project.projectName}
                      </Link>
                        </td>
                      <td className="px-2">{project.description}</td>
                      <td className="text-right">
                        <button
                          onClick={() =>
                            deleteProjectHandler({
                              id: project.id,
                              projectName: project?.projectName,
                            })
                          }
                          className="bg-white text-danger btn-actions"
                        >
                          <FaTrash />
                        </button>
                        <button className="bg-white text-secondary btn-actions">
                          <Link
                            to={{
                              pathname: "updateProject",
                            }}
                            state={{ updateId: project.id }}
                          >
                            <FaEdit />
                          </Link>
                        </button>

                        <button
                          className="bg-white text-secondary btn-actions"
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            handleOpen(project.id);
                          }}
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))}

                <Modal open={open} onClose={handleCloseSecondModal}>
                  <div className={` w-55 ${classes.paper}`}>
                    <h2 id="simple-modal-title">Project Title</h2>
                    <button
                      type="button"
                      class="btn-closed"
                      aria-label="Close"
                      onClick={handleClose}
                    >
                      <ImCross />
                    </button>
                    <p id="simple-modal-description">
                      <div className="projectDetails d-flex">
                        <ul>
                          <li className=" mb-3">
                            <span className="font-weight-bold">Project Id</span>
                            <div className="d-flex ">
                              <input
                                id="secret-key"
                                value={projectId?.data?.data?.projectId}
                                readOnly
                                className="mb-0 show-key-input"
                              />

                              <button
                                onClick={handleProjectIdCopyClick}
                                className="btns-page ml-3"
                              >
                                {copiedProjectId ? <TiTick /> : <FaCopy />}
                              </button>
                            </div>
                          </li>
                          <li className=" mb-3">
                            <span className="font-weight-bold">Secret Key</span>
                            <div className="d-flex ">
                              <input
                                type={showKey ? "text" : "password"}
                                id="secret-key"
                                value={projectId?.data?.data?.secretKey}
                                readOnly
                                className="mb-0 show-key-input"
                              />
                              <div className="ml-3 d-flex gap-2">
                                <button
                                  onClick={handleShowKey}
                                  className="btns-page"
                                >
                                  {showKey ? <BsEyeSlash /> : <BsEye />}
                                </button>
                                <button
                                  onClick={handleSecretKeyCopyClick}
                                  className="btns-page"
                                >
                                  {copiedSecretKey ? <TiTick /> : <FaCopy />}
                                </button>
                              </div>
                            </div>
                          </li>

                          <li>
                            <span className="font-weight-bold">API URL</span>:
                            <div> {projectId?.data?.data?.url}</div>
                          </li>
                        </ul>
                      </div>
                    </p>
                  </div>
                </Modal>
                <Dialog
                  open={openDeleteDialogBox}
                  onClose={() => setOpenDeleteDialogBox(false)}
                >
                  <DialogTitle>Delete Project</DialogTitle>
                  <DialogContent>
                    Are you sure you want to delete {deleteData?.projectName}?
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenDeleteDialogBox(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="paginationBox px-5">
        <div className="limit">
          <span className="mr-1"> Result per page:</span>
          <select
            className="btns-page"
            name=""
            id=""
            value={dataPerPage}
            onChange={handleResultPerPage}
          >
            <option value="05">05</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <span className="ml-1">Total projects {projectsCount}</span>
        </div>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={projectsCount}
          onChange={setCurrentPageNumber}
          nextPageText=">"
          prevPageText="<"
          firstPageText="<<"
          lastPageText=">>"
          itemClass="page-item"
          linkClass="page-link"
          activeClass="pageItemActive"
          activeLinkClass="pageLinkActive"
        />
      </div>
    </div>
  );
};

export default ProjectPage;
