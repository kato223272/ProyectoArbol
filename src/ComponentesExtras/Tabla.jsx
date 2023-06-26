import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";

class Nodo {
  constructor(folio, categoria, nombre) {
    this.folio = folio;
    this.categoria = categoria;
    this.nombre = nombre;
    this.izquierda = null;
    this.derecha = null;
  }

  getParticipante() {
    var arreglo = {
      folio: this.folio,
      categoria: this.categoria,
      nombre: this.nombre,
    };
    return arreglo;
  }
}

class ArbolParticipantes {
  constructor() {
    this.raiz = null;
  }

  encontrarParticipante(folio) {
    return this.encontrarNodo(this.raiz, folio);
  }

  eliminarParticipante(folio) {
    this.raiz = this.eliminarNodo(this.raiz, folio);
  }

  encontrarNodo(nodo, folio) {
    if (folio === nodo.folio || nodo === null) {
      return nodo;
    } else if (folio < nodo.folio) {
      return this.encontrarNodo(nodo.izquierda, folio);
    } else {
      return this.encontrarNodo(nodo.derecha, folio);
    }
  }

  addNodo(folio, categoria, nombre) {
    const nuevoNodo = new Nodo(folio, categoria, nombre);

    if (!this.raiz) {
      this.raiz = nuevoNodo;
    } else {
      this.insertarNodo(this.raiz, nuevoNodo);
    }
  }

  insertarNodo(nodo, nuevoNodo) {
    if (nuevoNodo.folio < nodo.folio) {
      if (nodo.izquierda === null) {
        nodo.izquierda = nuevoNodo;
      } else {
        this.insertarNodo(nodo.izquierda, nuevoNodo);
      }
    } else {
      if (nodo.derecha === null) {
        nodo.derecha = nuevoNodo;
      } else {
        this.insertarNodo(nodo.derecha, nuevoNodo);
      }
    }
  }

  inOrdenRecorrido(nodo, participantes) {
    if (nodo !== null) {
      this.inOrdenRecorrido(nodo.izquierda, participantes);
      participantes.push(nodo);
      this.inOrdenRecorrido(nodo.derecha, participantes);
    }
  }

  getParticipantes() {
    if (!this.raiz) {
      return [];
    }

    const participantes = [];
    this.inOrdenRecorrido(this.raiz, participantes);
    return participantes;
  }

  eliminarNodo(nodo, folio) {
    if (nodo === null) {
      return null;
    } else if (folio < nodo.folio) {
      nodo.izquierda = this.eliminarNodo(nodo.izquierda, folio);
      return nodo;
    } else if (folio > nodo.folio) {
      nodo.derecha = this.eliminarNodo(nodo.derecha, folio);
      return nodo;
    } else {
      if (nodo.izquierda === null && nodo.derecha === null) {
        nodo = null;
        return nodo;
      } else if (nodo.izquierda === null) {
        nodo = nodo.derecha;
        return nodo;
      } else if (nodo.derecha === null) {
        nodo = nodo.izquierda;
        return nodo;
      } else {
        const nodoMinimo = this.encontrarNodoInferior(nodo.derecha);
        nodo.folio = nodoMinimo.folio;
        nodo.categoria = nodoMinimo.categoria;
        nodo.nombre = nodoMinimo.nombre;
        nodo.derecha = this.eliminarNodo(nodo.derecha, nodoMinimo.folio);
        return nodo;
      }
    }
  }

  encontrarNodoInferior(nodo) {
    if (nodo.izquierda === null) {
      return nodo;
    } else {
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

  encontrarNodo(folio) {
    return this.encontrarNodo(this.raiz, folio);
  }
}

const Historial = () => {
  const arbolParticipantes = new ArbolParticipantes();
  const [alumnosArbol, setAlumnosArbol] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);

  const generarNumero = () => {
    const min = 1000;
    const max = 9999;
    var numero = Math.floor(Math.random() * (max - min + 1)) + min;
    return numero;
  };

  useEffect(() => {
    const participantes = [
      {
        folio: generarNumero(),
        nombre: "María Antonieta de las Nieves",
        categoria: "Avanzado",
      },
      {
        folio: generarNumero(),
        nombre: "Alejandra López García",
        categoria: "Principiante",
      },
      {
        folio: generarNumero(),
        nombre: "Juan Hernández Martínez",
        categoria: "Intermedio",
      },
      {
        folio: generarNumero(),
        nombre: "María Rodríguez Torres",
        categoria: "Avanzado",
      },
      {
        folio: generarNumero(),
        nombre: "Pedro Sánchez González",
        categoria: "Principiante",
      },
    ];

    participantes.forEach((participante) => {
      arbolParticipantes.addNodo(
        participante.folio,
        participante.categoria,
        participante.nombre
      );
    });

    setAlumnosArbol(arbolParticipantes.toArrayArbol(arbolParticipantes.raiz));
  }, []);

  const handleAlumnoChange = (index) => {
    const nuevosAlumnosArbol = [...alumnosArbol];
    nuevosAlumnosArbol.splice(index, 1);
    setAlumnosArbol(nuevosAlumnosArbol);
    setResultadosBusqueda(nuevosAlumnosArbol);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() !== "") {
      const participantesEncontrados = alumnosArbol.filter((alumno) =>
        alumno.folio.toString().includes(query)
      );
      setResultadosBusqueda(participantesEncontrados);
    } else {
      setResultadosBusqueda([]);
    }
  };

  const renderizarParticipantes = () => {
    const participantes =
      resultadosBusqueda.length > 0 ? resultadosBusqueda : alumnosArbol;
    const participantesUnicos = Array.from(
      new Set(participantes.map((participante) => participante.folio))
    ).map((folio) =>
      participantes.find((participante) => participante.folio === folio)
    );
    return (
      <Row>
        <Col className="Tablita">
          <Table
            id="Tablita"
            striped
            bordered
            style={{ width: "100%", margin: "0 auto" }}
          >
            <thead>
              <tr>
                <th>Folio</th>
                <th>Nombre</th>
                <th>Categoria</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {participantes.map((participante, index) => (
                <tr key={participante.folio}>
                  <td>{participante.folio}</td>
                  <td>{participante.nombre}</td>
                  <td>{participante.categoria}</td>
                  <td>
                    <Button
                      variant="light"
                      color="blue"
                      onClick={() => {
                        handleAlumnoChange(index);
                      }}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  };

  return (
    <div>
      <div>
        <Row>
          <Col></Col>
          <Col>
            <div style={{ marginLeft: "15%" }} className="busqueda">
              <label>Buscar participante por folio: </label>
              <input
                type="text"
                placeholder="Ingrese un folio"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </Col>
        </Row>
      </div>

      <div className="Tablita">{renderizarParticipantes()}</div>
    </div>
  );
};

export default Historial;