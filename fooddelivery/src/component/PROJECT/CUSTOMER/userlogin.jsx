import {Container,Form,Row,Button} from "react-bootstrap";
import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import AXIOS from 'axios'
export default function Custlogin(){
  const nav=useNavigate();
    const [data,setData]=useState({email:"",password:""})
    
    const [errors,setErrors]=useState({})
    const setValue=(field,value)=>{
        setData({...data,[field]:value})
        if(!!errors[field]){setErrors({
            ...errors,[field]:null
        })}
    }
    const findErrors=()=>{
        const {email,password}=data
        const newerrors={};
        if(!password||password===""){
            newerrors.password="password field is required";
        }
        if(!email||email===''){
            newerrors.email="email field is required!";
        }
        return newerrors;
    }

    const checkLogin=(e)=>{
        e.preventDefault();
        const newErrors=findErrors();
        if(Object.keys(newErrors).length>0){
            setErrors(newErrors)
        }
        else{
        const url="http://localhost:9000/custlogin";
        AXIOS.post(url,data).then((response)=>{
            if(response.data.status===1){
                /*alert(response.data.msg)*/
                toast.error(response.data.msg)
                //alert(response.data.msg)
            }
            else{
              toast.success(response.data.msg)
              sessionStorage.setItem("userId",response.data.userId)
              sessionStorage.setItem("cName",response.data.cName)
              window.setTimeout(nav("/userhome"))
            }
        });  
}
    }
    return (
        <div id="image">
          <h1 id="head">CUSTOMER LOGIN</h1>
          <Container id="conl">
            <Row>
              <Form onSubmit={checkLogin}>
                <Form.Group>
                  <Form.Label id="t">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    id="login"
                    onChange={(e) => {
                      setValue(e.target.name, e.target.value);
                    }}
                  placeholder="Enter your email"/>
                  
                </Form.Group>
                <Form.Group>
                  <Form.Label id="t">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    id="login"
                    onChange={(e) => {
                      setValue(e.target.name, e.target.value);
                    }}
                  placeholder="Enter the Password"/>
                </Form.Group>
                <Button type="submit" id="btn1">
                  Login
                </Button>
               
              </Form>
              
              <ToastContainer/>
            </Row>
            
          </Container>
          <a href="home">
             <GoHomeFill id="exit" />
         </a>
        </div>
    )
}
