import React, { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import clienteAxios from "../../config/clienteAxios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Router from "next/router";

export default function UsuariosSiaf() {
  const [usuarioSiaf, setUsuarioSiaf] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [cargando, setCargado] = useState(true);

  const [filters, setFilters] = useState({
    codigo: { value: null, matchMode: FilterMatchMode.EQUALS },
    usuario: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    identificacion: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
  });

  useEffect(() => {
    const listar = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setCargado(false);
          return;
        }
        const config = {
          headers: {
            "Content-Type": "aplication/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const data = await clienteAxios("/usuarios/usersiaf", config);
        setUsuarioSiaf(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    listar();
    initFilters();
  }, []);

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      codigo: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      identificacion: { value: null, matchMode: FilterMatchMode.CONTAINS },
      usuario: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    setGlobalFilterValue("");
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <h5 className="mx-0 my-1">Usuarios del Sistema SIAF-SICE</h5>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Buscar Personal"
          />
        </span>
      </div>
    );
  };
  const buttonsSelected = (rowData) => {
    return (
      <div className="flex align-items-center justify-content-center w-4rem h-4rem">
        <Button
          type="button"
          icon="pi pi-plus"
          //label="Agregar"
          className="p-button-rounded"
          onClick={() => selectUser(rowData)}
        />
      </div>
    );
  };

  const selectUser = (data) => {
    Router.push(`/usuarios/${data.codigo}`)
  };

  const header = renderHeader();
  return (
    <div className="datatable-doc-demo">
      <div className="card">
        <DataTable
          value={usuarioSiaf}
          paginator
          rows={20}
          dataKey="codigo"
          filters={filters}
          filterDisplay="menu"
          loading={loading}
          responsiveLayout="scroll"
          size="small"
          globalFilterFields={["codigo", "identificacion", "usuario"]}
          header={header}
          emptyMessage="No se encontro el Personal"
        >
          <Column
            field="codigo"
            header="Codigo"
            sortable
            style={{ minWidth: "14rem" }}
          />
          <Column
            field="identificacion"
            header="Identificacion"
            sortable
            style={{ minWidth: "14rem" }}
          />
          <Column
            field="usuario"
            header="Usuario"
            sortable
            style={{ minWidth: "14rem" }}
          />
          <Column
            field="acciones"
            header="Acciones"
            body={buttonsSelected.bind(usuarioSiaf)}
            frozen
            style={{ textAlign: "center", width: "10rem" }}
            alignFrozen="right"
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
