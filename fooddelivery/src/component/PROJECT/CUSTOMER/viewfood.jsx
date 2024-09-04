import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
export default function Viewfood() {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();
  const cName = sessionStorage.getItem("cName");
  useEffect(() => {
    const idn = sessionStorage.getItem("userId");
    
    const url = `http://localhost:9000/viewfood/${idn}`;
    
    axios.get(url)
      .then((res) => {
        setFoods(res.data);
      })
      .catch((error) => {
        console.error("Error fetching food items:", error);
      });
  }, []);
  const makeSubscription = (userId) => {
    const url = `http://localhost:9000/orderfood/${userId}/${cName}`;
    axios.post(url)
      .then((res) => {
        alert(res.data.msg); 
        sessionStorage.setItem("userId", res.data.userId);
        //sessionStorage.setItem("cName", res.data.cName);
        sessionStorage.setItem("hotelname", res.data.hotelname);
        sessionStorage.setItem("amount", res.data.rate);
        window.setTimeout(() => navigate("/pay"), 1000);
      })
      .catch(error => {
        console.error("Error making subscription:", error);
        alert("Subscription failed");
      });
  };

  return (
    <Container>
      <h3 id="report">Food Items</h3>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Food name</th>
            <th>Hotel name</th>
            <th>Image</th>
            <th>Rate</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food._id}>
              <td>{food.foodname}</td>
              <td>{food.Name}</td>
              <td>
                <img
                  src={`http://localhost:9000/${food.image}`}
                  className="rounded thumbnail me-2"
                  width={50}
                  height={50}
                  alt="Food"
                />
              </td>
              <td>{food.rate}</td>
              <td>{food.description}</td>
              <td>
                <button onClick={() => makeSubscription(food._id)}>BUY</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
