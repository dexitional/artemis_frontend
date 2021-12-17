import React, { Component, Fragment }  from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { helperData } from '../../../store/utils/helperData';

const RoleHRS = ({data}) => {

	  const { sso }  = useSelector(state=>state);
	  const {user} = sso;
      const modules = [
		  { title : 'Profile', desc: 'Profile Module', url: '/app/hrs?mod=profile&view=showprofile',icon:'fa-id-card', accessRoles: [11,12,13,14] },
		  //{ title : 'My Leave', desc: 'Asessors Module', url: '/app/ais?mod=assessors&view=list',icon:'fa-id-card', accessRoles: [11,12,13,14] },
		  //{ title : 'My Inbox & Notices', desc: 'Notifications Module', url: '/app/ais?mod=assessors&view=list',icon:'fa-id-card', accessRoles: [11,12] },
		  //{ title : 'Staff Members', desc: 'Scoresheets Module', url: '/app/ais?mod=scoresheets&view=list',icon:'fa-file-alt', accessRoles: [12] },
		  //{ title : 'Staff Leave', desc: 'Scoresheets Module', url: '/app/ais?mod=scoresheets&view=list',icon:'fa-file-alt', accessRoles: [12] },
		  { title : 'HRS Staff', desc: 'HRS Staff Module', url: '/app/hrs?mod=hrstaff&view=list',icon:'fa-id-card-alt', accessRoles: [12,13,14] },
		  //{ title : 'HRS Relatives', desc: 'Programs Module', url: '/app/ais?mod=programs&view=list',icon:'fa-file-alt', accessRoles: [12,13,14] },
		  { title : 'HRS Units', desc: 'HRS Units Module', url: '/app/hrs?mod=hrsunit&view=list',icon:'fa-id-card-alt', accessRoles: [12,13,14] },
		  { title : 'HRS Designations', desc: 'HRS Jobs Module', url: '/app/hrs?mod=hrsjob&view=list',icon:'fa-user-friends', accessRoles: [12,13,14] },
		  //{ title : 'HRS Leave', desc: 'Curriculum Module', url: '/app/ais?mod=curriculum&view=list',icon:'fa-book', accessRoles: [12,13,14] },
		  //{ title : 'HRS Circulars', desc: 'Curriculum Module', url: '/app/ais?mod=curriculum&view=list',icon:'fa-book', accessRoles: [12,13,14] },
		  //{ title : 'HRS NSS', desc: 'NSS Module', url: '/app/ais?mod=curriculum&view=list',icon:'fa-book', accessRoles: [12,13,14] },
		  //{ title : 'HRS REPORTS', desc: 'Stats Module', url: '/app/ais?mod=statistics&view=list',icon:'fa-chart-bar', accessRoles: [12,13,14] },
	  ]


      return (
		<>
		  {modules.map((mod,i) => helperData.renderView(mod.accessRoles,user) &&	
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
