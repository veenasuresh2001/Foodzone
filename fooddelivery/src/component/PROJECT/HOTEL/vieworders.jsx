import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table } from 'react-bootstrap';

export default function Hotelsub() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const hName=sessionStorage.getItem("hName")
    const url = `http://localhost:9000/hotelsub/${hName}`;
    
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
      <h3 id="order">Subscriptions</h3>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>NAME</th>
            <th>Breakfast</th>
            <th>Lunch</th>
            <th>Dinner</th>
            <th>Duration</th>
            <th>Hotelname</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
                <td>{order.cName}</td>
              <td>{order.morningfood}</td>
              <td>{order.eveningfood}</td>
              <td>{order.dinner}</td>
              <td>{order.duration}</td>
              <td>{order.hotelname}</td>
              <td>{order.amount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
