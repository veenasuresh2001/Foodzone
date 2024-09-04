import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Slider from './PROJECT/slider';

function Webheader() {
  return (
    <>
    <Navbar expand="lg" className="nav">
      <Container id='navv'>
        <Navbar.Brand href="#" id='color' className='txt'>FOOD ZONE</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="#" id='color'>Home</Nav.Link>
            <NavDropdown title="NEW USER" id='color'>
            <NavDropdown.Item href="register">Customer</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="hotelreg">
                Hotel
              </NavDropdown.Item>
              </NavDropdown>
            <NavDropdown title="LOGIN" id='color'>
              <NavDropdown.Item href="adminlogin">Admin</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="login">
                Customer
              </NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item href="hotellogin" id="drop">Hotel</NavDropdown.Item>     
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Slider/>
  </>
  );
}
export default Webheader;