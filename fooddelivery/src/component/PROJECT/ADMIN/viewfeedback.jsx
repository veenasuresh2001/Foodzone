import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table } from 'react-bootstrap';

export default function Viewfeedback() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    
    const url = `http://localhost:9000/feedbackview`;
    
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
      <h2 id="custview">FEEDBACKS</h2>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>NAME</th>
            
            
            <th>REVIEW</th>
            
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
                <td>{order.cName}</td>
              <td>{order.feedback}</td>
              
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
