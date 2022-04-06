import React, { Component, Fragment }  from 'react';
import '../../../../assets/css/ui-auth-elements.css';
import { useHistory,Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

const StudentRegister2 = () => {
	
	const { sso }  = useSelector(state=>state);
	const {user} = sso;
	
	return (
		<div className="row">
		<div className="main-content col-lg-8">
			<div className="content-area card">
				<div className="card-innr">
					<div className="card-head">
						<h3 className="card-title text-primary">SEMESTER REGISTRATION</h3>
						<hr/>
					</div>
					<div  className="card-text">
						<p >VLE basically is an advanced learning management system enriched with
							features to allow student learn at the comforts of their homes and offices followed by a
							proctored exams and quizzes on the main campuses or centres to acquire a University degree,
							diploma or certificate.</p>
						<p >Please find below the active VLE courses for this academic session : </p>
					</div>
					<hr/>
					<div  className="table-wrap">
						<table id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info" className="data-table dt-init kyc-list dataTable no-footer">
							<thead >
								<tr role="row" className="data-item data-head">
									<th rowspan="1" colspan="1" className="data-col dt-user sorting_disabled">COURSE</th>
									<th rowspan="1" colspan="1" className="data-col dt-doc-type sorting_disabled">SCORE</th>
									<th rowspan="1" colspan="1" className="data-col dt-status sorting_disabled">GRADE</th>
									<th rowspan="1" colspan="1" className="data-col sorting_disabled"></th>
								</tr>
							</thead>
							<tbody >
								<tr role="row" className="data-item odd">
									<td className="data-col dt-user" style={{width:'250px'}}><span className="lead user-name">INTRODUCTION TO MANAGEMENT IN LIVING</span><b className="sub user-id">CS5045</b></td>
									<td className="data-col dt-doc-type"><span className="sub sub-s2 sub-dtype">DISTANCE</span></td>
									<td className="data-col dt-status">
										<span className="dt-status-md badge badge-outline badge-success badge-md text-success">LIVE</span>
										<span className="dt-status-sm badge badge-sq badge-outline badge-success badge-md">A</span>
									</td>
									<td className="data-col dt-status">
										<div className="relative d-inline-block">
											<a href="#" className="btn btn-light-alt btn-xs btn-icon toggle-tigger"><em className="ti ti-more-alt"></em></a>&nbsp;&nbsp;
									        <div className="toggle-className dropdown-content dropdown-content-top-left d-none">
												<ul className="dropdown-list">
													<li><a href="/student/vle-course"><em className="fas fa-chevron-right"></em> GOTO COURSE SESSION</a></li>
													<li><a href="/student/vle-course"><em className="ti ti-eye"></em> COURSE OVERVIEW</a></li>
												</ul>
											</div>
										</div>
										<a title="GOTO COURSE SESSION" className="btn btn-light-alt btn-xs btn-icon" href="/student/vle-course"><em className="fas fa-play text-danger"></em></a>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<hr/>
					<h6  className="text-light mb-0">* Last update on 28 August, 2020.</h6>
				</div>
			</div>
		</div>

		<div className="aside sidebar-right col-lg-4 d-shadow">
			<div className="token-statistics card card-token height-auto">
				<div className="card-innr">
					<div className="token-balance">
						<div className="token-balance-text">
							<h6 className="card-sub-title">ACADEMIC SESSION</h6>
							<span className="lead">2019/2020 SEMESTER 2</span>
						</div>
					</div>
					<div  className="token-balance token-balance-s2">
						<h6  className="card-sub-title">REGISTERED &amp; ACTIVE VLE COURSES</h6>
						<ul  className="token-balance-list">
							<li  className="token-balance-sub mr-3"><span 
									className="lead">7</span></li>
						</ul>
					</div>
				</div>
			</div>
			<div  className="token-sales card">
				<div  className="card-innr">
					<div  className="card-head">
						<h5  className="card-title card-title-sm">COURSE PROGRESSION</h5>
					</div>
					<ul  className="progress-info">
						<li ><span >INTRODUCTION TO MANAGEMENT IN
								LIVING</span><small >CS3403</small></li>
					</ul>
					<div  className="progress-bar">
						<div  data-percent="15" className="progress-hcap">
							<div >L1</div>
						</div>
						<div  data-percent="20" className="progress-hcap">
							<div >L2</div>
						</div>
						<div  data-percent="30" className="progress-hcap">
							<div >L3</div>
						</div>
						<div  data-percent="40" className="progress-hcap">
							<div >L4</div>
						</div>
						<div  data-percent="50" className="progress-hcap">
							<div >L5</div>
						</div>
						<div  data-percent="28" className="progress-percent"></div>
					</div>
					<hr/>
					<ul  className="progress-info">
						<li ><span >SIGNALS AND SYSTEMS IN VLSI</span><small
								>TD 302</small></li>
					</ul>
					<div  className="progress-bar">
						<div  data-percent="15" className="progress-hcap">
							<div >L1</div>
						</div>
						<div  data-percent="89" className="progress-hcap">
							<div >L2</div>
						</div>
						<div  data-percent="28" className="progress-percent"></div>
					</div>
					<hr/>
				</div>
			</div>
		</div>
	</div>
	)
}

export default StudentRegister2;
