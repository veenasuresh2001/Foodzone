import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';
import { MdDelete } from "react-icons/md";
export default function Viewsub() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const idn = sessionStorage.getItem("userId");
    const cName = sessionStorage.getItem("cName");
    const url = `http://localhost:9000/viewsub/${cName}`;
    
    axios.get(url)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const deleteuser = (userId) => {
    let ans = window.confirm("Do you want to delete?");
    if (ans) {
        const url = `http://localhost:9000/deletesub/${userId}`;
        axios.delete(url)
            .then((res) => {
                alert(res.data);
            })
    } else {
        alert("Deletion canceled");
    }
};


  return (
    <Container>
      <h3>ORDERS</h3>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Breakfast</th>
            <th>Lunch</th>
            <th>Dinner</th>
            <th>Duration</th>
            <th>Hotelname</th>
            <th>Amount</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.morningfood}</td>
              <td>{order.eveningfood}</td>
              <td>{order.dinner}</td>
              <td>{order.duration}</td>
              <td>{order.hotelname}</td>
              <td>{order.amount}</td>
              <td>
                                <MdDelete
                                    onClick={() => deleteuser(order._id)}
                                    style={{ color: 'red', fontSize: '25px' }}
                                />
                                &nbsp;
                                
                            </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
