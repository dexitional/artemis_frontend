import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  loadAISHelpers,
  postMetaDataAIS,
  fetchTranscript,
  fetchProficiency,
  fetchAttestation,
  fetchIntroLetter,
  fetchTranswift,
} from "../../../../store/utils/ssoApi";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentPage,
  setModal,
  updateAlert,
  updateDatabox,
} from "../../../../store/admission/ssoSlice";
import Pager from "../../Pager";
//import { Button, Menu, MenuItem } from '@material-ui/core';
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import parse from "html-react-parser";
import moment from "moment";
import {
  excelToJson,
  getStudyMode,
  jsonToExcel,
} from "../../../../store/utils/admissionUtil";
import { CSVLink, CSVDownload } from "react-csv";
import { Divider } from "@mui/material";
import Loader from "../../../../assets/img/loaderm.gif";

// COMPONENT - Transwift
const Transwift = ({ view, data, recid }) => {
  const [activity, setActivity] = useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [ref, setRef] = React.useState(1);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const { sso } = useSelector((state) => state);
  const title = () => {
    switch (view) {
      case "list":
        return "TRANSWIFT REQUESTS";
      case "add":
        return "ADD REQUEST";
      case "edit":
        return "EDIT REQUEST";
    }
  };
  const content = () => {
    switch (view) {
      case "list":
        return <List />;
      case "add":
        return <Form recid={recid} />;
      case "edit":
        return <Form recid={recid} />;
    }
  };

  return (
    <div className="content-area card">
      <h3 className="sub-head bg-blueblack">
        {title()}
        {view == "list" ? (
          <div className="d-inline-block print-btn">
            <Link
              to="/app/ais?mod=transwift&view=add"
              className="btn btn-light-alt btn-sm btn-icon"
            >
              <em className="fa fa-sm fa-plus"></em>&nbsp;&nbsp;
              <b>NEW REQUEST</b>
            </Link>
            &nbsp;
          </div>
        ) : null}
      </h3>
      {content()}
    </div>
  );
};

