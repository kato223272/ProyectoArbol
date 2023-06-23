import React, { useState } from "react";
import { Table, Button, FormGroup } from "react-bootstrap";
import "./Tabla.css";
import { Col, Row, Form } from "react-bootstrap";

class Nodo{
  constructor(folio, categoria, nombre){
    this.folio = folio;
    this.categoria = categoria;
    this.nombre = nombre;
    this.izquierda = null;
    this.derecha = null;
  }

  getParticipante(){ return this; }
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

  encontrarNodo(nodo, folio){
    if(nodo === null || nodo === undefined){
      return null;
    }
    
    
    if(folio === nodo.folio ){
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
  

}
//---------------------------------------------------------------------------------------------------------------------------
const Historial = () => {
  const arbolParticipantes = new ArbolParticipantes();
  const [showModal, setShowModal] = useState(false);
  const [alumno, setAlumno] = useState({});
  const [Nombres, setNombres] = useState({});
  const [Categorias, setCategorias] = useState({});
  // const [participanteIdSeleccionado, setparticipanteIdSeleccionado] = useState(null);
  const [participantePerPage, setparticipantePerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchFolio, setSearchFolio] = useState('');
  const [folio, setfolio] = useState(null);
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");

  //--------------------------------------------------------------------------------------------------------------------------
  const handleparticipantePerPageChange = (event) => {
    setparticipantePerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSearchFolio('');
  };

  const handleSearchIdChange = (event) => {
    setSearchFolio(event.target.value);
  };

  const generarNumero = () =>{
    const min = 1000;
    const max = 9999;
    var numero = numero = Math.floor(Math.random() * (max - min + 1)) + min;
    return numero;
  }

  const creacionAlumno = (participante) =>{
    if(nombre.trim()!=="" && categoria !== "Escoja la categoría"){
      setNombres((prevState) => ({
        ...prevState,
        [participante]: nombre,
      }));
      setCategorias((prevState) => ({
        ...prevState,
        [participante]: categoria,
      }));
    }
    else{
      console.log("vacio");
    }
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

  const renderizarParticipantes = () => {
    return(
      <Row>
        <Col className="Tablita">
          <Table id="Tablita" striped bordered style={{ width: "340%" }}>
            <thead>
              <tr>
                <th>Folio</th>
                <th>Nombre</th>
                <th>Categoria</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {currentparticipante.map((participante) => (
                <tr key={participante.folio}>
                  <td>{participante.folio}</td>
                  <td>{participante.nombre}</td>
                  <td>{Categorias[participante.folio]}</td>
                  <td>
                    <Button
                      variant="light"
                      color="blue"
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
  const arbol = new ArbolParticipantes();

  const alumnos = arbol.toArrayArbol(arbol.raiz);
  console.log(alumnos);
  const indexOfLastparticipante = currentPage * participantePerPage;
  const indexOfFirstparticipante =
    indexOfLastparticipante - participantePerPage;
  const currentparticipante = searchFolio
    ? alumnos.filter(
        (alumnos) => alumnos.folio.toString()===searchFolio
      )
    : alumnos.slice(indexOfFirstparticipante, indexOfLastparticipante);

  const totalPages = Math.ceil(alumnos.length / participantePerPage);

  return (
    <div>
      <div>
        <Row>
          <Col>
            <div style={{ marginBottom: "10px" }} className="agrupar"> 
              <span>Agrupar participante por:</span>
              <select
                value={participantePerPage}
                onChange={handleparticipantePerPageChange}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
              </select>
              
            </div>
          </Col>
          <Col>
            <div style={{ marginLeft: "15%" }} className="busqueda">
              <label>Buscar participante por folio: </label>
              <input
                type="text"
                value={searchFolio}
                onChange={handleSearchIdChange}
              />
            </div>
          </Col>
        </Row>
      </div>
      
      <div className="Tablita">
        {renderizarParticipantes()}
      </div>
      <div>
        <ul className="pagination" style={{ color: "red" }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i + 1}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => handlePageChange(i + 1)}
            >
              <span className="page-link">{i + 1}</span>
            </li>
          ))}
        </ul>
      </div>
      
      
    </div>
  );
};


export default Historial;

{/* <div>
        <Form style={{backgroundColor:'rgba(196, 196, 196)', width:'50%', margin:"0 auto", paddingBlock:'2%'}}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{width: "50%", margin:"0 auto"}}>
            <Form.Label>Ingresar nombre</Form.Label>
            <Form.Control 
              value={nombre} 
              onChange={ev => {setNombre(ev.target.value)}}
              type="text" 
              placeholder="Nombre..." />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{width: "50%", margin:"0 auto"}}>
            <Form.Label>Ingresar categoría</Form.Label>
            <Form.Select onChange={ev => {setCategoria(ev.target.value)}}>
              <option >Escoja la categoría</option>
              <option value="1">Principiante</option>
              <option value="2">Intermediario</option>
              <option value="3">Avanzado</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="d-flex justify-content-center" onClick={() =>{
            setfolio(generarNumero())
            setAlumno(crearAlumno(nombre, folio, categoria))
            creacionAlumno(participante, nombre, categoria)
            arbol.insert(folio, alumno);
          }
            
          }>
            <Button className="btn btn-success mt-3">
                Guardar alumno
            </Button>
          </Form.Group>
        </Form>
      </div> */}
