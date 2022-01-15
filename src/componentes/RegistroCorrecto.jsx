import React from 'react';
import ReactDom from 'react-dom';
import './styles/RegistroCorrecto.scss';
import imgCheck from '../imagenes/correcto.png'
import imgUsuarioCheck  from '../imagenes/usuario2.png';
import {Link} from 'react-router-dom';


function RegistroCorrecto(){
        return(
            <React.Fragment>
                <div className="registro-correcto">
                    <div className="container-check-title">
                        <div className="container-imgCheck">
                            <img src={imgCheck} alt="imgCheck" className="imgCheck" />
                        </div>
                        <div className="p-registro">
                            <p>Se Registro <br/> Correctamente</p>
                        </div>
                    </div>
                    <div className="contenedor-img-correctamente">
                        <img src={imgUsuarioCheck} alt="imgUsuarioCheck" className="imgUsuarioCheck"/>
                    </div>
                    <div className="contenedor-boton-regresarInicio">
                        <Link to="/usuario">
                        <button type="button" className="boton-regresarInicio">
                            Regresar a Inicio
                        </button>  
                        </Link>
                       
                    </div>


                </div>

            </React.Fragment>
        )
    }
export default RegistroCorrecto;