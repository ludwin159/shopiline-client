import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

 /* bootstrap */
 import 'bootstrap/dist/css/bootstrap.min.css';
 import 'bootstrap/dist/js/bootstrap.bundle.min'


 /* Firebase */
import { FirebaseAppProvider} from 'reactfire';
import firebaseConfig from './firebase-config';

const root = document.getElementById("root");

//Componentes Importados



/* firebase.initializeApp(config) */
ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <React.Suspense fallback={ "Cargando .. ." }>

      <App/>
          
      </React.Suspense>

      

  </FirebaseAppProvider>
, root);









// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
