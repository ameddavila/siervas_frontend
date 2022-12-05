import React, { useState, useEffect } from 'react';
import clienteAxios from '../config/clienteAxios';
import { Image } from 'primereact/image';
import Moment from 'react-moment';
import 'moment-timezone';

const WidgetGeneral = () => {
    const [medico, setMedico] = useState([]);
    var today = new Date();

    const listar = async () => {
        try {
            const res = await clienteAxios('/fichas');
            setMedico(res.data[0]);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(async() => {
       //const interval = setInterval(() => {
            listar();
            //setSeconds(seconds => seconds + 1);
      //  }, 1000);
        //return () => clearInterval(interval);
    }, []);
    return (
        <div className='card'>
            <div>
            <span className='text-900 text-4xl'> FICHAS DISPONIBLES PARA HOY: </span>
            <span className='text-6xl font-bold text-red-500'> {//<Moment format="DD/MM/YYYY">{today}</Moment>
            }</span>
            </div>
            <div className="grid">
                {medico.map(medico => <div className="col-12 md:col-6 lg:col-3 mt-3" key={medico.medico}>
                    <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 mb-10">{medico.servicio}</span>
                                <div className="text-900 font-medium text-xl">{medico.medico}</div>
                            </div>
                            <div >
                                <Image src="images/medico.png" alt={medico.medico} className="product-image" width="40" height="40" preview />
                            </div>
                        </div>
                        <div className="text-center">
                            <span className="text-500">Fichas Restantes: </span>
                        </div>
                        <div className="text-center">
                            <span className={`${medico.disponibles === 0 ? "text-500 font-medium text-6xl text-red-500" : "text-500 font-medium text-6xl text-green-600"}`}>{medico.disponibles}</span>
                        </div>

                    </div>

                </div>
                )}
            </div>
        </div>
    )
}
export default WidgetGeneral;