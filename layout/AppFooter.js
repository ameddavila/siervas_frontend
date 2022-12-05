import getConfig from 'next/config';
import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;

    return (
        <div className="layout-footer">
            <img src={`${contextPath}/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Logo" height="20" className="mr-2" />
            <span className="font-medium ml-2">PrimeReact </span>
            <span className="font-normal ml-2"> Unidad de Sistemas H.S.B.</span>
            <span className="font-medium ml-2"> 2022</span>
        </div>
    );
};

export default AppFooter;
