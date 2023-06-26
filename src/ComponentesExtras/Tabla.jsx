import React, { useEffect, useState } from "react";
import { Table, Button, FormGroup } from "react-bootstrap";
import "./Tabla.css";
import { Col, Row, Form } from "react-bootstrap";
import { render } from "@testing-library/react";

class Nodo{
  constructor(folio, categoria, nombre){
    this.folio = folio;
    this.categoria = categoria;
    this.nombre = nombre;
    this.izquierda = null;
    this.derecha = null;
  }

  getParticipante(){
    var arreglo =  {folio: this.folio, categoria: this.categoria, nombre: this.nombre}; 
    return arreglo; }
  get
  getFolio(){ return this.folio; }
  getCategoria(){ return this.categoria; }
  getNombre(){ return this.nombre; }
  toArrayNodo(){
    if(this !== null){
      var arreglo = {
        folio: this.folio,
        nombre: this.nombre,
        categoria: this.categoria
      };
      return arreglo;
    }
  }
}

class ArbolParticipantes{
  constructor(){
    this.raiz = null;
  }

  encontrarParticipante(folio){
    return this.encontrarNodo(this.raiz, folio);
  }

  eliminarParticipante(folio){
    this.raiz = this.eliminarNodo(this.raiz, folio);
  }

  encontrarNodo(nodo, folio){
    if(folio === nodo.folio || nodo === null){
      return nodo;
    }
    
    else if(folio < nodo.folio){
      return this.encontrarNodo(nodo.izquierda, folio);
    }

    else{
      return this.encontrarNodo(nodo.derecha, folio);
    }

  }

  addNodo(folio, categoria, nombre){
    const nuevoNodo = new Nodo(folio, categoria, nombre);

    if(!this.raiz){
      this.raiz = nuevoNodo;
    }

    else{
      if(!this.raiz.izquierda){
        this.raiz.izquierda = nuevoNodo;
      }
      else{
        this.insertarNodo(this.raiz, nuevoNodo);
      }
    }
  }

  insertarNodo(nodo, nuevoNodo){
    if(nuevoNodo.folio < nodo.folio){
      if(nodo.izquierda === null){
        nodo.izquierda = nuevoNodo;
      }
      else{
        this.insertarNodo(nodo.izquierda, nuevoNodo);
      }
    }

    else{
      if(nodo.derecha === null){
        nodo.derecha = nuevoNodo;
      }
      else{
        this.insertarNodo(nodo.derecha, nuevoNodo);
      }
    }
  }

  inOrdenRecorrido(nodo, participantes){
    if(nodo !== null){
      this.inOrdenRecorrido(nodo.izquierda, participantes);
      participantes.push(nodo);
      this.inOrdenRecorrido(nodo.derecha, participantes);
    }
  }

  getParticipantes(){
    if(!this.raiz){
      return [];
    }

    const participantes = [];
    this.inOrdenRecorrido(this.raiz, participantes);
    return participantes;
  }

  eliminarNodo(nodo, folio){
    if (nodo === null) {
      return null;
    } 
    else if (folio < nodo.folio) {
      nodo.izquierda = this.eliminarNodo(nodo.izquierda, folio);
      return nodo;
    } 
    else if (folio > nodo.folio) {
      nodo.derecha = this.eliminarNodo(nodo.derecha, folio);
      return nodo;
    } 
    else {
      if (nodo.izquierda === null && nodo.derecha === null) {
        nodo = null;
        return nodo;
      } 
      
      else if (nodo.izquierda === null) {
        nodo = nodo.derecha;
        return nodo;
      } 
      
      else if (nodo.derecha === null) {
        nodo = nodo.izquierda;
        return nodo;
      } 
      
      else {
        const nodoMinimo = this.encontrarNodoInferior(nodo.derecha);
        nodo.folio = nodoMinimo.folio;
        nodo.categoria = nodoMinimo.category;
        nodo.derecha = this.eliminarNodo(nodo.derecha, nodoMinimo.folio);
        return nodo;
      }
    }
  }

  encontrarNodoInferior(nodo){
    if(nodo.izquierda === null){
      return nodo;
    }

    else{
      return this.encontrarNodoInferior(nodo.izquierda);
    }
  }

