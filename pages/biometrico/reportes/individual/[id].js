import React, { useState, useEffect, useRef } from "react";
import { RadioButton } from "primereact/radiobutton";
import { Dropdown } from "primereact/dropdown";
import clienteAxios from "../../../../config/clienteAxios";
import { Calendar } from "primereact/calendar";
import { locale, addLocale } from "primereact/api";
import { Button } from "primereact/button";
import Router, { useRouter } from "next/router";
import { Toast } from "primereact/toast";
import WidgetReporteIndividual from "../../../../components/reporteIndividual";


export default function ReporteIndividual() {
  const [anio, setAnio] = useState([]);
  const [anioSelected, setAnioSelected] = useState([]);
  const [mesSelected, setMesSelected] = useState([]);
  const [fechaini, setFechaini] = useState(null);
  const [fechafinal, setFechafinal] = useState(null);
  const [enabled, setEnabled] = useState(true);
  const [mesenabled, setMesenabled] = useState(false);
  const [anioenabled, setAnioenabled] = useState(false);
  const [datosReporte, setDatosReporte] = useState(null);
  const toastBR = useRef(null);

  const route = useRouter();
  const { id } = route.query;

  const tiporeporte = [
    { name: "Por Año", key: 1 },
    { name: "Por Mes", key: 2 },
    { name: "Entre Fechas", key: 3 },
  ];
  const [selectedReporte, setSelectedReporte] = useState(tiporeporte[1]);
  addLocale("es", {
    firstDayOfWeek: 1,
    dayNames: [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ],
    monthNamesShort: [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ],
    today: "Hoy",
    clear: "Limpiar",
  });
  locale("es");
  useEffect(() => {
    const getAnios = async () => {
      const max = new Date().getFullYear();
      const min = 2014;
      const years = [];
      for (let i = max; i >= min; i--) {
        years.push({ name: i, code: i });
      }
      setAnio(years);
    };
    getAnios();
  }, []);

  const meses = [
    { name: "ENERO", code: 1 },
    { name: "FEBRERO", code: 2 },
    { name: "MARZO", code: 3 },
    { name: "ABRIL", code: 4 },
    { name: "MAYO", code: 5 },
    { name: "JUNIO", code: 6 },
    { name: "JULIO", code: 7 },
    { name: "AGOSTO", code: 8 },
    { name: "SEPTIEMBRE", code: 9 },
    { name: "OCTUBRE", code: 10 },
    { name: "NOVIEMBRE", code: 11 },
    { name: "DICIEMBRE", code: 12 },
  ];

  const onAnioChange = (e) => {
    setAnioSelected(e.value);
  };

  const onMesChange = (e) => {
    setMesSelected(e.value);
  };

  const selecionarTipo = (e) => {
    if (e.value.key === 1) {
      setEnabled(true);
      setMesenabled(true);
      setAnioenabled(false);
    }
    if (e.value.key === 2) {
      setEnabled(true);
      setMesenabled(false);
      setAnioenabled(false);
    }
    if (e.value.key === 3) {
      setEnabled(false);
      setMesenabled(true);
      setAnioenabled(true);
    }
    setSelectedReporte(e.value);
  };

  const obtenerTabla = async (e) => {
    const personal = {};
    if (selectedReporte.key === 1) {
      if (anioSelected.code === undefined) {
        toastBR.current.show({
          severity: "error",
          summary: "Mensaje de Error",
          detail: "Debe selecionar un año",
          life: 3000,
        });
        return;
      }
      personal = {
        codigo: id,
        anio: anioSelected.code,
        mes: null,
        fechaini: null,
        fechafin: null,
        tipo: selectedReporte.key,
      };
      console.log(personal);
    }
    if (selectedReporte.key === 2) {
      if (anioSelected.code === undefined) {
        toastBR.current.show({
          severity: "error",
          summary: "Mensaje de Error",
          detail: "Debe selecionar un año",
          life: 3000,
        });
        return;
      }
      if (mesSelected.code === undefined) {
        toastBR.current.show({
          severity: "error",
          summary: "Mensaje de Error",
          detail: "Debe selecionar un mes",
          life: 3000,
        });
        return;
      }
      personal = {
        codigo: id,
        anio: anioSelected.code,
        mes: mesSelected.code,
        fechaini: null,
        fechafin: null,
        tipo: selectedReporte.key,
      };
    }
    if (selectedReporte.key === 3) {
      if (fechafinal < fechaini) {
        toastBR.current.show({
          severity: "error",
          summary: "Mensaje de Error",
          detail: "Fecha Final no debe ser menor a Fecha Inicial",
          life: 3000,
        });
        return;
      } else {
        personal = {
          codigo: id,
          anio: null,
          mes: null,
          fechaini: fechaini,
          fechafin: fechafinal,
          tipo: selectedReporte.key,
        };
      }
    }
    try {
      const { data } = await clienteAxios.post(
        "/biometrico/reporte-individual",
        { personal }
      );
      if (data.length === 0) {
        toastBR.current.show({
          severity: "error",
          summary: "Mensaje de Error",
          detail: "No tiene Marcados con ese CRITERIO",
          life: 3000,
        });
        return;
      }
      setDatosReporte(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
      <Toast ref={toastBR} />
      <div className="card">
        <h5>Seleccione Tipo de Reporte</h5>
        <div className="card-container blue-container flex align-items-center justify-content-start">
          {tiporeporte.map((reporte) => {
            return (
              <div key={reporte.key} className="field-radiobutton mr-5">
                <label htmlFor={reporte.key} className="mr-2">
                  {reporte.name}
                </label>
                <RadioButton
                  inputId={reporte.key}
                  name="reporte"
                  value={reporte}
                  onChange={selecionarTipo}
                  checked={selectedReporte.key === reporte.key}
                />
              </div>
            );
          })}
        </div>
        <div className="p-fluid grid formgrid">
          <div className="field col-12 md:col-2">
            <Dropdown
              id="anio"
              value={anioSelected}
              options={anio}
              onChange={onAnioChange}
              optionLabel="name"
              placeholder="AÑO"
              disabled={anioenabled}
            />
          </div>
          <div className="field col-12 md:col-2">
            <Dropdown
              id="mes"
              value={mesSelected}
              options={meses}
              onChange={onMesChange}
              optionLabel="name"
              placeholder="MES"
              disabled={mesenabled}
            />
          </div>
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
        {datosReporte ? (
          <WidgetReporteIndividual
            props={datosReporte}
          ></WidgetReporteIndividual>
        ) : null}
      </div>
    </div>
  );
}
