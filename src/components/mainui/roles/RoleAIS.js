import React, { Component, Fragment }  from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const RoleAIS = ({data}) => {

	  const { sso }  = useSelector(state=>state);
	  const {user} = sso;
      const modules = [
		  { title : 'Students', desc: 'Students Module', url: '/app/ais?mod=students&view=list',icon:'fa-id-card', accessRoles: [1,4] },
		  //{ title : 'Assessors', desc: 'Asessors Module', url: '/app/ais?mod=assessors&view=list',icon:'fa-id-card', accessRoles: [1,4] },
		  //{ title : 'Scoresheets', desc: 'Scoresheets Module', url: '/app/ais?mod=scoresheets&view=list',icon:'fa-file-alt', accessRoles: [] },
		  { title : 'Registrations', desc: 'Registrations Module', url: '/app/ais?mod=registrations&view=list',icon:'fa-id-card-alt', accessRoles: [] },
		  //{ title : 'Classes', desc: 'Class groups Module', url: '/app/ais?mod=classes&view=list',icon:'fa-user-friends', accessRoles: [] },
		  //{ title : 'Programs', desc: 'Programs Module', url: '/app/ais?mod=programs&view=list',icon:'fa-file-alt', accessRoles: [] },
		  //{ title : 'Curriculum', desc: 'Curriculum Module', url: '/app/ais?mod=curriculum&view=list',icon:'fa-book', accessRoles: [] },
		  //{ title : 'Resits', desc: 'Resit Module', url: '/app/ais?mod=resits&view=list',icon:'fa-id-card-alt', accessRoles: [] },
		  //{ title : 'Calendar', desc: 'Academic Calendar Module', url: '/app/ais?mod=calendar&view=list',icon:'fa-book', accessRoles: [] },
		  //{ title : 'Schemes', desc: 'Academic Scheme Module', url: '/app/ais?mod=schemes&view=list',icon:'fa-book', accessRoles: [] },
		  //{ title : 'Settings', desc: 'Settings Module', url: '/app/ais?mod=settings&view=list',icon:'fa-cog', accessRoles: [] },
		  //{ title : 'Statistics', desc: 'Stats Module', url: '/app/ais?mod=statistics&view=list',icon:'fa-chart-bar', accessRoles: [] },
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

export default RoleAIS;
