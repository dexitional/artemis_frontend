import React,{ useState,useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { postVoucher,deleteVoucher, fetchVouchers, recoverVoucher, fetchApplicants, fetchApplicant, addSortApplicant, fetchDocuments, } from '../../../../store/utils/ssoApi';
import { useSelector,useDispatch } from 'react-redux';
import moment from 'moment';
import { setApplicants, setCurrentPage, setModal, setVouchers, updateAlert } from '../../../../store/admission/ssoSlice';
import PaperTable from '../../PaperTable';
import Pager from '../../Pager';
import applicantSlice, { setApplyMode, setChoice, setDocument, setEducation, setEmployment, setGrade, setGuardian, setProfile, setReferee, setResult, setStage, setSubmitStatus, updateUser } from '../../../../store/admission/applicantSlice';
import { setMeta, setStepCount } from '../../../../store/admission/stepSlice';
import { getApplyTypeTitle, getStageTitle } from '../../../../store/utils/admissionUtil';
import parse from 'html-react-parser'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Loader from '../../../../assets/img/loaderm.gif'


// COMPONENT -APPLICANTS
const Applicants = ({view,data,recid}) => {
   
   const dispatch = useDispatch()
   const { sso } = useSelector(state => state)
   const [ activity,setActivity ] = useState({})
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [ref, setRef] = React.useState(null);
   const open = Boolean(anchorEl);
   
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
       case 'list': return 'APPLICANTS';
     }
   }
   const content = () => {
     switch(view){
        case 'list': return <List/>;
     } 
   }
  
   const showModal = async (e,id) => {
      e.preventDefault()
      const row = sso.sessions.find(s => s.status == 1);
      const resp = await fetchApplicants(row.session_id,`?sell_type=${id}`)
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


   return (
    <div className="content-area card">
	   <h3 className="sub-head bg-blueblack"> 
           { title() }
           { /*view == 'list' ?
            <div className="d-inline-block print-btn" style={{display:'none'}}>
                <Button id={`basic-button1`} className="mr-2" variant="contained" color='warning' aria-controls={`basic-menu1`} aria-haspopup="true" aria-expanded={ anchorEl && anchorEl == 1 ? 'true' : undefined} onClick={(e) => handleClick(e,1)}><b>BY CATEGORY</b>&nbsp;&nbsp;<i className="fa fa-bars"></i></Button>
                <Menu id={`basic-menu1`} anchorEl={anchorEl} open={ref && ref == 1} onClose={handleClose} variant="outlined" MenuListProps={{'aria-labelledby': `basic-button1`}}> 
                  <MenuItem onClick={(e) => showModal(e,0)}>{ !activity.mount ? <><em className="fa fa-sm fa-list-alt"></em>&nbsp;&nbsp;<b>ALL GENERAL</b></> : <>&nbsp;&nbsp;<img src={Loader} style={{height:'20px',margin:'0 auto'}}/></>}</MenuItem>
                  <MenuItem onClick={(e) => showModal(e,1)}>{ !activity.reg ? <><em className="fa fa-sm fa-list-alt"></em>&nbsp;&nbsp;<b> ALL MATURED </b></> : <>&nbsp;&nbsp;<img src={Loader} style={{height:'20px',margin:'0 auto'}}/></>}</MenuItem>
                  <MenuItem onClick={(e) => showModal(e,2)}>{ !activity.reg ? <><em className="fa fa-sm fa-list-alt"></em>&nbsp;&nbsp;<b> INTERNATIONAL </b></> : <>&nbsp;&nbsp;<img src={Loader} style={{height:'20px',margin:'0 auto'}}/></>}</MenuItem>
                </Menu>

                <Button id={`basic-button2`} variant="contained" color='warning' aria-controls={`basic-menu2`} aria-haspopup="true" aria-expanded={ anchorEl && anchorEl == 2 ? 'true' : undefined} onClick={(e) => handleClick(e,2)}><b>BY PROGRAM</b>&nbsp;&nbsp;<i className="fa fa-bars"></i></Button>
                <Menu id={`basic-menu2`} anchorEl={anchorEl} open={ref && ref == 2} onClose={handleClose} variant="outlined" MenuListProps={{'aria-labelledby': `basic-button2`}}> 
                  <MenuItem onClick={null}>{ !activity.mount ? <><em className="fa fa-sm fa-list-alt"></em>&nbsp;&nbsp;<b>ALL GENERAL</b></> : <>&nbsp;&nbsp;<img src={Loader} style={{height:'20px',margin:'0 auto'}}/></>}</MenuItem>
                  <MenuItem onClick={null}>{ !activity.reg ? <><em className="fa fa-sm fa-list-alt"></em>&nbsp;&nbsp;<b> MATURED </b></> : <>&nbsp;&nbsp;<img src={Loader} style={{height:'20px',margin:'0 auto'}}/></>}</MenuItem>
                  <MenuItem onClick={null}>{ !activity.reg ? <><em className="fa fa-sm fa-list-alt"></em>&nbsp;&nbsp;<b> INTERNATIONAL </b></> : <>&nbsp;&nbsp;<img src={Loader} style={{height:'20px',margin:'0 auto'}}/></>}</MenuItem>
                </Menu>

            </div> : null
            */}
	   </h3>
        {content()}
	</div>
   )
}

