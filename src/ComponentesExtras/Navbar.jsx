import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css';
function Menu() {
    return (
      <form action="">
      <Navbar className='madera' bg="light" expand="lg">
<Container fluid>
  
  <Navbar.Toggle aria-controls="navbarScroll" />
  <Navbar.Collapse id="navbarScroll">
   <h1>Participantes</h1>
    
  </Navbar.Collapse>
</Container>
</Navbar>
           
      </form>
  
      
    );
  }
  
  export default Menu;

