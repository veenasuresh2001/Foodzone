import React, { useState } from "react";
import axios from 'axios';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

export default function AddPlan() {
  const Name=sessionStorage.getItem('hName')
    const [record, setRecord] = useState({
        morningfood: '',
        eveningfood: '',
        dinner: '',
        amount: '',
        duration: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:9000/addplan/${Name}`, record);
            if (response.data.status === 1) {
                alert(response.data.msg);
            } else {
                alert(response.data.msg);
            }
        } catch (error) {
            console.error('Error occurred:', error);
            alert("Upload failed");
        }
    };

    const setValue = (field, value) => {
        setRecord({ ...record, [field]: value });
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} className="text-center"></Col>
                <Col className="border bg-white justify-content-center p-2 m-4 rounded-4" lg={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Breakfast</Form.Label>
                            <Form.Control type="text" name="morningfood" onChange={(e) => setValue(e.target.name, e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Lunch</Form.Label>
                            <Form.Control type="text" name="eveningfood" onChange={(e) => setValue(e.target.name, e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Dinner</Form.Label>
                            <Form.Control type="text" name="dinner" onChange={(e) => setValue(e.target.name, e.target.value)} />
                        </Form.Group>
                
                        <Form.Group>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="text" name="amount" placeholder="Enter Rate" onChange={(e) => setValue(e.target.name, e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Duration</Form.Label>
                            <Form.Control type="text" name="duration" placeholder="Enter Date" onChange={(e) => setValue(e.target.name, e.target.value)} />
                        </Form.Group>
                        <Form.Group className='pt-3'>
                            <Button type="submit">Submit</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
