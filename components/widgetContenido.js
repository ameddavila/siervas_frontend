import React from "react";
import { Card } from "primereact/card";
const WidgetContenido = () => {
  const footer = (
    <img
      alt="Card"
      src="images/usercard.png"
      onError={(e) =>
        (e.target.src =
          "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
      }
    />
  );

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <Card
            title="ASEGURADOS A CORTO PLAZO"
            subTitle="Administrador de Sistemas"
            style={{ width: "100%" }}
          >
            <p className="m-0" style={{ lineHeight: "1.5" }}>
              Debido a la no actualización de la{" "}
              <span className="font-bold mr-3 text-blue-500 w-2">
                BASE DE DATOS
              </span>
              de asegurados a corto plazo, se retiró el módulo correspondiente.
              <span className="font-bold mr-3 text-blue-500 w-2">Se recomienda usar el buscador de la página oficial en el siguiente enlace:</span>
              <br></br>
              <a
                href="https://seguros.minsalud.gob.bo/Asegurados%20SSCP/frmAsegurados.php"
                target="_blank"
              >
                Página Oficial de Asegurados
              </a>
            </p>
          </Card>
        </div>
        <div className="card">
          <Card
            title="Presentación: INTRANET HOSPITAL SANTA BÁRBARA"
            subTitle="Administrador de Sistemas"
            style={{ width: "100%" }}
          >
            <p className="m-0" style={{ lineHeight: "1.5" }}>
              Bienvenidos a la intranet del{" "}
              <span className="font-bold mr-3 text-blue-500 w-2">
                HOSPITAL SANTA BÁRBARA.
              </span>
              Esta plataforma es una herramienta esencial para nuestro personal
              médico y administrativo, ya que proporciona acceso a información
              importante y a recursos valiosos.
              <p className="m-4" style={{ lineHeight: "2" }}>
                En nuestra intranet, encontrarás:
              </p>
            </p>

            <ol className="m-4">
              <li>Acceso información adicional</li>
              <li>Recursos</li>
              <li>Y mucho más</li>
            </ol>
            <p className="m-0" style={{ lineHeight: "1.5" }}>
              Para acceder a la intranet, ingrese su nombre de usuario y
              contraseña en el área de inicio de sesión en la parte izquierda de
              esta página. Si tiene algún problema para acceder o si necesita
              <span className="font-bold mr-3 text-blue-500 w-2">
                {" "}
                obtener una cuenta,
              </span>
              comuníquese con:{" "}
              <span className="font-bold mr-3 text-blue-500 w-2">
                UNIDAD DE SISTEMAS.
              </span>
            </p>
            <p className="mt-5" style={{ lineHeight: "1.5" }}>
              Estamos seguros de que nuestra intranet será un recurso valioso
              para su trabajo en el{" "}
              <span className="font-bold mr-3 text-blue-500 w-2">
                HOSPITAL SANTA BÁRBARA.
              </span>{" "}
              Gracias por su dedicación y por contribuir al cuidado de nuestros
              pacientes. ¡Disfrute de su tiempo en la intranet!
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WidgetContenido;
