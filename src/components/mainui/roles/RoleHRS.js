import React, { Component, Fragment }  from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const RoleHRS = ({data}) => {

	  const { sso }  = useSelector(state=>state);
	  const {user} = sso;
      const modules = [
		  { title : 'My Profile', desc: 'Students Module', url: '/app/ais?mod=students&view=list',icon:'fa-id-card', accessRoles: [1,4] },
		  //{ title : 'My Leave', desc: 'Asessors Module', url: '/app/ais?mod=assessors&view=list',icon:'fa-id-card', accessRoles: [1,4] },
		  //{ title : 'My Inbox & Notices', desc: 'Notifications Module', url: '/app/ais?mod=assessors&view=list',icon:'fa-id-card', accessRoles: [1,4] },
		  //{ title : 'Staff Members', desc: 'Scoresheets Module', url: '/app/ais?mod=scoresheets&view=list',icon:'fa-file-alt', accessRoles: [] },
		  //{ title : 'Staff Leave', desc: 'Scoresheets Module', url: '/app/ais?mod=scoresheets&view=list',icon:'fa-file-alt', accessRoles: [] },
		  { title : 'HRS Staff', desc: 'HRS Staff Module', url: '/app/hrs?mod=hrstaff&view=list',icon:'fa-id-card-alt', accessRoles: [] },
		  //{ title : 'HRS Relatives', desc: 'Programs Module', url: '/app/ais?mod=programs&view=list',icon:'fa-file-alt', accessRoles: [] },
		  //{ title : 'HRS Units', desc: 'HRS Units Module', url: '/app/hrs?mod=hrsunits&view=list',icon:'fa-id-card-alt', accessRoles: [] },
		  //{ title : 'HRS Designations', desc: 'HRS Jobs Module', url: '/app/hrs?mod=hrsjobs&view=list',icon:'fa-user-friends', accessRoles: [] },
		  //{ title : 'HRS Leave', desc: 'Curriculum Module', url: '/app/ais?mod=curriculum&view=list',icon:'fa-book', accessRoles: [] },
		  //{ title : 'HRS Circulars', desc: 'Curriculum Module', url: '/app/ais?mod=curriculum&view=list',icon:'fa-book', accessRoles: [] },
		  //{ title : 'HRS NSS', desc: 'NSS Module', url: '/app/ais?mod=curriculum&view=list',icon:'fa-book', accessRoles: [] },
		  //{ title : 'HRS REPORTS', desc: 'Stats Module', url: '/app/ais?mod=statistics&view=list',icon:'fa-chart-bar', accessRoles: [] },
		  //{ title : 'Vendors', desc: 'Vendor Module', url: '/app/ams?mod=vendors&view=list',icon:'fa-id-user', accessRoles: [1,4] },
	  ]

      return (
		<>
		  {modules.map((mod,i) => 	
			<div className="col-md-3">
				<div className="token-info nitro">
					<em className={`fas fa-3x ${mod.icon} text-info`} />
					<div className="gaps-2x" />
					<div><Link to={mod.url} title={mod.desc} className="btn btn-primary" style={{color:'#f8e0cd'}}><b>{mod.title.toUpperCase()}</b></Link></div>
				</div>
			</div>
		  )}
		</>
	  )
}

export default RoleHRS;
