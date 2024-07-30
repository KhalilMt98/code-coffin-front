import React, { useState } from 'react';
import axios from 'axios';
const AddUsers = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please upload a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No authentication token found.');
        return;
      }

      const response = await axios.post('http://localhost:8000/api/upload-users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      setMessage(response.data.message);
      setErrors([]);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setMessage(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="container1">
      <h2 className="heading">Add Users</h2>
      <form onSubmit={handleSubmit} className="form">
        <input type="file" accept=".xlsx, .csv" onChange={handleFileChange} className="input" />
        <button type="submit" className="button">Upload</button>
      </form>
      {errors.length > 0 && (
        <div className="errorsContainer">
          <h3>Validation Errors:</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index} className="errorItem">{error}</li>
            ))}
          </ul>
        </div>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AddUsers;
