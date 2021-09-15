import React, { Component, Fragment }  from 'react';
import '../../../../assets/css/ui-auth-elements.css';
import Loader from '../../../../assets/img/loader.gif';
import { useHistory,Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

const StudentFees = () => {
	
	const { sso }  = useSelector(state=>state);
	const {user} = sso;
	
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
									<th colspan="2" className="data-col dt-user sorting_disabled pt-3">NARATIVE</th>
									<th className="data-col dt-doc-type sorting_disabled center">TYPE</th>
									<th className="data-col dt-doc-type sorting_disabled center">AMOUNT</th>
									<th className="data-col dt-user sorting_disabled center">BALANCE</th>
								</tr>
							</thead>
							<tbody >
								<tr role="row" className="data-item odd">
									<td className="data-col" colspan="2" ><span className="lead user-name">ACADEMIC USER FACILITY FEES</span><b className="user-id text-primary left">-- 01 Jul 2020 | Semester 1, Year 1 </b></td>
									<td className="data-col dt-doc-type  center"><h3 className="lead user-name"><small><b>BILL</b></small></h3></td>
									<td className="data-col center"><b className="badge badge-outline badge-danger badge-sm text-danger" style={{fontSize:'15px', fontWeight:'bolder'}}>GHS -29787</b></td>
								    <td className="data-col center"><b className="badge badge-outline badge-dark badge-sm text-dark" style={{fontSize:'15px', fontWeight:'bolder'}}>GHS -29787</b></td>
								</tr>
								<tr role="row" className="data-item odd">
									<td className="data-col" colspan="2" ><span className="lead user-name">ACADEMIC USER FACILITY FEES</span><b className="user-id text-primary left">-- 01 Jul 2020</b></td>
									<td className="data-col dt-doc-type  center"><h3 className="lead user-name"><small><b>BILL</b></small></h3></td>
									<td className="data-col center"><b className="badge badge-outline badge-danger badge-sm text-danger" style={{fontSize:'15px', fontWeight:'bolder'}}>GHS -29787</b></td>
								    <td className="data-col center"><b className="badge badge-outline badge-dark badge-sm text-dark" style={{fontSize:'15px', fontWeight:'bolder'}}>GHS -29787</b></td>
								</tr>
								<tr role="row" className="data-item odd">
									<td className="data-col" colspan="2" ><span className="lead user-name">ONLINE: 20777941-Ebenezer Kwabena Blay ACKAH</span><b className="user-id text-primary left">-- 01 Jul 2020</b></td>
									<td className="data-col dt-doc-type  center"><h3 className="lead user-name"><small><b>PAYMENT</b></small></h3></td>
									<td className="data-col center"><b className="badge badge-outline badge-success badge-sm text-dark" style={{fontSize:'15px', fontWeight:'bolder'}}>GHS -29787</b></td>
								    <td className="data-col center"><b className="badge badge-outline badge-dark badge-sm text-dark" style={{fontSize:'15px', fontWeight:'bolder'}}>GHS -29787</b></td>
								</tr>
								
								
							</tbody>
						</table>
					</div>
					<h6  className="text-light mb-0">* Last update on 28 August, 2020.</h6>
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
								<tr role="row" className="data-item data-head"><th colspan="2" className="data-col dt-user sorting_disabled pt-3">FEE ITEMS & AMOUNT</th></tr>
							</thead>
							<tbody >
								<tr role="row" className="data-item"><td className="data-col" colspan="2" ><small className="lead user-name">INTRODUCTION TO MANAGEMENT IN LIVING</small><small><b className="user-id text-primary left">GHC 5000.22</b></small></td></tr>
								<tr role="row" className="data-item"><td className="data-col" colspan="2" ><small className="lead user-name">INTRODUCTION TO MANAGEMENT IN LIVING</small><small><b className="user-id text-primary left">GHC 5000.22</b></small></td></tr>
								<tr role="row" className="data-item"><td className="data-col" colspan="2" ><small className="lead user-name">INTRODUCTION TO MANAGEMENT IN LIVING</small><small><b className="user-id text-primary left">GHC 5000.22</b></small></td></tr>
								<tr role="row" className="data-item"><td className="data-col" colspan="2" ><small className="lead user-name">INTRODUCTION TO MANAGEMENT IN LIVING</small><small><b className="user-id text-primary left">GHC 5000.22</b></small></td></tr>
								<tr role="row" className="data-item data-head"><th className="data-col dt-user sorting_disabled py-3 px-3">AMNT PAID: </th><th className="data-col dt-user sorting_disabled py-3 px-3"><b className="text-primary w-50">GHC</b> 10000.0</th></tr>
								<tr role="row" className="data-item data-head"><th className="data-col dt-user sorting_disabled py-3 px-3">AMNT OWED: </th><th className="data-col dt-user sorting_disabled py-3 px-3"><b className="text-primary w-50">GHC</b> 10000.0</th></tr>
							</tbody>
						</table>
					</div>
					<div className="col-sm-12 pl-0">
						<button className="btn alert-dark text-primary"><i className="fa fa-print"></i>&nbsp;&nbsp;PRINT TRANSACTION STATEMENT</button>
					</div>
				</div>
			</div>
		  </div>
        
		</div>
	)
}

export default StudentFees;
