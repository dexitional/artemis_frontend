import React,{ useState,useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { postVoucher,deleteVoucher, fetchVouchers, recoverVoucher, fetchApplicants, fetchApplicant, } from '../../../../store/utils/ssoApi';
import { useSelector,useDispatch } from 'react-redux';
import moment from 'moment';
import { setApplicants, setCurrentPage, setModal, setVouchers } from '../../../../store/admission/ssoSlice';
import PaperTable from '../../PaperTable';
import Pager from '../../Pager';
import applicantSlice, { setApplyMode, setChoice, setDocument, setEducation, setEmployment, setGrade, setGuardian, setProfile, setReferee, setResult, setStage, setSubmitStatus, updateUser } from '../../../../store/admission/applicantSlice';
import { setMeta, setStepCount } from '../../../../store/admission/stepSlice';
import { getApplyTypeTitle, getStageTitle } from '../../../../store/utils/admissionUtil';


// COMPONENT -APPLICANTS
const Applicants = ({view,data,recid}) => {
   
   const dispatch = useDispatch()
   const { sso } = useSelector(state => state)
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
      
   } 


   return (
    <div className="content-area card">
	   <h3 className="sub-head bg-blueblack"> 
           { title() }
           { view == 'list' ?
            <div className="d-inline-block print-btn">
                <Link onClick={(e) => showModal(e,1)} className="btn btn-dark-alt btn-sm btn-icon ml-1"><em className="fa fa-sm fa-book"></em>&nbsp;&nbsp;<b>MATURED</b></Link>
                <Link onClick={(e) => showModal(e,2)} className="btn btn-dark-alt btn-sm btn-icon ml-1"><em className="fa fa-sm fa-book"></em>&nbsp;&nbsp;<b>INTERNATIONAL</b></Link>
                <Link onClick={(e) => showModal(e,0)} className="btn btn-dark-alt btn-sm btn-icon ml-1"><em className="fa fa-sm fa-book"></em>&nbsp;&nbsp;<b>GENERAL </b></Link>
            </div> : null
           }
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
        const resp = await fetchApplicant(serial)
        if(resp.success){
          console.log(resp.data);
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
        if(rec.data.profile) dispatch(setProfile({}))
        if(rec.data.guardian) dispatch(setGuardian({}))
        if(rec.data.education) dispatch(setEducation([]))
        if(rec.data.result){
          dispatch(setResult([]))
          if(rec.data.grade) dispatch(setGrade([]))
        } 
        if(rec.data.choice) dispatch(setChoice([]))
        if(rec.data.document) dispatch(setDocument([]))
        if(rec.data.referee) dispatch(setReferee([]))
        if(rec.data.employment) dispatch(setEmployment([]))
        //if(rec.data.qualification) dispatch(setQualification(rec.data.qualification))
       
    }

   // Search & Pagination
   const [ page, setPage ] = React.useState(1);
   const [ count, setCount ] = React.useState(0);
   const [ keyword, setKeyword ] = React.useState('');
   const [ isLoading, setIsLoading ] = React.useState(false);

   const fetchVoucherData = async () => {
      if(sid){
        var query = ``;
        if(page >= 0) query += `?page=${page-1}`
        if(keyword != '') query += `&keyword=${keyword}`
        const res = await fetchApplicants(sid && sid.session_id,query);
        if(res.success){
           setIsLoading(false)
           setAppls([...res.data.data]);// Page Data
           setCount(res.data.totalPages)// Total Pages
        }
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
                    <table className="data-table dt-filter-init admin-tnx dataTable no-footer" id="DataTables_Table_0">
                        <thead>
                            <tr className="data-item data-head" role="row">
                                <th className="data-col" rowspan="1" colspan="1">SERIAL </th>
                                <th className="data-col w-25" rowspan="1" colspan="1">APPLICANT</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">APPLY GROUP</th>
                                <th className="data-col" rowspan="1" colspan="1">GENDER</th>
                                <th className="data-col" rowspan="1" colspan="1">CHOICE</th>
                                <th className="data-col" rowspan="1" colspan="1">APPLIED ON</th>
                                <th className="data-col" rowspan="1" colspan="1">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                          { appls.map((row) => 
                          <tr className="data-item odd" role="row">
                            <td className="data-col"><span className="lead tnx-id">#{ row.serial }</span></td>
                            <td className="data-col"><span className="lead token-amount">{ row.name && row.name.toUpperCase() }</span></td>
                            <td className="data-col"><span className="lead amount-pay">{ getType(row) && getType(row).toUpperCase() }</span></td>
                            <td className="data-col"><span className="lead amount-pay">{ row.gender == 'M' ? 'MALE':'FEMALE' }</span></td>
                            <td className="data-col"><span className="lead amount-pay">{ row.choice_name && row.choice_name.toUpperCase() }</span></td>
                            <td className="data-col"><span className="lead amount-pay">{ row.started_at && moment(row.started_at).format('DD MMM YY, HH:MM').toUpperCase() }</span></td>
                            <td className="data-col d-flex">
                                <Link className={`badge badge-sm badge-warning text-dark`} onClick={ e => showFormModal(e,row.serial)}><b><em className="ti ti-sms"></em> VIEW FORM</b></Link>
                            </td>   
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


export default Applicants
