import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Customise = () => {
  const idn = sessionStorage.getItem("userId");
  const navigate = useNavigate();
  const cName = sessionStorage.getItem("cName");
  const [food1, setFood1] = useState("");
  const [food2, setFood2] = useState("");
  const [food3, setFood3] = useState("");
  const [hotels, setHotels] = useState([]);
  const [hotel, setHotel] = useState("");
  const [foods, setFoods] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [numberOfDays, setNumberOfDays] = useState(0);

  useEffect(() => {
    const url = "http://localhost:9000/viewhotels";
    axios
      .get(url)
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hotels:", error);
      });
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [food1, food2, food3, numberOfDays]);

  const handleHotelChange = (e) => {
    const selectedHotel = e.target.value;
    setHotel(selectedHotel);
    const url = `http://localhost:9000/viewfoods/${selectedHotel}`;
    axios
      .get(url)
      .then((response) => {
        setFoods(response.data);
      })
      .catch((error) => {
        console.error("Error fetching food items:", error);
      });
  };

  const handleFoodChange = (e, setFood) => {
    const selectedFood = e.target.value;
    setFood(selectedFood);
  };

  const calculateTotalPrice = () => {
    let total = 0;
    [food1, food2, food3].forEach((food) => {
      const selectedFood = foods.find((item) => item.foodname === food);
      if (selectedFood) {
        total += selectedFood.rate;
      }
    });
    setTotalPrice(total * numberOfDays);
  };

  const calculateNumberOfDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setNumberOfDays(diffDays);
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    calculateNumberOfDays();
    calculateTotalPrice();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      food1,
      food2,
      food3,
      hotel,
      startDate,
      endDate,
      totalPrice,
      numberOfDays
    };

    axios
      .post(`http://localhost:9000/customise/${cName}`, formData)
      .then((response) => {
        if (response.data.status === 1) {
          alert(response.data.msg);
          sessionStorage.setItem("userId", response.data.userId);
          sessionStorage.setItem("hotelname", response.data.hotel);
          sessionStorage.setItem("amount", response.data.totalPrice);
          navigate("/pay"); // using navigate directly here
        } else {
          alert(response.data.msg);
        }
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
      });
  };

  return (
    <div>
      <h2 id="report">Customise Form</h2>
      <form onSubmit={handleSubmit}>
        
        <div id="custom">
          <label>Hotel:</label>
          <select value={hotel} onChange={handleHotelChange}>
            <option value="">Select Hotel</option>
            {hotels.map((hotel) => (
              <option key={hotel._id} value={hotel.hname}>
                {hotel.hname}
              </option>
            ))}
          </select>
        </div>
        <div id="custom">
          <label>Food 1</label>
          <select value={food1} onChange={(e) => handleFoodChange(e, setFood1)}>
            <option value="">Select Food</option>
            {foods.map((food) => (
              <option key={food._id} value={food.foodname}>
                {food.foodname}
              </option>
            ))}
          </select>
        </div>
        <div id="custom">
          <label>Food 2</label>
          <select value={food2} onChange={(e) => handleFoodChange(e, setFood2)}>
            <option value="">Select Food</option>
            {foods.map((food) => (
              <option key={food._id} value={food.foodname}>
                {food.foodname}
              </option>
            ))}
          </select>
        </div>
        <div id="custom">
          <label>Food 3</label>
          <select value={food3} onChange={(e) => handleFoodChange(e, setFood3)}>
            <option value="">Select Food</option>
            {foods.map((food) => (
              <option key={food._id} value={food.foodname}>
                {food.foodname}
              </option>
            ))}
          </select>
        </div>
        <div id="custom">
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div id="custom">
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleCalculate}>
          Calculate
        </button>

        <div id="custom">
          <label>Total Price:</label>
          <span>{totalPrice}</span>
        </div>
        <div id="custom">
          <label>Number of Days:</label>
          <span>{numberOfDays}</span>
        </div>
        <button type="submit">Submit Order</button>
        
      </form>
    </div>
  );
};

export default Customise;
