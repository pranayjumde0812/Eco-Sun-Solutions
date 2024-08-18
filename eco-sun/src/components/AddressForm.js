import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const AddressForm = ({ show, handleClose, onSave }) => {
    const [addressData, setAddressData] = useState({
        addressType: 'RESIDENTIAL',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        userId: localStorage.getItem('userId'),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddressData({ ...addressData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9292/addresses', addressData);
            onSave(response.data);
            handleClose();
        } catch (error) {
            console.error('Error adding address:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Address</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formAddressType">
                        <Form.Label>Address Type</Form.Label>
                        <Form.Control
                            as="select"
                            name="addressType"
                            value={addressData.addressType}
                            onChange={handleChange}
                        >
                            <option>RESIDENTIAL</option>
                            <option>BUSINESS</option>
                            <option>BILLING</option>
                            <option>SHIPPING</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formAddress" className="mt-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={addressData.address}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formCity" className="mt-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            name="city"
                            value={addressData.city}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formState" className="mt-3">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            type="text"
                            name="state"
                            value={addressData.state}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formPostalCode" className="mt-3">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            type="text"
                            name="postalCode"
                            value={addressData.postalCode}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formCountry" className="mt-3">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            name="country"
                            value={addressData.country}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3">
                        Save Address
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddressForm;
