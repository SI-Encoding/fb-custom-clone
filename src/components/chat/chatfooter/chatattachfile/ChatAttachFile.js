import React from 'react'
import AddIcon from '@material-ui/icons/Add';

export default function ChatAttachFile(
    {
        fileUploadRef, 
        handleFile, 
        setPreviewFile,  
        setFile, 
        setFileName, 
        setFileType,
        adjustSelect
    }) {
  return (
    <>
      <label htmlFor="inputFile">
        <AddIcon className='addIcon'/>
      </label>
      <input type="file" id="inputFile" ref={fileUploadRef} style={{display:"none"}} onChange={(e) => {
        if (e.target.files[0]) {
          handleFile(e, setPreviewFile, function(){}, undefined, setFile, setFileName, setFileType)
          adjustSelect()
        }
      }}
       />
    </>    
  )
}
