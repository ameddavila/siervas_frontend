import React, { useState, useEffect } from "react";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { InputText } from "primereact/inputtext";
import getConfig from "next/config";
import clienteAxios from "../config/clienteAxios";
import Moment from "react-moment";
import "moment-timezone";

const WidgetFichas = () => {
  const [dataViewValue, setDataViewValue] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filteredValue, setFilteredValue] = useState(null);
  const [layout, setLayout] = useState("grid");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const contextPath = getConfig().publicRuntimeConfig.contextPath;
  var today = new Date();

  const sortOptions = [
    { label: "Price High to Low", value: "!price" },
    { label: "Price Low to High", value: "price" },
  ];

  useEffect(() => {
    const listar = async () => {
      try {
        const res = await clienteAxios("/fichas");
        setDataViewValue(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    listar();
    setGlobalFilterValue("");
  }, []);

  const onFilter = (e) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
    if (value.length === 0) {
      setFilteredValue(null);
    } else {
      const filtered = dataViewValue.filter((product) => {
        return product.medico.toLowerCase().includes(value);
      });
      setFilteredValue(filtered);
    }
  };

  const dataViewHeader = (
    <div className="">
      <span className="p-input-icon-right">
        <i className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onFilter}
          placeholder="Buscar por Médico"
        />
      </span>
    </div>
  );

  const dataviewListItem = (data) => {
    return (
      <div className="col-12 surface-0 shadow-6 mb-3 border-1 border-50 border-round">
        <div className="flex flex-column md:flex-row align-items-center p-3 w-full">
          <div className="flex-1 flex flex-column align-items-center text-center md:text-left">
            <img
              src="images/medico.png"
              alt={data.medico}
              className="product-image"
              width="50"
              height="50"
            />
            <div className="font-bold text-2xl text-center">{data.medico}</div>
            <div className="mb-2">{data.servicio}</div>
            <div className="flex align-items-center">
              <span className="font-semibold">N.º FICHAS</span>
            </div>
            <div className="flex align-items-center">
              <span
                className={`${
                  data.disponibles === 0
                    ? "text-6xl font-semibold align-self-center md:align-self-end text-red-500"
                    : "text-6xl font-semibold align-self-center md:align-self-end text-green-600"
                }`}
              >
                {data.disponibles}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (data, layout) => {
    if (!data) {
      return;
    }
    return dataviewListItem(data);
  };

  return (
    <div className="grid list-demo">
      <div className="col-12">
        <div className="card">
          <div className="text-center">
            <span className="text-900 text-ml font-bold">
              {" "}
              FICHAS DISPONIBLES PARA HOY:{" "}
            </span>
            <span className="text-4xl font-bold text-red-500">
              {// <Moment format="DD/MM/YYYY">{today}</Moment>
              }
             
            </span>
          </div>
          <DataView
            value={filteredValue || dataViewValue}
            layout={layout}
            paginator
            emptyMessage="MEDICO NO ENCONTRADO"
            alwaysShowPaginator={false}
            rows={1}
            itemTemplate={itemTemplate}
            header={dataViewHeader}
          ></DataView>
        </div>
      </div>
    </div>
  );
};

export default WidgetFichas;
