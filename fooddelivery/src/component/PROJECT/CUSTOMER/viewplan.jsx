import React, { useState, useEffect } from "react";
import AXIOS from "axios";
import { Container, Table } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default function Viewplan() {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();
  const cName = sessionStorage.getItem("cName");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await AXIOS.get("http://localhost:9000/fetchplan");
        setPlans(response.data);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };
    fetchPlans();
  }, []);

  const makeSubscription = (userId) => {
    const url = `http://localhost:9000/order/${userId}/${cName}`;
    AXIOS.post(url)
      .then((res) => {
        alert(res.data.msg); 
        sessionStorage.setItem("userId", res.data.userId);
        //sessionStorage.setItem("cName", res.data.cName);
        sessionStorage.setItem("hotelname", res.data.hotelname);
        sessionStorage.setItem("amount", res.data.amount);
        window.setTimeout(() => navigate("/pay"), 1000);
      })
      .catch(error => {
        console.error("Error making subscription:", error);
        alert("Subscription failed");
      });
  };

  return (
    <Container>
      <h3>Plans</h3>
      <Table className="border">
        <thead>
          <tr>
     
            <th>Hotelname</th>
           
            <th>Breakfast</th>
            <th>Lunch</th>
            <th>Dinner</th>
            <th>Amount</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan._id}>
              <td>{plan.hotelname}</td>
             
              <td>{plan.morningfood}</td>
              <td>{plan.eveningfood}</td>
              <td>{plan.dinner}</td>
              <td>{plan.amount}</td>
              <td>{plan.duration}</td>
              <td>
                <button onClick={() => makeSubscription(plan._id)}>BUY</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
