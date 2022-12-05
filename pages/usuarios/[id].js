import clienteAxios from "../../config/clienteAxios";
import Router, { useRouter } from "next/router";
import { Dropdown } from "primereact/dropdown";
import React, { useContext, useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

export default function AddUser() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [loginUsuario, setLoginUsuario] = useState("");
  const [rol, setRol] = useState("");
  const [Usu_Codigo, setUsu_Codigo] = useState("");
  const [password, setPassword] = useState("");
  const [repetirpassword, setRepetirpassword] = useState("");

  const [userSiaf, setUserSiaf] = useState("");
  const route = useRouter();
  const [obtenerRol, setObtenerRol] = useState([]);
  const [selectRol, setSelectRol] = useState({});
  const { id } = route.query;
  const toastBR = useRef(null);
  const toastBC = useRef(null);

  useEffect(() => {
    const getUserSiaf = async () => {
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
        const data = await clienteAxios(`/usuarios/adduser/${id}`, config);
        setUserSiaf(data.data);
        setNombreUsuario(data.data.usuario);
        setLoginUsuario(data.data.identificacion);
        setUsu_Codigo(data.data.codigo);
      } catch (error) {
        console.log(error);
      }
    };
    getUserSiaf();
  }, [id]);

  useEffect(() => {
    const getRol = async () => {
      try {
        const rolU = await clienteAxios("/roles");
        setObtenerRol(rolU.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRol();
  }, []);

  const onRolChange = (e) => {
    setSelectRol(e.value);
    setRol(e.value.code);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (password !== repetirpassword) {
      toastBR.current.show({
        severity: "error",
        summary: "Mensaje de Error",
        detail: "Los password no son iguales",
        life: 1000,
      });
      return;
    }
    if (password.length < 8) {
      toastBR.current.show({
        severity: "error",
        summary: "Mensaje de Error",
        detail: "Password muy corto, agrega minimo 8 caracteres",
        life: 2000,
      });
      return;
    }
    if (rol.length === 0) {
      toastBR.current.show({
        severity: "error",
        summary: "Mensaje de Error",
        detail: "Debe seleccionar un rol para el usuario",
        life: 2000,
      });
      return;
    }
    //crear el usuario en el sistema
    try {
      const { data } = await clienteAxios.post("/usuarios", {
        nombreUsuario,
        loginUsuario,
        password,
        rol,
        Usu_Codigo,
      });
      toastBR.current.show({
        severity: "success",
        summary: "Ok",
        detail: data.msg,
        life: 2000,
      });
      showConfirm();
      //Router.push('/usuarios')
    } catch (error) {
      console.log(error);
    }
    // console.log({nombreUsuario,loginUsuario,rol,Usu_Codigo})
  };

  const showConfirm = () => {
    toastBC.current.show({
      severity: "warn",
      sticky: true,
      content: (
        <div className="flex flex-column" style={{ flex: "1" }}>
          <div className="text-center">
            <i
              className="pi pi-exclamation-triangle"
              style={{ fontSize: "3rem" }}
            ></i>
            <h4>Are you sure?</h4>
            <p>Confirm to proceed</p>
          </div>
          <div className="grid p-fluid">
            <div className="col-6">
              <Button type="button" label="Yes" className="p-button-success" />
            </div>
            <div className="col-6">
              <Button type="button" label="No" className="p-button-secondary" />
            </div>
          </div>
        </div>
      ),
    });
  };

  //{codigo: 1, usuario: 'ADMINISTRADOR DEL SIAF', identificacion: 'sa'}
  return (
    <div className="card">
      <Toast ref={toastBR} position="bottom-right" />
      <div className="flex justify-content-center flex-wrap card-container indigo-container">
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
            <form onSubmit={HandleSubmit}>
              <div className="text-center">
                <div className="text-900 text-3xl font-medium mb-3">
                  Agregar Usuario
                </div>
              </div>
              <div>
                <label
                  htmlFor="nombreUsuario"
                  className="block text-900 text-xl font-medium mb-2"
                >
                  Nombre, Apellido
                </label>
                <InputText
                  inputid="nombreUsuario"
                  disabled
                  type="text"
                  placeholder="Nombre Funcionario"
                  className="w-full md:w-25rem mb-5"
                  style={{ padding: "1rem" }}
                  value={userSiaf.usuario || ""}
                />
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
                  disabled
                  type="text"
                  placeholder="Usuario Siaf-Sice"
                  className="w-full md:w-25rem mb-5"
                  style={{ padding: "1rem" }}
                  value={userSiaf.identificacion || ""}
                />
              </div>
              <div>
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
                  inputClassName="w-full p-3 md:w-25rem"
                  toggleMask
                  feedback={false}
                ></Password>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-900 font-medium text-xl mb-2"
                >
                  Repetir Contraseña
                </label>
                <Password
                  inputid="password2"
                  value={repetirpassword}
                  onChange={(e) => setRepetirpassword(e.target.value)}
                  placeholder="Repetir Contraseña"
                  className="w-full mb-5"
                  inputClassName="w-full p-3 md:w-25rem"
                  toggleMask
                  feedback={false}
                ></Password>
              </div>
              <div>
                <label
                  htmlFor="rol"
                  className="block text-900 text-xl font-medium mb-2"
                >
                  Rol para ingreso
                </label>
                <Dropdown
                  value={selectRol}
                  options={obtenerRol}
                  onChange={onRolChange}
                  className="w-full md:w-25rem mb-5"
                  style={{ padding: "0.5rem" }}
                  optionLabel="name"
                  placeholder="Seleccionar"
                />
              </div>
              <div>
                <label
                  htmlFor="codigo"
                  className="block text-900 text-xl font-medium mb-2"
                >
                  Codigo Siaf-Sice
                </label>
                <InputText
                  inputid="codigo"
                  disabled
                  type="text"
                  placeholder="Nombre Funcionario"
                  className="w-full md:w-25rem mb-5"
                  style={{ padding: "1rem" }}
                  value={userSiaf.codigo || ""}
                />
              </div>
              <div>
                <Button
                  type="submit"
                  label="Agregar"
                  className="w-full p-3 text-xl"
                ></Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
