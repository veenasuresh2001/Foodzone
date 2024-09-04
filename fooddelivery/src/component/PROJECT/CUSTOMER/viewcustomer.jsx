import { useEffect, useState } from "react";
import AXIOS from 'axios';
import { Table } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


export default function Customerview() {
    const [record, setRecord] = useState([]);

    useEffect(() => {
        console.log("useEffect working");
        const url = "http://localhost:9000/fetchAllcust";
        AXIOS.get(url).then((res) => {
            setRecord(res.data);
            console.log("data reached");
        });
    }, []);

    const deleteuser = (userId) => {
        let ans = window.confirm("Do you want to delete?");
        if (ans) {
            const url = `http://localhost:9000/deleteuser/${userId}`;
            AXIOS.delete(url)
                .then((res) => {
                    alert(res.data);
                })
        } else {
            alert("Deletion canceled");
        }
    };
    

    return (
        <>
           <h2 id="custview">Registered Customers</h2>
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
                    {record.map((ls) => (
                        <tr key={ls._id}>
                            <td>#</td>
                            <td>{ls.cname}</td>
                            <td>{ls.contact}</td>
                            <td>{ls.email}</td>
                            <td>{ls.address}</td>
                            <td>
                                <MdDelete
                                    onClick={() => deleteuser(ls._id)}
                                    style={{ color: 'red', fontSize: '25px' }}
                                />
                                &nbsp;
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
