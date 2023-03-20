import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SimpleDateTime from "react-simple-timestamp-to-date";
import { FaInfoCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { BsEyeFill, BsCalendarWeekFill } from "react-icons/bs";

import {
  findAllErrorLog,
  clearErrors,
} from "../../redux/actions/errorLogAction";
import moment from "moment";
import Pagination from "react-js-pagination";
import Loader from "../../component/Loader/Loader";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./errorLog.css";
import "react-dates/lib/css/_datepicker.css";
import Modal from "react-bootstrap/Modal";
const ErrorLog = () => {
  const dispatch = useDispatch();
  const { loading, error, errorLogs, errorCount, activePage, resultPerPage } =
    useSelector((state) => state.findAllErrorLogs);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [show, setShow] = useState(false);
  const [errLog, setErrLog] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = (errorLog) => {
    setShow(true);
    setErrLog(errorLog);
  };
  const contentRef = useRef(null);
  const setCurrentPageNumber = (e) => {
    setCurrentPage(e - 1);
  };
  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
    setCurrentPage(0);
  };
  const handleResultPerPage = (e) => {
    const value = e.target.value;
    setDataPerPage(value);
    setCurrentPage(0);
  };
  // download pdf file
  const handleDownloadPDF = () => {
    const input = contentRef.current;
    const table = input.querySelector("table"); // Get the table element
    const contentWidth = table.scrollWidth;
    const contentHeight = table.scrollHeight;
    html2canvas(table, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", [contentWidth, contentHeight]);
      pdf.addImage(imgData, "PNG", 0, 0, contentWidth, contentHeight);
      pdf.save("error-logs.pdf");
    });
  };

  const location = useLocation();
  const dateFormat = (time) => {
    const times = new Date(time);
    console.log()
    const newTime = `${times.getHours()}:${times.getMinutes()}:${times.getSeconds()}`;
    const newDate = `${times.getDate()}/${times.getMonth()+1}/${times.getFullYear()}`;
    return { newDate, newTime };
  };
  useEffect(() => {
    dispatch(
      findAllErrorLog({
        projectId: location?.state,
        skip: currentPage,
        limit: dataPerPage,
        search: searchKeyword,
      })
    );
  }, [dataPerPage, searchKeyword, currentPage]);
  return (
    <div className="errorPage">
      <div className="heading-title">Error Logs</div>
      <div className="search-contain px-5 pt-0">
        <input
          type="text"
          placeholder="Search your error logs "
          value={searchKeyword}
          onChange={handleSearch}
          className="search_name"
        />

        <button className="btns" onClick={handleDownloadPDF}>
          Download PDF
        </button>

        <div></div>
      </div>
      <div className="table-container px-5">
        <table className="table">
          <thead className="thead-dark">
            <tr className="table-header">
              <th>Service</th>
              <th>Level</th>
              <th>Message</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
        </table>
        <div className="table-data">
          {loading ? (
            <Loader />
          ) : errorLogs && errorLogs?.log_errors.length === 0 ? (
            <p className="no-data">No Error logs found</p>
          ) : (
            <table>
              <tbody>
                {errorLogs &&
                  errorLogs?.log_errors.map((errorLog) => (
                    <tr key={errorLog?.id} className="table-header">
                      <td>{errorLog?.service}</td>
                      <td>
                        {errorLog?.level === "info" ? (
                        <span className="text-infos">Info</span>
                        ) : (
                          <>
                            {errorLog?.level === "warn" ? (
                              <span className="text-warnings">Warn</span>
                              ) : (
                              <span className="text-dangers">Error</span>
                              )}
                          </>
                        )}
                      </td>
                      <td>{errorLog?.message}</td>
                      <td>{dateFormat(errorLog?.createdAt).newDate}</td>
                      <td>{dateFormat(errorLog?.createdAt).newTime}</td>
                      <td>
                        <button
                          onClick={() => {
                            handleShow(errorLog);
                          }}
                          className="btn-see-info"
                        >
                          <BsEyeFill />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
              <Modal show={show} className="dialog" onHide={handleClose}>
                <Modal.Header
                  closeButton
                  className={`${
                    errLog?.level === "warn"
                      ? "border-top-warn"
                      : errLog?.level === "error"
                      ? "border-top-error"
                      : errLog?.level === "info" && "border-top-info"
                  }`}
                >
                  <Modal.Title>Detail error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="mb-2 center-align">
                    <span className="text-danger f-20">{errLog?.message} </span>
                    <span
                      className={`fw-bold ${
                        errLog?.level === "warn"
                          ? "text-warning"
                          : errLog?.level === "error" && "text-danger"
                      }`}
                    >
                      {errLog?.level === "info" ? (
                        <FaInfoCircle />
                      ) : (
                        <>
                          {errLog?.level === "warn" ? (
                            <IoIosWarning />
                          ) : (
                            <RxCrossCircled />
                          )}
                        </>
                      )}
                    </span>
                  </div>

                  <div className="mb-3 center-align">
                  <span className="fw-bold "><BsCalendarWeekFill /></span>
                   <span> {dateFormat(errLog?.createdAt).newDate}</span>
                  </div>
                  {errLog.level === "error" && (
                    <div className="stack-title">{errLog?.stack}</div>
                  )}
                </Modal.Body>
              </Modal>
            </table>
          )}
        </div>
      </div>
      <div className="paginationBox px-5">
        <div className="limit">
          Result per page:
          <select
            name=""
            id=""
            className="btns-page"
            value={dataPerPage}
            onChange={handleResultPerPage}
          >
            <option value="05">05</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <span className="ml-1">Total error-logs :{errorCount}</span>
        </div>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={errorCount}
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

export default ErrorLog;
