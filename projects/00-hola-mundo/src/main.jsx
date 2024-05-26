import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App' //Importar componente desde la ruta
import './index.css'
const root = ReactDOM.createRoot(document.getElementById('root'))

//No queremos renderizar directamente, usar componentes, en App esta el div
// root.render(
//   <div>Twitter card</div>
// )

//Renderizar componentes, importar los componentes
root.render(
  <App />
)
