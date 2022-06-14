import React,{ useState,useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { postVoucher,deleteVoucher, fetchVouchers, recoverVoucher, fetchApplicants, fetchApplicant, fetchFreshers, fetchFreshersData, fetchDocuments, removeFresherData, reAdmitApplicant, } from '../../../../store/utils/ssoApi';
import { useSelector,useDispatch } from 'react-redux';
import moment from 'moment';
import { setApplicants, setCurrentPage, setDatabox, setModal, setVouchers, updateAlert, updateDatabox } from '../../../../store/admission/ssoSlice';
import PaperTable from '../../PaperTable';
import Pager from '../../Pager';
import applicantSlice, { setApplyMode, setChoice, setDocument, setEducation, setEmployment, setGrade, setGuardian, setProfile, setReferee, setResult, setStage, setSubmitStatus, updateUser } from '../../../../store/admission/applicantSlice';
import { setMeta, setStepCount } from '../../../../store/admission/stepSlice';
import { getApplyTypeTitle, getStageTitle, jsonToExcel } from '../../../../store/utils/admissionUtil';
import parse from 'html-react-parser'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Loader from '../../../../assets/img/loaderm.gif'
import { fetchAdmitedStudent } from '../../../../store/utils/admissionApi';
import { CSVLink,CSVDownload } from "react-csv";



// COMPONENT -APPLICANTS
const Matriculants = ({view,data,recid}) => {
   
   const dispatch = useDispatch()
   const { sso } = useSelector(state => state)
   const [ activity,setActivity ] = useState({})
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [ref, setRef] = React.useState(null);
   const open = Boolean(anchorEl);
   const history = useHistory()
   
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
       case 'list': return 'MATRICULANTS';
     }
   }
   const content = () => {
     switch(view){
        case 'list': return <List/>;
     } 
   }
  
   const showModal = async (e,id) => {
      e.preventDefault()
      const resp = await fetchApplicants(`?sell_type=${id}`)
      if(resp.success){
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

   
   const printData = async () => {
      const resp = await fetchFreshersData()
      if(resp.success){
        const data = resp.data
        const content = { title:'Admitted Applicants', data }
        let dz = { content, size:'md', show:true, page:'admitlist' }
        dispatch(setModal(dz));
      }
   }

  
   const exportData = async () => {
      const resp = await fetchFreshersData()
      var fileName,data = [];
      if(resp.success){
        if(resp.data && resp.data.length > 0){
          fileName = `${new Date().getFullYear()} ADMISSIONS`
          for(var row of resp.data){
            const ds = {'STUDENT ID':row.serial.toString(),'STUDENT NAME':row.name.toUpperCase(),'PROGRAMME':row.program_name,'YEAR':Math.ceil(row.start_semester/2),'GENDER':row.gender, 'AGE':moment().diff(row.dob,'years')+' YRS', 'PHONE': row.phone}
            data.push(ds)
          }
        }
        return jsonToExcel(data,fileName)
      }
   }

   const removeData = async () => {
        const serial = window.prompt("PLEASE PROVIDE SERIAL NUMBER OF APPLICANT!")
        if(serial){
          const resp = await removeFresherData(serial)
          if(resp.success){
             dispatch(updateAlert({show:true,message:`ADMISSION REVOKED FOR APPLICANT ID: ${serial}!`,type:'success'}))
             history.push('/app/ams?mod=matriculants&view=list')
          }else{
             dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
          }
        } 
    }



   return (
    <div className="content-area card">
	   <h3 className="sub-head bg-blueblack"> 
           { title() }
           { view == 'list' ?
            <div className="d-inline-block print-btn">
                <button onClick={removeData} className="btn btn-danger btn-sm btn-icon text-white"><em className="fa fa-sm fa-trash"></em>&nbsp;&nbsp;<b>REVOKE</b></button>&nbsp;
                <button onClick={printData} className="btn btn-warning btn-sm btn-icon text-dark"><em className="fa fa-sm fa-print"></em>&nbsp;&nbsp;<b>PRINT</b></button>&nbsp;
                <button onClick={exportData} className="btn btn-success btn-sm btn-icon text-dark"><em className="fa fa-sm fa-file-excel"></em>&nbsp;&nbsp;<b>EXPORT</b></button>
            </div> : null
           }
     </h3>
        {content()}
	</div>
   )
}

// COMPONENT - LIST
const List = () => {

   const [ freshers, setFreshers ] = useState([])
   const { sso } = useSelector(state => state)
   const dispatch = useDispatch();
   
   const restoreVoucherData = () => {
      sso.databox.freshers && setFreshers([...sso.databox.freshers]);
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
           if(rec.data.referee) dispatch(setReferee(rec.data.referee))
           if(rec.data.employment) dispatch(setEmployment(rec.data.employment))
           //if(rec.data.qualification) dispatch(setQualification(rec.data.qualification))
           let dt = { size:'md', show:true, page:'form' }
           dispatch(setModal(dt));
        }
        
    } 

   const showLetterModal = async (e,serial) => {
      e.preventDefault()
      const resp = await fetchAdmitedStudent(serial)
      if(resp.success){
        e.preventDefault()
        const data = resp.data
        const content = { title:'Admission Letter', data }
        let dz = { content, size:'md', show:true, page:'letter' }
        dispatch(setModal(dz));
      }
   } 

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

   const removeData = async (e,serial) => {
      e.preventDefault()
      if(serial){
        const resp = await removeFresherData(serial)
        if(resp.success){
          dispatch(updateAlert({show:true,message:`ADMISSION REVOKED FOR APPLICANT ID: ${serial}!`,type:'success'}))
          fetchVoucherData()
        }else{
          dispatch(updateAlert({show:true,message:`ACTION FAILED!`,type:'error'}))
        }
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
      const res = await fetchFreshers(query);
      if(res.success){
          setIsLoading(false)
          setFreshers([...res.data.data]);// Page Data
          setCount(res.data.totalPages)// Total Pages
      }else{
          setIsLoading(false)
          setFreshers([]);// Page Data
          setCount(1)// Total Pages
      }
   }

   const admitApplicant = async (e,serial) => {
      const res = await reAdmitApplicant({serial})
      if(res.success){
        dispatch(updateAlert({show:true,message:`APPLICANT ADMITTED !`,type:'success'}))
        fetchVoucherData()
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
    setIsLoading(true)
    fetchVoucherData()
  }

   // End
   useEffect(() => {
     restoreVoucherData()
   },[])

   useEffect(() => {
     dispatch(updateDatabox({freshers}));
   },[freshers])

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
                    <table className="data-table dt-filter-init admin-tnx dataTable no-footer" id="DataTables_Table_0">
                        <thead>
                            <tr className="data-item data-head" role="row">
                                <th className="data-col w-25" rowspan="1" colspan="1">STUDENT ID </th>
                                <th className="data-col w-25" rowspan="1" colspan="1">STUDENT NAME</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">PROGRAM</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">YEAR</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">ADMITTED ON</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                          { freshers.map((row) => 
                          <tr className="data-item odd" role="row">
                            <td className="data-col"><span className="lead tnx-id">{ row.serial }</span></td>
                            <td className="data-col">
                              <span className="lead token-amount">{ row.name && row.name.toUpperCase() }</span>
                              {row.gender ? parse(`<small style="color:#b76117;font-weight:bolder">  -- ${ row.gender == 'M' ? 'MALE':'FEMALE' } </small>`) : null }
                            </td>
                            <td className="data-col">
                              <span className="lead amount-pay">{ row.program_name && row.program_name.toUpperCase() }</span>
                            </td>
                            <td className="data-col"><span className="lead amount-pay">{ Math.ceil(row.start_semester/2) }</span></td>
                            <td className="data-col"><span className="lead amount-pay">{ row.created_at && moment(row.created_at).format('DD MMM YY, HH:MM').toUpperCase() }</span></td>
                           
                            <td className="data-col">
                                { row.name ?
                                 <><Link className={`badge badge-sm badge-warning text-dark`} onClick={ e => showLetterModal(e,row.serial)}><b><em className="ti ti-sms"></em>LETTER</b></Link><br/></> :
                                 <><Link className={`badge badge-sm badge-success text-white`} onClick={ e => admitApplicant(e,row.serial)}><b><em className="ti ti-sms"></em>ADMIT</b></Link><br/></>
                                }
                                <Link className={`badge badge-sm badge-warning text-dark`} onClick={ e => getDocs(e,row.serial)}><b><i className="fa fa-folder"></i></b></Link>
                                <Link className={`badge badge-sm badge-danger text-white`} onClick={ e => removeData(e,row.serial)}><b><i className="fa fa-trash"></i></b></Link>
                            </td>
                          </tr>
                          ) || 
                            <td className="data-col d-flex">
                                NO DATA
                            </td>
                          }
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


export default Matriculants