// COMPONENT - LIST
const List = () => {

   const [ appls, setAppls ] = useState([])
   const { sso } = useSelector(state => state)
   const dispatch = useDispatch();
   const sid = sso.sessions.find(s => s.status == 1);
   const [ activity,setActivity ] = useState({})
   
   const restoreVoucherData = () => {
     setAppls([...sso.applicants]);
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
        resetFormPage()
        setActivity({...activity,[`sn${serial}`]:true})
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
           if(rec.data.referee) dispatch(setReferee(rec.data.referee))
           if(rec.data.employment) dispatch(setEmployment(rec.data.employment))
           //if(rec.data.qualification) dispatch(setQualification(rec.data.qualification))
           let dt = { size:'md', show:true, page:'form' }
           dispatch(setModal(dt));
           setActivity({...activity,[`sn${serial}`]:false})
        }
        
    } 

    const resetFormPage = () => {
        dispatch(setApplyMode(null));
        dispatch(setStage(null));
        // Setup Form Meta & Steps
        dispatch(setStepCount(0));
        dispatch(setMeta([]));
        dispatch(setSubmitStatus(0))
        // Setup User info
        dispatch(updateUser({}));
        // Setup User Form Data
        dispatch(setProfile({}))
        dispatch(setGuardian({}))
        dispatch(setEducation([]))
        dispatch(setResult([]))
        dispatch(setGrade([]))
        dispatch(setChoice([]))
        dispatch(setDocument([]))
        dispatch(setReferee([]))
        dispatch(setEmployment([]))
        //if(rec.data.qualification) dispatch(setQualification(rec.data.qualification))
    }

   // Add to Sort
   const addToList = async (e,serial) => {
      e.preventDefault()
      const res = await addSortApplicant(serial);
      if(res.success){
        // Do something if passed
        dispatch(updateAlert({show:true,message:`APPLICANT SHORLISTED !`,type:'success'}))
        fetchVoucherData()
      }

   }

   // Fetch Applicant Docs
   const getDocs = async (e,serial) => {
        e.preventDefault()
        const resp = await fetchDocuments(serial)
        if(resp.success){
          e.preventDefault()
          const data = resp.docs
          console.log(data)
          const content = { title:'Applicant Documents', data }
          let dz = { content, size:'md', show:true, page:'docs' }
          dispatch(setModal(dz));
        }else{
          dispatch(updateAlert({show:true,message:`NO DOCUMENTS UPLOADED!`,type:'error'}))
        }
    } 

   // Search & Pagination
   const [ page, setPage ] = React.useState(1);
   const [ count, setCount ] = React.useState(0);
   const [ keyword, setKeyword ] = React.useState('');
   const [ isLoading, setIsLoading ] = React.useState(false);

   const fetchVoucherData = async () => {
      var query = ``;
      if(page >= 0) query += `?page=${page-1}`
      if(keyword != '') query += `&keyword=${keyword}`
      
      const res = await fetchApplicants(query);
      if(res.success){
        setIsLoading(false)
        setAppls([...res.data.data]);// Page Data
        setCount(res.data.totalPages)// Total Pages
      }
    }
   
   const onSearchChange = async (e) => {
     setKeyword(e.target.value)
     if(e.target.value == '') fetchVoucherData()
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
        fetchVoucherData()
      }
    }

  

    // End
    useEffect(() => {
      restoreVoucherData()
    },[])

    useEffect(() => {
      dispatch(setApplicants([...appls]));
    },[appls])

    useEffect(() => {
      fetchVoucherData()
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
                    <table className="data-table admin-tnx dataTable no-footer table-responsive" id="DataTables_Table_0">
                        <thead>
                            <tr className="data-item data-head" role="row">
                                <th className="data-col w-25" rowspan="1" colspan="1">APPLICANT</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">ADMISSION GROUP </th>
                                <th className="data-col w-25" rowspan="1" colspan="1">APPLY MODE</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">CHOICES</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                          
                         { appls.map((row,i) => 
                          <tr className="data-item odd" role="row">
                            <td className="data-col">
                              <span className="lead token-amount">
                                   { row.name && row.name.toUpperCase() }
                                   {row.gender ? parse(` <small style="color:#b76117;font-weight:bolder">(${ row.gender}) (${ moment().diff(moment(row.dob),'years')} YRS) </small>`) : null }
                                   {row.phone ? parse(`<br/><small style="color:#b76117;font-weight:bolder">${row.phone}</small>`) : null }
                              </span>
                              {row.serial ? parse(`<small style="color:#b76117;font-weight:bolder">- APPLICANT ID: ${ row.serial} </small>`) : null }
                            </td>
                            <td className="data-col">
                              <small className="lead tnx-id">{ row.applytype || ' -- NONE --'}</small>
                              {row.grade_value ? parse(`<small style="color:#b76117;font-weight:bolder">- AGGREGATE: ${row.grade_value} </small>`) : null }
                              {row.class_value ? parse(`<small style="color:#b76117;font-weight:bolder">- CLASS: ${row.class_value} </small>`) : null }
                            </td>
                            
                            <td className="data-col">
                              <span className="lead amount-pay">{ getType(row) && getType(row).toUpperCase() || <b>-- NONE --</b> }</span>
                              {row.started_at ? parse(`<small style="color:#b76117;font-weight:bolder">-- ${moment(row.started_at).format('LLL').toUpperCase()} </small>`) : null }
                            </td>
                            <td className="data-col">
                              { row.choice_name1 && <small className="lead amount-pay">1. { row.choice_name1 && row.choice_name1.toUpperCase() }</small> || <b>-- NONE --</b> }
                              { row.choice_name2 ? parse(`<small style="color:#b76117;font-weight:bolder">2.  ${row.choice_name2 && row.choice_name2.toUpperCase()} </small>`) : null }
                            </td>
                            { true &&
                            <td className="data-col">
                              { row.flag_submit == 1 ? 
                              <div className=''>
                                 <Link className={`badge badge-sm badge-warning text-dark`} onClick={ e => showFormModal(e,row.serial)}><b>{ !activity[`sn${row.serial}`] ? <i className="fa fa-id-card"></i> : <img src={Loader} style={{ margin:'0 auto',height:'18px' }}/>} </b></Link><br/>
                                 <Link className={`badge badge-sm badge-warning text-dark`} onClick={ e => getDocs(e,row.serial)}><b><i className="fa fa-folder"></i></b></Link>
                                 <Link className={`badge badge-sm badge-success text-white`} onClick={ e => addToList(e,row.serial)}><b><i className="fa fa-check"></i></b></Link>
                                &nbsp;&nbsp;
                              </div> : '' }
                            </td>} 
                          </tr>
                          )}

                        </tbody>
                    </table>
                    : <div style={{display:'flex',width:'100%',height:'10vw',justifyContent:'right',alignItems:'center'}}><h4 style={{textAlign:'center'}}>LOADING ...</h4></div>
                    }
                </div>
            </div>
        </div>
      </div>
    </div>
   )
}


export default Applicants
