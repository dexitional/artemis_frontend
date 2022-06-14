import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import '../admission/FormPrint.css'
import Logo from '../../assets/img/logo.png'
import moment from 'moment'

const PaperTable = () => {
    
    const { sso } = useSelector( state => state)
    const { modal } = sso;

    return (
        <div className="print">
    <div className="cover" style={{width:'95%'}}>
    <div className="fade-bg" style={{background: `url(${Logo}) center 28vh / 340px 350px no-repeat`}}></div>
    
        <header>
            <div className="left-head"><img src={Logo} className="logo"/>
                <div className="left-cover">
                    <h2><span style={{fontSize:'28px',color:'#b76117',letterSpacing:'0.07em'}}>AFRICAN UNIVERSITY</span><br/>COLLEGE OF COMMUNICATIONS</h2>
                    <h3 className="title-group">{modal.content && modal.content.main_title}</h3>
                </div>
            </div>
            <div className="right-head address" style={{display:'none'}}>
              <address>College of Health, Kintampo<br/>P.O. Box 34, Kintampo<br/>Bono Region - Ghana<br/>Greenwich Hall<br/><br/>Tel:+233 249 988 388<br/>
                  ec@greenwich.cohk.live<br/><br/>
                  <span className="aurora-small">29/7/2021</span>
              </address>
            </div>
        </header><br/>
        <content>
            <h2 className="center black">{ modal.content && modal.content.sub_title }</h2><hr/>
            <section>
                <table className="ptable">
                  <tbody>
                    <tr>{ modal.content.head && modal.content.head.map(h => <td className="sbody">{h}</td>)}</tr>
                    {modal.content && modal.content.data.map(d => <tr> {modal.content.field && modal.content.field.map(b => <td><h4 className="title">{['created_at','started_at'].includes(b) ? moment(d[b]).format('MMM DD YY, HH:MM') : d[b] }</h4></td>)} </tr> )}
                  </tbody>
                </table>
            </section>
        </content>
    </div>
  </div>
    )
}

export default PaperTable