// COMPONENT - LIST
const List = () => {
  const history = useHistory();
  const [transwift, setTranswift] = useState([]);
  const [activity, setActivity] = useState({});
  const { sso } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [ref, setRef] = React.useState(null);
  const open = Boolean(anchorEl);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);
  const [keyword, setKeyword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [newId, setNewId] = React.useState(null);
  const importRef = useRef(null);

  const handleClick = (e, id) => {
    setAnchorEl(e.currentTarget);
    setRef(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setRef(null);
  };

  const editRequest = (id) => {
    const url = `/app/ais?mod=transwift&view=edit&recid=${id}`;
    history.push(url);
  };


  const viewTranscript = async (e,refno) => {
    e.preventDefault();
    setActivity({ ...activity, mount: true });
    const rt = await fetchTranscript();
    if (rt.success) {
      let dt = {
        content: { data: rt.data.data, session: rt.data.session },
        size: "md",
        show: true,
        page: "regmount",
      };
      dispatch(setModal(dt));
    } else {
      dispatch(
        updateAlert({
          show: true,
          message: rt.msg.toUpperCase(),
          type: "error",
        })
      );
    }
    setActivity({ ...activity, mount: false });
    setRef(null);
  };

  const viewProficieny = async (e,refno) => {
    e.preventDefault();
    setActivity({ ...activity, mount: true });
    const rt = await fetchProficiency();
    if (rt.success) {
      let dt = {
        content: { data: rt.data.data, session: rt.data.session },
        size: "md",
        show: true,
        page: "regmount",
      };
      dispatch(setModal(dt));
    } else {
      dispatch(
        updateAlert({
          show: true,
          message: rt.msg.toUpperCase(),
          type: "error",
        })
      );
    }
    setActivity({ ...activity, mount: false });
    setRef(null);
  };

  const viewAttestation = async (e,refno) => {
    e.preventDefault();
    setActivity({ ...activity, mount: true });
    const rt = await fetchAttestation();
    if (rt.success) {
      let dt = {
        content: { data: rt.data.data, session: rt.data.session },
        size: "md",
        show: true,
        page: "regmount",
      };
      dispatch(setModal(dt));
    } else {
      dispatch(
        updateAlert({
          show: true,
          message: rt.msg.toUpperCase(),
          type: "error",
        })
      );
    }
    setActivity({ ...activity, mount: false });
    setRef(null);
  };

  const viewIntroLetter = async (e,refno) => {
    e.preventDefault();
    setActivity({ ...activity, mount: true });
    const rt = await fetchIntroLetter();
    if (rt.success) {
      let dt = {
        content: { data: rt.data.data, session: rt.data.session },
        size: "md",
        show: true,
        page: "regmount",
      };
      dispatch(setModal(dt));
    } else {
      dispatch(
        updateAlert({
          show: true,
          message: rt.msg.toUpperCase(),
          type: "error",
        })
      );
    }
    setActivity({ ...activity, mount: false });
    setRef(null);
  };

  const restoreData = () => {
    sso.databox.transwift && setTranswift([...sso.databox.transwift]);
  };

  const fetchData = async () => {
    var query = ``;
    if (page >= 1) query += `?page=${page - 1}`;
    if (keyword != "") query += `&keyword=${keyword}`;
    const res = await fetchTranswift(query);
    if (res.success) {
      setIsLoading(false);
      setTranswift([...res.data.data]); // Page Data
      setCount(res.data.totalPages); // Total Pages
    }
  };

  const onSearchChange = async (e) => {
    setKeyword(e.target.value);
    setPage(1);
    if (e.target.value == "") fetchData();
  };

  const onPageChange = async (e) => {
    var vs = parseInt(e.target.value);
    vs = Math.max(1, vs);
    vs = Math.min(count, vs);
    setPage(vs);
    setIsLoading(true);
  };

  const onPageClick = async (event, value) => {
    setIsLoading(true);
    setPage(value);
  };

  const onSubmitSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetchData();
  };

  useEffect(() => {
    restoreData();
  }, []);

  useEffect(() => {
    dispatch(updateDatabox({ transwift }));
  }, [transwift]);

  useEffect(() => {
    fetchData();
    dispatch(setCurrentPage(page));
  }, [page]);

  return (
    <div className="card-innr">
      <Pager
        count={count}
        page={page}
        onPageChange={onPageChange}
        onPageClick={onPageClick}
        keyword={keyword}
        onSearchChange={onSearchChange}
        onSubmitSearch={onSubmitSearch}
        isLoading={isLoading}
      />
      <div className="dataTables_wrapper dt-bootstrap4 no-footer">
        <div className="table-wrap">
          <div
            id="DataTables_Table_0_wrapper"
            className="dataTables_wrapper dt-bootstrap4 no-footer"
          >
            <div className="table-wrap ">
              {!isLoading ? (
                <>
                  <table
                    className="admin-tnx dataTable no-footer  table-responsive"
                    id="DataTables_Table_0"
                  >
                    <thead>
                      <tr className="data-item data-head" role="row">
                        <th className="data-col w-25" rowspan="1" colspan="1">
                          STUDENT NAME
                        </th>
                        <th className="data-col w-25" rowspan="1" colspan="1">
                          REQUEST INFO
                        </th>
                        <th className="data-col w-25" rowspan="1" colspan="1">
                          PAYMENT INFO
                        </th>
                        <th className="data-col w-25" rowspan="1" colspan="1">
                          REQUEST STATUS
                        </th>
                        <th className="data-col" rowspan="1" colspan="1">
                          STATUS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {transwift.map((row) => (
                        <tr className="data-item odd" role="row">
                          <td className="data-col w-25">
                            <small className="lead token-amount">
                              {row.name}
                            </small>
                            {row.refno
                              ? parse(
                                  `<small style="color:#b76117;font-weight:bolder;word-break:break-word">Student ID: ${row.refno}</small>`
                                )
                              : null}
                          </td>
                          <td className="data-col w-25">
                            <small className="lead token-amount">
                              {row.type}
                            </small>
                            {parse(
                              `<small style="font-weight:bolder;word-break:break-word">${
                                row.semester % 2 == 0
                                  ? "SECOND SEMESTER"
                                  : "FIRST SEMESTER"
                              } COURSE</small>`
                            )}
                            {parse(
                              `<br/><small style="color:#b76117;font-weight:bolder;word-break:break-word"> -- ${
                                row.type == "C"
                                  ? "COMPULSORY COURSE"
                                  : row.type == "E"
                                  ? "ELECTIVE COURSE"
                                  : " TYPE NOT SET --"
                              } </small>`
                            )}
                          </td>
                          <td className="data-col w-25">
                            <small className="lead token-amount">
                              {row.program_name}{" "}
                            </small>
                            {row.major_name
                              ? parse(
                                  `<small style="color:#b76117;font-weight:bolder;word-break:break-word">${row.major_name}</small><br/>`
                                )
                              : null}
                          </td>
                          <td className="data-col">
                            {row.semester
                              ? parse(
                                  `<small style="font-weight:bolder;word-break:break-word">YEAR ${Math.ceil(
                                    row.semester / 2
                                  )}</small>`
                                )
                              : null}
                          </td>
                          <td className="data-col">
                            <small
                              style={{
                                color: "#b76117",
                                fontWeight: "bolder",
                                wordBreak: "break-word",
                              }}
                            >
                              {row.unit_name || "NOT SET"}
                            </small>
                          </td>
                          <td className="data-col">
                            <>
                              <Button
                                id={`basic-button${row.id}`}
                                variant="contained"
                                color={
                                  row.flag_assessed == 1 &&
                                  row.flag_certified == 1
                                    ? "success"
                                    : row.flag_assessed == 1 &&
                                      row.flag_certified == 0
                                    ? "warning"
                                    : "error"
                                }
                                aria-controls={`basic-menu${row.id}`}
                                aria-haspopup="true"
                                aria-expanded={
                                  anchorEl && anchorEl == row.id
                                    ? "true"
                                    : undefined
                                }
                                onClick={(e) => handleClick(e, row.id)}
                              >
                                <i className="fa fa-bars"></i>
                              </Button>
                              <Menu
                                id={`basic-menu${row.id}`}
                                anchorEl={anchorEl}
                                open={ref && ref == row.id}
                                onClose={handleClose}
                                variant="outlined"
                                MenuListProps={{
                                  "aria-labelledby": `basic-button${row.id}`,
                                }}
                              >
                                {/*<MenuItem onClick={handleClose}>VIEW PROFILE</MenuItem>*/}
                                <MenuItem onClick={() => editRequest(row.id)}>
                                  EDIT REQUEST
                                </MenuItem>
                              </Menu>
                            </>
                          </td>
                        </tr>
                      )) || (
                        <tr>
                          <td>No Data Loaded!</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </>
              ) : (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "16.5vw",
                    justifyContent: "right",
                    alignItems: "center",
                  }}
                >
                  <h4 style={{ textAlign: "center" }}>LOADING ...</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// COMPONENT - FORM
const Form = ({ recid }) => {
  const [loading, setLoading] = useState(false);
  const [helper, setHelper] = useState({
    programs: [],
    majors: [],
    departments: [],
    courses: [],
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const { sso } = useSelector((state) => state);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.id = parseInt(recid) || 0;
    const sentToServer = {
      id: data.id,
      unit_id: data.unit_id,
      course_id: data.course_id,
      lock: data.lock,
      prog_id: data.prog_id,
      major_id: data.major_id,
      status: data.status,
      semester: data.semester,
      type: data.type,
    };
    const res = await postMetaDataAIS(sentToServer);
    if (res.success) {
      // Do something if passed
      dispatch(
        updateAlert({
          show: true,
          message: `CURRICULUM SAVED !`,
          type: "success",
        })
      );
      setTimeout(() => {
        history.push("/app/ais?mod=curriculum&view=list");
      }, 2000);
    } else {
      // Show error messages
      dispatch(
        updateAlert({ show: true, message: `ACTION FAILED!`, type: "error" })
      );
      alert("ACTION FAILED!");
    }
  };

  const formData = () => {
    const dt = sso.databox.transwift.find((r) => r.id == recid);
    console.log(dt);
    if (dt) {
      const dk = Object.keys(dt);
      dk.forEach((d) => {
        if (d == "semester" || d == "status")
          return setValue(d, parseInt(dt[d]));
        return setValue(d, dt[d]);
      });
    }
  };

  const helperData = async () => {
    const hp = await loadAISHelpers();
    console.log(hp);
    if (hp.success) {
      setHelper(hp.data);
    }
  };

  const cancelForm = (e) => {
    e.preventDefault();
    const cm = window.confirm("Cancel Form ?");
    if (cm) history.push("/app/ais?mod=transwift&view=list");
  };

  useEffect(() => {
    helperData();
    formData();
  }, []);

  return (
    <div className="card-innr">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          {(errors.title || errors.apply_start || errors.apply_end) && (
            <div className="col-md-12">
              <div className="alert alert-danger text-danger font-weight-bolder">
                {errors.quantity && (
                  <small>
                    <b>
                      ** {errors.quantity.message.toUpperCase()}
                      <br />
                    </b>
                  </small>
                )}
              </div>
            </div>
          )}

          <div className="col-md-6">
            <div className="input-item input-with-label">
              <label htmlFor="unit_id" className="input-item-label">
                DEPARTMENT
              </label>
              <select {...register("unit_id")} className="input-bordered">
                <option value="" disabled selected>
                  --CHOOSE--
                </option>
                {helper &&
                  helper.departments.map((row) => (
                    <option
                      value={row.id}
                      selected={getValues("unit_id") == row.id}
                    >
                      {row.title && row.title.toUpperCase()}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="input-item input-with-label">
              <label htmlFor="course_id" className="input-item-label">
                COURSE NAME
              </label>
              <select {...register("course_id")} className="input-bordered">
                <option value="" disabled selected>
                  --CHOOSE--
                </option>
                {helper &&
                  helper.courses.map((row) => (
                    <option
                      value={row.id}
                      selected={getValues("course_id") == row.id}
                    >
                      {row.title && row.title.toUpperCase()} - ({" "}
                      {row.course_code} ){" "}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-item input-with-label">
              <label htmlFor="prog_id" className="input-item-label">
                PROGRAM
              </label>
              <select {...register("prog_id")} className="input-bordered">
                <option value="" disabled selected>
                  --CHOOSE--
                </option>
                {helper &&
                  helper.programs.map((row) => (
                    <option
                      value={row.id}
                      selected={getValues("prog_id") == row.id}
                    >
                      {row.short && row.short.toUpperCase()}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-item input-with-label">
              <label htmlFor="major_id" className="input-item-label">
                MAJOR
              </label>
              <select {...register("major_id")} className="input-bordered">
                <option value="" selected>
                  -- NO MAJOR --
                </option>
                {helper &&
                  helper.majors.map((row) => (
                    <option
                      value={row.id}
                      selected={getValues("major_id") == row.id}
                    >
                      {row.title && row.title.toUpperCase()} (
                      {row.code && row.code.toUpperCase()})
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="input-item input-with-label">
              <label htmlFor="semester" className="input-item-label">
                ASSIGNED GROUP & PERIOD
              </label>
              <select {...register("semester")} className="input-bordered">
                <option value={1}>YEAR 1, FIRST SEMESTER</option>
                <option value={2}>YEAR 1, SECOND SEMESTER</option>
                <option value={3}>YEAR 2, FIRST SEMESTER</option>
                <option value={4}>YEAR 2, SECOND SEMESTER</option>
                <option value={5}>YEAR 3, FIRST SEMESTER</option>
                <option value={6}>YEAR 3, SECOND SEMESTER</option>
                <option value={7}>YEAR 4, FIRST SEMESTER</option>
                <option value={8}>YEAR 4, SECOND SEMESTER</option>
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="input-item input-with-label">
              <label htmlFor="type" className="input-item-label">
                {" "}
                COURSE TYPE
              </label>
              <select {...register("type")} className="input-bordered">
                <option value={null} disabled>
                  -- CHOOSE --
                </option>
                <option value={"C"}>COMPULSORY (CORE)</option>
                <option value={"E"}>ELECTIVE</option>
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="input-item input-with-label">
              <label htmlFor="lock" className="input-item-label">
                REGISTRATION LOCK
              </label>
              <select {...register("lock")} className="input-bordered">
                <option value={null} disabled>
                  -- CHOOSE --
                </option>
                <option value={1}>MUST-REGISTER COURSE</option>
                <option value={0}>OPTIONAL COURSE</option>
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="input-item input-with-label">
              <label htmlFor="status" className="input-item-label">
                STATUS
              </label>
              <select {...register("status")} className="input-bordered">
                <option value={null} disabled>
                  -- CHOOSE --
                </option>
                <option value={1}>ENABLED</option>
                <option value={2}>DISABLED</option>
              </select>
            </div>
          </div>

          {/*BC46W3M8 */}
        </div>

        <div className="gaps-1x"></div>

        <div className="d-sm-flex justify-content-between align-items-center">
          <span>
            <button className="btn btn-dark" type="submit">
              <i className="fa fa-save "></i>&nbsp;&nbsp;<b>SAVE</b>
            </button>
            &nbsp;&nbsp;
            <Link
              to="#"
              onClick={cancelForm}
              className="btn btn-white text-dark"
            >
              <i className="fa fa-times"></i>&nbsp;&nbsp;<b>CANCEL</b>
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Transwift;
