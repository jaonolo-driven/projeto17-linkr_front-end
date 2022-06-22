import ReactHashtag from "react-hashtag";
<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
import { ProfilePic } from "../../styles/ProfilePic";
import { CreatePost, PostHTML, PostAside, SubPostAside, PostContent, UrlPost, UrlPostText} from "./styles";
import LikeButton from "../PostsByUserPage/LikeButton";
import { RiEdit2Line } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import styled from 'styled-components'
import { useState,  useRef, useContext, useEffect } from 'react'
import UserContext from "../../contexts/UserContext";
import axios from "axios";
import DeleteModal from "./DeleteModal";

export default function Post(props){
    /* vai desaparecer */
    const { postsList } = props
    const navigate = useNavigate();
    function Card(props) {    
    /**/
    const {postINFO} = props

    const user = useContext(UserContext)[0]
    const inputRef = useRef()
    const [editPost, setEditPost] = useState(false)
    const [postValue, setPostValue] = useState('oi')
    const [resetValue, setResetValue] = useState('')
    const [disable, setDisable] = useState(false)

    const {id, token} = user
    
    useEffect(()=>{
        if(editPost){
            inputRef.current.focus()
        }
    }, [editPost])

    return(
        <PostHTML>
            <PostAside >
                <ProfilePic src={postINFO.profilePicture} radius={50} />
                <SubPostAside >
                    <LikeButton 
                                    //liked={post.likesList?.filter((e) => e.UserLiked == userIdTest).length !== 0}
                                    liked={true}
                                    //postId={post.id}
                                    postId={1}
                                    //postLikes={post.likes}
                                    postLikes={0}
                                    //likeList={post.likesList?.filter((e) => e.UserLiked != userIdTest)}
                                    likeList={[]}
                    />                                
                </SubPostAside>
            </PostAside>
            <PostContent >
                <NameAndButtons>
                    <Link to={`/user/${postINFO.userId}`}>
                        <h3>{postINFO.userName}</h3>
                    </Link> 
                    <EditAndDel>
                        <RiEdit2Line color="white" cursor={'pointer'} onClick={() => changeEditPost()}/>
                        <DeleteModal/>
                    </EditAndDel>
                </NameAndButtons> 
                {(editPost === true)?  
                    <form onSubmit={editPostSubmit}>
                        <Input ref={inputRef}
                            type='text'
                            value={postValue}
                            onChange={e => setPostValue(e.target.value)}
                            disabled={disable}
                        />
                    </form>
                    :<ReactHashtag renderHashtag={(tag) => (
                        <span onClick={()=>goToHashTag(tag)}>
                            {tag}
                        </span>
                    )}>
                        {postINFO.message}
                    </ReactHashtag>
                }  
                <UrlPost>
                    <UrlPostText>
                        <h4>{postINFO.url.title}</h4>
                        <p>{postINFO.url.description}</p>
                        <a href={postINFO.url.link}>{postINFO.urlMeta.url.link}</a>
                    </UrlPostText>
                    <img src={postINFO.url.image}/>
                </UrlPost>
            </PostContent>
        </PostHTML> 
    )

    function goToHashTag(tag) {
        navigate("/hashtag/" + tag.split("#")[1]);
        window.location.reload();
    }

    function changeEditPost(){
        console.log('oie')
        if(editPost===false){
            setResetValue(postValue)
            setEditPost(true)
        }else{
            setEditPost(false)
            setPostValue(resetValue)
        }
    }

    //EDITAR POST
    function editPostSubmit(e){
        e.preventDefault()
        setDisable(true)
        const promise = axios.put(`${process.env.REACT_APP_API_URL}/editpost`,{
            id: 1,
            userId: id,
            message: postValue
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        promise.then(response => {
            setEditPost(false)
            setDisable(false)
        }).catch(e => {
            alert(e.response.data.message)
            setDisable(false)
            inputRef.current.focus()
        })
    }
    /**/
    }
    /**/
 
    /*
        vai desaparecer
        agora a lista de posts será renderizada no componente pai           
    */
        if(postsList){
            const post = {
                ...postsList[0],
                url: postsList[0].urlMeta.url,
            }

            return(
                <CreatePost>
                    {/*postsList?.map( post => <Card postINFO={post}/> )*/}
                    <Card postINFO={post}/>
                </CreatePost>
            )
        }
    /**/
}

const NameAndButtons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
`
const EditAndDel = styled.div`
    display: flex;
    justify-content: space-between;
    color: #FFFFFF;
    width: 50px;
`
const Input  = styled.input`
    height: 100%;
`
=======
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CreatePost, PostHTML, Photo, PostAside, SubPostAside, PostContent, UrlPost, UrlPostText} from "./styles";

export default function Post({ postINFO }){

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
>>>>>>> c11cc06f1e8073a2a143c738481c0d16108676da
