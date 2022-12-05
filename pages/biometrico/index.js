import React, { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import clienteAxios from "../../config/clienteAxios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Router from "next/router";
import Link from "next/link";

export default function UsuariosSiaf() {
  const [personalBio, setPersonalBio] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [cargando, setCargado] = useState(true);

  const [filters, setFilters] = useState({
    ndoc: { value: null, matchMode: FilterMatchMode.EQUALS },
    nombre: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    cargo: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
  });

  useEffect(() => {
    const listar = async () => {
      try {
        const {data} = await clienteAxios("/biometrico");
        setPersonalBio(data);
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
      ndoc: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      nombre: { value: null, matchMode: FilterMatchMode.CONTAINS },
      cargo: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    setGlobalFilterValue("");
  };

  const onGlobalFilterChange = (e) => {
    //console.log(e.target.value)
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <h5 className="mx-0 my-1">Personal del Biometrico</h5>
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
      <span className="p-buttonset">
        <Button label="Agregar" icon="pi pi-check" />
        <Button label="Quitar" icon="pi pi-trash" />
      </span>
    );
  };

  const selectReport = (data) => {
    Router.push('/reportes');
  };

  const header = renderHeader();
  return (
    <div className="datatable-doc-demo">
      <div className="card">
        <DataTable
          value={personalBio}
          paginator
          rows={20}
          dataKey="ndoc"
          filters={filters}
          filterDisplay="menu"
          loading={loading}
          size="small"
          showGridlines
          responsiveLayout="stack"
          breakpoint="960px"
          globalFilterFields={["ndoc", "nombre", "cargo"]}
          header={header}
          emptyMessage="No se encontro el Personal"
        >
          <Column
            field="ndoc"
            header="Nº Documento"
            sortable
            style={{ width: "10%" }}
          />
          <Column
            field="nombre"
            header="Apellidos, Nombre"
            sortable
            style={{ width: "20%" }}
          />
          <Column
            field="cargo"
            header="Cargo"
            sortable
            style={{ width: "20%" }}
          />
          <Column
            field="nmarcado"
            header="NºMarcado"
            sortable
            style={{ width: "5%" }}
          />
          <Column
            body={buttonsSelected.bind(personalBio)}
            // style={{ textAlign: "center", width: "10rem" }}
            style={{ width: "25%" }}
            alignFrozen="right"
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
