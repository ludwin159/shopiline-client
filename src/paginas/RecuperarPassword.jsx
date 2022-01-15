import React from 'react';
import ReactDOM from 'react-dom';
import './styles/RecuperarPassword.scss'
import {  useFirebaseApp, useUser } from 'reactfire';
import AvisoDatoCorrecto from '../componentes/AvisoDatoCorrecto';
import AvisoDatoIncorrecto from '../componentes/AvisoDatoIncorrecto';

function RecuperarPassword(){
    const [email,setEmail] = React.useState('');
    const firebase = useFirebaseApp();
    const user = useUser()
    


    const EnviarrecuperarPassword = async ()=>{
        const errorRecuperar = document.getElementById('container-error-recuperar');
        const correctoRecuperar = document.getElementById('container-correcto');

        if(email.trim() === ''){
            ReactDOM.render(<AvisoDatoIncorrecto text="Ingrese los datos correctamente"/>, errorRecuperar);
            return
        }
        var actionCodeSettings = {
            url: 'https://atencion-de-pedidos.firebaseapp.com/usuario',

        }
            
        var auth = firebase.auth();
        await auth.sendPasswordResetEmail(email, actionCodeSettings).
        then(()=> {
            ReactDOM.render(<AvisoDatoCorrecto text="Se envió correctamente, revise la bandeja de entrada de su correo, para cambiar la contraseña." />,correctoRecuperar);
            ReactDOM.render(<AvisoDatoIncorrecto text=''/>, errorRecuperar);


          }).catch(function(error) {
            console.error(error);
            if(error.message==='There is no user record corresponding to this identifier. The user may have been deleted.'){
                ReactDOM.render(<AvisoDatoIncorrecto text="No hay un usuario correspondiente al correo ingresado, revise los caracteres. "/>, errorRecuperar);
            }
            else if(error.message==='The email address is badly formatted.'){
                ReactDOM.render(<AvisoDatoIncorrecto text="El correo no tiene un formato valido. "/>, errorRecuperar);
            }
            else{
                ReactDOM.render(<AvisoDatoIncorrecto text={error.message}/>, errorRecuperar);
            }


          });
    }

        return(
            <div className="container-pagina-recuperar-password">
                <div className="container-recuperar-password">
                    <h1>Recuperar Password</h1>
                    <h3>Correo</h3>

                    <input type="email" value={email} onChange={(ev)=>setEmail(ev.target.value)} placeholder="Ingrese su correo." />

                    <div id="container-error-recuperar">
                        
                    </div>

                    <button type="button" onClick={EnviarrecuperarPassword}>Recuperar Contraseña</button>

                    <div id="container-correcto">
                    
                    </div>
                </div>
            </div>
        )
    
}
export default RecuperarPassword;
