import React from 'react';
import './styles/Menu.scss';
import {Link} from 'react-router-dom';
/* Imagenes */
import imgInicio from '../imagenes/inicio.png';
import imgBuscar from '../imagenes/buscar.png';
import imgCarrito from '../imagenes/carrito.png';
import imgCatalogo from '../imagenes/catalogo.png';
import imgUsuario from '../imagenes/usuario1.png';
import imgUsuarioLogin from '../imagenes/usuario.png'
import 'firebase/auth';
import {useFirebaseApp, useUser } from 'reactfire';


function Menu(){

    /* const firebase = useFirebaseApp(); */
    const user = useUser()

    if(user){
        console.log('Hay un usuario');
    }
    
        return(
            <React.Fragment>

            <div className="contenedor-menu ">

            <Link className="item-menu" to="/">
                <img src={imgInicio}alt="imgInicio" className="img-link-menu"/>
                <div className="nombre-link-menu">INICIO</div>
            </Link>

            <Link className="item-menu" to="/buscar">
            <img src={imgBuscar}alt="imgBuscar" className="img-link-menu"/>
            <div className="nombre-link-menu">BUSCAR</div>
            </Link>

            
            {user &&
            <React.Fragment>
                { user.photoURL &&

                <Link className="item-menu" to="/usuario">
                    <img src={user.photoURL} alt="imgUsuario" 
                    className="img-link-menu"
                    id= "imagen-perfil"
                    />
                    <div className="nombre-link-menu">
                    {` USUARIO`}</div>

                </Link>
            
                }
                { !user.photoURL &&
                    <Link className="item-menu" to="/usuario">
                        <img src={imgUsuarioLogin} alt="imgUsuario" 
                        className="img-link-menu"
                        id= "imagen-perfil"
                        />
                        <div className="nombre-link-menu">
                        {` USUARIO`}</div>
                    </Link>
                }
            </React.Fragment>
            

            }

            {!user &&
                <Link className="item-menu" to="/usuario">
                <img src={imgUsuario} alt="imgUsuario" 
                className="img-link-menu"
                id= "imagen-perfil"
                />
                 <div className="nombre-link-menu">USUARIO</div>
                </Link>
                
            }
            

            

            <Link className="item-menu" to="/carrito">
            <img src={imgCarrito} alt="imgCarrito"
            className="img-link-menu"/>
            <div className="nombre-link-menu">CARRITO</div>
            </Link>

            <Link className="item-menu" to="/catalogo">
            <img src={imgCatalogo} alt="imgCatalogo"
            className="img-link-menu"/>
            <div className="nombre-link-menu">CATALOGO</div>
            </Link>

            </div>

            </React.Fragment>
        )
    
}

export default Menu;