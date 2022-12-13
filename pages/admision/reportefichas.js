import React, { useState, useEffect, useRef } from "react";
import { RadioButton } from "primereact/radiobutton";
import { Dropdown } from "primereact/dropdown";
import clienteAxios from "../../config/clienteAxios";
import { Calendar } from "primereact/calendar";
import { locale, addLocale } from "primereact/api";
import { Button } from "primereact/button";
import Router, { useRouter } from "next/router";
import { Toast } from "primereact/toast";
import WidgetReporteIndividual from "../../components/reporteIndividual";

export default function ReporteFichas() {
    const [fechaini, setFechaini] = useState(null);
    const [fechafinal, setFechafinal] = useState(null);
    const [enabled, setEnabled] = useState(false);
    const [seleccion, setSeleccion] = useState({});
    const toastBR = useRef(null);
  
    const route = useRouter();
    const { id } = route.query;
     
    useEffect(() => {
      
    }, []);
  
 
     
    const obtenerTabla = async (e) => {
       
        if (fechafinal < fechaini) {
            toastBR.current.show({
              severity: "error",
              summary: "Mensaje de Error",
              detail: "Fecha Final no debe ser menor a Fecha Inicial",
              life: 4000,
            });
            return;
        }
        else{
            setSeleccion({fechaini,fechafinal})
        }
        try {
            
        } catch (error) {
          console.log(error)  
        }
    };
  
    return (
      <div className="card">
        <Toast ref={toastBR} />
        <div className="card">
          <h5>REPORTE DE FICHAS DISPENSADAS</h5>
          <h5>Seleccione: [FECHA INICIAL], [FECHA FINAL] </h5>
         
          <div className="p-fluid grid formgrid">
            
            <div className="field col-12 md:col-2">
              <Calendar
                id="fechaini"
                value={fechaini}
                onChange={(e) => setFechaini(e.value)}
                placeholder="FECHA INICIAL"
                disabled={enabled}
                dateFormat="dd/mm/yy"
              />
            </div>
            <div className="field col-12 md:col-2">
              <Calendar
                id="fechafin"
                value={fechafinal}
                onChange={(e) => setFechafinal(e.value)}
                placeholder="FECHA FINAL"
                disabled={enabled}
                dateFormat="dd/mm/yy"
              />
            </div>
            <div className="field col-12 md:col-2">
              <Button
                label="Generar"
                aria-label="Generar"
                onClick={(e) => {
                  obtenerTabla(e);
                }}
              />
            </div>
          </div>
        </div>
        <div className="card">
          {/* {datosReporte ? (
            <WidgetReporteIndividual  datosReporte={datosReporte} funcionario={funcionario}/>
          ) : null} */}
        </div>
      </div>
    );
  }