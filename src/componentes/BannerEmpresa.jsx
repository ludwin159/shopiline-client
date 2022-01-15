import React from 'react';
import logoEmpresa from '../imagenes/logoEmpresa.svg';
import iconoFacebook from '../imagenes/facebook.svg';
import iconoWhatssap from '../imagenes/whatssap.png';
import iconoInstagram from '../imagenes/instagram.png';
import iconoMessenger from '../imagenes/messenger.png';
import iconoTelefono from '../imagenes/telefono.png';
import bannerEmpresa from '../imagenes/banner-empresa.jpg'
import logoSecundario from '../imagenes/logo-secundario.png'
import './styles/BannerEmpresa.scss'

function BannerEmpresa(){
        return(
        <div className="container-footer">
            <div className="container-banner-empresa">
                <img src={bannerEmpresa} className="imagen-banner-empresa" alt=""/>
            </div>
            <footer className="footer-empresa">
                <div className="logo-principal">
                    <img src="" alt=""/>

                </div>
                <div className="logo-secundario"></div>
                <div className="container-empresa-logo">
                    <img className="imagen-logo-empresa" src={logoSecundario} alt=""/>

                </div>

                <div className="container-empresa-redes">
                    <div className="container-redes">
                        


                        <div className="redes-sociales">
                        <section className="redes-icono-contacto">
                            <img src={iconoWhatssap} alt=""/>

                        </section>

                        <section className="redes-icono-contacto">
                            <img src={iconoMessenger} alt=""/>
                        </section>

                        <section className="redes-icono-contacto">
                            <img src={iconoFacebook} alt=""/>

                        </section>

                        <section className="redes-icono-contacto">
                            <img src={iconoInstagram} alt=""/>

                        </section>
                        </div>
                        
                        <div className="container-direccion">
                        <p>Dirección: Jr. Aguirre Morales Nro. 105 </p>
                        </div>
                        <section className="redes-icono-contacto container-telefono">
                            <img src={iconoTelefono} alt="" className="icono-telefono"/>
                            (064) 25 32 57
                        </section>
                        
                        


                    </div>
                  


                </div>
                


            </footer>
        </div>

        )
    }
export default BannerEmpresa;