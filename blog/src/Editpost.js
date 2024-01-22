import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; 
import JoditEditor from 'jodit-react';

export default function Editpost(){
    const navigate = useNavigate();
    const editor = useRef(null);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const { id } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3059/api/posts/${id}`, {
                title,
                content
            }, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });

            navigate('/Myposts');
        } catch (error) {
            console.log(error);
        }
    };

    return(
        <div>
            <h1>Edit your post here</h1>
            <form onSubmit={handleSubmit}>
                <label>Title: </label><br/>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                /><br/>

                <label>Content: </label><br/>
                <JoditEditor
                    ref={editor}
                    value={content}
                    onChange={(newContent) => setContent(newContent)}
                /><br/>

                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}
