import React from 'react'
import Slider from '../slider';

import {Route,Routes} from 'react-router-dom'
import Customerview from './viewcustomer';
import { Container,Row,Col,Nav } from 'react-bootstrap';
import Profile from './userprofile';
import Useredit from './useredit';
import Viewfood from './viewfood';
import Viewplan from './viewplan';
import Viewbuy from './viewbuys';
import FeedbackForm from './feedback';
import Viewsub from './viewsub';
import Customise from './custom';

//import Nav from 'react-bootstrap/Nav';


function Userhome() {
    const userId=sessionStorage.getItem("userId")
    const cName=sessionStorage.getItem("cName")
   
    
  
    
   
    return (
      <>
     <div id='userhome'>
      <h2 id='custhomehead'>Welcome {cName}</h2>
      
      <Container fluid id="container">
      <Row>
  <Col lg={2} style={{ height: '100vh' }} id="column">
    <Nav defaultActiveKey="/home" className="flex-column my-custom-navbar">
    <Nav.Link eventKey="disabled" disabled>
      <label style={{ color: 'red' }}>Disabled</label>
      </Nav.Link>
      <Nav.Link href="/userhome/slider"><label class="txt">HOME</label></Nav.Link>
      <Nav.Link href="/userhome/viewsub"><label class="txt">View Subscriptions</label></Nav.Link>
      <Nav.Link href="/userhome/viewbuy"><label class="txt">View Orders</label></Nav.Link>
      <Nav.Link href="/userhome/viewfood"><label class="txt">View food</label></Nav.Link>
      <Nav.Link href="/userhome/viewplan"><label class="txt">View plans</label></Nav.Link>
      <Nav.Link href="/userhome/customise"><label class="txt">Add your prefered plan</label></Nav.Link>
      <Nav.Link href="/userhome/feed"><label class="txt">FEEDBACK</label></Nav.Link>
      <Nav.Link href="/logout"><label class="txt">EXIT</label></Nav.Link>
     
      <Nav.Link eventKey="disabled" disabled>
      <label style={{ color: 'red' }}>Disabled</label>
      </Nav.Link>
      <Nav.Link eventKey="disabled" disabled>
      <label style={{ color: 'red' }}>Disabled</label>
      </Nav.Link> <Nav.Link eventKey="disabled" disabled>
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
      <Route path="/custview" element={<Customerview />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/custedit" element={<Useredit />} />
      <Route path='/slider' element={<Slider />} />
      <Route path="/viewfood" element={<Viewfood/>}/>
      <Route path="/viewplan" element={<Viewplan/>}/>
      <Route path="/viewsub" element={<Viewsub/>}/>
      <Route path="/viewbuy" element={<Viewbuy/>}/>
      <Route path="/feed" element={<FeedbackForm/>}/>
      <Route path='/customise' element={<Customise/>}/>
    </Routes>
  </Col>
</Row>
      </Container>
      </div>
      </>
    )
  }
  
  export default Userhome