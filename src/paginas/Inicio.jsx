import React from 'react';
import PortadaInicio from '../componentes/PortadaInicio';
import MapaEmpresa from '../componentes/MapaEmpresa';

function Inicio(){
    
        return(
            <div className="container-pagina-inicio">
                <PortadaInicio/>
                <MapaEmpresa/>
            </div>
            
            
            
        )
    
}

export default Inicio;