  toArrayArbol(arbol) {
    const arreglo = [];
  
    const tAA = (nodo) => {
      if (!nodo) {
        return;
      }
  
      const { folio, nombre, categoria } = nodo.getParticipante();

      const existeObjeto = arreglo.some(
        (obj) =>
          obj.folio === folio &&
          obj.nombre === nombre &&
          obj.categoria === categoria
      );
  
      if (!existeObjeto) {
        arreglo.push({ folio, nombre, categoria });
      }
  
      tAA(nodo.izquierda);
      tAA(nodo.derecha);
    };
  
    tAA(arbol);
    return arreglo;
  }
  
  encontrarNodo(folio){
    return this.encontrarNodo(this.raiz, folio);
  }
  

}
//---------------------------------------------------------------------------------------------------------------------------
const Historial = () => {
  const arbolParticipantes = new ArbolParticipantes();
  const [showModal, setShowModal] = useState(false);
  const [alumno, setAlumno] = useState({});
  const [Nombres, setNombres] = useState({});
  const [Categorias, setCategorias] = useState({});
  // const [participanteIdSeleccionado, setparticipanteIdSeleccionado] = useState(null);

  const [alumnosArbol, setAlumnosArbol] = useState([]);
 
  const [folio, setFolio] = useState(null);
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [searchFolio, setSearchFolio] = useState('');
  const [folioSeleccionado, setFolioSeleccionado] = useState(null);
  //--------------------------------------------------------------------------------------------------------------------------
 
 

//   function searchFolio(folio){

//     return function(x){
//       return x.folio.includes(folio) || !folio;
//     }
// }



  const generarNumero = () =>{
    const min = 1000;
    const max = 9999;
    var numero = numero = Math.floor(Math.random() * (max - min + 1)) + min;
    return numero;
  }


  useState(() => {
    const participante = [
      { folio: generarNumero(), nombre: "María Antonieta de las Nieves", categoria: "Avanzado" },
      { folio: generarNumero(), nombre: 'Alejandra López García', categoria: 'Principiante' },
      { folio: generarNumero(), nombre: 'Juan Hernández Martínez', categoria: 'Intermedio' },
      { folio: generarNumero(), nombre: 'María Rodríguez Torres', categoria: 'Avanzado' },
      { folio: generarNumero(), nombre: 'Pedro Sánchez González', categoria: 'Principiante' }
    ];







    participante.forEach((participante) => {
      arbolParticipantes.addNodo(participante.folio, participante.categoria, participante.nombre);
    });
    
  });

  const handleAlumnoChange = (event, folio) =>{
    arbolParticipantes.eliminarParticipante(folio);
    console.log("no sirvo")
    console.log(arbolParticipantes.toArrayArbol(arbolParticipantes.raiz));
    console.log(arbolParticipantes );
   
    setAlumnosArbol(arbolParticipantes);
  }

  const renderizarParticipantes = () => {
     return(
      <Row>
        <Col className="Tablita">
          <Table id="Tablita" striped bordered style={{ width: "100%", margin:'0 auto' }}>
            <thead>
              <tr>
                <th>Folio</th>
                <th>Nombre</th>
                <th>Categoria</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((participante) => (
                <tr key={participante.folio}>
                  <td>{participante.folio}</td>
                  <td>{participante.nombre}</td>
                  <td>{participante.categoria}</td>
                  <td>
                    <Button
                      variant="light"
                      color="blue"
                      onClick={() => {
                        handleAlumnoChange(participante.folio);
                      }}
                    >Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }

  //----------------------------------------------------Tabla-------------------------------------------------------------

  const alumnos =arbolParticipantes.toArrayArbol(arbolParticipantes.raiz);
 
  
//   function searchFolio(folio){

//     return function(x){
//       return x.folio.includes(folio) || !folio;
//     }

// }
  return (
    <div>
      <div>
        <Row>
          <Col>
           
          </Col>
          <Col>
            <div style={{ marginLeft: "15%" }} className="busqueda">
              <label>Buscar participante por folio: </label>
              <input
                type="text"
              
              />
            </div>
          </Col>
        </Row>
      </div>
      
      <div className="Tablita">
        {renderizarParticipantes()}
      </div>
     
      
    </div>
  );
 
};


export default Historial;

