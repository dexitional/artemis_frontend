import React, { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { updateDatabox } from '../../store/admission/ssoSlice'
import { fetchStreamData } from '../../store/utils/ssoApi'

const PagerStream = ({ count,page,keyword,onPageChange,onPageClick,onSearchChange,onSubmitSearch,isLoading,sel,onSelectChange }) => {
  const [ streams, setStreams ] = useState([])
  const { sso } = useSelector(state => state)
  const dispatch = useDispatch();
  
  const restoreStream = () => {
    sso.databox.streams && setStreams([...sso.databox.streams]);
  }

  const fetchStream = async () => {
    const res = await fetchStreamData();
    console.log(res)
    if(res.success){
      setStreams([...res.data]);// Page Data
    }
  }

  useEffect(() => {
    restoreStream()
    fetchStream()
  },[])

  useEffect(() => {
    dispatch(updateDatabox({streams}));
  },[streams])

   
  return (
    <div className="list row">
      <div className="col-md-3">
          <div className="input-group mb-3">
            <select className="form-control" name="stream" value={sel} onChange={onSelectChange} style={{ padding: '7px 5px 10px 12px', border:'3px solid #b76117', fontWeight:'bolder',color:'#b76117' }}>
                { streams.map(row => <option selected={row.tag == 'MAIN'} value={row.id}>{row.tag == 'MAIN' ? 'MAIN/SEPTEMBER STREAM':'JANUARY STREAM'}</option>)}
            </select>
          </div>
      </div>
      <div className="col-md-3">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Search data ... " name="search" value={keyword} onChange={onSearchChange} onKeyUp={onSubmitSearch} />
            <div className="input-group-append"><button className="btn-primary" style={{width:'80px',overflow:'hidden',border:'none',color:'rgb(241 173 121)',borderRadius:'0 3px 3px 0', fontSize:'14px'}} type="button" onClick={onSubmitSearch}><b>SEARCH</b></button></div>
          </div>
      </div>
      <div className="col-md-6">
          <div className="row">
              <div className="col-4 btn btn-group btn-dark ">
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

export default PagerStream
