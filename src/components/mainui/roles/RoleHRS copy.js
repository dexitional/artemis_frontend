import React, { Component, Fragment }  from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
const RoleHRS = () => {
	  const { sso }  = useSelector(state=>state);
	  const {user} = sso;
	  
      return (
		<div className="content-area card">
			<h2 className="sub-head bg-blueblack">
				ANNUAL LEAVE FORM - 2021
				<div className="d-inline-block print-btn"><a href="#" className="btn btn-light-alt btn-xs btn-icon toggle-tigger"><em className="fa fa-chevron-left"></em></a></div>
			</h2>
			<div className="card-innr">
				<div className="tab-content" id="profile-details">
					
					
					<div className="tab-pane fade show active" id="personal-data">
						<form action="#">
							<div className="row">
								<div className="col-md-12">
									<div className="alert alert-primary text-primary font-weight-bolder"><b>ANNUAL LEAVE ENTITLEMENT IS 3454 DAYS</b></div>
								</div>
								
								<div className="col-md-6">
									<div className="input-item input-with-label"><label for="email-address" className="input-item-label">LEAVE DAYS TO BE TAKEN</label><input className="input-bordered" type="number" id="email-address" name="email-address" value="info@softnio.com"/></div>
								</div>

								<div className="col-md-6">
									<div className="input-item input-with-label"><label for="date-of-birth" className="input-item-label">LEAVE START DATE</label><input className="input-bordered date-picker-dob" type="text" id="date-of-birth" name="date-of-birth"/></div>
								</div>

								<div className="col-md-6">
									<div className="input-item input-with-label"><label for="mobile-number" className="input-item-label">EMERGENCY CONTACT PERSON &amp; ADDRESS</label><input className="input-bordered" type="text" id="address" name="mobile-number"/></div>
								</div>

								<div className="col-md-6">
									<div className="input-item input-with-label"><label for="mobile-number" className="input-item-label">EMERGENCY CONTACT TELEPHONE</label><input className="input-bordered" type="tel" id="mobile-number" name="mobile-number"/></div>
								</div>
							</div>

							<div className="gaps-1x"></div>

							<div className="d-sm-flex justify-content-between align-items-center"><button className="btn btn-primary"><i className="fa fa-save "></i>&nbsp;&nbsp;SUBMIT LEAVE</button>
								<div className="gaps-2x d-sm-none"></div><span className="text-success"><em className="ti ti-check-box"></em> All Changes are saved</span>
							</div>
						</form>
					</div>

					{/*
					<div className="tab-pane fade" id="settings">
						<div className="pdb-1-5x">
							<h5 className="card-title card-title-sm text-dark">Security Settings</h5>
						</div>
						<div className="input-item"><input type="checkbox" className="input-switch input-switch-sm" id="save-log" checked=""/><label for="save-log">Save my Activities
								Log</label></div>
						<div className="input-item"><input type="checkbox" className="input-switch input-switch-sm" id="pass-change-confirm"/><label for="pass-change-confirm">Confirm me through
								email before password change</label></div>
						<div className="pdb-1-5x">
							<h5 className="card-title card-title-sm text-dark">Manage Notification</h5>
						</div>
						<div className="input-item"><input type="checkbox" className="input-switch input-switch-sm" id="latest-news" checked=""/><label for="latest-news">Notify me by email
								about sales and latest news</label></div>
						<div className="input-item"><input type="checkbox" className="input-switch input-switch-sm" id="activity-alert" checked=""/><label for="activity-alert">Alert me by email
								for unusual activity.</label></div>
						<div className="gaps-1x"></div>
						<div className="d-flex justify-content-between align-items-center"><span></span><span className="text-success"><em className="ti ti-check-box"></em> Setting has been
								updated</span></div>
					</div>

					<div className="tab-pane fade" id="password">
						<div className="row">
							<div className="col-md-6">
								<div className="input-item input-with-label"><label for="old-pass" className="input-item-label">Old Password</label><input className="input-bordered" type="password" id="old-pass" name="old-pass"/></div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6">
								<div className="input-item input-with-label"><label for="new-pass" className="input-item-label">New Password</label><input className="input-bordered" type="password" id="new-pass" name="new-pass"/></div>
							</div>
							<div className="col-md-6">
								<div className="input-item input-with-label"><label for="confirm-pass" className="input-item-label">Confirm New Password</label><input className="input-bordered" type="password" id="confirm-pass" name="confirm-pass"/></div>
							</div>
						</div>
						<div className="note note-plane note-info pdb-1x"><em className="fas fa-info-circle"></em>
							<p>Password should be minmum 8 letter and include lower and uppercase letter.
							</p>
						</div>

						<div className="gaps-1x"></div>
						<div className="d-sm-flex justify-content-between align-items-center"><button className="btn btn-primary">Update</button>
							<div className="gaps-2x d-sm-none"></div><span className="text-success"><em className="ti ti-check-box"></em> Changed Password</span>
						</div>
					</div>
                    */}

				</div>
			</div>
		</div>
      )
}

export default RoleHRS;
