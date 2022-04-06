import React, { Component, Fragment,useEffect, useState }  from 'react';
import '../../../../assets/css/ui-auth-elements.css';
import Loader from '../../../../assets/img/loader.gif';
import { useHistory,Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux'
import { fetchBillFMS, fetchPaymentFMS, fetchStudentTrans } from '../../../../store/utils/ssoApi';
import moment from 'moment'
import { setModal } from '../../../../store/admission/ssoSlice';

const StudentFees = () => {
	
	const [ trans, setTrans ] = useState([])
	const [ bal, setBal ] = useState(0)
	const [ bill, setBill ] = useState({})
	const dispatch = useDispatch()
	const { sso }  = useSelector(state=>state);
	const {user} = sso;

	const loadTransactions = async () => {
		console.log(sso.user.user.refno)
		const resp = await fetchStudentTrans(sso.user.user.refno)
		if(resp.success){
			setTrans([...resp.data])
			if(resp.data.length > 0){
				const sum = resp.data.reduce((acc,val) => acc+val.amount,0)
				setBal(sum)
			}
		}
	}

	const viewPayment = async (id) => {
		const bl = await fetchPaymentFMS(id)
		if(bl.success){
			const content = { title:'Official Receipt', data: bl && bl.data[0] }
			let dz = { content, size:'md', show:true, page:'payment' }
			dispatch(setModal(dz));
		}else{
			// Error occurred
		}
	}

	const viewBill = async (id) => {
	    const bl = await fetchBillFMS(id)
		if(bl.success){
		  const content = { title:'Student Bill', items:bl.data.items ,data:bl.data.data}
		  let dz = { content, size:'md', show:true, page:'bill' }
		  dispatch(setModal(dz));
		}else{
		   // Error occurred
		}
	}

	const viewTransDetail = async () => {
		  const ts = await fetchStudentTrans(sso.user.user.refno)
	    //const bl = await fetchBillFMS(0)
		if(ts.success){
		  const content = { title:'TRANSATIONS STATEMENT', fees: [...ts.data]}
		  let dz = { content, size:'md', show:true, page:'transdetail' }
		  dispatch(setModal(dz));
		}else{
		   // Error occurred
		}
	}
	
	

	useEffect(()=> {
       loadTransactions()
	},[])
	
	return (
		<div className="row">
		  <div className="main-content col-lg-8">
			<div className="content-area card">
				<div className="card-innr">
					<div className="token-statistics card card-token height-auto">
						<div className="card-innr">
							<div className="token-balance">
								<div className="token-balance-text">
									<h6 className="card-sub-title">ALL PAYMENTS & CHARGES</h6>
									<span className="lead">FEES TRANSACTIONS</span>
									<span className="lead right">{bal > 0 ? `DEBT OWED: ${trans[0] && trans[0].currency || 'GHC'} ${Math.abs(bal)}`:`BALANCE : ${trans[0] && trans[0].currency || 'GHC'} ${Math.abs(bal)}`}</span>
								</div>
							</div>
						</div>
					</div>
					<div className="card-head d-none"><h2 className="card-title text-primary"><b>STATEMENT OF RESULTS</b></h2></div>
					<div className="loader d-none">
						<img src={Loader} style={{ width: '300px', height:'auto'}}/>
					</div>
					<div  className="table-wrap responsive-table">
						<table id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info" className="data-table dt-init kyc-list dataTable no-footer">
							<thead >
								<tr role="row" className="data-item data-head">
									<th colspan="3" className="data-col dt-user sorting_disabled pt-3">NARATIVE</th>
									<th className="data-col dt-doc-type sorting_disabled center">TYPE</th>
									<th className="data-col dt-doc-type sorting_disabled center">AMOUNT</th>
									<th className="data-col dt-user sorting_disabled center">BALANCE</th>
								</tr>
							</thead>
							<tbody>
							  { trans && trans.length > 0 ?
							    trans.map((row) =>
								<tr role="row" className="data-item odd">
									<td className="data-col" colspan="3" ><small className="lead user-name">{row.narrative}</small><b className="user-id text-primary left" style={{fontSize:'13px'}}>-- {moment(row.transdate).format('DD MMM YYYY')} | Sem 1, Year 1 </b></td>
									<td className="data-col dt-doc-type  center"><h3 className="lead user-name"><small><b>{parseFloat(row.amount) > 0 ? 'BILL':'PAYMENT'}</b></small></h3></td>
									<td className="data-col center"><b className={`badge badge-outline  badge-sm ${parseFloat(row.amount) > 0 ? 'badge-danger text-danger':'badge-success text-dark'}`} style={{fontSize:'15px', fontWeight:'bolder'}}>{row.currency} {parseFloat(Math.abs(row.amount))}</b></td>
								    <td className="data-col center">
										{!row.bill_id && row.tid ? <button className="badge badge-outline badge-dark badge-sm text-dark" onClick={()=> viewPayment(row.tid)} style={{fontSize:'15px', fontWeight:'bolder'}}><i className="fa fa-print"></i></button> : ''}
										{row.bill_id ? <button className="badge badge-outline badge-dark badge-sm text-dark" onClick={()=> viewBill(row.bill_id)} style={{fontSize:'15px', fontWeight:'bolder'}}><i className="fa fa-list"></i></button> : ''}
									</td>
								</tr>
								 ) : null }

								{ trans && trans.length <= 0  &&
								<tr role="row" className="data-item odd">
									<td className="data-col dt-doc-type center" colspan="5" ><span className="lead user-name">-- NO TRANSACTIONAL RECORDS --</span></td>
								</tr>
								}
							</tbody>
						</table>
					</div>
					<h6  className="text-light mb-0">* Transactional data shall be updated soon!</h6>
				</div>
			</div>
		</div>
		  <div className="main-content col-lg-4">
			<div className="content-area card">
				<div className="card-innr">
					<div className="token-statistics card card-token height-auto">
						<div className="card-innr">
							<div className="token-balance">
								<div className="token-balance-text">
								    <span className="lead">2020-2021 SESSIONS</span>
									<h6 className="card-sub-title">AUCC FEES SCHEDULE</h6>
								</div>
							</div>
						</div>
					</div>
					<div className="card-head d-none"><h2 className="card-title text-primary"><b>STATEMENT OF RESULTS</b></h2></div>
					<div className="loader d-none">
						<img src={Loader} style={{ width: '300px', height:'auto'}}/>
					</div>
					<div  className="table-wrap responsive-table">
						<table id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info" className="data-table dt-init kyc-list dataTable no-footer">
							<thead >
								<tr role="row" className="data-item data-head d-none"><th colspan="2" className="data-col dt-user sorting_disabled pt-3">FEE ITEMS & AMOUNT</th></tr>
							</thead>
							<tbody >
								<tr role="row" className="data-item d-none"><td className="data-col" colspan="2" ><small className="lead user-name">INTRODUCTION TO MANAGEMENT IN LIVING</small><small><b className="user-id text-primary left">GHC 5000.22</b></small></td></tr>
								<tr role="row" className="data-item d-none"><td className="data-col" colspan="2" ><small className="lead user-name">INTRODUCTION TO MANAGEMENT IN LIVING</small><small><b className="user-id text-primary left">GHC 5000.22</b></small></td></tr>
								<tr role="row" className="data-item d-none"><td className="data-col" colspan="2" ><small className="lead user-name">INTRODUCTION TO MANAGEMENT IN LIVING</small><small><b className="user-id text-primary left">GHC 5000.22</b></small></td></tr>
								<tr role="row" className="data-item d-none"><td className="data-col" colspan="2" ><small className="lead user-name">INTRODUCTION TO MANAGEMENT IN LIVING</small><small><b className="user-id text-primary left">GHC 5000.22</b></small></td></tr>
								<tr role="row" className="data-item data-head d-none"><th className="data-col dt-user sorting_disabled py-3 px-3">AMNT PAID: </th><th className="data-col dt-user sorting_disabled py-3 px-3"><b className="text-primary w-50">GHC</b> 10000.0</th></tr>
								<tr role="row" className="data-item data-head d-none"><th className="data-col dt-user sorting_disabled py-3 px-3">AMNT OWED: </th><th className="data-col dt-user sorting_disabled py-3 px-3"><b className="text-primary w-50">GHC</b> 10000.0</th></tr>
							</tbody>
						</table>
					</div>
					<div className="col-sm-12 pl-0">
						<button className="btn alert-dark text-primary" onClick={()=> viewTransDetail()}><i className="fa fa-print"></i>&nbsp;&nbsp;PRINT TRANSACTION STATEMENT</button>
					</div>
				</div>
			</div>
		  </div>
        
		</div>
	)
}

export default StudentFees;
