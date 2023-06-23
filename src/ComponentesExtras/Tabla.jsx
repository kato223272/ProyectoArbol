import React, { useState } from "react";
import { Table, Button, FormGroup } from "react-bootstrap";
import "./Tabla.css";
import { Col, Row, Form } from "react-bootstrap";
import SplayTree from 'splaytree';
//---------------------------------------------------------------------------------------------------------------------------
const Historial = () => {
  const arbol = new SplayTree();
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
    let llaves = arbol.keys();
    console.log(llaves);
    const min = 1000;
    const max = 9999;
    var numero = numero = Math.floor(Math.random() * (max - min + 1)) + min;
    return numero;
  }

  const creacionAlumno = (participante) =>{
    if(nombre.trim()!=="" && categoria !== "Escoja la categoría"){
      setNombres((prevState) => ({
        ...prevState,
        [participante]: Nombres,
      }));
      setCategorias((prevState) => ({
        ...prevState,
        [participante]: Categorias,
      }));
    }
    else{
      console.log("vacio");
    }
  }

  useState(() => {
    const initialStatus = {};
    const initialStatus1 = {};
    participante.forEach((participante) => {
      initialStatus[participante.folio] = '';
      initialStatus1[participante.folio] = '';
    });
    setNombres(initialStatus);
    setCategorias(initialStatus1);
  }

  )
  const participante = [{ folio: generarNumero(), nombre: "", categoria: "", }];

  //----------------------------------------------------Tabla-------------------------------------------------------------
  const indexOfLastparticipante = currentPage * participantePerPage;
  const indexOfFirstparticipante =
    indexOfLastparticipante - participantePerPage;
  const currentparticipante = searchFolio
    ? participante.filter(
        (participante) => participante.folio.toString()===searchFolio
      )
    : participante.slice(indexOfFirstparticipante, indexOfLastparticipante);

  const totalPages = Math.ceil(participante.length / participantePerPage);

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
        <Row>
          <Col></Col>
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
                    <td>{Nombres[participante.folio]}</td>
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
          <Col></Col>
        </Row>
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
      <div>
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
      </div>
      
    </div>
  );
};


function crearAlumno(nombre, folio, categoria){
  var alumno = {folio, nombre, categoria}
  return alumno;
}

export default Historial;
