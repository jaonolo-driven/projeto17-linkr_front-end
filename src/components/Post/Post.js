import ReactHashtag from "react-hashtag";
import { Link } from "react-router-dom";
import { ProfilePic } from "../../styles/ProfilePic";
import { PostHTML, PostAside, SubPostAside, PostContent, NameAndButtons, EditAndDel, Input} from "./styles";
import LikeButton from "../pages/PostsByUserPage/LikeButton";
import { RiEdit2Line } from "react-icons/ri";
import { useState,  useRef, useContext, useEffect } from 'react'
import UserContext from "../../contexts/UserContext";
import axios from "axios";
import DeleteModal from "./DeleteModal";
import UrlPost from "./UrlPost";

export default function Post(props){
    const {postINFO} = props
    const user = useContext(UserContext)[0]
    const inputRef = useRef()
    const [editPost, setEditPost] = useState(false)
    const [postValue, setPostValue] = useState(postINFO.message)
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
                    {(postINFO.userId === id) ?
                    <EditAndDel>
                        <RiEdit2Line color="white" cursor={'pointer'} onClick={() => changeEditPost()}/>
                        <DeleteModal/>
                    </EditAndDel>
                    :<></>}
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
                    :
                    <ReactHashtag renderHashtag={(tag) => (
                        <Link to={`/hashtag/${tag.split("#")[1]}`} >
                            {tag}
                        </Link>
                    )}>
                        {postValue}
                    </ReactHashtag>
                }  
                <UrlPost url={postINFO.urlMeta.url} />
            </PostContent>
        </PostHTML> 
    )

    function changeEditPost(){
        if(editPost===false){
            setResetValue(postValue)
            setEditPost(true)
        } else {
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
}