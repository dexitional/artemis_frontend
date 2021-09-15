import React from 'react'
import '../admission/FormPrint.css'

const PaperTable = () => {
    return (
        <div className="print">
    <div className="fade-bg" style={{background: 'url(/assets/img/green_logo.png) center 90% / 540px 650px no-repeat',display:'none'}}></div>
    <div className="cover">
        <header>
            <div className="left-head"><img src="/assets/img/green_logo.png" className="logo"/>
                <div className="left-cover">
                    <h2><span style={{fontSize:'32px',color:'#0243d2'}}>GREENWICH HALL</span><br/>COLLEGE OF HEALTH, KINTAMPO</h2>
                    <h3 className="title-group">Online Nomination Form</h3>
                </div>
            </div>
            <div className="right-head address">
              <address>College of Health, Kintampo<br/>P.O. Box 34, Kintampo<br/>Bono Region - Ghana<br/>Greenwich Hall<br/><br/>Tel:+233 249 988 388<br/>
                  ec@greenwich.cohk.live<br/><br/><span className="aurora-small">29/7/2021</span></address>
            </div>
        </header>
        <content>
            <h3 className="center black"> Please Ensure That Accurate Information Is Provided Only To The Electoral Commision</h3><br/>
           <section>
                <table className="ptable">
                    <tbody><tr>
                        <td style={{minwidth: '200px'}}>
                            <h3 className="title">Personal &amp; professional Information </h3>
                        </td>
                        <td colspan="2">&nbsp;</td>
                    </tr>
                    <tr>
                        <td rowspan="5"><img src="/.././photos/321a7736.png" style={{height: '200px', display: 'block'}}/></td>
                        <td className="shead">Applicant ID:</td>
                        <td className="sbody">321A7736</td>
                    </tr>
                    <tr>
                        <td className="shead">Full Name:</td>
                        <td className="sbody"><small><b>JOHN KWEKUCHER ACKAH</b></small></td>
                    </tr>
                    <tr>
                        <td className="shead">Aspirant Position:</td>
                        <td className="sbody"><small><b>PRESIDENT</b></small></td>
                    </tr>
                   <tr>
                        <td className="shead">Program of Study:</td>
                        <td className="sbody">TELECOM</td>
                    </tr>
                    <tr>
                        <td className="shead">Date of Birth:</td>
                        <td className="sbody">2021-07-21</td>
                    </tr>
                    <tr>
                        <td rowspan="5"></td>
                        <td className="shead">Nationality:</td>
                        <td className="sbody">GHANAIAN</td>
                    </tr>
                    <tr>
                        <td className="shead">Hometown:</td>
                        <td className="sbody">ENCHI</td>
                    </tr>
                    <tr>
                        <td className="shead">Phone Number:</td>
                        <td className="sbody">0277675089</td>
                    </tr>
                    <tr>
                        <td className="shead">Home Address:</td>
                        <td className="sbody">AKOTOKYIR</td>
                    </tr>
                    <tr>
                        <td className="shead">Email Address:</td>
                        <td className="sbody">BERMA@GMAIL.COM</td>
                    </tr>
                   
                    <tr>
                        <td colspan="3">
                            <hr/>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <h3 className="title"> Principal Referees (Five)</h3>
                        </td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td rowspan="10" className="shead">&nbsp;</td>
                        <td className="shead">Name of Referee #1:</td>
                        <td className="sbody">EBEN 1</td>
                    </tr>
                    <tr>
                        <td className="shead">Phone Number :</td>
                        <td className="sbody">0244650679</td>
                    </tr>
                    <tr>
                        <td className="shead">Name of Referee #2:</td>
                        <td className="sbody">EBEN 2</td>
                    </tr>
                    <tr>
                        <td className="shead">Phone Number :</td>
                        <td className="sbody">0244650679</td>
                    </tr>
                    <tr>
                        <td className="shead">Name of Referee #3:</td>
                        <td className="sbody">EBEN 3</td>
                    </tr>
                    <tr>
                        <td className="shead">Phone Number :</td>
                        <td className="sbody">0244650679</td>
                    </tr>
                    <tr>
                        <td className="shead">Name of Referee #4:</td>
                        <td className="sbody">EBEN 4</td>
                    </tr>
                    <tr>
                        <td className="shead">Phone Number :</td>
                        <td className="sbody">0244650679</td>
                    </tr>
                    <tr>
                        <td className="shead">Name of Referee #5:</td>
                        <td className="sbody">EBEN 5</td>
                    </tr>
                    <tr>
                        <td className="shead">Phone Number :</td>
                        <td className="sbody">0244650679</td>
                    </tr>

                </tbody>
                </table>
            </section>
        </content>
    </div>
  </div>
    )
}

export default PaperTable
