import React, { Component }  from 'react';
import { BrowserRouter as Router, Route,Switch,useHistory,Redirect } from 'react-router-dom';
import { withCookies } from "react-cookie";

import Login from './pages/admission/Login';
import Recover from './pages/admission/Recover';
import Admin from './pages/admission/Admin';
import Notifications from './pages/admission/Notifications';
import Status from './pages/admission/Status';
import Review from './pages/admission/Plate2';
import { useSelector, useDispatch } from 'react-redux';
import StepPage from './components/admission/StepPage';
import FormPrint from './components/admission/FormPrint';
import SSOLoginLayout from './components/mainui/SSOLoginLayout';
import SSOReset from './components/mainui/SSOReset';
import SSOPageLayout from './components/mainui/SSOPageLayout';
import SSORoleLayout from './components/mainui/SSORoleLayout';
import SSOModuleLayout from './components/mainui/SSOModuleLayout';
import StudentLayout from './components/mainui/students/layouts/StudentLayout';

//import { SocketContext, socket } from './context/socket';


function App({cookies}) {
  
  const { REACT_APP_API_URL } = process.env;
  const history = useHistory();
  const state = useSelector(state => state);
  const { step } = state;
  
  const logout = () => {
     var ok = window.confirm('Logout of System ?');
     if(ok){ cookies.remove('user') }
     // Dispatch logout from authReducer
  }
/*
  let AdmissionPrivateRoute = ({ component: Component, cookies, menu, ...rest }) => (
      <Route
          {...rest}
          render={props =>  cookies.get('user') 
            ? ( <Component {...props} menu="pos" logout={logout} />) 
            : ( <Redirect to={{ pathname: "admission/login", state: { from: props.location } }}/>)
          } />
  );  AdmissionPrivateRoute = withCookies(AdmissionPrivateRoute);


  let AppPrivateRoute = ({ component: Component, cookies, ...rest}) => (
    <Route
        {...rest}
        render={props =>
          cookies.get('user') ? (
            <Component {...props} user={cookies.get('user')} menu="pos" logout={logout}  />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
    />
);  AppPrivateRoute = withCookies(AppPrivateRoute);

//<SocketContext.Provider value={socket}></SocketContext.Provider>

*/


  return (
    <Router>
      <Switch>
        {/* Applicant Routes */}
        <Route exact path="/" render={ props => <Redirect to={{ pathname: "/login"}} /> }/>
        <Route exact path="/applicant" component={Login}/>
        <Route path="/recover-voucher" component={Recover}/>
        <Route path="/admission-dash" component={Admin}/>
        <Route path="/admission-notices" component={Notifications}/>
        <Route path="/admission-support" component={Review}/>
        <Route path="/admission-status" component={Status}/>
        <Route path="/admission-session" component={StepPage}/>
        <Route path="/admission-print" component={FormPrint}/>
        {/* Admin Routes */}
        <Route path="/login" component={SSOLoginLayout}/>
        <Route path="/ssoReset" component={SSOReset}/>
        <Route path="/dash" component={SSOPageLayout}/>
        <Route path="/student" component={StudentLayout}/>
        <Route exact="true" path="/app" component={SSORoleLayout}/>
        {/* App Modules */}
        <Route path="/app/:module" component={SSOModuleLayout}/>
       
      </Switch>
    </Router>
   
  
    
  );
}

export default withCookies(App);
