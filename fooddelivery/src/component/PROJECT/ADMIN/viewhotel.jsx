import React from "react";
import { Table } from "react-bootstrap";
import AXIOS from 'axios';
import { useEffect, useState } from "react";

export default function Reghotel(){
    const [record, setRecord] = useState([]);

    useEffect(() => {
        console.log("useEffect working");
        const url = "http://localhost:9000/fetchhotel";
        AXIOS.get(url).then((res) => {
            setRecord(res.data);
            console.log("data reached");
        });
    }, []);


    return(
        <>
        <h2 id='hotel'>APPROVED HOTELS</h2>
        <Table>
            <thead>
          <tr>
            <th>#</th>
            <th>Hotel Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Contact</th>
          </tr>
          </thead>
          <tbody>
                    {record.map((ls) => (
                        <tr key={ls._id}>
                            <td>#</td>
                            <td>{ls.hname}</td>
                            <td>{ls.address}</td>
                            <td>{ls.email}</td>
                            <td>{ls.contact}</td>
                           </tr>
                    ))}
                </tbody>
            
        </Table>
        </>
    );
}