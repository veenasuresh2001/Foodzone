import React from 'react'
import { useState,useEffect } from 'react'
import AXIOS from 'axios'
import { Container, Row,Col } from 'react-bootstrap'
import Userheader from './userheader'
export default function Profile() {
  const idn=sessionStorage.getItem('userId')
  const [record,setRecord]=useState([])
  useEffect(()=>{
    const url= `http://localhost:9000/fetchbyid/${idn}`;
    AXIOS.get(url).then(res =>{ 
        setRecord(res.data)
    })
  })
    return (
        <>
        <Container>
           
               {
  record.map((ls)=>{

    return(

        <Row className='rounded shadow p-4 border mt-3' style={{backgroundColor: "rgb(211, 211, 211)"}}>
   <Col lg={2}>
           <img src={ls.imageurl} className='rounded-circle bg-info' style={{width:'100%'
        ,height:'150px'   
        }}/>
        </Col>
        <Col lg={10}>
            <h2>Userid: {ls._id} </h2>
            <h3>Name: {ls.cname}</h3>
            <h4>Email: <a href=''>{ls.email}</a></h4>
            
        </Col>
        </Row>
     
       
    )

  })

               }
                
           
        </Container>
        
        </>
  )
}