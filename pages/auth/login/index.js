import clienteAxios from "../../../config/clienteAxios";
import getConfig from "next/config";
import Router, { useRouter } from "next/router";
import React, { useContext, useState, useRef } from "react";
import AppConfig from "../../../layout/AppConfig";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { LayoutContext } from "../../../layout/context/layoutcontext";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Image } from "primereact/image";
import { Toast } from "primereact/toast";
import useAuth from "../../../hooks/useAuth";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [loginUsuario, setLoginUsuario] = useState("");

  const toastBR = useRef(null);

  const{ setAuth, cargando  }=useAuth();


  const { layoutConfig } = useContext(LayoutContext);
  const contextPath = getConfig().publicRuntimeConfig.contextPath;
  const router = useRouter();
  const containerClassName = classNames(
    "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden",
    { "p-input-filled": layoutConfig.inputStyle === "filled" }
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([loginUsuario, password].includes("")) {
      toastBR.current.show({
        severity: "error",
        summary: "Mensaje de Error",
        detail: "Todos los campos son obligatorios",
        life: 1000,
      });
      return;
    }
    try {
      const { data } = await clienteAxios.post("/usuarios/login", {
        loginUsuario,
        password,
      });
      
      localStorage.setItem("token", data.token);
      setAuth(data)
      Router.push('/')

    } catch (error) {
      toastBR.current.show({
        severity: "error",
        summary: "Mensaje de Error",
        detail: error.response.data.msg,
        life: 1000,
      });
    }
  };

  //const { msg } = alerta;
  return (
    <div className={containerClassName}>
      <Toast ref={toastBR} position="bottom-right" />
      <div className="flex flex-column justify-content-center">
        <div className="flex card-container">
          <Image
            src={`${contextPath}/layout/images/logo-${
              layoutConfig.colorScheme === "light" ? "dark" : "white"
            }.svg`}
            alt="Sakai logo"
            className="mb-5 w-6rem flex-shrink-0"
          />
          <div className="flex flex-column card-container">
            <div className="flex align-items-right justify-content-right text-xl font-bold border-round">
              HOSPITAL SANTA BÁRBARA
            </div>
            <div className="flex align-items-right justify-content-right text-base font-light border-round mr-2">
              SUCRE-BOLIVIA
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              borderRadius: "56px",
              padding: "0.3rem",
              background:
                "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)",
            }}
          >
            <div
              className="w-full surface-card py-5 px-5 sm:px-8"
              style={{ borderRadius: "53px" }}
            >
              <div className="text-center">
                <div className="text-900 text-3xl font-medium mb-3">
                  Bienvenido
                </div>
              </div>
              <div>
                <label
                  htmlFor="usuario"
                  className="block text-900 text-xl font-medium mb-2"
                >
                  Usuario
                </label>
                <InputText
                  inputid="usuario"
                  type="text"
                  placeholder="Usuario Siaf-Sice"
                  className="w-full md:w-30rem mb-5"
                  style={{ padding: "1rem" }}
                  value={loginUsuario}
                  onChange={(e) => setLoginUsuario(e.target.value)}
                />
                <label
                  htmlFor="password"
                  className="block text-900 font-medium text-xl mb-2"
                >
                  Contraseña
                </label>
                <Password
                  inputid="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  className="w-full mb-5"
                  inputClassName="w-full p-3 md:w-30rem"
                  toggleMask
                  feedback={false}
                ></Password>
                <div className="flex align-items-center justify-content-between mb-5 gap-5">
                  <a
                    className="font-medium no-underline ml-2 text-right cursor-pointer"
                    style={{ color: "var(--primary-color)" }}
                  >
                    Contactar con Unidad de Sistemas para su Contraseña
                  </a>
                </div>
                <Button
                  type="submit"
                  label="Ingresar"
                  className="w-full p-3 text-xl"
                ></Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

LoginPage.getLayout = function getLayout(page) {
  return (
    <React.Fragment>
      {page}
      <AppConfig simple />
    </React.Fragment>
  );
};
export default LoginPage;
