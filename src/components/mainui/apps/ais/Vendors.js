import React,{ useState,useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { deleteVendor, fetchVendors, postVendor } from '../../../../store/utils/ssoApi';
import { useSelector,useDispatch } from 'react-redux';
import moment from 'moment';
import { setVendors } from '../../../../store/admission/ssoSlice';
import { Button,Modal,TabContainer,Tabs,Tab,Col,Row,Nav } from 'react-bootstrap';


const Vendors = ({view,data,recid}) => {
   const title = () => {
     switch(view){
       case 'list': return 'AUCC VENDORS';
       case 'add': return 'ADD VENDOR';
       case 'edit': return 'EDIT VENDOR';
     }
   }
   const content = () => {
     switch(view){
        case 'list': return <List/>;
        case 'add': return <Form recid={recid}/>;
        case 'edit': return <Form recid={recid}/>;
     } 
   }
   return (
    <div className="content-area card">
	   <h3 className="sub-head bg-blueblack"> 
           { title() }
           { view == 'list' ?
            <div className="d-inline-block print-btn">
                <Link to="/app/ams?mod=vendors&view=add" className="btn btn-light-alt btn-sm btn-icon"><em className="fa fa-sm fa-plus"></em>&nbsp;&nbsp;<b>ADD VENDOR</b></Link>
            </div> : null
           }
	   </h3>
        {content()}
	</div>
   )
}


const List = () => {
   const [ vens, setVens ] = useState([])
   const { sso } = useSelector(state => state)
   const dispatch = useDispatch();
   const fetchVendorData = async () => {
      const res = await fetchVendors();
      if(res.success) setVens([...res.data]);
   }
   const restoreVendorData = () => {
      setVens([...sso.vendors]);
   }
   const deleteRecord = async (e,id) => {
      e.preventDefault()
      const cm = window.confirm('Delete record ?')
      if(cm) {
        const resp = await deleteVendor(id)
        if(resp.success){
           const ss = vens.filter(s => s.vendor_id != id)
           console.log(ss)
           setVens([...ss ])
           console.log(ss)
        }else{
           alert('ACTION FAILED!')
        }
      }
   }
  
   useEffect(() => {
     restoreVendorData()
     fetchVendorData()
   },[])

   useEffect(() => {
     dispatch(setVendors([...vens]));
   },[vens])

   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   
   return (
    <div className="card-innr">
    <div className="dataTables_wrapper dt-bootstrap4 no-footer">
        <div className="table-wrap">
            <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                <div className="table-wrap">
                    <table className="data-table dt-filter-init admin-tnx dataTable no-footer" id="DataTables_Table_0">
                        <thead>
                            <tr className="data-item data-head" role="row">
                                <th className="data-col" rowspan="1" colspan="1">ID </th>
                                <th className="data-col w-25" rowspan="1" colspan="1">VENDOR NAME</th>
                                <th className="data-col" rowspan="1" colspan="1">ADDRESS</th>
                                <th className="data-col" rowspan="1" colspan="1">PHONE</th>
                                <th className="data-col w-25" rowspan="1" colspan="1">CONTACT PERSON</th>
                                <th className="data-col" rowspan="1" colspan="1">STATUS</th>
                                <th className="data-col" rowspan="1" colspan="1">&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                          { vens.map((row) => 
                          <tr className="data-item odd" role="row">
                            <td className="data-col"><span className="lead tnx-id"># {row.vendor_id}</span></td>
                            <td className="data-col"><span className={`lead token-amount ${row.verified == 1 && row.status == 1 ? 'text-info':'text-danger'}`}>{row.vendor_name && row.vendor_name.toUpperCase()}</span></td>
                            <td className="data-col"><span className="lead amount-pay">{row.vendor_address && row.vendor_address.toUpperCase()}</span></td>
                            <td className="data-col"><span className="lead user-info">{row.vendor_phone}</span></td>
                            <td className="data-col">
                                <span className="lead user-info">{row.tech_name && row.tech_name.toUpperCase()}</span>
                                <span className="lead user-info">{row.tech_phone}</span>
                            </td>
                            <td className="data-col d-flex">
                                <Link className={`badge badge-sm badge-success text-white`} to={`/app/ams?mod=vendors&view=edit&recid=${row.vendor_id}`}><b><em className="ti ti-pencil"></em></b></Link>
                                <Link className={`badge badge-sm badge-danger text-white`} onClick={ e => deleteRecord(e,row.vendor_id)}><b><em className="ti ti-trash"></em></b></Link>
                            </td>   
                            <td className="data-col">
                                {/*
                                <div className="relative d-inline-block">
                                    <a href="#" className="btn btn-light-alt btn-xs btn-icon toggle-tigger"><em className="ti ti-more-alt"></em></a>
                                    <div className="toggle-className dropdown-content dropdown-content-top-left">
                                        <ul className="dropdown-list">
                                            <li><a href="#"><em className="ti ti-eye"></em> View Leave form</a></li>
                                            <li><a href="#"><em className="ti ti-check-box"></em> Edit Leave Form</a></li>
                                            <li><a href="#"><em className="ti ti-na"></em> Cancel Leave</a></li>
                                            <li><a href="#"><em className="ti ti-trash"></em> Delete Leave</a></li>
                                        </ul>
                                    </div>
                                </div>
                                */}
                            </td>
                          </tr>
                          )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

   
   {/*

      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
  <Row>
    <Col sm={3}>
      <Nav variant="pills" className="flex-column">
        <Nav.Item>
          <Nav.Link eventKey="first">Tab 1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="second">Tab 2</Nav.Link>
        </Nav.Item>
      </Nav>
    </Col>
    <Col sm={9}>
      <Tab.Content>
        <Tab.Pane eventKey="first">
          <div>Kobby1</div>
        </Tab.Pane>
        <Tab.Pane eventKey="second">
          <div>Kobby2</div>
        </Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>
   */}

    </div>
   )
}

const Form = ({recid}) => {
    
    const [ form,setForm ] = useState({});
    const [ loading,setLoading ] = useState(false);
    const history = useHistory();
    const { sso } = useSelector(state => state)
    const { register, handleSubmit,setValue, getValues, formState : { errors } } = useForm();
    
    const onSubmit = async data => {
      data.vendor_id = parseInt(recid) || 0;
      console.log(data);
      const res = await postVendor(data);
      if(res.success){
         // Do something if passed
         history.push('/app/ams?mod=vendors&view=list')
      } else{
         // Show error messages
         alert("ACTION FAILED!")
      }
    }

    const formData = () => {
        const dt = sso.vendors.find( r => r.vendor_id == recid )
        if(dt){
          const dk = Object.keys(dt);
          dk.forEach( d => {
              if(d == 'verified_at') return setValue(d,moment(dt[d]).format('YYYY-MM-DD'))
              return setValue(d,dt[d])
          })
        } 
    }

    const cancelForm = (e) => {
       e.preventDefault();
       const cm = window.confirm('Cancel Form ?')
       if(cm) history.push('/app/ams?mod=vendors&view=list')
    }
  
    useEffect(()=>{
      formData();
    },[])


    return (
		<div className="card-innr">
            	<form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        { (errors.title || errors.apply_start || errors.apply_end )  &&
                        <div className="col-md-12">
                            <div className="alert alert-danger text-danger font-weight-bolder">
                               { errors.title && <small><b>**  {errors.title.message.toUpperCase()}<br/></b></small>}
                               { errors.apply_start && <small><b>**  {errors.apply_start.message.toUpperCase()}<br/></b></small>}
                               { errors.apply_end && <small><b>**  {errors.apply_end.message.toUpperCase()}</b></small>}
                            </div>
                        </div>
                        }
                        
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="vendor_name" className="input-item-label">VENDOR NAME</label>
                                <input {...register("vendor_name", { required: 'Please enter vension title !' })} className="input-bordered" type="text"/></div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="vendor_email" className="input-item-label">VENDOR EMAIL</label>
                                <input {...register("vendor_email", { required: 'Please enter vension title !' })} className="input-bordered" type="text"/></div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="vendor_phone" className="input-item-label">VENDOR PHONE</label>
                                <input {...register("vendor_phone", { required: 'Please enter vension title !' })} className="input-bordered" type="text"/></div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="vendor_address" className="input-item-label">VENDOR ADDRESS</label>
                                <input {...register("vendor_address", { required: 'Please enter vension title !' })} className="input-bordered" type="text"/></div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="tech_name" className="input-item-label">TECH NAME</label>
                                <input {...register("tech_name", { required: 'Please enter vension title !' })} className="input-bordered" type="text"/></div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="tech_phone" className="input-item-label">TECH PHONE</label>
                                <input {...register("tech_phone", { required: 'Please enter vension title !' })} className="input-bordered" type="text"/></div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="tech_email" className="input-item-label">TECH EMAIL</label>
                                <input {...register("tech_email", { required: 'Please enter vension title !' })} className="input-bordered" type="text"/></div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="status" className="input-item-label">STATUS</label>
                                <select {...register("status", { required: 'Please provide status !' })} className="input-bordered">
                                   <option value={0}>Disabled</option>
                                   <option value={1}>Enabled</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="verified" className="input-item-label">VERIFIED</label>
                                <select {...register("verified", { required: 'Please provide status !' })} className="input-bordered">
                                   <option value={0}>No</option>
                                   <option value={1}>Yes</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-item input-with-label">
                                <label htmlFor="verified_at" className="input-item-label">VERIFICATION DATE</label>
                                <input {...register("verified_at", { required: 'Please provide application open date !' })} className="input-bordered" type="date"/></div>
                        </div>

                       
                    </div>

                    <div className="gaps-1x"></div>

                    <div className="d-sm-flex justify-content-between align-items-center">
                        <span>
                        <button className="btn btn-dark" type="submit">
                            <i className="fa fa-save "></i>&nbsp;&nbsp;<b>SAVE DATA</b>
                        </button>&nbsp;&nbsp;
                        <Link to="#" onClick={cancelForm} className="btn btn-white text-dark">
                            <i className="fa fa-times"></i>&nbsp;&nbsp;<b>CANCEL</b>
                        </Link>
                        </span>
                    </div>

                </form>
					
		</div>
      )
}


export default Vendors
