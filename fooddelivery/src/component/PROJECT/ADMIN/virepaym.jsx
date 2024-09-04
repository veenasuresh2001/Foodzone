import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table } from 'react-bootstrap';

export default function Viewpay() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    
    const url = `http://localhost:9000/viewpay`;
    
    axios.get(url)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    <Container>
      <h2 id="custview">Completed Payments</h2>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>NAME</th>
            
            <th> Card Number</th>
            <th>Amount</th>
            
            <th>Hotelname</th>
            <th>DELIVERY ADDRESS</th>
            <th>PHONE NUMBER</th>
            
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
                <td>{order.name}</td>
              
              <td>{order.number}</td>
              <td>{order.amount}</td>
              
              <td>{order.hotelname}</td>
              <td>{order.address}</td>
              <td>{order.phone}</td>
              
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
