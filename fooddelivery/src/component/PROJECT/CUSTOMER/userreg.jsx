
import React, { useState } from "react";
import { Form, Button, Container, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import AXIOS from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
export default function Customerreg() {
  const nav=useNavigate();

  // useState
  const [data, setData] = useState({ cname: "", address: "", contact: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});

  // setValue
  const setValue = (field, value) => {
    setData({ ...data, [field]: value });
    if(!!errors[field]){setErrors({
        ...errors,[field]:null
    })}
  }

  // validation
  const findErrors = () => {
    const pass=/^[A-Z a-z 0-9 @#$*]{6,16}$/
    const { cname,contact,address,email,password,confirm } = data;
    const newErrors = {};

    if (!cname||cname==="") {
      newErrors.cname = "Name field is required";
    }
    else if(cname.length>30){
        newErrors.cname="Content is too long";
    }
    if(!address||address===""){
        newErrors.address="Address field is required"
    }
    if(!contact||contact==="")
    newErrors.contact="Contact field is required";
    else if(contact.length!==10)
    newErrors.contact="Invalid contact";
    if(!email||email==="")
    newErrors.email="Email field is required"
    if(!pass.test(password))
    newErrors.password="invalid password"
    if(password!==confirm){
        newErrors.confirm="password doesn't match";
    }
    return newErrors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = findErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } 
    else{
      const url="http://localhost:9000/register"
      AXIOS.post(url,data).then((response)=>{
        if(response.data.status===1){
          toast.success(response.data.msg)
          alert(response.data.msg)
          window.setTimeout(nav("/login"))
        }
        else{
          toast.error(response.data.msg)
        }
      })
    }
  }

  return (
    <div id="img">
      <h1 id="reg">REGISTRATION</h1>
      <Container id="con">
        <Row className="border shadow p-6 mt-2 rounded">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control type='text' name='cname' id="txt" onChange={(e) => { setValue(e.target.name, e.target.value) }} isInvalid={!!errors.cname} />
              <Form.Control.Feedback type="invalid">{errors.cname}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" name='address' id="txt" onChange={(e) => {setValue(e.target.name, e.target.value)}} isInvalid={!!errors.address}/>
              <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Contact</Form.Label>
              <Form.Control type="text" name="contact" id="txt" onChange={(e) =>{ setValue(e.target.name, e.target.value)}} isInvalid={!!errors.contact} />
              <Form.Control.Feedback type="invalid">{errors.contact}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" id="txt" onChange={(e) => {setValue(e.target.name, e.target.value)}} isInvalid={!!errors.email}/>
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" id="txt" onChange={(e) => {setValue(e.target.name, e.target.value)}} isInvalid={!!errors.password}/>
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" name="confirm" id="txt" onChange={(e) => {setValue(e.target.name, e.target.value)}} isInvalid={!!errors.confirm}/>
              <Form.Control.Feedback type="invalid">{errors.confirm}</Form.Control.Feedback>
            </Form.Group>
            <Button id="btn" type="submit">Register</Button>
          </Form>
          <ToastContainer />
        </Row>
      </Container>
    </div>
  )
}

