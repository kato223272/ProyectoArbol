import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import "./Tabla.css";
import { Col, Row } from "react-bootstrap";

//----------------------------------------- ARBOL-------------------------------------------------------------------------------
var createTree = require("functional-red-black-tree");
var arbol = createTree();

//---------------------------------------------------------------------------------------------------------------------------
const Historial = () => {
  const [showModal, setShowModal] = useState(false);
  // const [participanteIdSeleccionado, setparticipanteIdSeleccionado] = useState(null);
  const [participantePerPage, setparticipantePerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchFolio, setSearchFolio] = useState('');
  const [folio, setfolio] = useState(null);

  const handleFolio = () => {
    if (arbol.getFolio == null) {
      for (var i = 0; i < 100000; ++i) {
        folio = folio.insert(Math.random(1000, 9999));
      }
      setfolio(folio);
    } else {
      do {
        for (var i = 0; i < 100000; ++i) {
          folio = folio.insert(Math.random(1000, 9999));
        }
      } while (folio.equals(arbol.getFolio));
      setfolio(folio);
    }
  };

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

  const participante = [{ folio: 1, nombre: "", categoria: "", Eliminar:Button }];

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
            <div style={{ marginLeft: "120px" }} className="busqueda">
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
                    <td>{participante.nombre}</td>
                    <td>{participante.categoria}</td>
                    <td>
                      <Button
                        variant="light"
                        oncliak=''
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
      
    </div>
  );
};

export default Historial;
