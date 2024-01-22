import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register({ toast }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [passwordHash, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('passwordHash', passwordHash);
      formData.append('profileImage', profileImage);

      const response = await axios.post('http://localhost:3059/api/users/register', formData);
      console.log(response.data);

      navigate('/Login');
      toast();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Register here</h1>

      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <label style={labelStyle}>Username</label>
        <input
          type="text"
          name="Username"
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />{' '}
        <br />

        <label style={labelStyle}>Email</label>
        <input
          type="text"
          name="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />{' '}
        <br />

        <label style={labelStyle}>Password</label>
        <input
          type="password"
          name="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />{' '}
        <br />

        <label style={labelStyle}>Upload profile-pic</label>
        <input
          type="file"
          name="profileImage"
          onChange={handleFileChange}
          style={inputStyle}
        />{' '}
        <br />

        <input
          type="submit"
          style={{
            padding: '10px',
            backgroundColor: '#323ca8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        />
      </form>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: 'bold',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  margin: '5px 0',
  boxSizing: 'border-box',
};
