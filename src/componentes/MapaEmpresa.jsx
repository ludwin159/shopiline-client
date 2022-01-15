import React from 'react';
import './styles/MapaEmpresa.scss';
function MapaEmpresa(){
        return(
            <div className="componente-container-mapa">
                 <div className="container-mapa-empresa">
                    <small className="titulo-ubicanos">Ubícanos en:</small>
                    <iframe className="mapa-empresa" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d975.4785874097552!2d-75.2175082138497!3d-12.049413946418595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910e963b32d46887%3A0x4f800a397e002557!2sAguirre%20Morales%20105%2C%20Huancayo%2012007!5e0!3m2!1ses-419!2spe!4v1596121677506!5m2!1ses-419!2spe" ></iframe>
                </div>

            </div>
           
            
        )
    }

export default MapaEmpresa;

