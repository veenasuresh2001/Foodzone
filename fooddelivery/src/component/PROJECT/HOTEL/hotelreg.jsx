import React, { useState } from "react";
import { Form, Button, Container, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import AXIOS from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function Customerreg() {
  const [record, setRecord] = useState({ hname: "", address: "", contact: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const nav = useNavigate();

  const setValue = (field, value) => {
    setRecord({ ...record, [field]: value });
    if (!!errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  }

  const findErrors = () => {
    const pass = /^[A-Za-z0-9@#$*]{6,16}$/;
    const { hname, contact, address, email, password, confirm } = record;
    const newErrors = {};

    if (!hname || hname === "") {
      newErrors.hname = "Hotel name is required";
    } else if (hname.length > 30) {
      newErrors.hname = "Content is too long";
    }
    if (!address || address === "") {
      newErrors.address = "Address field is required"
    }
    if (!contact || contact === "") {
      newErrors.contact = "Contact field is required";
    } else if (contact.length !== 10) {
      newErrors.contact = "Invalid contact";
    }
    if (!email || email === "") {
      newErrors.email = "Email field is required"
    }
    if (!pass.test(password)) {
      newErrors.password = "Invalid password"
    }
    if (password !== confirm) {
      newErrors.confirm = "Password doesn't match";
    }
    return newErrors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = findErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const url = "http://localhost:9000/hotelregister";
      AXIOS.post(url, record)
        .then((response) => {
          if (response.data && response.data.status === 1) {
            toast.success(response.data.msg);
            alert(response.data.msg);
            window.setTimeout(() => nav("/hotellogin"), 3000);
          } else if (response.data && response.data.status === 0 && response.data.msg === "Email already exists") {
            // Alert if email already exists
            toast.error(response.data.msg);
            alert(response.data.msg);
          } else {
            toast.error(response.data ? response.data.msg : "Unknown error occurred");
          }
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          toast.error("An error occurred while processing your request.");
        });
    }
  };

  return (
    <div id='hotelreg'>
      <h2 id="hotelreghead">REGISTRATION</h2>
      <Container id="hotelregcon">
        <Row className="border shadow p-6 mt-2 rounded">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Hotel Name</Form.Label>
              <Form.Control type='text' name='hname' id="txtbox" onChange={(e) => setValue(e.target.name, e.target.value)} isInvalid={!!errors.hname} />
              <Form.Control.Feedback type="invalid">{errors.hname}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Registration id</Form.Label>
              <Form.Control type='text' name='reg_id' id="txtbox" required />
            </Form.Group>

            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" name='address' id="txtbox" onChange={(e) => setValue(e.target.name, e.target.value)} isInvalid={!!errors.address} />
              <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Contact</Form.Label>
              <Form.Control type="text" name="contact" id="txtbox" onChange={(e) => setValue(e.target.name, e.target.value)} isInvalid={!!errors.contact} />
              <Form.Control.Feedback type="invalid">{errors.contact}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" id="txtbox" onChange={(e) => setValue(e.target.name, e.target.value)} isInvalid={!!errors.email} />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" id="txtbox" onChange={(e) => setValue(e.target.name, e.target.value)} isInvalid={!!errors.password} />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" name="confirm" id="txtbox" onChange={(e) => setValue(e.target.name, e.target.value)} isInvalid={!!errors.confirm} />
              <Form.Control.Feedback type="invalid">{errors.confirm}</Form.Control.Feedback>
            </Form.Group>
            <Button id="btn" type="submit">Register</Button>
          </Form>
        </Row>
      </Container>
    </div>
  )
}
