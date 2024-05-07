import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../src/client'
import Reply from '../components/reply'


const PostPage = ({token}) => {
    const {id} = useParams()
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])

    useEffect(() => {
        fetchPost()
        fetchComments()
    }, [])

    const fetchPost = async () => {
        const {data, error} = await supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .single()

        if (error) {
            alert("Error fetching post.")
        } else {
            setPost(data)
        }
    }

    const fetchComments = async () => {
        const {data, error} = await supabase
            .from('replies')
            .select('*')
            .eq('post_id', id)

        if (error) {
            alert("Error fetching comments.")
        } else {
            setComments(data)
        }
    }

    if (!post) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='post-page'>
            <h1>{post.title}</h1>
            <h2>By: {post.creator}</h2>
            <p>{post.content}</p>
           {post.image_url ? <img id='image-preview' src={post.image_url} alt='post' /> : ""}
            <Reply token={token} postId={id}/>
            

            <div className='comments'>
                <h2>Comments:</h2>
                {comments.map(comment => (
                    <div key={comment.id} className='comment'>
                        <h3>{comment.replier}</h3>
                        <p>{comment.content}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default PostPage