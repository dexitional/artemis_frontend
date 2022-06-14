
import React, { Fragment,Component } from 'react';
import AdminLogo from '../../assets/img/aucc_admission.png';
import HeroImg from '../../assets/img/HeroBackground-Option3-01.0cd4999f.jpg';
//import '../assets/css/aurora.css';
import '../../components/admission/LoginLayout.css';

const LoginLayout = ({children}) => {
      return (
        <Fragment>
           <header className="sc-egiSv iyWWIA"><a type="default" target="_self" className="sc-gKckTs kNJaHk sc-iCfLBT fxyNsI" href="#" rel="noopener noreferrer"><span className="sc-kDThTU bBpNfQ" /><img src={AdminLogo} className="sc-ksdxAp fdYigH" /><img src={AdminLogo} className="sc-hBURRC bfcEnS" /></a>
              <p><span className="sc-bqiQRQ hUhAjW" style={{color:'#031b4e'}}>Check requirements?</span><a target="_blank" className="sc-gKckTs kNJaHk sc-iCfLBT fxyNsI" href="https://aucc.edu.gh/index.php/en/admissions/apply-now" rel="noopener noreferrer"><span className="sc-kDThTU bBpNfQ"/>AUCC Admissions</a></p>
           </header>
       
           <div className="sc-fFehDp kGvAFP">
               <div className="sc-gsDJrp jXLjZO" style={{backgroundImage: `url(${HeroImg})`, backgroundPosition: 'center center'}}></div>
                <div className="sc-dJjZJu kszVAv" style={{paddingBottom: '1rem'}}>
                   <div className="sc-bdvvaa eRQARU">
                      <div style={{transform: 'translateX(0%)'}}>
                        <div className="sc-hGPAah CoLgZ">{children}</div>
                      </div>
                   </div>
                </div>
           </div>
      </Fragment>

    )
}

export default LoginLayout;
