import React from 'react'

const Plate = () => {
    return (
        <>
            <div className="row">
                
                <div className="small-12 columns">
                
                    <div id="ember1330" className="ember-view">
                    <section className="u-mb-5 bandwidth-meter">
                        <div className="Box">
                            <h2>
                                Droplet transfer
                            </h2>
                            <p className="u-floatRight u-mb-2">
                                55 GB used of
                                4000 GB
                            </p>
                            <div data-html="false" title data-toggle="tooltip" data-placement="top" id="ember1331" data-original-title="You have accrued 2143 GB
                                of free data transfer. If you keep Droplets running at the same pace,
                                your monthly pool should be
                                4000 GB." className="bandwidth-meter-calculated-tooltip u-ml-1 tooltip-wrap multiline ember-view">          <span data-placement="top" data-toggle="tooltip" className="Hint" />
                            </div>
                            <p />
                            <p className="u-mb-2">Estimated Droplet Transfer Pool</p>
                            <div className="bandwidth-meter-graph u-mb-2">
                                <div style={{width: '1.37425%'}} className="bandwidth-meter-used" />
                                <div data-html="false" title data-toggle="tooltip" data-placement="top" id="ember1332" data-original-title="You have used 1.37%
                                    of your estimated transfer pool" className="bandwidth-meter-graph-tooltip tooltip-wrap multiline ember-view">          <span className="bandwidth-meter-graph-tooltip-target" />
                                </div>
                            </div>
                            <small>Last month you transferred 69 GB of data from your Droplets</small>
                            <div className="bandwidth-faq">
                                <div role="button" className="bandwidth-faq-question Icon--arrowUp" data-ember-action data-ember-action-1333={1333}>
                                    How does this work?
                                </div>
                                <div className="bandwith-faq-answer">
                                    <p>
                                        Outbound data transfer is shared between your Droplets each billing cycle. If the outbound transfer exceeds the amount included with your Droplets at end of the cycle, you will be charged $0.01 per excess gigabyte.
                                    </p>
                                    <p>
                                        We include this charge on your running invoice to let you know where you stand throughout the billing period. A spike in outbound transfer early in the month might display overage charges. However, if your Droplets accrue enough free data transfer by end of the billing period, there will not be overage charges.
                                        <a id="ember2287" className="bandwidth-meter-heading-link is-community-link bandwidth-meter-heading-link ember-view" target="_blank" href="//www.digitalocean.com/community/tutorials/digitalocean-bandwidth-billing-faq" rel="noopener noreferrer">            Learn more
                                        </a>      
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                
               
                    <div className="u-mb-5 billing-settings-payments">
                <section className="Box">
                    <h2>BEGIN ENROLMENT</h2>
                    <p className="u-mb-5">
                        Please choose the mode of application you are interested in 
                    </p>

                    <ul role="tablist" className="Tabs">
                        <li role="presentation">
                            <a aria-controls="credit-card" role="tab">Credit / Debit Card</a>
                        </li>
                        <li role="presentation" className="is-active">
                            <a aria-controls="paypal" role="tab">PayPal</a>
                        </li>
                    </ul>

                    <div className="Tabs-content Tabs-content--box">
                      <div role="tabpanel" className="Tabs-pane  cc-form">
                        <div className="row">
                           <div className="small-12 columns">
                              <h3 className="u-mb-3">
                                  Credit or debit cards
                                  <div data-html="false" title data-toggle="tooltip" data-placement="top" id="ember1344"  className="tooltip-wrap btn-tooltip tooltip-wrap multiline ember-view">
                                      <div className="Hint" />
                                  </div>
                              </h3>
                           </div>
                        </div>
                        <div className="row">
                            <div className="small-12 columns">
                                <div className="small-8 columns u-pl-0">
                                    <p className="u-mb-4">
                                        Cards will be charged either at the end of the month or whenever your balance exceeds the usage threshold.
                                        All major credit / debit cards accepted.
                                    </p>
                                </div>
                                <div className="small-4 columns u-pr-0">
                                    <button className="Button u-floatRight u-mb-3 " data-ember-action data-ember-action-1345={1345}>Add Card
                                    {/**/}                </button>
                                </div>
                                <table className="u-ml-0">
                                    <tbody>
                                        <tr id="ember1351" className="payment_profile ember-view">
                                            <td className="small-12 columns u-mb-3 u-pb-0 is-sensitive">
                                                <p className="bui u-mb-0">
                                                    <b>EBENEZER K B ACKAH</b>
                                                    xxxx-<b>5641</b>
                                                    <span className="bui-Pill">
                                                    Default
                                                    </span>
                                                </p>
                                                <p className="small">
                                                    <span>
                                                    Expires 07/2023
                                                    •
                                                    </span>
                                                    <span>Added on 22 Oct 2020</span>
                                                </p>
                                            </td>
                                            <td className="action stackRight">
                                                <div className="actions">
                                                    <div className="u-floatRight">
                                                        <div id="ember1356" className="aurora-dropdown-menu ellipsis ember-view">
                                                            <span role="button" className="dropdown-title  " data-ember-action data-ember-action-1357={1357}>{/**/}
                                                            {/**/}</span>
                                                            <div className="menu-dropdown right-aligned" style={{}}>
                                                                <div className="menu-dropdownView sliding">
                                                                    <div role="button" className="menu-dropdownBacktoMenu Icon--arrowLongLeft hideMenuButton" data-ember-action data-ember-action-1358={1358} />
                                                                        <ul className="menu-dropdownItems    ">
                                                                            <li role="button" className=" dropdown-menu-item-button " data-ember-action data-ember-action-1360={1360}>
                                                                                {/**/}          Edit
                                                                            </li>
                                                                            <li role="button" className=" dropdown-menu-item-button " data-ember-action data-ember-action-1362={1362}>
                                                                                {/**/}          Delete
                                                                            </li>
                                                                        </ul>
                                                                        <div className="dropdown-view dropdown-view--make-default">
                                                                            <p className="dropdown__headline">
                                                                                Update Default Card
                                                                            </p>
                                                                            <p>We will automatically charge your default card at the close of the current billing period.</p>
                                                                            <button className="Button Button--fullWidth Button--blue" data-ember-action data-ember-action-1363={1363}>
                                                                            Update
                                                                            </button>
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
                                        <tr id="ember1366" className="payment_profile ember-view"><td className="small-12 columns u-mb-3 u-pb-0 is-sensitive">
                                        <p className="bui u-mb-0">
                                        <b>EBENEZER KWABENA BLAY ACKAH</b>
                                        xxxx-<b>5641</b>
                                        {/**/}</p>
                                        <p className="small">
                                        <span>
                                        Expires 07/2023
                                        •
                                        </span>
                                        <span>Added on 22 Oct 2020</span>
                                        </p>
                                        </td>
                                        <td className="action stackRight">
                                        <div className="actions">
                                        <div className="u-floatRight">
                                        <div id="ember1367" className="aurora-dropdown-menu ellipsis ember-view">  <span role="button" className="dropdown-title  " data-ember-action data-ember-action-1368={1368}>{/**/}
                                        {/**/}</span>
                                        <div className="menu-dropdown" style={{}}>
                                        <div className="menu-dropdownView sliding">
                                        <div role="button" className="menu-dropdownBacktoMenu Icon--arrowLongLeft hideMenuButton" data-ember-action data-ember-action-1369={1369} />
                                        <ul className="menu-dropdownItems    ">
                                        <li role="button" className=" dropdown-menu-item-button " data-ember-action data-ember-action-1371={1371}>
                                        {/**/}          Edit
                                        </li>
                                        <li role="button" className=" dropdown-menu-item-button " data-ember-action data-ember-action-1373={1373}>
                                        {/**/}          Make Default
                                        </li>
                                        <li role="button" className=" dropdown-menu-item-button " data-ember-action data-ember-action-1375={1375}>
                                        {/**/}          Delete
                                        </li>
                                        </ul>
                                        <div className="dropdown-view dropdown-view--make-default">
                                        <p className="dropdown__headline">
                                        Update Default Card
                                        </p>
                                        <p>We will automatically charge your default card at the close of the current billing period.</p>
                                        <button className="Button Button--fullWidth Button--blue" data-ember-action data-ember-action-1376={1376}>
                                        Update
                                        </button>
                                        </div>
                                        <div className="dropdown-view dropdown-view--delete">
                                        <p className="dropdown__headline">Confirm Delete Card</p>
                                        <p className="small-dark u-textAlignLeft">Are you sure you want to remove your card?</p>
                                        <button tabIndex={-1} className="Button Button--fullWidth Button--red" data-ember-action data-ember-action-1377={1377}>Delete</button>
                                        </div>
                                        </div>
                                        </div>
                                        </div>        </div>
                                        </div>
                                        </td>
                                        </tr>
                                    </tbody>
                                </table>
                                </div>
                                </div>
                            </div>
                            <div role="tabpanel" className="Tabs-pane is-active">
                                <h3 className="u-mb-3">
                                    PayPal payment
                                </h3>
                                <p>To use PayPal as your payment method, you will need to make pre-payments each month before your bill is due.</p>
                                <div id="ember1380" className="paypal-form ember-view">
                                    <form method="post" action="https://www.paypal.com/cgi-bin/webscr" autoComplete="on" id="ember1385" className="ember-view">
                                        <div>
                                            <input type="hidden" name="currency_code" defaultValue="USD" />
                                            <input type="hidden" name="custom" defaultValue={4796652} />
                                            <input type="hidden" name="return" defaultValue="https://cloud.digitalocean.com/account/billing?i=c3d9b3&paypal=true&existingCredit=0" />
                                            <input type="hidden" name="cancel_return" defaultValue="https://cloud.digitalocean.com/account/billing?i=c3d9b3" />
                                            <input type="hidden" name="hosted_button_id" defaultValue="3RAT9TQDQ546C" />
                                            <input type="hidden" name="cmd" defaultValue="_s-xclick" />
                                            <input type="hidden" name="on0" defaultValue="Make a One-Time Payment" />
                                            <div className="row">
                                                <div className="small-6 columns">
                                                    <div className="select-wrapper FloatLabel">
                                                        <div className="Select">
                                                            <select name="os0" aria-label="Payment Amount" required="required" className="select">
                                                                <option value="Pay5">US $5.00</option>
                                                                <option value="Pay10">US $10.00</option>
                                                                <option value="Pay25">US $25.00</option>
                                                                <option value="Pay50">US $50.00</option>
                                                                <option value="Pay100">US $100.00</option>
                                                                <option value="Pay250">US $250.00</option>
                                                                <option value="Pay500">US $500.00</option>
                                                                <option value="Pay1000">US $1000.00</option>
                                                                <option value="PayCustom">Custom amount</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="small-6 columns">
                                                    <p className="non-custom-amount-copy">
                                                        This will get you one month with our $5 droplet.
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="custom-amount-value-copy" />
                                            <div className="row u-mt-3">
                                                <div className="small-12 columns buttons-col ">
                                                    <div>
                                                        <button type="submit" className="Button Button--blue Button--large Button--fullWidth " data-ember-action data-ember-action-1386={1386}>
                                                        {/**/}      <span className="Button--text">Continue to PayPal</span>
                                                        {/**/}  </button>
                                                        {/**/}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <p className="small u-textAlignCenter u-grey">
                                        *It may take a few minutes to process your payment with PayPal
                                    </p>
                                </div>
                            </div>
                            {/**/}  
                        </div>
                </section>
                </div>
                
               
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
        </>
    )
}

export default Plate
