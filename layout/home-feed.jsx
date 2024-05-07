import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { supabase } from "../src/client";
import likebutton from "/static_head.png";

const HomeFeed = ({token}) => {

    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState("")
    

    

    const fetchPosts = async () => {
        let query = supabase.from('posts');

        if (filter === 'upvotes') {
            query = query.select('*').order('upvotes', {ascending: false})
        } else if (filter === 'newest') {
            query = query.select('*').order('created_at', {ascending: false})
        } else if (filter === 'all') {
            query = query.select('*')
        }

        const {data, error} = await query.select('*')

        if (error) {
            alert("Error fetching posts.")
        } else {
            setPosts(data)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [filter])


    const upVote = async (postId) => {
        
        const { data: currentPost, error: fetchError } = await supabase
            .from('posts')
            .select('upvotes')
            .eq('id', postId)
            .single()
    
        if (fetchError) {
            alert("Error fetching post.")
            return
        }
    
        
        const newUpvotes = currentPost.upvotes + 1
    
        
        const { data: updatedPost, error: updateError } = await supabase
            .from('posts')
            .update({ upvotes: newUpvotes })
            .eq('id', postId)
    
        if (updateError) {
            alert("Error upvoting post.")
        } else {
            fetchPosts()
        }
    }


    return (
        <div className='home-feed'>

            <div className="top-feed">
            <h1>Welcome {token.user.user_metadata.username}.</h1>
            <br/>

            <h4>Filter by:</h4>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value='all'>All Posts</option>
                <option value='upvotes'>Most Kudos</option>
                <option value='newest'>Newest</option>
            </select>
            </div>


            <div className='posts'>
                {posts.map(post => (
                    <div key={post.id} className='post'>
                        <Link to={`/post/${post.id}`}>
                        <h2>{post.title}</h2>
                        </Link>
                        <h3>By: {post.creator}</h3>
                        <h4>{new Date(post.created_at).toLocaleString()}</h4>
                        <p>{post.content.substring(0,100)}...</p>
                        
                        <div className="like-button">
                            <img className="like-icon" src={likebutton} alt="upvote" width='25' height='25' onClick={() => upVote(post.id)}/> : {post.upvotes}
                        </div>
                    </div>
                ))}
            </div>
            
            
        </div>
    )
}

export default HomeFeed