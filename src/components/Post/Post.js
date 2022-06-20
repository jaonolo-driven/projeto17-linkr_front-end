import ReactHashtag from "react-hashtag"; import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CreatePost, PostHTML, Photo, PostAside, SubPostAside, PostContent, UrlPost, UrlPostText} from "./styles";
import PostContentComponent from "../PostContent";



export default function Post(props){
    
    const { postsList } = props

    let postDoUsuario = true

    function HeaderPost(props){
        const {postINFO} = props
        if(postDoUsuario){
            <Link   style={{ color: 'inherit', textDecoration: 'inherit'}}
                    to={`/user/${postINFO.userId}`}>
                <h3>{postINFO.userName}</h3>
            </Link> 
        }else{

        }
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
                    {postDoUsuario ? <PostContentComponent postINFO={postINFO}/> : <HeaderPost/> }
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