import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../src/client";

const Reply = ({ token, postId }) => {

    const [content, setContent] = useState({replier: "", content: ""})
    

    const createReply = async () => {
        const session = supabase.auth.getSession()
        console.log(session)

        if (!session) {
            alert('You must be logged in to reply.');
            return;
        }

        const {data, error} = await supabase
            .from('replies')
            .insert({content: content.content, replier: token.user.user_metadata.username, post_id: postId})

        if (error) {
            alert("Error creating reply.")
        } else {
            setContent({replier: "", content: ""})
        }
    }

    return (
        <div className='reply'>
            <label>{content.replier}</label>
            <textarea type='text' id='content' name='content' onChange={(e) => setContent({...content, content: e.target.value})}/>
            <br/>
            <button type='submit' onClick={createReply}>Reply</button>

            <div className="relpies">

            </div>

        </div>
    )
}

export default Reply