import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import useAuth from "../hooks/useAuth";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const WidgetReporteIndividual = ({ datosReporte, funcionario }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [fun, setFun] = useState([]);
  const { auth } = useAuth();
  const dt = useRef(null);
  const cols = [
    { field: "BADGE", header: "COD-BIO" },
    { field: "CI", header: "DOCUMENTO" },
    { field: "FECHA", header: "FECHA" },
    { field: "HORA", header: "HORA" },
    { field: "DIA", header: "DIA" },
    { field: "PUERTA", header: "PUERTA" },
  ];

  useEffect(() => {
    setFun(datosReporte[0]);
  }, []);

  let { NOMBRE, CI } = fun;

  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("default", { month: "long" });
  };

  const getTabla = (datos) => {
    const arr = [];
    arr.push([
      "CODIGO",
      "APELLIDO,NOMBRE",
      "DOCUMENTO",
      "2",
      "FECHA",
      "HORA",
      "DIA",
      "DIA",
    ]);
    Object.values(datos).forEach((value) => {
      //console.log(Object.values(value));
      arr.push(Object.values(value));
    });
    let sliced = arr.map((arr) => [arr[0], arr[2], arr[4], arr[5], arr[6]]);
    return sliced;
  };

  const exportPdfIndividual = () => {
    const subtitulo = "";
    if (funcionario.tipo === 1) {
      subtitulo = `AÑO: ${funcionario.anio}`;
    }
    if (funcionario.tipo === 2) {
      subtitulo = `${getMonthName(funcionario.mes).toUpperCase()} - ${
        funcionario.anio
      }`;
    }
    if (funcionario.tipo === 3) {
      subtitulo = `"${new Date(
        funcionario.fechaini
      ).toLocaleDateString()}" AL "${new Date(
        funcionario.fechafin
      ).toLocaleDateString()}"`;
    }
    const docDefinition = {
      footer: function(currentPage, pageCount) {
        return {
          // Usar la función addPageNumber() para agregar el número de página en el pie de página
          columns: [
            { text: 'Página '+currentPage.toString() + ' de ' + pageCount, alignment: 'center', fontSize: 9,}
            
          ]
        }
      },
      content: [
        {
          // Agregar una imagen en la posición (100, 100)
          image: "data:image/jpeg;base64,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",
          absolutePosition: {
            x: 40,
            y: 40
          },
          fit: [50, 50]
        },
        {
          alignment: "center",
          text: `REPORTE BIOMETRICO \n HOSPITAL SANTA BÁRBARA \n ${subtitulo}`,
          style: "header",
          fontSize: 15,
          bold: true,
          margin: [0, 0],
        },
        {
          style: "tableExample",
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return rowIndex === 0 ? "#ecf3fe" : null;
            },
          },
          table: {
            widths: ["25%", "20%", "15%", "40%"],
            heights: [10, 10, 10, 10, 30, 10, 25],
            headerRows: 1,
            body: [
              [
                {
                  text: `FUNCIONARIO: ${NOMBRE}`,
                  colSpan: 3,
                  bold: true,
                  fontSize: 9,
                },
                {},
                {},
                {colspan: 2,
                  text: `Imp.: ${new Date().toLocaleDateString()}-${new Date().toLocaleTimeString()} Por: ${
                    auth.loginUsuario
                  }`,
                  fontSize: 9,},
                ],
            ],
          },
        },
        {
          style: "tableExample",
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return rowIndex === 0 ? "#9fc4f9" : null;
            },
          },
          margin: [0, 5, 0, 0],
          table: {
            layout: "headerLineOnly",
            dontBreakRows: true,
            headerRows: 1,
            widths: [50, 100, "*", "*", 100],
            body: getTabla(datosReporte),
          },
          fontSize: 9,
        },
      ],
    };
    var win = window.open("", "_blank");
    pdfMake.createPdf(docDefinition).open({}, win);
  };

  const onSelectionChange = (e) => {
    setSelectedProducts(e.value);
  };
  const diatemplate = (rowData) => {
    return (
      <span
        className={
          rowData.DIA === "Domingo" || rowData.DIA === "Sábado"
            ? "border-red-100 bg-red-100 border-1 border-round font-bold m-1 flex"
            : ""
        }
      >
        {rowData.DIA}
      </span>
    );
  };
  const header = (
    <div className="flex align-items-center export-buttons">
      <Button
        type="button"
        icon="pi pi-file-pdf"
        onClick={exportPdfIndividual}
        className="p-button-warning mr-2"
        data-pr-tooltip="PDF"
      />
      <div className="card">
        <span> FUNCIONARIO:</span>
        <br />
        <span> {NOMBRE}</span>
      </div>
    </div>
  );

  return (
    <div>
      <h5>Exportar</h5>
      <Tooltip target=".export-buttons>button" position="bottom" />
      <DataTable
        ref={dt}
        value={datosReporte}
        header={header}
        dataKey="FECHA"
        responsiveLayout="scroll"
        paginator
        rows={20}
        selectionMode="multiple"
        selection={selectedProducts}
        onSelectionChange={onSelectionChange}
      >
        {cols.map((col, index) =>
          col.field === "DIA" ? (
            <Column
              key={index}
              field={col.field}
              header={col.header}
              sortable
              body={diatemplate}
            />
          ) : (
            <Column
              key={index}
              field={col.field}
              header={col.header}
              sortable
            />
          )
        )}
      </DataTable>
    </div>
  );
};
export default WidgetReporteIndividual;
