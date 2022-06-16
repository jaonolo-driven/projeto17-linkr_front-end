export default function Post(props){
    
    const { postsList } = props
    
    return(
        <CreatePost> 
            {postsList?.map( (post, index) => 
            <Post > 
                <PostAside >
                <Photo src={post.profilePicture} />
                <SubPostAside >
                    <FaRegHeart/>
                    <span> {post.likes} likes</span> 
                </SubPostAside>
                </PostAside>
                <PostContent >
                    <h3>{post.userName}</h3> 
                    <p><ReactHashtag>{post.message}</ReactHashtag></p>
                    <UrlPost>
                        <UrlPostText>
                            <h4>{postsList[index].url.title}</h4>
                            <p>{postsList[index].url.description}</p>
                            <a href={postsList[index].url.link}>{postsList[index].url.link}</a>
                        </UrlPostText>
                        <img src={postsList[index].url.image}/>
                    </UrlPost>
                </PostContent>
                    </Post> )}
        </CreatePost>
    )
    }
