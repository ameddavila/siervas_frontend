import React, { useRef,useEffect, useState } from "react";
import { Toast } from "primereact/toast";
const Alerta = ({ alerta }) => {
  
  console.log(alerta);
  const toastBR = useRef(null);
  

  const showError = () => {
    toastBR.current.show({severity:'error', summary: 'Error Message', detail:'Message Content', life: 3000});
}
   


  return (
    <div>
      <Toast ref={toastBR} position="bottom-right" />
    </div>
  );
};

export default Alerta;
