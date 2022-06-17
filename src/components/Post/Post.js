import ReactHashtag from "react-hashtag"; import { FaRegHeart } from "react-icons/fa";

import { CreatePost, PostHTML, Photo, PostAside, SubPostAside, PostContent, UrlPost, UrlPostText} from "./styles";

export default function Post(props){
    
    const { postsList } = props
    console.log('PostsList NO POST:', postsList)
    
    function Teste(props){
        const {postINFO} = props
        console.log('post dentro do teste : ', postINFO)
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
                    <h3>{postINFO.userName}</h3> 
                    <p><ReactHashtag>{postINFO.message}</ReactHashtag></p>
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
        console.log(`POSTLIST NO MAP TESTE`, postsList)
        return(
            <CreatePost> 
                {postsList?.map( post => <Teste postINFO={post}/> )}
            </CreatePost>)
        }
    }
