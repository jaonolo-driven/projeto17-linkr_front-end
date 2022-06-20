import ReactHashtag from "react-hashtag";
import { FaRegHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CreatePost, PostHTML, Photo, PostAside, SubPostAside, PostContent, UrlPost, UrlPostText} from "./styles";

export default function Post(props){
    
    const { postsList } = props
    const navigate = useNavigate();

    function goToHashTag(tag) {
        navigate("/hashtag/" + tag.split("#")[1]);
        window.location.reload();
    }

    function Card(props){
        const {postINFO} = props
        return(
            <PostHTML>
                <PostAside >
                    <Photo src={postINFO.profilePicture} />
                    <SubPostAside >
                        <FaRegHeart/>
                        <span> {postINFO.likes} likes</span> 
                    </SubPostAside>
                </PostAside>
                <PostContent >
                    <Link to={`/user/${postINFO.userId}`}>
                        <h3>{postINFO.userName}</h3>
                    </Link> 
                    <p>
                    <ReactHashtag renderHashtag={(tag) => (
                        <span onClick={()=>goToHashTag(tag)}>
                            {tag}
                        </span>
                    )}>
                        {postINFO.message}
                    </ReactHashtag></p>    
                    <UrlPost>
                        <UrlPostText>
                            <h4>{postINFO.urlMeta.url.title}</h4>
                            <p>{postINFO.urlMeta.url.description}</p>
                            <a href={postINFO.urlMeta.url.link}>{postINFO.urlMeta.url.link}</a>
                        </UrlPostText>
                        <img src={postINFO.urlMeta.url.image}/>
                    </UrlPost>
                </PostContent>
            </PostHTML> 
        )
    }
    if(postsList){
        return(
            <CreatePost>
                {postsList?.map( post => <Card postINFO={post}/> )}
            </CreatePost>
            )
        }
    }