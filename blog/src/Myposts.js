import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

export default function Myposts() {
  const navigate = useNavigate()
  const [myposts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3059/api/posts/myposts',{headers:
    {
        Authorization:localStorage.getItem('token')
    }
    });
    console.log(response.data)
        setMyPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleEdit = (postId)=>{
    navigate(`/Editpost/${postId}`)
  }

  const handleDelete = async (postId, i)=>{
    try{
       await axios.delete(`http://localhost:3059/api/posts/${postId}`,{
        headers:{Authorization: localStorage.getItem('token')}
      })
      const updatedPosts = [...myposts];
      updatedPosts.splice(i, 1);
      setMyPosts(updatedPosts);
    } catch(e){
      console.log(e)
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333' }}>My Posts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {myposts.map((post, i) => (
            <li key={post._id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
              <h2 style={{ color: '#333' }}>{post.title}</h2>
              {/* <p style={{ marginBottom: '10px' }}>{post.content}</p> */}
              <p dangerouslySetInnerHTML={{__html:post.content}}/>
              <button onClick={()=>handleEdit(post._id)} style={{ marginRight: '5px', padding: '8px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
              <button onClick={() => handleDelete(post._id, i)} style={{ padding: '8px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

//   return (
//     <div>
//       <h1>My Posts</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <ul>
//           {myposts.map((post, i) => (
//             <li key={post._id}>
//               <h2>{post.title}</h2>
//               <p>{post.content}</p>
//               <button>Edit</button>
//               <button onClick={()=>handleDelete(post._id, i)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
