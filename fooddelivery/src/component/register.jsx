//function components 
//import './signup.css';
//import pic from '../images/pexels-vedran-miletić-2341566.jpg'
import{Container,Row,Col,Button,Form}  from 'react-bootstrap';
import { useState } from 'react';
import Webheader from './webheader';
import AXIOS from 'axios';
export default function Userregister(){
    const [record,setRecord]=useState({fullname:"",email:"",crs:"",password:""})
    const [errors,setErrors]=useState({});
    /*
     object 
     {fullname:"",email:"",phone:"",password:""}
     {...record,fullname}
    */
     //validation 
     const findErrors=()=>{
        const re =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const {fullname,email}=record;
        const newerrors={};
        if(!fullname||fullname===""){
            newerrors.fullname="fullname field is required";
        }
        else if(fullname.length>30){
            newerrors.fullname="content is too long";
        }
        if(!email||email===''){
            newerrors.email="email field is required!";
        }
        // else if(!re.test(email)){
        //         newerrors.email="invalid email";
        // }
        return newerrors;
     }
   const setValue=(field,value)=>{
         setRecord({...record,[field]:value})  
         //setRecord({..record,fullname:jose})
         if ( !!errors[field] ){ setErrors({
            ...errors, [field]: null
            })
        }
   }
   const handlerSubmit=(e)=>{
    e.preventDefault();
    const newErrors=findErrors();
    if(Object.keys(newErrors).length>0){
        setErrors(newErrors);
    }
    else{
        const url="http://localhost:9000/register";
        AXIOS.post(url,record).then((response)=>{
            if(response.data.status==1){
                alert(response.data.msg)
            }
            else{
                alert(response.data.msg)
            }
        });
    }
   }
    return(
        <>
        <Container id='box'>
            <Webheader/>
            <Row>
                <Col>
                </Col>
            </Row>
            <Row className='border shadow p-5 mt-2 rounded'>
                <Col>
                 <Form onSubmit={handlerSubmit}>
                    <Form.Group>
                    <Form.Label>
                        Fullname
                    </Form.Label>
    <Form.Control type="text" name="fullname" onChange={(e)=>{
                        setValue(e.target.name,e.target.value)
                    }} isInvalid={!!errors.fullname} />
                        <Form.Control.Feedback type='invalid'>
                            {errors.fullname}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>
                       Email
                    </Form.Label>
    <Form.Control type="email" name="email" onChange={(e)=>{
                        setValue(e.target.name,e.target.value)
                    }} />
                    {record.email}
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>
                        Course
                    </Form.Label>
    <Form.Control as="select" name="crs" onChange={(e)=>{
                        setValue(e.target.name,e.target.value)
                    }} required>
                   <option>A</option>
                   <option>B</option>
                   <option>C</option>
                        </Form.Control>
                    {record.crs}
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>
                     Password
                    </Form.Label>
    <Form.Control type="password" name="password" onChange={(e)=>{
                        setValue(e.target.name,e.target.value)
                    }} isInvalid={!!errors.fullname} />
                        <Form.Control.Feedback type='invalid'>
                            {errors.fullname}
                        </Form.Control.Feedback>
                    </Form.Group>    
                   <Form.Group>
                    <Button type="submit" id='btn'>
                        Submit
                    </Button>
                    <Button href='/'>Back</Button>
                   </Form.Group>

                 </Form>
                </Col>
            </Row>
        </Container>
        </>
    )
}
