import {Container,Form,Row,Button} from "react-bootstrap";
import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import AXIOS from 'axios'
import { GoHomeFill } from "react-icons/go";
export default function Adminlogin(){
  const nav=useNavigate();

    const [data,setData]=useState({adminname:"",password:""})
    
    const [errors,setErrors]=useState({})
    const setValue=(field,value)=>{
        setData({...data,[field]:value})
        if(!!errors[field]){setErrors({
            ...errors,[field]:null
        })}
    }
    const findErrors=()=>{
        const {adminname,password}=data
        const newerrors={};
        if(!password||password===""){
            newerrors.password="password field is required";
        }
        if(!adminname||adminname===''){
            newerrors.email="Admin name field is required!";
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
        const url="http://localhost:9000/adminlogin";
        AXIOS.post(url,data).then((response)=>{
            if(response.data.status===1){
                toast.error(response.data.msg)
            }
            else{
              window.setTimeout(nav("/adminhome"))
            }
        });  
}
    }
    return (
        <div id="adminloginimage">
          <h1 id="adminhead">ADMIN LOGIN</h1>
          <Container id="adminlogincon">
            <Row>
              <Form onSubmit={checkLogin}>
                <Form.Group>
                  <Form.Label id="t">Admin name</Form.Label>
                  <Form.Control
                    type="text"
                    name="adminname"
                    id="login"
                    onChange={(e) => {
                      setValue(e.target.name, e.target.value);
                    }}
                  placeholder="Enter admin name"/>
                  
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
