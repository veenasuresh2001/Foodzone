import React, { useState, useEffect } from "react";
import axios from "axios";

const Custreport = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [customerData, setCustomerData] = useState(null); 

  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  useEffect(() => {
    if (selectedMonth) {
      const url = `http://localhost:9000/custreport/${selectedMonth}`; // Corrected URL
      
      axios.get(url)
        .then((res) => {
          console.log("Data from server:", res.data);
          setCustomerData(res.data); 
        })
        .catch((error) => {
          console.error("Error fetching customer report:", error);
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
      
      {customerData && (
       <div style={{ marginTop: '50px' }}>
       
       <h2>Customer Details:</h2>
       {customerData.length > 0 ? (
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
             {customerData.map((customer, index) => (
               <tr key={index}>
                 <td style={{ padding: '8px' }}>{index + 1}</td>
                 <td style={{ padding: '8px' }}>{customer.cname}</td>
                 <td style={{ padding: '8px' }}>{customer.email}</td>
                 <td style={{ padding: '8px' }}>{customer.contact}</td>
                 <td style={{ padding: '8px' }}>{customer.address}</td>
               </tr>
             ))}
           </tbody>
         </table>
       ) : (
         <p>No customers found for the selected month.</p>
       )}
     </div>
      )}
    </div>
  );
};

export default Custreport;
