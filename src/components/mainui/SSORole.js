import React, { Component, Fragment }  from 'react';
import '../../assets/css/ui-auth-elements.css';
import '../../assets/css/ui-index.css';
import './SSOReset.css';
import { useHistory } from 'react-router-dom';
import RoleHRS from './roles/RoleHRS';
import RoleAMS from './roles/RoleAMS';
import RoleAIS from './roles/RoleAIS';
import RoleFMS from './roles/RoleFMS';
import RoleSSO from './roles/RoleSSO';

const SSORole = ({data}) => {
	  
	  const history = useHistory();
      if(!data){
		history.push('/dash');
	  }

	  const getRolePage = (data) => {
		const tag = data && data.app_tag || 'ams'
        switch(tag){
          case 'ams': return <RoleAMS data={data}/>
		  case 'hrs': return <RoleHRS data={data}/>
		  case 'ais': return <RoleAIS data={data}/>
		  case 'fms': return <RoleFMS data={data}/>
		  case 'sso': return <RoleSSO data={data}/>
		}
	  }

      return (
		<div className="row">
			    <div className="col-lg-12">
				  <div className="token-information card card-full-height">
				    <h3 className="sub-head bg-blueblack"><span style={{fontSize:'.9rem', color:'#eee'}}>{data && data.app_tag.toUpperCase()} PORTAL MENU</span></h3>
					<div className="row no-gutters height-100">
					   {/* Content */}
					   { getRolePage(data)}
					</div>
				  </div>
			    </div>
		</div>
      )
}

export default SSORole;
