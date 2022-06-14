import React, { Fragment } from 'react'
import AlertBanner from '../../components/admission/AlertBanner'

const Review = () => {
    return (
        <Fragment>
           <div className="row">
                
                <div className="small-12 columns">
                  
                <div className="u-mb-5 billing-settings-payments">
                    <section className="Box">
                       
                        <div className="Tabs-content--box">
                            <div className="row">
                                <div className="small-12 columns">
                                    <AlertBanner/>
                                </div>

                                <div className="small-12 columns">
                                    <div className="small-8 columns u-pl-0">
                                        <h3 className="u-mb-1">Visit Application Review</h3>
                                        <p className="u-mb-4">Revise your application and make any changes where necessary.<br/><small><b>Changes can not be made to application past the Admission Deadline.</b></small></p>
                                    </div>
                                    <div className="small-4 columns u-pr-0">
                                        <button className="Button u-floatRight u-mb-3">&nbsp;<span className="Icon--edit" />&nbsp;&nbsp;Review Application&nbsp;&nbsp;</button>
                                    </div>
                                </div><hr/>

                                <div className="small-12 columns">
                                    <div className="small-8 columns u-pl-0">
                                        <h3 className="u-mb-1">Print Out Application</h3>
                                        <p className="u-mb-2">Get application printout for endorsement or personal submission.<br/><small><b>Changes can not be made to application past the Admission Deadline.</b></small></p>
                                    </div>
                                    <div className="small-4 columns u-pr-0">
                                        <button className="Button u-floatRight u-mb-2">&nbsp;<span className="Icon--print" />&nbsp;&nbsp;Print Application&nbsp;&nbsp;</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <table className="u-ml-0">
                                        <tbody>
                                            <tr id="ember1351" className="payment_profile ember-view">
                                                <td className="small-12 columns u-mb-3 u-pb-0 is-sensitive">
                                                    <p className="bui u-mb-0">
                                                        <b>EBENEZER K B ACKAH</b>xxxx-<b>5641</b>
                                                        <span className="bui-Pill">Default</span>
                                                    </p>
                                                    <p className="small">
                                                        <span>Expires 07/2023 • </span>
                                                        <span>Added on 22 Oct 2020</span>
                                                    </p>
                                                </td>
                                                <td className="action stackRight">
                                                    <div className="actions">
                                                        <div className="u-floatRight">
                                                            <div id="ember1356" className="aurora-dropdown-menu ellipsis ember-view">
                                                                <span role="button" className="dropdown-title"></span>
                                                                <div className="menu-dropdown right-aligned" style={{}}>
                                                                    <div className="menu-dropdownView sliding">
                                                                        <div role="button" className="menu-dropdownBacktoMenu Icon--arrowLongLeft hideMenuButton" />
                                                                            <ul className="menu-dropdownItems">
                                                                                <li role="button" className="dropdown-menu-item-button">Edit</li>
                                                                                <li role="button" className="dropdown-menu-item-button">Delete</li>
                                                                            </ul>
                                                                            <div className="dropdown-view dropdown-view--make-default">
                                                                                <p className="dropdown__headline">Update Default Card</p>
                                                                                <p>We will automatically charge your default card at the close of the current billing period.</p>
                                                                                <button className="Button Button--fullWidth Button--blue">Update</button>
                                                                            </div>
                                                                            <div className="dropdown-view dropdown-view--delete">
                                                                                <p className="dropdown__headline">Confirm Delete Card</p>
                                                                                <p className="small-dark u-textAlignLeft">Are you sure you want to remove your card?</p>
                                                                                <button tabIndex={-1} className="Button Button--fullWidth Button--red" data-ember-action data-ember-action-1364={1364}>Delete</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                </td>
                                            </tr>
                                           
                                        </tbody>
                                    </table>
                                    


                </section>
                </div>
                <div className="row u-mb-5">
                    <div className="columns small-12">
                        <section id="billing-settings-box" className="Box u-clearfix billing-settings-box">
                            <h2>Billing Settings</h2>
                            <h4>Address</h4>
                            <p className="u-mb-4">This address appears on your monthly invoice and should be the legal address of your home or business</p>
                            <div className="row u-mb-5">
                                <div className="columns small-8">
                                    <div id="ember1391" className="BillingAddress ember-view">
                                        <p>MIS UCC</p>
                                        <p>CAPE COAST, CENTRAL - 00233</p>
                                        <p>GH</p>
                                    </div>
                                </div>
                                <div className="columns small-4">
                                    <button className="Button u-floatRight" data-ember-action data-ember-action-1392={1392}>Edit Address</button>
                                </div>
                            </div>
                            <h4>Tax Location</h4>
                            <div className="u-mb-4">
                                <p>Taxes are not collected for your location at this time.</p>
                            </div>
                            <p>Your tax location determines the taxes that are applied to your bill.</p>
                            <a href="https://docs.digitalocean.com/products/billing/taxes/#how-can-i-change-my-tax-location" target="_blank" rel="noopener noreferrer">How do I correct my tax location?</a>
                            {/**/}
                            {/**/}  
                        </section>
                    </div>
                </div>
                {/**/}
                {/**/}
                {/**/}
                {/**/}
                <div className="bui">
                <div className="bui-u-mb--large">
                <section>
                    <h2 className="bui-u-mb--regular">Billing history</h2>
                    <table id="history" className="bui-Table Billing--history">
                        <thead>
                            <tr>
                                <th id="ember1397" className="aurora-th date ember-view"><span className="headerText">Date</span>
                                    {/**/}
                                </th>
                                <th id="ember1398" className="aurora-th description ember-view"><span className="headerText">Description</span>
                                    {/**/}
                                </th>
                                <th id="ember1399" className="aurora-th amount ember-view"><span className="headerText">Amount</span>
                                    {/**/}
                                </th>
                                <th id="ember1400" className="aurora-th invoice ember-view"><span className="headerText" />
                                    {/**/}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="date">
                                    June 10, 2021
                                </td>
                                <td className="description is-sensitive">
                                    <div id="ember2223" className="ellipsis-text ember-view">                        Payment (visa 5641)
                                    </div>
                                </td>
                                <td className="amount">
                                    -$20.00
                                </td>
                                <td className="invoice">
                                    {/**/}              
                                </td>
                            </tr>
                            <tr>
                                <td className="date">
                                    June 01, 2021
                                </td>
                                <td className="description is-sensitive">
                                    <a href="/account/billing/9fc4e839-9636-48a9-aa73-b546f98f308c?i=c3d9b3" id="ember2225" className="ember-view">                        Invoice for May 2021
                                    </a>              
                                </td>
                                <td className="amount">
                                    $20.00
                                </td>
                                <td className="invoice">
                                    Download:
                                    <a rel="noopener noreferrer" target="_blank" id="ember2226" className="ember-view" href="/v2/customers/c3d9b324010c01d70ef5b9138632b7e987f80bbb/invoices/9fc4e839-9636-48a9-aa73-b546f98f308c/pdf?i=c3d9b3">PDF</a>
                                    •
                                    <a rel="noopener noreferrer" target="_blank" id="ember2227" className="ember-view" href="/v2/customers/c3d9b324010c01d70ef5b9138632b7e987f80bbb/invoices/9fc4e839-9636-48a9-aa73-b546f98f308c/csv?i=c3d9b3">CSV</a>
                                </td>
                            </tr>
                            <tr>
                                <td className="date">
                                    May 20, 2021
                                </td>
                                <td className="description is-sensitive">
                                    <div id="ember2229" className="ellipsis-text ember-view">                        Payment (visa 5641)
                                    </div>
                                </td>
                                <td className="amount">
                                    -$20.00
                                </td>
                                <td className="invoice">
                                    {/**/}              
                                </td>
                            </tr>
                            <tr>
                                <td className="date">
                                    May 01, 2021
                                </td>
                                <td className="description is-sensitive">
                                    <a href="/account/billing/7528257a-b183-4662-8fa5-106ddc4f697c?i=c3d9b3" id="ember2231" className="ember-view">                        Invoice for April 2021
                                    </a>              
                                </td>
                                <td className="amount">
                                    $20.00
                                </td>
                                <td className="invoice">
                                    Download:
                                    <a rel="noopener noreferrer" target="_blank" id="ember2232" className="ember-view" href="/v2/customers/c3d9b324010c01d70ef5b9138632b7e987f80bbb/invoices/7528257a-b183-4662-8fa5-106ddc4f697c/pdf?i=c3d9b3">PDF</a>
                                    •
                                    <a rel="noopener noreferrer" target="_blank" id="ember2233" className="ember-view" href="/v2/customers/c3d9b324010c01d70ef5b9138632b7e987f80bbb/invoices/7528257a-b183-4662-8fa5-106ddc4f697c/csv?i=c3d9b3">CSV</a>
                                </td>
                            </tr>
                            <tr>
                                <td className="date">
                                    April 01, 2021
                                </td>
                                <td className="description is-sensitive">
                                    <div id="ember2235" className="ellipsis-text ember-view">                        Payment (visa 5641)
                                    </div>
                                </td>
                                <td className="amount">
                                    -$23.00
                                </td>
                                <td className="invoice">
                                    {/**/}              
                                </td>
                            </tr>
                            <tr>
                                <td className="date">
                                    April 01, 2021
                                </td>
                                <td className="description is-sensitive">
                                    <div id="ember2237" className="ellipsis-text ember-view">                        Payment (visa 5641)
                                    </div>
                                </td>
                                <td className="amount">
                                    -$23.00
                                </td>
                                <td className="invoice">
                                    {/**/}              
                                </td>
                            </tr>
                            <tr>
                                <td className="date">
                                    April 01, 2021
                                </td>
                                <td className="description is-sensitive">
                                    <a href="/account/billing/437795ee-3699-41b4-be7d-89495f2c629d?i=c3d9b3" id="ember2239" className="ember-view">                        Invoice for March 2021
                                    </a>              
                                </td>
                                <td className="amount">
                                    $23.00
                                </td>
                                <td className="invoice">
                                    Download:
                                    <a rel="noopener noreferrer" target="_blank" id="ember2240" className="ember-view" href="/v2/customers/c3d9b324010c01d70ef5b9138632b7e987f80bbb/invoices/437795ee-3699-41b4-be7d-89495f2c629d/pdf?i=c3d9b3">PDF</a>
                                    •
                                    <a rel="noopener noreferrer" target="_blank" id="ember2241" className="ember-view" href="/v2/customers/c3d9b324010c01d70ef5b9138632b7e987f80bbb/invoices/437795ee-3699-41b4-be7d-89495f2c629d/csv?i=c3d9b3">CSV</a>
                                </td>
                            </tr>
                            <tr>
                                <td className="date">
                                    March 01, 2021
                                </td>
                                <td className="description is-sensitive">
                                    <a href="/account/billing/d2062125-467e-46d0-8c1a-28b82aa1dbcc?i=c3d9b3" id="ember2243" className="ember-view">                        Invoice for February 2021
                                    </a>              
                                </td>
                                <td className="amount">
                                    $23.00
                                </td>
                                <td className="invoice">
                                    Download:
                                    <a rel="noopener noreferrer" target="_blank" id="ember2244" className="ember-view" href="/v2/customers/c3d9b324010c01d70ef5b9138632b7e987f80bbb/invoices/d2062125-467e-46d0-8c1a-28b82aa1dbcc/pdf?i=c3d9b3">PDF</a>
                                    •
                                    <a rel="noopener noreferrer" target="_blank" id="ember2245" className="ember-view" href="/v2/customers/c3d9b324010c01d70ef5b9138632b7e987f80bbb/invoices/d2062125-467e-46d0-8c1a-28b82aa1dbcc/csv?i=c3d9b3">CSV</a>
                                </td>
                            </tr>
                            <tr>
                                <td className="date">
                                    February 19, 2021
                                </td>
                                <td className="description is-sensitive">
                                    <div id="ember2247" className="ellipsis-text ember-view">                        Payment (visa 5641)
                                    </div>
                                </td>
                                <td className="amount">
                                    -$23.00
                                </td>
                                <td className="invoice">
                                    {/**/}              
                                </td>
                            </tr>
                            <tr>
                                <td className="date">
                                    February 01, 2021
                                </td>
                                <td className="description is-sensitive">
                                    <a href="/account/billing/ec22b901-e70f-4d80-948d-fd8df4c75984?i=c3d9b3" id="ember2249" className="ember-view">                        Invoice for January 2021
                                    </a>              
                                </td>
                                <td className="amount">
                                    $23.00
                                </td>
                                <td className="invoice">
                                    Download:
                                    <a rel="noopener noreferrer" target="_blank" id="ember2250" className="ember-view" href="/v2/customers/c3d9b324010c01d70ef5b9138632b7e987f80bbb/invoices/ec22b901-e70f-4d80-948d-fd8df4c75984/pdf?i=c3d9b3">PDF</a>
                                    •
                                    <a rel="noopener noreferrer" target="_blank" id="ember2251" className="ember-view" href="/v2/customers/c3d9b324010c01d70ef5b9138632b7e987f80bbb/invoices/ec22b901-e70f-4d80-948d-fd8df4c75984/csv?i=c3d9b3">CSV</a>
                                </td>
                            </tr>
                            <tr>
                                <td className="date">
                                    January 07, 2021
                                </td>
                                <td className="description is-sensitive">
                                    <div id="ember2253" className="ellipsis-text ember-view">                        Payment (visa 5641)
                                    </div>
                                </td>
                                <td className="amount">
                                    -$23.00
                                </td>
                                <td className="invoice">
                                    {/**/}              
                                </td>
                            </tr>
                            <tr>
                                <td className="date">
                                    January 01, 2021
                                </td>
                                <td className="description is-sensitive">
                                    <a href="/account/billing/27305a94-cb33-4047-a8ab-6914180e279d?i=c3d9b3" id="ember2255" className="ember-view">                        Invoice for December 2020
                                    </a>              
                                </td>
                                <td className="amount">
                                    $23.00
                                </td>
                                <td className="invoice">
                                    Download:
                                    <a rel="noopener noreferrer" target="_blank" id="ember2256" className="ember-view" href="/v2/customers/c3d9b324010c01d70ef5b9138632b7e987f80bbb/invoices/27305a94-cb33-4047-a8ab-6914180e279d/pdf?i=c3d9b3">PDF</a>
                                    •
                                    <a rel="noopener noreferrer" target="_blank" id="ember2257" className="ember-view" href="/v2/customers/c3d9b324010c01d70ef5b9138632b7e987f80bbb/invoices/27305a94-cb33-4047-a8ab-6914180e279d/csv?i=c3d9b3">CSV</a>
                                </td>
                            </tr>
                            <tr>
                                <td className="date">
                                    December 21, 2020
                                </td>
                                <td className="description is-sensitive">
                                    <div id="ember2259" className="ellipsis-text ember-view">                        Payment (visa 5641)
                                    </div>
                                </td>
                                <td className="amount">
                                    -$23.00
                                </td>
                                <td className="invoice">
                                    {/**/}              
                                </td>
                            </tr>
                            <tr>
                                <td className="date">
                                    December 01, 2020
                                </td>
                                <td className="description is-sensitive">
                                    <a href="/account/billing/d45c1cb6-fe9b-4039-af64-30007f9bf40d?i=c3d9b3" id="ember2261" className="ember-view">                        Invoice for November 2020
                                    </a>              
                                </td>
                                <td className="amount">
                                    $23.00
                                </td>
                                <td className="invoice">
                                    Download:
                                    <a rel="noopener noreferrer" target="_blank" id="ember2262" className="ember-view" href="/v2/customers/c3d9b324010c01d70ef5b9138632b7e987f80bbb/invoices/d45c1cb6-fe9b-4039-af64-30007f9bf40d/pdf?i=c3d9b3">PDF</a>
                                    •
                                    <a rel="noopener noreferrer" target="_blank" id="ember2263" className="ember-view" href="/v2/customers/c3d9b324010c01d70ef5b9138632b7e987f80bbb/invoices/d45c1cb6-fe9b-4039-af64-30007f9bf40d/csv?i=c3d9b3">CSV</a>
                                </td>
                            </tr>
                            <tr>
                                <td className="date">
                                    November 23, 2020
                                </td>
                                <td className="description is-sensitive">
                                    <div id="ember2265" className="ellipsis-text ember-view">                        Payment (visa 5641)
                                    </div>
                                </td>
                                <td className="amount">
                                    -$23.00
                                </td>
                                <td className="invoice">
                                    {/**/}              
                                </td>
                            </tr>
                            <tr>
                                <td className="date">
                                    November 01, 2020
                                </td>
                                <td className="description is-sensitive">
                                    <a href="/account/billing/71522d56-1995-425d-b354-3a6fdf855736?i=c3d9b3" id="ember2267" className="ember-view">                        Invoice for October 2020
                                    </a>              
                                </td>
                                <td className="amount">
                                    $23.00
                                </td>
                                <td className="invoice">
                                    Download:
                                    <a rel="noopener noreferrer" target="_blank" id="ember2268" className="ember-view" href="/v2/customers/c3d9b324010c01d70ef5b9138632b7e987f80bbb/invoices/71522d56-1995-425d-b354-3a6fdf855736/pdf?i=c3d9b3">PDF</a>
                                    •
                                    <a rel="noopener noreferrer" target="_blank" id="ember2269" className="ember-view" href="/v2/customers/c3d9b324010c01d70ef5b9138632b7e987f80bbb/invoices/71522d56-1995-425d-b354-3a6fdf855736/csv?i=c3d9b3">CSV</a>
                                </td>
                            </tr>
                            <tr>
                                <td className="date">
                                    October 22, 2020
                                </td>
                                <td className="description is-sensitive">
                                    <div id="ember2271" className="ellipsis-text ember-view">                        Payment (visa 5641)
                                    </div>
                                </td>
                                <td className="amount">
                                    -$8.00
                                </td>
                                <td className="invoice">
                                    {/**/}              
                                </td>
                            </tr>
                            <tr>
                                <td className="date">
                                    October 22, 2020
                                </td>
                                <td className="description is-sensitive">
                                    <div id="ember2273" className="ellipsis-text ember-view">                        PayPal
                                    </div>
                                </td>
                                <td className="amount">
                                    -$15.00
                                </td>
                                <td className="invoice">
                                    {/**/}              
                                </td>
                            </tr>
                            <tr>
                                <td className="date">
                                    October 01, 2020
                                </td>
                                <td className="description is-sensitive">
                                    <a href="/account/billing/42770b4d-05f9-4fce-bade-cf9123a08684?i=c3d9b3" id="ember2275" className="ember-view">                        Invoice for September 2020
                                    </a>              
                                </td>
                                <td className="amount">
                                    $23.00
                                </td>
                                <td className="invoice">
                                    Download:
                                    <a rel="noopener noreferrer" target="_blank" id="ember2276" className="ember-view" href="/v2/customers/c3d9b324010c01d70ef5b9138632b7e987f80bbb/invoices/42770b4d-05f9-4fce-bade-cf9123a08684/pdf?i=c3d9b3">PDF</a>
                                    •
                                    <a rel="noopener noreferrer" target="_blank" id="ember2277" className="ember-view" href="/v2/customers/c3d9b324010c01d70ef5b9138632b7e987f80bbb/invoices/42770b4d-05f9-4fce-bade-cf9123a08684/csv?i=c3d9b3">CSV</a>
                                </td>
                            </tr>
                            <tr>
                                <td className="date">
                                    September 19, 2020
                                </td>
                                <td className="description is-sensitive">
                                    <div id="ember2279" className="ellipsis-text ember-view">                        PayPal
                                    </div>
                                </td>
                                <td className="amount">
                                    -$23.00
                                </td>
                                <td className="invoice">
                                    {/**/}              
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div id="ember1471" className="Pagination u-mb-4 u-mt-6 ember-view">
                        <a href="/account/billing?i=c3d9b3&page=0" id="ember1474" className="is-disabled prev  ember-transitioning-in ember-view">
                            Previous
                            {/**/}
                            <div className="Loader--basic Loader--blue  u-va-m   " />
                        </a>
                        <a href="/account/billing?i=c3d9b3" id="ember2281" className="is-active page pagination-button  active ember-view">      <span className="Label">1</span>
                        {/**/}<div className="Loader--basic Loader--blue  u-va-m   " />
                        </a>
                        <a href="/account/billing?i=c3d9b3&page=2" id="ember2284" className=" page pagination-button  ember-view">      <span className="Label">2</span>
                        {/**/}<div className="Loader--basic Loader--blue  u-va-m   " />
                        </a>
                        <a href="/account/billing?i=c3d9b3&page=2" id="ember1480" className=" next  ember-view">    {/**/}<div className="Loader--basic Loader--blue  u-va-m   " />
                        Next
                        </a>
                        </div>
                </section>
                </div>
                </div>
               
                </div>
                </div> 
        </Fragment>
    )
}

export default Review
