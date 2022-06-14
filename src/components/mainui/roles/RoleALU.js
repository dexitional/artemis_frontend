import React, { Component, Fragment }  from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { helperData } from '../../../store/utils/helperData';

const RoleALU = ({data}) => {

	  const { sso }  = useSelector(state=>state);
	  const {user} = sso;
      const modules = [
		  { title : 'Profile', desc: 'Profile Module', url: '/app/hrs?mod=profile&view=showprofile',icon:'fa-id-card', accessRoles: [11,12,13,14] },
		  { title : 'Members & Friends', desc: 'Profile Module', url: '/app/hrs?mod=profile&view=showprofile',icon:'fa-id-card', accessRoles: [11,12,13,14] }, // Add Member to friends list - Send request to friend for approval to chat and show contact ( 3 - columns [ members - flex 0.6, Friends lists - flex 0.2, Friends request - flex 0.2 ])
		  { title : 'News & Events', desc: 'News & Events Page', url: '/app/ais?mod=assessors&view=list',icon:'fa-id-card', accessRoles: [11,12,13,14] },
		  { title : 'Alumni Projects', desc: 'Alumni Projects Page', url: '/app/ais?mod=assessors&view=list',icon:'fa-id-card', accessRoles: [11,12] },
		  { title : 'Alumni Chapters', desc: 'Alumni Chapters', url: '/app/ais?mod=assessors&view=list',icon:'fa-id-card', accessRoles: [11,12] },
		  { title : 'Donation Board', desc: 'Donations Page', url: '/app/ais?mod=assessors&view=list',icon:'fa-id-card', accessRoles: [11,12] },
		  { title : 'Dues & Payments', desc: 'Dues & Payments Page', url: '/app/ais?mod=scoresheets&view=list',icon:'fa-file-alt', accessRoles: [12] },
		  { title : 'Leaders & Elections', desc: 'Leaders & Elections Page', url: '/app/ais?mod=scoresheets&view=list',icon:'fa-file-alt', accessRoles: [12] },
		  
		  { title : 'Members', desc: 'Members Admin Module', url: '/app/hrs?mod=hrstaff&view=list',icon:'fa-id-card-alt', accessRoles: [12,13,14] },
		  { title : 'News', desc: 'News Admin Module', url: '/app/ais?mod=programs&view=list',icon:'fa-file-alt', accessRoles: [12,13,14] },
		  { title : 'Electa', desc: 'Electa Admin Module', url: '/app/hrs?mod=hrsunit&view=list',icon:'fa-id-card-alt', accessRoles: [12,13,14] },
		  { title : 'Dues', desc: 'Dues Admin Module', url: '/app/ais?mod=curriculum&view=list',icon:'fa-book', accessRoles: [12,13,14] },
		  { title : 'Payments', desc: 'Payments Admin Module', url: '/app/ais?mod=curriculum&view=list',icon:'fa-book', accessRoles: [12,13,14] },
		  { title : 'Chapters', desc: 'Chapters Admin Module', url: '/app/ais?mod=curriculum&view=list',icon:'fa-book', accessRoles: [12,13,14] },
		  { title : 'Projects', desc: 'Projects Admin Module', url: '/app/ais?mod=curriculum&view=list',icon:'fa-book', accessRoles: [12,13,14] },
		  
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

export default RoleALU;
