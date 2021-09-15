import React, { useState,useEffect,useRef }  from 'react';
import '../../../../assets/css/ui-auth-elements.css';
import Loader from '../../../../assets/img/loader.gif';
import { useHistory,Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import { fetchResults } from '../../../../store/utils/ssoApi';
import { setModal } from '../../../../store/admission/ssoSlice';

const StudentResult = () => {
	
	const [ results, setResults ] = useState({})
	const [ slip, setSlip ] = useState({})
	const [ title, setTitle ] = useState("")
	const [ grades, setGrades ] = useState([])
	const [ isLoading, setIsLoading ] = useState(false) 
	const dispatch = useDispatch()
	const { sso }  = useSelector(state=>state);
	const { user,modal } = sso;

	// Load Registered Data from assessment tbl
	const loadResults = async () => {
		setIsLoading(true)
		const res = await fetchResults(user.user.indexno)
		if(res.success){
		   if(res.data.length > 0){
			  var mt = {}
			  for(var r of res.data){
				if(mt[r.name]){
                  mt[r.name].data.push(r)
				}else{
				  mt[r.name] = {year: Math.ceil(r.semester/2), data:[{...r}]}
				}
			  }
			  // Store All Results Data
			  setResults({...mt})
			  // Store Grading Scheme
			  if(res.data[0].grade_meta) setGrades([...(JSON.parse(res.data[0].grade_meta))])
			  // Load Initial Page
			  const key = Object.keys(mt)[0]
			  setSlip({...mt[key]})
			  setTitle(key && key.toUpperCase())
		   }  setIsLoading(false)
		}
	}

	const getPage = (key) => {
	   // Load Initial Page
	   setIsLoading(true)
	   const dt = results[key]
	   if(dt){
		 setSlip({...dt})
		 setTitle(key && key.toUpperCase())
	   }
	   setIsLoading(false)
	}

	const getPrint = (key) => {
	   // Load Initial Page
	   setIsLoading(true)
	   const dt = results[key]
	   if(dt){
		 const content = { title:key && key.toUpperCase(), grades ,data:dt}
		 let dz = { content, size:'md', show:true, page:'result' }
		 dispatch(setModal(dz));
		 setSlip({...dt})
		 setTitle(key && key.toUpperCase())
		 setIsLoading(false)
		 console.log(dz)
	   }
	}

	const getGrade = (num) => {
	   console.log(grades)
	   const vs = grades && grades.find(row => row.min <= num && num <= row.max)
	   return (vs && vs.grade) || 'N/A';
	}

	const getPoint = (num) => {
	   const vs = grades && grades.find(row => row.min <= num && num <= row.max)
	   return (vs && vs.gradepoint) || 'N/A';
	}

	useEffect(() => {
	   loadResults()
	},[])
  
	useEffect(() => {
	  console.log(slip)
	  console.log(slip.data)
	 },[slip])
	
	return (
		<div className="row">
		<div className="main-content col-lg-8">
			<div className="content-area card">
				<div className="card-innr">
					{ isLoading ?
				    <div className="loader">
						<img src={Loader} style={{ width: '300px', height:'auto'}}/>
					</div>
					 :
					<>
					<div className="token-statistics card card-token height-auto">
						<div className="card-innr">
							<div className="token-balance">
								<div className="token-balance-text">
									<h6 className="card-sub-title">STATEMENT OF RESULTS [ YEAR {slip && slip.year} ]</h6>
									<span className="lead">{title} ACADEMIC SESSION</span>
								</div>
							</div>
						</div>
					</div>
					<div  className="table-wrap responsive-table">
						{ slip.data && slip.data.length > 0 ?
						<table id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info" className="data-table dt-init kyc-list dataTable no-footer">
							<thead >
								<tr role="row" className="data-item data-head">
									<th colspan="2" className="data-col dt-user sorting_disabled pt-3">COURSE</th>
									<th className="data-col dt-doc-type sorting_disabled center">CREDITS</th>
									<th className="data-col dt-doc-type sorting_disabled center">MARKS</th>
									<th className="data-col dt-user sorting_disabled center">GRADE</th>
								</tr>
							</thead>
							<tbody >
								{ slip.data && slip.data.map(row =>
								<tr role="row" className="data-item odd">
									<td className="data-col" colspan="2" ><span className="lead user-name">{row.course_name && row.course_name.toUpperCase()}</span><b className="user-id text-primary left">{row.course_code && row.course_code.toUpperCase()}</b></td>
									<td className="data-col dt-doc-type  center"><h3 className="lead user-name">{row.credit}</h3></td>
								    <td className="data-col dt-doc-type center"><h3 className="lead user-name">{row.total_score}</h3></td>
									<td className="data-col center"><b className="badge badge-outline badge-dark badge-md text-dark" style={{fontSize:'20px'}}>{getGrade(row.total_score)}</b></td>
								</tr>
								)}
							</tbody>
						</table>
						:
						<table id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info" className="data-table dt-init kyc-list dataTable no-footer">
							<thead >
								<tr role="row" className="data-item data-head">
									<th colspan="5" align="center" className="data-col dt-user sorting_disabled py-3 center">NO ASSESSMENTS FOUND !!</th>
								</tr>
							</thead>
						</table>
						}
					</div>
					</> }
				</div>
			</div>
		</div>

		<div className="aside sidebar-right col-lg-4 d-shadow">
			<div className="token-statistics card card-token height-auto">
				<div className="card-innr">
					<div className="token-balance">
						<div className="token-balance-text">
							<span className="lead">RESULT STATEMENTS</span>
						</div>
					</div>
				</div>
			</div>
			<div  className="token-sales card">
				<div  className="card-innr">
					{ results && Object.keys(results).map(row => 
					  <>
						<ul  className="progress-info">
							<li>
								<b>{row}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
								<small><button className="badge badge-dark text-warning" onClick={()=> getPage(row)}>VIEW</button></small>
								<small><button className="badge badge-dark text-warning" onClick={()=> getPrint(row)}><i className="fa fa-print"></i></button></small>
							</li>
						</ul>
						<hr/>
					  </>
                    )}
					<ul  className="progress-info nitro" style={{border:"none"}}>
					  <li>
						 <button className="btn btn-sm btn-block btn-primary " style={{color: 'rgb(248, 224, 205)'}}><b><span style={{display:'none'}}>FINAL</span>CUMULATIVE-GPA&nbsp;&nbsp;:&nbsp;&nbsp; 3.24 </b></button>
					  </li>
					</ul>
					
					
				</div>
			</div>
		</div>
	</div>
	)
}

export default StudentResult;
