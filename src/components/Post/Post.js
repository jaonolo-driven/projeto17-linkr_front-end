import ReactHashtag from "react-hashtag";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CreatePost, PostHTML, Photo, PostAside, SubPostAside, PostContent, UrlPost, UrlPostText} from "./styles";

export default function Post({ postINFO }){

        console.log(postINFO)
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
                        <Link to={`/hashtag/${tag.split("#")[1]}`} >
                            {tag}
                        </Link>
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