import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Table } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { FcApproval } from "react-icons/fc";

export default function Hotelview() {
    const [hotels, setHotels] = useState([]);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async () => {
        try {
            const response = await axios.get("http://localhost:9000/fetchAllhotel");
            setHotels(response.data);
        } catch (error) {
            console.error("Error fetching hotels:", error);
        }
    };

    const deleteHotel = async (hotelId) => {
        try {
            let ans = window.confirm("Do you want to delete?");
            if (ans) {
                const response = await axios.delete(`http://localhost:9000/deletehotel/${hotelId}`);
                alert(response.data);
                fetchHotels();
            } else {
                alert("Deletion canceled");
            }
        } catch (error) {
            console.error("Error deleting hotel:", error);
        }
    };

    const approveHotel = async (hotelId) => {
        try {
            const response = await axios.get(`http://localhost:9000/api/confirm/${hotelId}`);
            setMsg(response.data);
            // Filter out the approved hotel from the list
            setHotels(prevHotels => prevHotels.filter(hotel => hotel._id !== hotelId));
        } catch (error) {
            console.error("Error approving hotel:", error);
        }
    };

    return (
        <>
            <h2 id="custview">Requested hotels</h2>
            {msg && <p>{msg}</p>}
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {hotels.map((hotel) => (
                        <tr key={hotel._id}>
                            <td>#</td>
                            <td>{hotel.hname}</td>
                            <td>{hotel.contact}</td>
                            <td>{hotel.email}</td>
                            <td>{hotel.address}</td>
                            <td>
                                <MdDelete
                                    onClick={() => deleteHotel(hotel._id)}
                                    style={{ color: 'red', fontSize: '25px', cursor: 'pointer' }}
                                />
                                &nbsp;
                                {!hotel.approved && (
                                    <FcApproval
                                        onClick={() => approveHotel(hotel._id)}
                                        style={{ color: 'green', fontSize: '35px', cursor: 'pointer' }}
                                    />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
