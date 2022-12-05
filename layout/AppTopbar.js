import getConfig from "next/config";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { classNames } from "primereact/utils";
import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from "react";
import { LayoutContext } from "./context/layoutcontext";
import useAuth from "../hooks/useAuth";
import { Button } from "primereact/button";

import { ProgressSpinner } from "primereact/progressspinner";

const AppTopbar = forwardRef((props, ref) => {
  const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } =
    useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);
  const contextPath = getConfig().publicRuntimeConfig.contextPath;
  const { auth, cerrarSesionAuth } = useAuth();

  const handleCerrarSesion = () => {
    cerrarSesionAuth();
    localStorage.removeItem("token");
    Router.push('/');
    };

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current,
  }));

  return (
    <div className="layout-topbar">
      <Link href="/">
        <a className="layout-topbar-logo">
          <>
            <img
              src={`${contextPath}/layout/images/logo-${
                layoutConfig.colorScheme !== "light" ? "white" : "dark"
              }.svg`}
              width="47.22px"
              height={"35px"}
              widt={"true"}
              alt="logo"
            />
            <div className="flex flex-column card-container">
              <div className="flex align-items-right justify-content-right text-xl font-bold border-round">
                HOSPITAL SANTA BÁRBARA
              </div>
              <div className="flex align-items-right justify-content-right text-base font-light border-round mr-2">
                SUCRE-BOLIVIA
              </div>
            </div>
          </>
        </a>
      </Link>

      <Button
        ref={menubuttonRef}
        type="button"
        className="p-link layout-menu-button layout-topbar-button"
        onClick={onMenuToggle}
      >
        <i className="pi pi-bars" />
      </Button>

      <Button
        ref={topbarmenubuttonRef}
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={showProfileSidebar}
      >
        <i className="pi pi-ellipsis-v" />
      </Button>

      <div
        ref={topbarmenuRef}
        className={classNames("layout-topbar-menu", {
          "layout-topbar-menu-mobile-active": layoutState.profileSidebarVisible,
        })}
      >
        {auth.id ? (
          <div className="card">
            
            <div className="flex flex-row-reverse flex-wrap card-container yellow-container">{auth.nombreUsuario}</div>
            <div className="flex flex-row-reverse flex-wrap card-container yellow-container">
            <Button onClick={handleCerrarSesion} href="/">
              <i> Cerrar Sesión</i>
            </Button>
            </div>
          </div>
        ) : (
          ""
        )}

        {!auth && (
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        )}
      </div>
    </div>
  );
});

export default AppTopbar;
