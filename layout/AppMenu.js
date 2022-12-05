import React, { useEffect, useState } from "react";
import AppMenuitem from "./AppMenuitem";
import { MenuProvider } from "./context/menucontext";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/clienteAxios";


const AppMenu = () => {
  const { auth } = useAuth();
  const [menuUser, setMenuUser] = useState([]);


  useEffect(() => {

    const getMenu = async () => {
      try {
        //console.log(auth.rol)    
        const { data } = await clienteAxios(auth.rol === undefined ? `/helpers/menu/1` : `/helpers/menu/${auth.rol}`);
        eliminarVacios(data);
        setMenuUser(data);
      } catch (error) {
        console.log('Error Serv',error);
      }
    };
    getMenu();
  }, [auth]);

  //funcion para quitar nodos vacios en el JSON de los items 
  function eliminarVacios(jsonx) {
    for (var clave in jsonx) {
      if (typeof jsonx[clave] == "string") {
        if (jsonx[clave] == null || jsonx[clave] == "") {
          delete jsonx[clave];
        }
      } else if (typeof jsonx[clave] == "object") {
        if (clave === "items" && jsonx[clave].length == "") {
          delete jsonx[clave];
        }
        eliminarVacios(jsonx[clave]);
      }
    }
  }
  return (
    <MenuProvider>
      <ul className="layout-menu">
        {menuUser.map((item, subitems, i) => {
          return !item.seperator ? (
            <AppMenuitem item={item} root={true} index={i} key={item.label} />
          ) : (
            <li className="menu-separator"></li>
          );
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
