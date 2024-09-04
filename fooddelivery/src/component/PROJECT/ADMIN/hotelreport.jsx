import React, { useState, useEffect } from "react";
import axios from "axios";

const Hotelreport = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [hotelData, setHotelData] = useState(null); 

  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  useEffect(() => {
    if (selectedMonth) {
      const url = `http://localhost:9000/hotelreport/${selectedMonth}`; // Corrected URL
      
      axios.get(url)
        .then((res) => {
          console.log("Data from server:", res.data);
          setHotelData(res.data); 
        })
        .catch((error) => {
          console.error("Error fetching hotel report:", error);
        });
    }
  }, [selectedMonth]); 

  return (
    <div>
      <h2 id="report">Select a Month:</h2>
      <select value={selectedMonth} onChange={handleChange}>
        <option value="">Select</option>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
      
      {hotelData && (
       <div style={{ marginTop: '50px' }}>
       
       <h2>Hotel Details:</h2>
       {hotelData.length > 0 ? (
         <table style={{ borderCollapse: 'collapse' }}>
           <thead>
             <tr>
               <th>Sl No</th>
               <th>Name</th>
               <th>Email</th>
               <th>Phone</th>
               <th>Address</th>
             </tr>
           </thead>
           <tbody>
             {hotelData.map((hotel, index) => (
               <tr key={index}>
                 <td style={{ padding: '8px' }}>{index + 1}</td>
                 <td style={{ padding: '8px' }}>{hotel.hname}</td>
                 <td style={{ padding: '8px' }}>{hotel.email}</td>
                 <td style={{ padding: '8px' }}>{hotel.contact}</td>
                 <td style={{ padding: '8px' }}>{hotel.address}</td>
               </tr>
             ))}
           </tbody>
         </table>
       ) : (
         <p>No hotels found for selected month.</p>
       )}
     </div>
      )}
    </div>
  );
};

export default Hotelreport;
