// src/RecordManager.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecordManager = () => {
    const [records, setRecords] = useState([]);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');

    const fetchRecords = async () => {
        const response = await axios.get('https://demo-2-5nc8.onrender.com/records'); // Adjust the URL if needed
        setRecords(response.data);
    };

    const addRecord = async (e) => {
        e.preventDefault();
        if (name && mobile) {
            await axios.post('https://demo-2-5nc8.onrender.com/add', { name, mobile });
            setName('');
            setMobile('');
            fetchRecords();
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    return (
        <div>
            <h1>MongoDB Record Manager</h1>

            <h2>Add Record</h2>
            <form onSubmit={addRecord}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                    required
                />
                <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter mobile number"
                    required
                />
                <button type="submit">Add</button>
            </form>

            <h2>Records</h2>
            <ul>
                {records.map((record) => (
                    <li key={record._id}>Name: {record.name}, Mobile: {record.mobile}</li>
                ))}
            </ul>
        </div>
    );
};

export default RecordManager;
