import React from 'react';
import Menu from './componentes/Menu'

/* La paginas */
import PaginaInicio from './paginas/Inicio';
import PaginaBuscar from './paginas/Buscar';
import PaginaUsuario from './paginas/Usuario';
import PaginaCarrito from './paginas/Carrito';
import PaginaCatalogo from './paginas/Catalogo';
import PaginaCatalogoCategoria from './paginas/CatalogoCategoria';
import PaginaRegistro from './paginas/Registro';
import RecuperarPassword  from './paginas/RecuperarPassword';
import ActualizarDatos from './paginas/ActualizarDatos';
import DatosProducto from './paginas/DatosProducto';
import RealizarPedido from './paginas/RealizarPedido';
import MisPedidosUsuario from './paginas/MisPedidosUsuario';

 /* ... */

import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Menu/>
        <Switch>
          <Route exact path="/"component={PaginaInicio} />
          <Route exact path="/buscar" component={PaginaBuscar} />
          <Route exact path="/usuario" component={PaginaUsuario} />
          <Route exact path="/carrito" component={PaginaCarrito} />
          <Route exact path="/catalogo" component={PaginaCatalogo}/>
          <Route exact path="/catalogo/:categoriaNombre" component= {PaginaCatalogoCategoria}/>
          <Route exact path="/registro" component={PaginaRegistro}/>
          <Route exact path="/actualizarDatos" component={ActualizarDatos} />
          <Route exact path="/recuperarPassword" component={RecuperarPassword}/>
          <Route exact path="/DatosProducto/:DatosProductoId" component={DatosProducto} />
          <Route exact path="/RealizarPedido" component={RealizarPedido}/>
          <Route exact path="/MisPedidosUsuario" component={MisPedidosUsuario}/>
         </Switch>

      </BrowserRouter>
 
    </div>
  );
}

export default App;
