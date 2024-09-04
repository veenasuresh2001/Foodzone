import React, { useState } from 'react';
import AXIOS from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Paymentpage = () => {
  const userId = sessionStorage.getItem("userId");
  const amount = sessionStorage.getItem("amount");
  const hotelname = sessionStorage.getItem("hotelname");
  const nav=useNavigate();
  const [data, setData] = useState({ number: '', expiry: '', cvv: '', name: '', phone: '', address: '' });
  const [errors, setErrors] = useState({});

  // Set value for input field
  const setValue = (field, value) => {
    setData({ ...data, [field]: value });
    setErrors({ ...errors, [field]: null }); // Clear error for the field
  }

  // Form validation
  const findErrors = () => {
    const { number, expiry, cvv, name,phone,address } = data;
    const newErrors = {};

    if (!number ) {
      newErrors.number = "field is required";
    }
    if (!phone ) {
      newErrors.phone = "field is required";
    }
    if (!address) {
      newErrors.address = "field is required";
    }
    if (!expiry) {
      newErrors.expiry = "field is required";
    }
    if (!cvv) {
      newErrors.cvv = "field is required";
    }
    if (!name) {
      newErrors.name = " field is required";
    }

    return newErrors;
  }

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = findErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const url = `http://localhost:9000/payment/${amount}/${userId}/${hotelname}`;
      AXIOS.post(url, data).then((response) => {
        if (response.data.status === 1) {
          toast.success(response.data.msg);
          alert(response.data.msg);
          window.setTimeout(nav("/userhome"))
          
        } else {
          toast.error(response.data.msg);
        }
      }).catch((error) => {
        console.error("Error submitting payment:", error);
        toast.error("Failed to submit payment");
      });
    }
  }

  return (
    <div id="pay">
      <h2>Payment Form</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label className="txt">Card Number:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="number"
                  value={data.number}
                  onChange={(e) => setValue(e.target.name, e.target.value)}
                />
                {errors.number && <div className="error">{errors.number}</div>}
              </td>
            </tr>
            <tr>
              <td>
                <label className="txt">Expiry:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="expiry"
                  value={data.expiry}
                  onChange={(e) => setValue(e.target.name, e.target.value)}
                />
                {errors.expiry && <div className="error">{errors.expiry}</div>}
              </td>
            </tr>
            <tr>
              <td>
                <label className="txt">CVV:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="cvv"
                  value={data.cvv}
                  onChange={(e) => setValue(e.target.name, e.target.value)}
                />
                {errors.cvv && <div className="error">{errors.cvv}</div>}
              </td>
            </tr>
            <tr>
              <td>
                <label className="txt">Name:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={(e) => setValue(e.target.name, e.target.value)}
                />
                {errors.name && <div className="error">{errors.name}</div>}
              </td>
            </tr>
            <tr>
              <td>
                <label className="txt">Amount to pay:</label>
              </td>
              <td>
                <label className="txt">{amount}</label>
              </td>
            </tr>
            <tr>
            <td>
                <label className="txt">Phone Number:</label>
              </td>
            <td>
                <input
                  type="text"
                  name="phone"
                  value={data.phone}
                  onChange={(e) => setValue(e.target.name, e.target.value)}
                />
                {errors.phone && <div className="error">{errors.phone}</div>}
              </td>
            </tr>

            <tr>
            <td>
                <label className="txt">Delivery address:</label>
              </td>
            <td>
                <input
                  type="text"
                  name="address"
                  value={data.address}
                  onChange={(e) => setValue(e.target.name, e.target.value)}
                />
                {errors.address&& <div className="error">{errors.address}</div>}
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default Paymentpage;
