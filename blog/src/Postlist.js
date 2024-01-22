import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [comments,setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3059/api/posts');
        setPosts(response.data.reverse());
        setLoading(false);
      } catch (error) {
        console.log('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, []);


  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333' }}>Post List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {posts.map(post => (
            <li key={post._id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
              <h3 style={{ color: '#333' }}>{post.title}</h3> 
              {/* <p style={{ marginBottom: '10px' }}>{post.content}</p> */}
              <p dangerouslySetInnerHTML={{__html:post.content}}/>
              <p>Comments: </p>
            </li>
          ))}
        </ul></div>
      )}
    </div>
  );
}

export default PostList;

