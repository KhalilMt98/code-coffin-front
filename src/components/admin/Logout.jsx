  import axios from 'axios';
  import React, { useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';

  const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const logout = async () => {
        const token = localStorage.getItem('token'); 
        try {
          const response = await axios.post('http://localhost:8000/api/logout', {}, {
            headers: {
              'Authorization': `Bearer ${token}` 
            }
          });
          console.log('Logout successful:', response.data); 
          localStorage.removeItem('token');
          navigate('/login'); 
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };
      logout();
    },);

    return null; 
  };

  export default Logout;
