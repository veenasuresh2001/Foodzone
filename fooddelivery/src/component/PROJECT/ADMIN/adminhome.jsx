import React from 'react'
import Slider from '../slider';
import Custreport from './custreport';
import { NavDropdown } from 'react-bootstrap';
import Userheader from '../CUSTOMER/userheader';
import {Route,Routes} from 'react-router-dom'
import { Container,Row,Col,Nav } from 'react-bootstrap';
import Customerview from '../CUSTOMER/viewcustomer';
import Hotelview from '../HOTEL/viewhotel';
import Viewpay from './virepaym';
import Viewfeedback from './viewfeedback';
import Hotelreport from './hotelreport';
import Reghotel from './viewhotel';
export default  function Adminhome(){
  return (
    <>
      <div id='welcome'>
      <Container fluid id="container">
      <Row>
        <Col lg={2} style={{height:'100vh'}}id="column">
        <Nav defaultActiveKey="/home" className="flex-column my-custom-navbar">
        <Nav.Link eventKey="disabled" disabled>
      <label style={{ color: 'red' }}>Disabled</label>
      </Nav.Link>
      <Nav.Link href="/adminhome/custview"><label class="txt">View Customers</label></Nav.Link>
      <Nav.Link href="/adminhome/hotelview"><label class="txt">View hotel requests</label></Nav.Link>
      <Nav.Link href="/adminhome/viewhotel"><label class="txt">View Registered hotels</label></Nav.Link>
      <NavDropdown title="REPORT" className='txt' id='reportcolor'>
              <NavDropdown.Item href="/adminhome/custreport">CUSTOMER</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/adminhome/hotelreport">
                HOTEL
              </NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item href="orderreport" id="drop">ORDERS</NavDropdown.Item>     
            </NavDropdown>
      <Nav.Link href="/logout"><label class="txt">EXIT</label></Nav.Link>
      <Nav.Link eventKey="link-2"></Nav.Link>
      <Nav.Link eventKey="disabled" disabled>
      <label style={{ color: 'red' }}>Disabled</label>
      </Nav.Link>
      <Nav.Link eventKey="disabled" disabled>
      <label style={{ color: 'red' }}>Disabled</label>
      </Nav.Link>
      <Nav.Link eventKey="disabled" disabled>
      <label style={{ color: 'red' }}>Disabled</label>
      </Nav.Link>
      <Nav.Link eventKey="disabled" disabled>
      <label style={{ color: 'red' }}>Disabled</label>
      </Nav.Link>
      <Nav.Link eventKey="disabled" disabled>
      <label style={{ color: 'red' }}>Disabled</label>
      </Nav.Link>
      <Nav.Link eventKey="disabled" disabled>
      <label style={{ color: 'red' }}>Disabled</label>
      </Nav.Link>
      <Nav.Link eventKey="disabled" disabled>
      <label style={{ color: 'red' }}>Disabled</label>
      </Nav.Link>
      <Nav.Link eventKey="disabled" disabled>
      <label style={{ color: 'red' }}>Disabled</label>
      </Nav.Link>
    </Nav>
        </Col>
        <Col lg={10}>
        <Routes>
        <Route path="/custview" element={<Customerview/>}/>
        <Route path='/slider' element={<Slider/>}/>
        <Route path='/hotelview' element={<Hotelview/>}/>
        <Route path='/viewpay' element={<Viewpay/>}/>
        <Route path='/viewfeedback' element={<Viewfeedback/>}/>
        <Route path='/custreport' element={<Custreport/>}/>
        <Route path='/hotelreport' element={<Hotelreport/>}/>
        <Route path='/viewhotel' element={<Reghotel/>}/>
        </Routes>
          
        </Col>
      </Row>
    </Container>
    </div>
    </>
    
    
  )
}
