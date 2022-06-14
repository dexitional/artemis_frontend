import React, { useState,useEffect } from 'react'
import { Button,Col,Row,Pagination } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { updateModal } from '../../store/admission/ssoSlice'
import PaperTable from './PaperTable'

const Pager = ({ count,page,keyword,onPageChange,onPageClick,onSearchChange,onSubmitSearch,isLoading }) => {
  
  return (
    <div className="list row">
      <div className="col-md-6">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Search data ... " value={keyword} onChange={onSearchChange} onBlur={onSubmitSearch} />
            <div className="input-group-append"><button className="btn btn-primary" type="button" onClick={onSubmitSearch}><b>SEARCH</b></button></div>
          </div>
      </div>
      <div className="col-md-6">
          <div className="row">
              <div className="btn btn-group btn-dark col-4">
                <button className="btn btn-xs text-dark mr-1" disabled={ page <= 1 || isLoading } onClick={(e) => onPageClick( e,parseInt(Math.max(0,page-1)) )} style={{minWidth:'auto'}}><b>PREV</b></button>
                <button className="btn btn-xs btn-warning text-dark" disabled={ page >= count || isLoading  } onClick={(e) => onPageClick( e,parseInt(Math.min(count,page+1)) )} style={{minWidth:'auto'}}><b>NEXT</b></button>
              </div>
              <div className="col-6">
                <div className="btn-dark offset-1 rounded d-flex justify-content-start align-items-center" style={{width:'270px'}}>
                  <b style={{fontSize:'18px'}}>&nbsp;<em>&nbsp;&nbsp;Page</em></b>
                  {/**/}<input type="number" min={1} max={count} className="form-control" name="page" onChange={onPageChange} value={page} style={{width:'85px',height:'25px',padding:'13px',margin:'10px 5px 10px 15px',top:'48%',border:'2px solid #f1ad79'}}/>
                  <b style={{fontSize:'18px'}}> <em>of&nbsp;&nbsp;Page&nbsp;{count}</em></b>
                </div> 
              </div>
          </div>
      </div>
      <div className="col-12"><hr/></div>
    </div>

   
  )
}

export default Pager
