import React from 'react'
import '../admission/FormPrint.css'

const PaperSlip = () => {
    return (
    <div className="print">
    <div className="cover">
       <content>
           {/* REGISTRATION SLIP */}
           <section>
                <h1 className="h1title fore">AFRICAN UNIVERSITY COLLEGE OF COMMUNICATIONS, ACCRA</h1>
                <h2 className="h2title">MSC. INFORMATION TECHNOLOGY</h2>
                <h3 className="h3title">2020/2021 SECOND SEMESTER REGISTRATION</h3>
                <hr className="divider"/>
                <div className="title-cover">
                    <div className="title-group">
                       <span>Name: ACKAH, Ebenezer Kwabena Blay</span><br/>
                       <span>Student ID: 20777941</span><br/>
                       <span>Index Number: PG4180920</span><br/>
                       <span>Nationality: GHA</span><br/>
                    </div>
                    <div className="title-group">
                       <span>Programme: MSC. INFORMATION TECHNOLOGY</span><br/>
                       <span>Option: General</span><br/>
                       <span>Year 1</span><br/>
                       <span>Date/time printed: 10-Aug-2021 10:10 PM</span><br/>
                    </div>
                </div>
                <hr className="divider"/>
                <table className="stable">
                    <tbody>
                        <tr className="thead">
                            <td className="codetitle" align="center">Course code</td>
                            <td className="tdtitle" align="left">Course name</td>
                            <td align="center">Credits</td>
                            <td>Defer</td>
                            <td></td>
                        </tr>
                        <tr class="tbody">
                            <td align="center">MIT 562</td>
                            <td>DATABASE SYSTEMS</td>
                            <td align="center">3</td>
                            <td>&nbsp;</td>
                            <td>Resit</td>
                        </tr>
                        <tr class="tbody">
                            <td align="center">MIT 568</td>
                            <td>INTERNET TECHNOLOGIES</td>
                            <td align="center">3</td>
                            <td>&nbsp;</td>
                            <td>Resit</td>
                        </tr>
                        <tr class="tbody">
                            <td align="center">MIT 562</td>
                            <td>DATABASE SYSTEMS</td>
                            <td align="center">3</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                    </tbody>
              </table>
              <hr className="divider"/>
              <div className="title-cover">
                    <div className="title-group">
                       <b>Total deferred credits:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>10<br/>
                       <b>Total undeferred credits:&nbsp;&nbsp;</b>18<br/>
                    </div>
                    <div className="title-group">
                       <b>Credits registered:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>29<br/>
                       <b>Total deferred credits:&nbsp;&nbsp;</b>22<br/>
                    </div>
              </div><br/>
              <div className="title-cover">
                    <div className="title-group">
                       <span>--------------------------------------------------</span><br/>
                       <span className="sub">Student's Signature</span><br/>
                    </div>
                    <div className="title-group">
                       <span>--------------------------------------------------</span><br/>
                       <span className="sub">Academic Supervisor/ Registration Officer</span><br/>
                    </div>
              </div>
              <h3 className="ftitle">REGISTRATION IS ONLY VALID AFTER BIOMETRIC VERIFICATION</h3>
              <div className="separator"></div>
            </section>


            {/* RESEULT SLIP */}
            <section>
                <h1 className="h1title fore">AFRICAN UNIVERSITY COLLEGE OF COMMUNICATIONS, ACCRA</h1>
                <h2 className="h2title">MSC. INFORMATION TECHNOLOGY</h2>
                <h3 className="h3title">2020/2021 SECOND SEMESTER RESULT SLIP</h3>
                <hr className="divider"/>
                <div className="title-cover">
                    <div className="title-group">
                       <span>Name: ACKAH, Ebenezer Kwabena Blay</span><br/>
                       <span>Student ID: 20777941</span><br/>
                       <span>Index Number: PG4180920</span><br/>
                       <span>Nationality: GHA</span><br/>
                    </div>
                    <div className="title-group">
                       <span>Programme: MSC. INFORMATION TECHNOLOGY</span><br/>
                       <span>Option: General</span><br/>
                       <span>Year 1</span><br/>
                       <span>Date/time printed: 10-Aug-2021 10:10 PM</span><br/>
                    </div>
                </div>
                <hr className="divider"/>
                <table className="stable">
                    <tbody>
                        <tr className="thead">
                            <td className="codetitle" align="center">Course code</td>
                            <td className="tdtitle">Course name</td>
                            <td align="center">Credits</td>
                            <td align="center">Marks</td>
                            <td align="center">Grade</td>
                            <td className="codetitle" align="center">Grade Point</td>
                        </tr>
                        <tr class="tbody">
                            <td align="center">MIT 562</td>
                            <td>DATABASE SYSTEMS</td>
                            <td align="center">3</td>
                            <td align="center">60</td>
                            <td align="center">B+</td>
                            <td align="center">2.75</td>
                        </tr>
                        <tr class="tbody">
                            <td align="center">MIT 568</td>
                            <td>INTERNET TECHNOLOGIES</td>
                            <td align="center">3</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr class="tbody">
                            <td align="center">MIT 562</td>
                            <td>INTERNET TECHNOLOGIES</td>
                            <td align="center">3</td>
                            <td colspan="3"><h3 className="ftitle">RESULT NOT PUBLISHED</h3></td>
                        </tr>
                    </tbody>
              </table>
              <hr className="divider"/>
              <div className="title-cover">
                    <div className="title-group flex-2">&nbsp;</div>
                    <div className="title-group"><b>TCR:&nbsp;</b>15</div>
                    <div className="title-group"><b>TGP:&nbsp;</b>10</div>
                    <div className="title-group"><b>CCR:&nbsp;</b>10</div>
                    <div className="title-group"><b>CGV:&nbsp;</b>10</div>
                    <div className="title-group"><b>GPA:&nbsp;</b>3.40</div>
                    <div className="title-group"><b>CGPA:&nbsp;</b>2.40</div>
                    <div className="title-group flex-2">&nbsp;</div>
              </div><br/>
              <div className="separator"></div>
            </section>


             {/* RESEULT SLIP */}
             <section>
                <h1 className="h1title fore">AFRICAN UNIVERSITY COLLEGE OF COMMUNICATIONS, ACCRA</h1>
                <h2 className="h2title">MSC. INFORMATION TECHNOLOGY</h2>
                <h3 className="h3title">FEE DETAILS: ACKAH, Ebenezer Kwabena Blay (20777941)</h3><br/>
                <table className="stable">
                    <tbody>
                        <tr className="thead">
                            <td className="codetitle" align="center">Date</td>
                            <td className="fintitle" align="center">Session</td>
                            <td className="tdtitle">Narative</td>
                            <td className="fintitle" align="center">Type</td>
                            <td className="fintitle" align="center">Amount</td>
                            <td className="fintitle" align="center">Balance</td>
                            <td className="codetitle" align="center">Finance ID</td>
                           
                            
                        </tr>
                        <tr class="tbody">
                            <td align="center">01 Jul 2020</td>
                            <td align="center">Sem 1, Year 1<br/>2020-2021</td>
                            <td>Academic Facility User Fees</td>
                            <td align="center">BILL</td>
                            <td align="center">-2,602.00</td>
                            <td align="center">-2,602.00</td>
                            <td align="center">3002470</td>
                        </tr>
                       
                    </tbody>
              </table>
             <div className="separator"></div>
            </section>


        </content>
    </div>
    </div>
    )
}

export default PaperSlip
