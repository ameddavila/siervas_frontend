import React, { useState, useEffect, useRef } from "react";
import clienteAxios from "../config/clienteAxios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";

const WidgetCamas = () => {
  const [camas, setCamas] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]);
  const toast = useRef(null);
  useEffect(() => {
    const listar = async () => {
      try {
        const res = await clienteAxios("/estadistica");
        setCamas(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    listar();
  },[]);

  const headerTemplate = (data) => {
    return (
      <React.Fragment>
        <img
          alt={data.gruSala}
          src="images/hospital1.png"
          width="20"
          style={{ verticalAlign: "middle" }}
          className="ml-3"
        />
        <span className="image-text font-medium pl-3">{data.gruSala}</span>
      </React.Fragment>
    );
  };

  const detalleBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
         <span className="image-text pl-3 font-bold text-lg">{rowData.cam_descripcion}</span>
      </React.Fragment>
    );
  };
  const numeroBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
         <span className="image-text pl-3 font-bold text-lg">CAMA Nº - {rowData.cam_enum}</span>
      </React.Fragment>
    );
  };
  const salaBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <img
          alt={rowData.sa_descripcion}
          src="images/cama.png"
          width="45"
        />
        <span className="image-text pl-3 font-bold text-lg">SALA - {rowData.sa_descripcion}</span>
      </React.Fragment>
    );
  };
  const statusBodyTemplate = (rowData) => {
    return (
      <>
      {rowData.cam_estado === 'DISPONIBLE'? (
      <div className="bg-green-300 p-3 border-1 border-50 border-round shadow-6">
              <span className="font-bold text-50 text-lg">
              {rowData.cam_estado}
              </span>
      </div>
      ):(
        <div className="bg-red-300 p-3 border-1 border-50 border-round shadow-6">
              <span className="font-bold text-50 text-lg">
              {rowData.cam_estado}
              </span> 
      </div>
      ) }
      
      </>

    );
  };

 
  const onRowGroupExpand = (event) => {
    toast.current.show({
      severity: "success",
      summary: "Desplegando Sala",
      detail: event.data.gruSala,
      life: 3000,
    });
  };
  const onRowGroupCollapse = (event) => {
    toast.current.show({
      severity: "error" ,
      summary: "Cerrando Sala",
      detail: event.data.gruSala,
      life: 3000,
    });
  };
  return (
    <div className="col-12">
      <Toast ref={toast}></Toast>
      <div className="card ">
        <h5>(PRUEBA PILOTO) DATOS AÑO 2019</h5>
        <p>Datos de Ejemplo (no reales)</p>
        <DataTable
          value={camas}
          resizableColumns 
          columnResizeMode="fit"
          rowGroupMode="subheader"
          groupRowsBy="gruSala"
          sortMode="single"
          sortField="gruSala"
          sortOrder={1}
          responsiveLayout="scroll"
          expandableRowGroups
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          onRowExpand={onRowGroupExpand}
          onRowCollapse={onRowGroupCollapse}
          rowGroupHeaderTemplate={headerTemplate}
        >
         
          <Column field="sa_descripcion" header="SALA" body={salaBodyTemplate}  style={{ width: '20%' }}></Column>
          <Column field="cam_enum" header="Nº CAMA"  style={{ width: '10%' }} body={numeroBodyTemplate}></Column>
          <Column field="cam_descripcion" header="DETALLE" style={{ width: '20%' }}body={detalleBodyTemplate}></Column>
          <Column field="cam_estado" header="ESTADO" body={statusBodyTemplate}  style={{ width: '0%' }}></Column>
        </DataTable>
      </div>
    </div>
  );
};
export default WidgetCamas;
