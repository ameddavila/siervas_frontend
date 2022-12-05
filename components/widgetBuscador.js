import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import clienteAxios from "../config/clienteAxios";
import axios from "axios";

const WidgetBuscador = () => {
  const [cortoPlazo, setCortoPlazo] = useState(null); //RESULTADOS DE LA BUSQUEDA
  const [key, setKey] = useState("");
  const [key1, setKey1] = useState("");
  const [key2, setKey2] = useState("");
  const [key3, setKey3] = useState("");
  const [permitir, setPermitir] = useState(false);
  const [filters, setFilters] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    //listarCortoPlazo();
    const search = async () => {
      try {
        /* if (key3.length > 0) {
         // setPermitir(true)
          const res = await clienteAxios('/cortoplazo/buscar', { params: { key3: key3, s1: 1 } });
          setCortoPlazo(res.data);
        } else {*/
        // setPermitir(false)
        const res = await clienteAxios("/cortoplazo/buscar", {
          params: { key: key, key1: key1, key2: key2, key3: key3, s1: 2 },
        });
        setCortoPlazo(res.data);
        // }
      } catch (error) {
        console.log(error);
      }
    };

    search();
  }, [key, key1, key2, key3]);

  const handleClick = (e) => {
    if (e == "input1") {
      setKey(""), setKey3("");
    }
    if (e == "input2") {
      setKey1(""), setKey3("");
    }
    if (e == "input3") {
      setKey2(""), setKey3("");
    }
    if (e == "input4") {
      setKey3("");
    }
  };

  const listarCortoPlazo = async () => {
    try {
      const { data } = await clienteAxios("/cortoplazo");
      setCortoPlazo(data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const renderHeader = () => {
    return (
      <div className="card">
         <div className="flex justify-content-center flex-wrap card-container indigo-container">
          <span className="p-input-icon-left pr-1">
            <i className="pi pi-search" />
            <InputText
              id="input1"
              value={key} //{globalFilterValue}
              onChange={(e) => setKey(e.target.value)}
              onClick={(e) => handleClick(e.target.id)}
              className="p-inputtext-sm block mb-2"
              size="100%"
              placeholder="APELLIDO PATERNO"
              disabled={permitir}
            />
          </span>
          <span className="p-input-icon-left pr-1">
            <i className="pi pi-search" />
            <InputText
              id="input2"
              value={key1} //{globalFilterValue}
              onChange={(e) => setKey1(e.target.value)}
              onClick={(e) => handleClick(e.target.id)}
              className="p-inputtext-sm block mb-2"
              size="100%"
              placeholder="APELLIDO MATERNO"
              disabled={permitir}
            />
          </span>
          <span className="p-input-icon-left pr-1">
            <i className="pi pi-search" />
            <InputText
              id="input3"
              value={key2} //{globalFilterValue}
              onChange={(e) => setKey2(e.target.value)}
              onClick={(e) => handleClick(e.target.id)}
              className="p-inputtext-sm block mb-2"
              size="100%"
              placeholder="NOMBRES"
              disabled={permitir}
            />
          </span>
          <span className="p-input-icon-left pr-1">
            <i className="pi pi-search" />
            <InputText
              id="input4"
              value={key3} //{globalFilterValue}
              onChange={(e) => setKey3(e.target.value)}
              onClick={(e) => handleClick(e.target.id)}
              className="p-inputtext-sm block mb-2"
              size="100%"
              placeholder="CARNET DE IDENTIDAD"
            />
          </span>
        </div>
        </div>
    );
  };

  const header = renderHeader();
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <h5>
            SEGURIDAD SOCIAL A CORTO PLAZO (SSCP) INFORMACIÓN DE LOS ASEGURADOS,
            PERTENECIENTES A LOS ENTES GESTORES (BASE DE DATOS PRUEBA NO
            ACTUALIZADO)
          </h5>
          <DataTable
            value={cortoPlazo}
            paginator
            className="p-datatable-customers bg-blue-500"
            rows={20}
            dataKey="id"
            filters={filters}
            filterDisplay="menu"
            size="small"
            globalFilterFields={["nomb_completo", "ci"]}
            header={header}
            emptyMessage="PERSONA NO ENCONTRADA "
            columnResizeMode="fit"
            stripedRows
            showGridlines
            responsiveLayout="scroll"
          >
            <Column
              field="nomb_completo"
              header="APELLIDOS, NOMBRES"
              style={{ width: "25%" }}
            ></Column>
            <Column field="ci" header="CI" style={{ width: "10%" }}></Column>
            <Column
              field="seguro"
              header="SEGURO"
              style={{ width: "10%" }}
            ></Column>
            <Column
              field="ciudad"
              header="CIUDAD"
              style={{ width: "20%" }}
            ></Column>
            <Column
              field="fecha_nacimiento"
              header="FECHA NACIMIENTO"
              style={{ width: "10%" }}
            ></Column>
            <Column
              field="matricula"
              header="MATRICULA"
              style={{ width: "15%" }}
            ></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default WidgetBuscador;
