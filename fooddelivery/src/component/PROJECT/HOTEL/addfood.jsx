import React from "react";
import { useState } from "react";
import AXIOS from 'axios'
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
export default function Addfood()
{
  const hName=sessionStorage.getItem("hName")
    const [record, setRecord] = useState({});
    const [errors, setErrors] = useState({});
    const[image,setImage]=useState({})
    const formdata=new FormData();
//Handle Submission
const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = findErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const formdata = new FormData();
      formdata.append('foodname', record.foodname);
      formdata.append('rate', record.rate);
      
      formdata.append('description', record.description);
      
      formdata.append('image', record.image);
      const url = `http://localhost:9000/addfood/${hName}`;
      AXIOS.post(url, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        if (response.data.status === 1) {
          alert(response.data.msg);
        } else {
          alert(response.data.msg);
        }
      });
    }
  };
//Sets the value to record
   const setValue = (field, value) => 
   {
        setRecord({ ...record, [field]: value });
        if (!!errors[field]) 
        {
            setErrors({
                ...errors,
                [field]: null
            });
        }
   }
//Validation
const findErrors = () => {
    const re =/^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    const { foodname, rate, hotelname,description } = record;
    const newErrors = {};
  
    if (!foodname || foodname === "") {
      newErrors.foodame = "foodname field is required";
    } 
  
    if (!rate || rate === '') {
      newErrors.rate = "rate field is required!";
    } 
   
  
    
    if(!description)
    {
        newErrors.description= "Description is required"
    }
  
   
  
    return newErrors;
  };


    return (
        <Container id="addfood">
       
        <Row className=" justify-content-center ">
        <Col xs={12} className="text-center">
        <h1></h1>
    </Col>
    <Col className="border bg-white justify-content-center p-4 m-4 rounded-4" lg={6}>                   <Form  encType='multipart/form-data' onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label className='name'>Foodname</Form.Label>
                            <Form.Control type="text" name="foodname" onChange={(e)=>setValue(e.target.name,e.target.value)} isInvalid={!!errors.fullname}  />
                            <Form.Control.Feedback type='invalid'>{errors.foodname}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Rate</Form.Label>
                            <Form.Control type="text" name="rate" onChange={(e)=>setValue(e.target.name,e.target.value)}   />
                            <Form.Control.Feedback type='invalid'>{errors.rate}</Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group>
                            <Form.Label>Food Image</Form.Label>
                            <Form.Control type="file" name="image" onChange={(e) => setValue(e.target.name, e.target.files[0] )}  />
                        </Form.Group>

                        

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" onChange={(e)=>setValue(e.target.name,e.target.value)}  />
                        <Form.Control.Feedback type='invalid'>{errors.description}</Form.Control.Feedback>
                    </Form.Group>
                        
                        
                        <Form.Group className='pt-3'>
                            <Button type="submit" > Submit</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}