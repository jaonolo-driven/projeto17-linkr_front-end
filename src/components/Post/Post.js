import ReactHashtag from "react-hashtag"; import { FaRegHeart } from "react-icons/fa";

import { CreatePost, PostHTML, Photo, PostAside, SubPostAside, PostContent, UrlPost, UrlPostText} from "../PostsByUserPage/styles";

export default function Post(props){
    
    const { postsList } = props
    console.log('OBJ NO POST:', postsList)
    
    function Teste(props){
        console.log('post dentro do teste : ', props.apost)
        return(
            <PostHTML>
                <PostAside >
                    <Photo src={props.apost.profilePicture} />
                    <SubPostAside >
                        <FaRegHeart/>
                        <span> {props.apost.likes} likes</span> 
                    </SubPostAside>
                </PostAside>
                <PostContent >
                    <h3>{props.apost.userName}</h3> 
                    <p><ReactHashtag>{props.apost.message}</ReactHashtag></p>
                    <UrlPost>
                        <UrlPostText>
                            <h4>{props.apost.urlMeta.url.title}</h4>
                            <p>{props.apost.urlMeta.url.description}</p>
                            <a href={props.apost.urlMeta.url.link}>{props.apost.urlMeta.url.link}</a>
                        </UrlPostText>
                        <img src={props.apost.urlMeta.url.image}/>
                    </UrlPost>
                </PostContent>
            </PostHTML> 
        )
    }
    if(postsList){
        console.log(`tem postsList`, postsList)
        return(
            <CreatePost> 
                {postsList?.map( post => console.log('teste map :', post) )}
            </CreatePost>)
        }
    }
