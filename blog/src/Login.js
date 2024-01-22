// // import {useFormik} from 'formik'
// // import * as yup from 'yup'
// // import axios from 'axios'
// // import { useNavigate } from 'react-router-dom'
// // import {useState} from 'react'

// // const loginValidationSchema = yup.object({
// //     email:yup.string().required().email(),
// //     passwordHash:yup.string().required().min(8).max(64)
// // })
// // export default function Login(){
// //     const navigate = useNavigate()
// //     const [serverErrors,setServerErrors] = useState('')

// //     const formik = useFormik({
// //         initialValues:{
// //             email:'',
// //             passwordHash:''
// //         },
// //         validateOnChange:false,
// //         validationSchema:loginValidationSchema,
// //         onSubmit: async (values) =>{
// //             try{
// //                 const response = await axios.post('http://localhost:3059/api/users/login',values)
// //                 localStorage.setItem('token',response.data.token)
// //                 console.log(response.data.token)
// //                 navigate('/Dashboard')
// //             } catch(e){
// //                 setServerErrors(e.response.data.errors);
// //                 console.log(e)
// //             }
// //         }
// //     })


// //     return(
// //         <div> 
// //             <h1> Login here..</h1>
// //             {serverErrors && <b>serverErrors</b>}
// //             <form onSubmit={formik.handleSubmit}>
            
// //             <label>Email</label>
// //             <input type = 'text'
// //             value = {formik.values.email}
// //             name='email'
// //             onChange={formik.handleChange}/>
// //             {formik.errors.email} <br/>

// //             <label>Password</label>
// //             <input type = 'password'
// //             value = {formik.values.passwordHash}
// //             name='passwordHash'
// //             onChange={formik.handleChange}/>
// //             {formik.errors.passwordHash} <br/>

// //             <input type='submit'></input> 
// //             </form>

// //         </div>
// //     )
// // }
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';


// const loginValidationSchema = yup.object({
//   email: yup.string().required().email(),
//   passwordHash: yup.string().required().min(8).max(64),
// });

// export default function Login({toast}) {
//   const navigate = useNavigate();
//   const [serverErrors, setServerErrors] = useState('');

//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       passwordHash: '',
//     },
//     validateOnChange: false,
//     validationSchema: loginValidationSchema,
//     onSubmit: async (values) => {
//       try {
       
//         const response = await axios.post('http://localhost:3059/api/users/login', values);
//         localStorage.setItem('token', response.data.token);
//         console.log(response.data.token);
//         navigate('/Dashboard');
//         toast()
//       } catch (e) {
//         setServerErrors(e.response.data.errors);
//         toast.error('Login failed. Please check your credentials.');
//         console.log(e);
//       }
//     },
//   });

  
  
//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h1 style={{ color: '#333' }}>Login here..</h1>
//       {serverErrors && <b style={{ color: 'red' }}>{serverErrors}</b>}
//       <form onSubmit={formik.handleSubmit} style={{ marginTop: '15px' }}>
//         <label style={{ marginRight: '10px' }}>Email</label>
//         <input
//           type="text"
//           value={formik.values.email}
//           name="email"
//           onChange={formik.handleChange}
//           style={{ padding: '5px', marginBottom: '10px' }}
//         />
//         {formik.errors.email} <br />

//         <label style={{ marginRight: '10px' }}>Password</label>
//         <input
//           type="password"
//           value={formik.values.passwordHash}
//           name="passwordHash"
//           onChange={formik.handleChange}
//           style={{ padding: '5px', marginBottom: '10px' }}
//         />
//         {formik.errors.passwordHash} <br />

//         <input
//           type="submit"
//           style={{
//             padding: '8px',
//             backgroundColor: '#4CAF50',
//             color: 'white',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//           }}
//         />
//       </form>
//     </div>
//   );
// }

// //   return (
// //     <div>
// //       <h1> Login here..</h1>
// //       {serverErrors && <b>{serverErrors}</b>}
// //       <form onSubmit={formik.handleSubmit}>
// //         <label>Email</label>
// //         <input
// //           type="text"
// //           value={formik.values.email}
// //           name="email"
// //           onChange={formik.handleChange}
// //         />
// //         {formik.errors.email} <br />

// //         <label>Password</label>
// //         <input
// //           type="password"
// //           value={formik.values.passwordHash}
// //           name="passwordHash"
// //           onChange={formik.handleChange}
// //         />
// //         {formik.errors.passwordHash} <br />

// //         <input type="submit"></input>
// //       </form>
      
      
        
 
// //     </div>
// //   );
// // }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const loginValidationSchema = yup.object({
  email: yup.string().required().email(),
  passwordHash: yup.string().required().min(8).max(64),
});

export default function Login({ toast, handleLog }) {
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState('');
  const [posts, setPosts] = useState([]);
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

  const formik = useFormik({
    initialValues: {
      email: '',
      passwordHash: '',
    },
    validateOnChange: false,
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:3059/api/users/login', values);
        localStorage.setItem('token', response.data.token);
        console.log(response.data.token);
        navigate('/Dashboard');
        handleLog()
        toast();
      } catch (e) {
        setServerErrors(e.response.data.errors);
        toast.error('Login failed. Please check your credentials.');
        console.log(e);
      }
    },
  });

  const displayPosts = posts.slice(0,5)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '400px', width: '100%' }}>
        <h1 style={{ color: '#333', textAlign: 'center', marginBottom: '20px' }}>Login here</h1>
        {serverErrors && <b style={{ color: 'red', textAlign: 'center' }}>{serverErrors}</b>}
        <form onSubmit={formik.handleSubmit} style={{ marginTop: '15px' }}>
          <label style={{ marginRight: '10px' }}>Email</label>
          <input
            type="text"
            value={formik.values.email}
            name="email"
            onChange={formik.handleChange}
            style={{ padding: '5px', marginBottom: '10px', width: '100%' }}
          />
          {formik.errors.email}
          <span>      </span>
          <label style={{ marginRight: '10px' }}>Password</label>
          <input
            type="password"
            value={formik.values.passwordHash}
            name="passwordHash"
            onChange={formik.handleChange}
            style={{ padding: '5px', marginBottom: '10px', width: '100%' }}
          />
          {formik.errors.passwordHash}
  
          <span>      </span>
          <input
            type="submit"
            style={{
              padding: '9px',
              backgroundColor: '#323ca8',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%',
              marginTop: '10px',
            }}
          />
        </form>
      </div>
  
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', width: '100%' }}>
        <h1 style={{ color: '#333', textAlign: 'center', marginBottom: '20px' }}>Recent posts</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {displayPosts.map((post) => (
              <li
                key={post._id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '10px',
                  marginBottom: '10px',
                }}
              >
                <h3 style={{ color: '#333', textAlign: 'center' }}>{post.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: post.content }} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
              }
  