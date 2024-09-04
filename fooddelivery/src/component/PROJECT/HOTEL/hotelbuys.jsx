import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table } from 'react-bootstrap';

export default function Hotelbuy() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const hName=sessionStorage.getItem("hName")
    const url = `http://localhost:9000/hotelbuy/${hName}`;
    
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
      <h3 id="order">Orders</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
          <th>Customer Name</th>
            <th>Food name</th>
            <th>Rate</th>
            <th>Hotel Name</th>
            
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
                <td>{order.cName}</td>
              <td>{order.foodname}</td>
              <td>{order.rate}</td>
              <td>{order.hotelname}</td>
              
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
