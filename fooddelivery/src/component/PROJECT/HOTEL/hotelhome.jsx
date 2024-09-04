import React from 'react'
import Slider from '../slider';

import {Route,Routes} from 'react-router-dom'

import { Container,Row,Col,Nav } from 'react-bootstrap';
import Addfood from './addfood';
import Addplans from './addplans';
import Hotelsub from './vieworders';
import Viewhpay from './viewpayment';
import Hotelbuy from './hotelbuys';
//import Nav from 'react-bootstrap/Nav';


function Hotelhome() {
    const userId=sessionStorage.getItem("userId")
    const hName=sessionStorage.getItem("hName")
   
    
  
    
   
    return (
      <>
      <div id='hotelhome'> 
      <h2 id='hotelhomehead'>Welcome {hName}</h2>
      
      <Container fluid>
      <Row>
  <Col lg={2} style={{ height: '100vh' }} id="column">
    <Nav defaultActiveKey="/home" className="flex-column my-custom-navbar">
    <Nav.Link eventKey="disabled" disabled>
    <label style={{ color: 'red' }}>Disabled</label>
      </Nav.Link>
      
      <Nav.Link href=""><label class="txt">HOME</label></Nav.Link>
      <Nav.Link href="/hotelhome/addfood"><label class="txt">Add food</label></Nav.Link>
      <Nav.Link href="/hotelhome/addplan"><label class="txt">Add Plans</label></Nav.Link>
      <Nav.Link href="/hotelhome/hotelsub"><label class="txt">View Subscriptions</label></Nav.Link>
      <Nav.Link href="/hotelhome/hotelbuy"><label class="txt">View Orders</label></Nav.Link>
      <Nav.Link href="/hotelhome/paym"><label class="txt">View payments</label></Nav.Link>
      <Nav.Link href="/logout"><label class="txt">EXIT</label></Nav.Link>
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
      <Route path="/addfood" element={<Addfood />} />
      <Route path="/addplan" element={<Addplans />} />
      <Route path="/hotelsub" element={<Hotelsub />} />
      <Route path="/paym" element={<Viewhpay />} />
      <Route path="/hotelbuy" element={<Hotelbuy />} />
      
    </Routes>
  </Col>
</Row>
      </Container>
      </div>
      </>
    )
  }
  
  export default Hotelhome