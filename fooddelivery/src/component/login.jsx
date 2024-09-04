/*import './signup.css';
import pic from '../images/pexels-vedran-miletić-2341566.jpg'*/
import{Container,Row,Col,Button,Form}  from 'react-bootstrap';
import { useState } from 'react';
import AXIOS from 'axios';
export default function Userlogin(){
    const [record,setRecord]=useState({email:"",password:""})
    const [errors,setErrors]=useState({});
    /*

     object 
     {fullname:"",email:"",phone:"",password:""}
     {...record,fullname}


    */

     //validation 
     const findErrors=()=>{
        const re =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const {email,password}=record;
        const newerrors={};
        if(!password||password===""){
            newerrors.password="password field is required";
        }
        else if(password.length>6){
            newerrors.password="content is too long";
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
        const url="http://localhost:9000/custlogin";
        AXIOS.post(url,record).then((response)=>{
            if(response.data.status==1){
                alert(response.data.msg)
            }
            else{
                alert(response.data.msg)
            }
        });    }
    
   }

    return(
        <>
        <Container>
            <Row>
                <Col>
                </Col>
            </Row>
            <Row>
                <Col>
                 <Form onSubmit={handlerSubmit}>
                    <Form.Group>
                    <Form.Label>
                     Email
                    </Form.Label>
    <Form.Control type="email" name="email" onChange={(e)=>{
                        setValue(e.target.name,e.target.value)
                    }} />
                    {record.fullname}

                    </Form.Group>

                    <Form.Group>
                    <Form.Label>
                       Password
                    </Form.Label>

    <Form.Control type="password" name="password" onChange={(e)=>{
                        setValue(e.target.name,e.target.value)
                    }} isInvalid={!!errors.password} />
                        
                        <Form.Control.Feedback type='invalid'>
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                   <Form.Group>
                    <Button type="submit">
                        Submit
                    </Button>
                   </Form.Group>

                 </Form>
                </Col>
            </Row>
        </Container>
    
        
        
        </>
    )
}