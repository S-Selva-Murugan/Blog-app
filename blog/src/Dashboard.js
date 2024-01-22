import { Link, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Postlist from './Postlist';
import Myposts from './Myposts';

export default function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [postImg, setPostImg] = useState(null);
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3059/api/users/profile', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setProfile(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!newPost.title.trim()) {
        setTitleError('Title cannot be empty');
      } else {
        setTitleError('');
      }

      if (!newPost.content.trim()) {
        setContentError('Content cannot be empty');
      } else {
        setContentError('');
      }

      const formData = new FormData();
      formData.append('title', newPost.title);
      formData.append('content', newPost.content);
      formData.append('postImage', postImg);

      const response = await axios.post(
        'http://localhost:3059/api/posts',
        formData,
        {
          headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(response);
      setNewPost({ title: '', content: '' });
      setPostImg(null);
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handlePostImage = (e) => {
    const postImage = e.target.files[0];
    setPostImg(postImage);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      
      <h1 style={{ color: '#333' }}>Welcome to the blog app {profile.username}</h1>
      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <div>
          {profile.profileImage && (
            <img
              src={`http://localhost:3059/images/${profile.profileImage}`}
              alt="Profile"
              style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '0%' }}
            />
          )}
          <p style={{ marginBottom: '10px' }}>Name: {profile.username}</p>
          <p>Email: {profile.email}</p>
          <Link to="/Postlist" style={{ marginRight: '10px' }}>All posts</Link>
          <Link to="/Myposts">My posts</Link>
          <Routes>
            <Route path="/Postlist" element={<Postlist />} />
            <Route path="/Myposts" element={<Myposts />} />
          </Routes>
        </div>
      )}
      <h2>Create your post here</h2>
      <form encType='multipart/form-data' onSubmit={handleSubmit} style={{ marginTop: '15px', width: '50%', margin: '0 auto' }}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={newPost.title}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '5px', marginBottom: '10px' }}
        /><span style={{ color: 'blue' }}>{titleError}</span>
        <br />
        <label>Content:</label>
        <textarea
          name="content"
          value={newPost.content}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '5px', marginBottom: '10px' }}
        /><span style={{ color: 'blue' }}>{contentError}</span>
        <br />
        <label>Upload post related pic: </label>
        <input type='file'
          name='postImage'
          onChange={handlePostImage}></input>
        <input type="submit" style={{ padding: '8px', backgroundColor: '#323ca8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} />
        <button onClick={() => {
        navigate('/Login');
        localStorage.clear('token');
      }}>
        Logout
      </button>
      </form>
    </div>
  );
}
