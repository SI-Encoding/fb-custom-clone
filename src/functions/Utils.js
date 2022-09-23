
export default function detectOutside(e, popUp, popupRef, setPopup, setImageUrl, setFileName, setImagePreview, setFileType) {            
    if (popUp && popupRef.current && !popupRef.current.contains(e.target)) {            
      setPopup(false);            
      setImageUrl(null);        
      setFileName(null);
      setImagePreview(null);    
      setFileType(null);        
    }        
}        
