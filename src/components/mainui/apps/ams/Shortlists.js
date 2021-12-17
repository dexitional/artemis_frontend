import React,{ useState,useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { postVoucher,deleteVoucher, fetchVouchers, recoverVoucher, fetchApplicants, fetchApplicant, loadAMSHelpers, fetchSortedApplicants, } from '../../../../store/utils/ssoApi';
import { useSelector,useDispatch } from 'react-redux';
import moment from 'moment';
import { setApplicants, setCurrentPage, setModal, setVouchers, updateAlert, updateDatabox } from '../../../../store/admission/ssoSlice';
import PaperTable from '../../PaperTable';
import Pager from '../../Pager';
import applicantSlice, { setApplyMode, setChoice, setDocument, setEducation, setGrade, setGuardian, setProfile, setResult, setStage, setSubmitStatus, updateUser } from '../../../../store/admission/applicantSlice';
import { setMeta, setStepCount } from '../../../../store/admission/stepSlice';
import { getApplyTypeTitle, getStageTitle } from '../../../../store/utils/admissionUtil';
import parse from 'html-react-parser'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Loader from '../../../../assets/img/loaderm.gif'
import { Divider } from '@mui/material';


// COMPONENT -APPLICANTS
const Shortlists = ({view,data,recid}) => {
   
   const dispatch = useDispatch()
   const { sso } = useSelector(state => state)
   const [ activity,setActivity ] = useState({})
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [ref, setRef] = React.useState(null);
   const open = Boolean(anchorEl);
   const [ helper,setHelper ] = useState({ programs:[],majors:[] });
   
   const helperData = async() => {
      const hps = await loadAMSHelpers()
      console.log(hps)
      if(hps.success){
        setHelper(hps.data)
      } 
   }

   const handleClick = (e,id) => {
        setAnchorEl(e.currentTarget);
        setRef(id);
   };
    const handleClose = () => {
        setAnchorEl(null);
        setRef(null);
    };

   const title = () => {
     switch(view){
       case 'list': return 'SHORTLISTED';
       case 'admit': return 'ADMISSION SELECTION FORM';
     }
   }
   const content = () => {
     switch(view){
        case 'list': return <List/>;
        case 'admit': return <Form recid={recid}/>;
     } 
   }
  
   const showModal = async (e,id) => {
      e.preventDefault()
      const row = sso.sessions.find(s => s.status == 1);
      const resp = await fetchSortedApplicants(row.session_id,`?sell_type=${id}`)
      if(resp.success){
        console.log(resp.data);
        var sub_title;
        
        switch(id){
          case 0 : sub_title = `GENERAL APPLICANTS`; break;
          case 1 : sub_title = `MATURED APPLICANTS`; break;
          case 2 : sub_title = `INTERNATIONAL APPLICANTS`; break;
          default : sub_title = `GENERAL APPLICANTS`; break;
        }
        const meta = { main_title:"ADMISSION APPLICANTS",sub_title, head:['SERIAL','APPLICANT','APPLY GROUP','SEX','CHOICE','APPLIED ON'], field:['serial','name','group_title','gender','choice_name','started_at'], data: resp.data.data }
        let dt = { content: meta, size:'md', show:true, page:'table' }
        dispatch(setModal(dt));
        /**/
      }
      setRef(null);
   } 

   useEffect(() => {
     helperData()
   },[])


   return (
    <div className="content-area card">
	   <h3 className="sub-head bg-blueblack"> 
           { title() }
           { view == 'list' ?
            <div className="d-inline-block print-btn">
                <Button id={`basic-button1`} className="mr-2" variant="contained" color='warning' aria-controls={`basic-menu1`} aria-haspopup="true" aria-expanded={ anchorEl && anchorEl == 1 ? 'true' : undefined} onClick={(e) => handleClick(e,1)}><b>BY CATEGORY</b>&nbsp;&nbsp;<i className="fa fa-bars"></i></Button>
                <Menu id={`basic-menu1`} anchorEl={anchorEl} open={ref && ref == 1} onClose={handleClose} variant="outlined" MenuListProps={{'aria-labelledby': `basic-button1`}}> 
                  <MenuItem onClick={(e) => showModal(e,0)}>{ !activity.mount ? <><em className="fa fa-sm fa-list-alt"></em>&nbsp;&nbsp;<b>ALL GENERAL</b></> : <>&nbsp;&nbsp;<img src={Loader} style={{height:'20px',margin:'0 auto'}}/></>}</MenuItem>
                  <MenuItem onClick={(e) => showModal(e,1)}>{ !activity.reg ? <><em className="fa fa-sm fa-list-alt"></em>&nbsp;&nbsp;<b> ALL MATURED </b></> : <>&nbsp;&nbsp;<img src={Loader} style={{height:'20px',margin:'0 auto'}}/></>}</MenuItem>
                  <MenuItem onClick={(e) => showModal(e,2)}>{ !activity.reg ? <><em className="fa fa-sm fa-list-alt"></em>&nbsp;&nbsp;<b> INTERNATIONAL </b></> : <>&nbsp;&nbsp;<img src={Loader} style={{height:'20px',margin:'0 auto'}}/></>}</MenuItem>
                </Menu>

                <Button id={`basic-button2`} variant="contained" color='warning' aria-controls={`basic-menu2`} aria-haspopup="true" aria-expanded={ anchorEl && anchorEl == 2 ? 'true' : undefined} onClick={(e) => handleClick(e,2)}><b>BY PROGRAM</b>&nbsp;&nbsp;<i className="fa fa-bars"></i></Button>
                <Menu id={`basic-menu2`} anchorEl={anchorEl} open={ref && ref == 2} onClose={handleClose} variant="outlined" MenuListProps={{'aria-labelledby': `basic-button2`}}> 
                  { helper && helper.programs.map((row,i) => 
                    <MenuItem onClick={(e) => null}>{ !activity['regp'+row.id] ? <><em className="fa fa-sm fa-list-alt"></em>&nbsp;&nbsp;<b> {row.short} </b></> : <>&nbsp;&nbsp;<img src={Loader} style={{height:'20px',margin:'0 auto'}}/></>}</MenuItem>
                  )}
                </Menu>

            </div> : null
           }
	   </h3>
        {content()}
	</div>
   )
}

// COMPONENT - LIST
const List = () => {

   const [ sorted, setSorted ] = useState([])
   const { sso } = useSelector(state => state)
   const dispatch = useDispatch();
   const history = useHistory()
   const sid = sso.sessions.find(s => s.status == 1);
   
   const restoreSortData = () => {
      sso.databox.sorted && setSorted([...sso.databox.sorted]);
   }

   
   const getType = (dt) => {
       var ot;
       switch(dt.sell_type){
         case 0 : ot = `${dt.group_name} (${dt.group_id})`; break;
         case 1 : ot = `Matured (${dt.group_id})`; break;
         case 2 : ot = `International (${dt.group_id})`; break;
         default : ot = dt.group_name; break;
       }return ot;
   }


   const showFormModal = async (e,serial) => {
        e.preventDefault()
        const resp = await fetchApplicant(serial)
        if(resp.success){
           // Save to Redux State
           const rec = resp.data;
           // Configure Application
           dispatch(setApplyMode(rec.apply_type));
           dispatch(setStage(rec.stage_id));
           // Setup Form Meta & Steps
           dispatch(setStepCount(rec.count));
           dispatch(setMeta(rec.meta));
           dispatch(setSubmitStatus(rec.flag_submit))
           // Setup User info
           const user = { photo: rec.user.photo, serial: rec.user.serial, name: (rec.stage_id ? getStageTitle(rec.stage_id):'')+(rec.apply_type ? ' | '+getApplyTypeTitle(rec.apply_type):''), group_name: rec.user.group_name }
           dispatch(updateUser(user));
           // Setup User Form Data
           if(rec.data.profile) dispatch(setProfile(rec.data.profile))
           if(rec.data.guardian) dispatch(setGuardian(rec.data.guardian))
           if(rec.data.education) dispatch(setEducation(rec.data.education))
           if(rec.data.result){
             dispatch(setResult(rec.data.result))
             if(rec.data.grade) dispatch(setGrade(rec.data.grade))
           } 
           if(rec.data.choice) dispatch(setChoice(rec.data.choice))
           if(rec.data.document) dispatch(setDocument(rec.data.document))
           //if(rec.data.referee) dispatch(setReferee(rec.data.referee))
           //if(rec.data.employment) dispatch(setEmployment(rec.data.employment))
           //if(rec.data.qualification) dispatch(setQualification(rec.data.qualification))
           let dt = { size:'md', show:true, page:'form' }
           dispatch(setModal(dt));
        }
        
    } 

    const admitApplicant = (e,serial) => {
      e.preventDefault()
      history.push(`/app/ams?mod=shortlists&view=admit&recid=${serial}`)
    }

   // Search & Pagination
   const [ page, setPage ] = React.useState(1);
   const [ count, setCount ] = React.useState(0);
   const [ keyword, setKeyword ] = React.useState('');
   const [ isLoading, setIsLoading ] = React.useState(false);

   const fetchSortData = async () => {
      if(sid){
        var query = ``;
        if(page >= 0) query += `?page=${page-1}`
        if(keyword != '') query += `&keyword=${keyword}`
        const res = await fetchSortedApplicants(sid && sid.session_id,query);
        if(res.success){
           setIsLoading(false)
           setSorted([...res.data.data]);// Page Data
           setCount(res.data.totalPages)// Total Pages
        }
      }
    }
   
   const onSearchChange = async (e) => {
     setKeyword(e.target.value)
     if(e.target.value == '') fetchSortData()
   }

  const onPageChange = async (e) => {
     var vs = parseInt(e.target.value)
     vs = Math.max(1,vs)
     vs = Math.min(count,vs)
     setPage(vs)
     setIsLoading(true)
  }

  const onPageClick = async (event,value) => {
    setIsLoading(true)
    setPage(value);
  }
   
  const onSubmitSearch = async (e) => {
    e.preventDefault()
    if(sid){
      setIsLoading(true)
      fetchSortData()
    }
  }

  
   useEffect(() => {
     restoreSortData()
   },[])

   useEffect(() => {
     dispatch(updateDatabox({sorted}));
   },[sorted])

   useEffect(() => {
     fetchSortData()
     dispatch(setCurrentPage(page))
   },[page])

   return (
    <div className="card-innr">
      <Pager count={count} page={page} onPageChange={onPageChange} onPageClick={onPageClick} keyword={keyword} onSearchChange={onSearchChange} onSubmitSearch={onSubmitSearch} isLoading={isLoading} />
      <div className="dataTables_wrapper dt-bootstrap4 no-footer">
        <div className="table-wrap">  
            <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                <div className="table-wrap">
                    { !isLoading ? 
                    <table className="data-table dt-filter-init admin-tnx dataTable no-footer" id="DataTables_Table_0">
                        <thead>
                            <tr className="data-item data-head" role="row">
                                <th className="data-col w-25" rowspan="1" colspan="1">APPLICANT</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">ADMISSION GROUP </th>
                                <th className="data-col w-25" rowspan="1" colspan="1">APPLY MODE</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">CHOICES</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">APPLIED ON</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                          { sorted.map((row) => 
                          <tr className="data-item odd" role="row">
                            <td className="data-col">
                              <span className="lead token-amount">
                                   { row.name && row.name.toUpperCase() }
                                   {row.gender ? parse(` <small style="color:#b76117;font-weight:bolder">(${ row.gender}) (${ moment().diff(moment(row.dob),'years')} YRS) </small>`) : null }
                              </span>
                              {row.serial ? parse(`<small style="color:#b76117;font-weight:bolder"> -- APPLICANT ID: ${ row.serial} </small>`) : null }
                            </td>
                            <td className="data-col">
                              <small className="lead tnx-id">{ row.applytype }</small>
                              {row.grade_value ? parse(`<small style="color:#b76117;font-weight:bolder">-- Aggregate: ${row.grade_value} </small>`) : null }
                              {row.class_value ? parse(`<small style="color:#b76117;font-weight:bolder">-- Class: ${row.class_value} </small>`) : null }
                            </td>
                            
                            <td className="data-col"><span className="lead amount-pay">{ getType(row) && getType(row).toUpperCase() }</span></td>
                            <td className="data-col">
                              <small className="lead amount-pay">1. { row.choice_name1 && row.choice_name1.toUpperCase() }</small>
                              {row.choice_name2 ? parse(`<small style="color:#b76117;font-weight:bolder">2.  ${row.choice_name2 && row.choice_name2.toUpperCase()} </small>`) : null }
                            </td>
                            <td className="data-col"><span className="lead amount-pay">{ row.started_at && moment(row.started_at).format('DD MMM YY, HH:MM').toUpperCase() }</span></td>
                            { true &&
                            <td className="data-col">
                              <div className="d-flex">
                                <Link className={`badge badge-sm badge-success text-white`} onClick={ e => admitApplicant(e,row.serial)}><b><em className="ti ti-sms"></em>ADMIT</b></Link><br/>
                                <Link className={`badge badge-sm badge-warning text-dark`} onClick={ e => showFormModal(e,row.serial)}><b><i className="fa fa-file-alt"></i></b></Link><br/>
                                <Link className={`badge badge-sm badge-warning text-dark`} onClick={ e => showFormModal(e,row.serial)}><b><i className="fa fa-folder"></i></b></Link>
                              </div>
                            </td>} 
                          </tr>
                          )}
                        </tbody>
                    </table>
                    :
                    <div style={{display:'flex',width:'100%',height:'10vw',justifyContent:'right',alignItems:'center'}}><h4 style={{textAlign:'center'}}>LOADING ...</h4></div>
                    }
                </div>
            </div>
        </div>
      </div>
    </div>
   )
}



// COMPONENT - FORM
const Form = ({recid}) => {
  const [ loading,setLoading ] = useState(false);
  const [ helper,setHelper ] = useState({ programs:[],adm_programs:[] });
  const history = useHistory();
  const dispatch = useDispatch();
  const { sso } = useSelector(state => state)
  const [ form, setForm ] = useState({});
  const [ options, setOptions ] = useState([]);

  const onChange = (e) => {
    var index = e.target.selectedIndex;
    var optionElement = e.target.childNodes[index]
    var program_id =  optionElement.dataset.program;
    var major_id =  optionElement.dataset.major;
    setForm({...form, option_id : e.target.value, program_id, major_id });
  }
  
  const onSubmit = async data => {
    data.id = parseInt(recid) || 0;
    //const res = await postPaymentFMS(data);
    var res;
    if(res.success){
       // Do something if passed
       dispatch(updateAlert({show:true,message:`APPLICANT ADMITTED!`,type:'success'}))
       setTimeout(() => {
         history.push('/app/ams?mod=shortlists&view=list')

        },2000)
    } else{
       // Show error messages
       dispatch(updateAlert({show:true,message:`${res.msg.toUpperCase()}`,type:'error'}))
       alert(`${res.msg.toUpperCase()}`)
    }
  }

  const formData = () => {
      const dt = sso.databox.sorted.find( r => r.serial == recid )
      if(dt){
        setForm({...dt})
      } 
  }

  const helperData = async() => {
      const hp = await loadAMSHelpers()
      console.log(hp)
      if(hp.success){
        setHelper(hp.data)
      } 
  }

  const getType = (dt) => {
    var ot;
    switch(dt.sell_type){
      case 0 : ot = `${dt.group_name} (${dt.group_id})`; break;
      case 1 : ot = `Matured (${dt.group_id})`; break;
      case 2 : ot = `International (${dt.group_id})`; break;
      default : ot = dt.group_name; break;
    }return ot;
}

  

  const cancelForm = (e) => {
     e.preventDefault();
     const cm = window.confirm('Cancel Form ?')
     if(cm) history.push('/app/ams?mod=shortlists&view=list')
  }

  useEffect(()=>{
    helperData();
    formData();
  },[])


  return (
  <div className="card-innr">
            <form onSubmit={onSubmit}>
                  <div className="row">
                     
                      <div className="col-md-6 alert">
                          <div className="text-dark"><b>APPLICANT FULL NAME:  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{form.name && form.name.toUpperCase()}</b></div>
                          <div className="text-dark"><b>APPLICANT FIRST CHOICE:  &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;{form.choice_name1}</b></div>
                          <div className="text-dark"><b>APPLICANT SECOND CHOICE: &nbsp;&nbsp;&nbsp;&nbsp;{form.choice_name2}</b></div>
                      </div>
                      <div className="col-md-6 alert">
                          <div className="text-dark"><b>APPLICATION MODE:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{getType(form) && getType(form).toUpperCase()}</b></div>
                          <div className="text-dark"><b>ADMISSION GROUP:  &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;{form.applytype && form.applytype.toUpperCase()}</b></div>
                          {form.grade_value && <div className="text-dark"><b>AGGREGATE: &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{form.choice_name2}</b></div>}
                          {form.class_value && <div className="text-dark"><b>CLASS OBTAINED:     &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{form.choice_name2}</b></div>}
                      </div>
                      
                      <Divider/>

                      
                     
                      <div className="col-md-9">
                          <div className="input-item input-with-label">
                              <label htmlFor="choice_id" className="input-item-label">ADMIT APPLICANT INTO</label>
                              <select onChange={(e)=> onChange(e)} value={form.option_id} className="input-bordered">
                                <option value="" disabled selected>--NONE--</option>
                                { helper && helper.adm_programs.map((hp) => 
                                <option value={hp.id} data-program={hp.prog_id} data-major={hp.major_id}>{`${hp.program_name.toUpperCase()} ${hp.major_name ? '( '+hp.major_name.toUpperCase()+' )':''}`}</option>
                                )}
                              </select>
                          </div>
                      </div>
                      <div className="col-md-3">
                          <div className="input-item input-with-label">
                              <label htmlFor="tag" className="input-item-label">ACADEMIC START YEAR</label>
                              <select onChange={(e)=> onChange(e)} name="start_semester" value={form.start_semester} className="input-bordered">
                                <option value="" disabled selected>--NONE--</option>
                                <option value={1} disabled selected>YEAR ONE(1)</option>
                                <option value={3} disabled selected>YEAR TWO(2)</option>
                              </select>
                          </div>
                      </div>

                     
                  </div>

                  <div className="gaps-1x"></div>

                  <div className="d-sm-flex justify-content-between align-items-center">
                      <span>
                      <button className="btn btn-dark" type="submit">
                          <i className="fa fa-save "></i>&nbsp;&nbsp;<b>SAVE</b>
                      </button>&nbsp;&nbsp;
                      <Link to="#" onClick={cancelForm} className="btn btn-white text-dark">
                          <i className="fa fa-times"></i>&nbsp;&nbsp;<b>CANCEL</b>
                      </Link>
                      </span>
                  </div>

              </form>
        
  </div>
    )
}


export default Shortlists
