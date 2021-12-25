import React,{ useCallback, useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import HtmltoReact from 'html-react-parser'
import { setDocument } from '../../../store/admission/applicantSlice';
import { setIsModal } from '../../../store/admission/stepSlice';
import PreviewModal from '../../../components/admission/PreviewModal';
import Session from '../Session';
import { helperData } from '../../../store/utils/helperData';
import { convertBase64, getDocument } from '../../../store/utils/admissionUtil';

const Document = () => {
   
  const { step,applicant } = useSelector(state => state)
  const dispatch = useDispatch();
  const required = ['institute_type','institute_name','fname','mstatus','dob','gender','citizen_country','resident_country','home_region','religion','present_occupation','work_place','bond_status','disabled','phone','email','pobox_address','resident_address'];
  const [ form, setForm ] = useState({});
  const [ docs, setDocs ] = useState([]);
  const [ source, setSource ] = useState(null );

  const onChange = async (e) => {
    if(e.target.files ){
       const f = e.target.files[0];
       console.log(f)
       if(f && f.type.match('application/pdf')){
         if(f.size <= 1300000){
          const base64 = await convertBase64(f);
          setForm({...form, base64 : base64, mime: f.type });
         }else{
          alert('PDF file must be less than 1.2 MB!')
         }
       }else{
         alert("Please upload PDF file only!"); return;
       }
    }else{
       setForm({...form,[e.target.name] : e.target.value });
    }
  }

  const onSubmit = (e) => {
      alert("Submitted");
  }

  const addRecord = (e) => {
     const cm = window.confirm(`Add Document?`)
     if(cm && form.program_id != '' && form.base64){
       console.log(docs)
       setDocs([...docs,form ])
       setForm({})
     }else{
       alert("Please Pick a PDF file! ")
     }
  }

  const delRecord = (id) => {
      const cm = window.confirm(`Remove Document ${id+1} ?`)
      if(cm){
        setDocs([...docs.filter((r,i) => i !== id)])
      }
  }

  const viewFileRecord = (id) => {
     const src = docs.find((r,i) => i == id);
     if(src){
       setSource(src.base64);
       dispatch(setIsModal(true))
       console.log(src.base64);
     }
  }

  const closeModal = () => {
     dispatch(setIsModal(false))
  }

  const isDirty = useCallback((tag,i) => {
    const vs = required.find(row => row === tag);
    const ms = docs[i][tag];
    if(vs){
        if(ms && ms !== ''){ return false;}
        else{ return true; }
    }   return false;
  },[docs])

  const getInfo = () =>{
     var msg;
     switch(parseInt(applicant.apply_type)){
       case 1:
        msg = `<b>** Academic Certificate obtained.</b>`; break;
       case 2:
         msg = `<b>** Transcript from education & Copy of HND/Degree obtained.</b>`; break;
       case 3:
         msg = `<b>** Birth Certificate & any Certificate obtained ( Not a requirement )</b>`; break;
       case 4:
         msg = `<b>** National ID Card & any Certificate obtained</b>`; break;
       case 5:
         msg = `<b>** Transcript from education & Copy of Degree obtained</b>`; break;
       default:
         msg = ``
     }
     return HtmltoReact(msg);
     
  }

  useEffect(() => {
    setDocs([...applicant.document])
  },[])

  useEffect(() => {
    dispatch(setDocument([...docs]))
  },[docs])


  useEffect(() => {
    console.log(docs);
    console.log(form);
  })

  // 
            
    return (
      <Session>
      <div className="row">
      {/* Supporting  Information */}
      <div className="small-12 columns" data-ref="education">
        <div className="u-textAlignCenter">
          <h2 className="u-mb-0 label-title">SUPPORTING DOCUMENTS<hr /></h2>
        </div>
        {/* Documents Information */}
        <div className="row">
          <div className="small-12 columns">
            <div className="bui u-mb-5">
              <div role="banner" className="balance-due-banner bui-Banner bui-Banner--danger">
                <div className="bui-Banner-content">
                  {/*<dl><dt><b>MANDATORY REQUIREMENTS</b></dt><dd><em>National ID Card, Academic Transcripts and Academic Certificates</em></dd></dl>*/}
                  {getInfo()}
                </div>
              </div>
            </div>
            <table className="domains--list">
              <thead>
                <tr>
                  <th id="ember2087" className="aurora-th name ember-view">
                    <span className="headerText">DOCUMENT</span>
                  </th>
                  <th id="ember2087" className="aurora-th name ember-view">
                    <span className="headerText">&nbsp;</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={3} style={{backgroundColor:'#fff8ef'}}>
                      <span className="small-6 columns">
                          <label className="u-ml-0 label-title">Select Document Type </label>
                          <select name="document_id" onChange={(e)=> onChange(e)} value={form.document_id} id="ember1134" className="aurora-select  Input--floatLabel FloatLabel-input  ember-text-field ember-view">
                            <option selected disabled>-- Select --</option>
                            { helperData.documents.map((hp,i) => 
                               <option key={i} value={hp.id}>{hp.title.toUpperCase()}</option>
                            )}
                          </select>
                      </span>
                      <span className="small-3 columns" style={{margin:'28px 0 -5px',top:'20px',padding:'5px 5px 3px', border:'none',boxShadow:'0 0 0 2px #f1f1f1',background:'white',borderRadius:'3px',overflow:'hidden',cursor:'pointer'}}>
                          <label className="u-ml-0 label-title" onClick={(e)=> document.querySelector('#docfile').click()}><span>SELECT PDF FILE</span>
                          <input type="file" onChange={onChange} name="file" value={form.file} id="docfile" style={{display:'none'}} />
                          </label>
                      </span>
                     
                      <span className="small-3 columns">
                         <br/><label className="u-ml-0 label-title">&nbsp; </label>
                         <span className="headerText">
                           <button className="Button Button--green" onClick={(e) => addRecord(e)} style={{height:'2em',lineHeight:'1.2em'}}><small><b>ADD DOCUMENT</b></small></button>
                         </span>
                      </span>
                  </td>
                </tr>
                { docs.map((row,i) =>
                <tr key={i}>
                  <td colSpan={2}><small id="ember2105" className="ellipsis-text ember-view">{i+1}.&nbsp; <b>{getDocument(row.document_id) && getDocument(row.document_id).toUpperCase()}</b></small></td>
                  <td className="flex-row">
                    {/*row.base64 ? <button onClick={(e) => viewFileRecord(i)} className="Button Button--green" title="View File"  style={{height:'2em',lineHeight:'1.2em'}}><span className="Icon--newWindow" /></button> : null */} &nbsp;
                    <button onClick={(e) => delRecord(i)} className="Button Button--red" title="Delete File" style={{height:'2em',lineHeight:'1.2em'}}><span className="Icon--close" /></button>
                  </td>
                </tr>
                )}
              </tbody>
            </table> 
            <PreviewModal source={source} closeModal={closeModal} />
          </div>
        </div>
      </div>
    </div>
    </Session>
    )
}

export default Document
