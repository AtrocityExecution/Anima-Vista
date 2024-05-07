import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { supabase } from "../src/client";
import { Link } from "react-router-dom";

const CreatePost = ({token}) => {

    const [content, setContent] = useState({title: "", content: "", creator: "", image_url: ""})
    const history = useNavigate()

    const createPost = async () => {
        const user = supabase.auth.getUser()

        if (!user) {
            alert('You must be logged in to create a post.');
            return;
        }

        const {data, error} = await supabase
            .from('posts')
            .insert({title: content.title, content: content.content, creator: token.user.user_metadata.username, image_url: content.image_url})

        if (error) {
            alert("Error creating post.")
        } else {
            history('/feed')
        }
    }

    return (
        <div className='create-post'>
            <h1>Create Post</h1>
            <form onSubmit={(e) => {e.preventDefault(); createPost();}}>
                
                <label>Title</label>
                <br/>
                <input type='text' id='title' name='title' onChange={(e) => setContent({...content, title: e.target.value})}/>
                <br/>
                <br/>

                <label>Content</label>
                <br/>
                <textarea type='text' id='content' name='content' onChange={(e) => setContent({...content, content: e.target.value})}/>
                <br/>
                <br/>

                <label>ImageURL</label>
                <br/>
                <input type='text' id='image_url' name='image_url' onChange={(e) => setContent({...content, image_url: e.target.value})}/>
                <br/>
                <br/>

                <label>Image Preview</label>
                <br/>
                <img id='image-preview' src={content.image_url} alt='preview' />
                <br/>
                <br/>

                <button type='submit'>Post</button>
                <Link to='/feed'><button>Cancel</button></Link>
            </form>

        </div>
    )

}

export default CreatePost