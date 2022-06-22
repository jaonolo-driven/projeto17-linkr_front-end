import ReactHashtag from "react-hashtag";
import { Link } from "react-router-dom";
import { ProfilePic } from "../../styles/ProfilePic";
import { PostHTML, PostAside, SubPostAside, PostContent, NameAndButtons, EditAndDel, Input, CommentsHTML} from "./styles";
import LikeButton from "./LikeButton";
import { RiEdit2Line } from "react-icons/ri";
import { useState,  useRef, useContext, useEffect } from 'react'
import UserContext from "../../contexts/UserContext";
import axios from "axios";
import DeleteModal from "./DeleteModal";
import UrlPost from "./UrlPost";
import CommentsButton from "./../SharedComponents/Comments.js"
import CommentsBox from "../SharedComponents/CommentBox.js";

export default function Post(props){
    const {postINFO} = props

    const user = useContext(UserContext)[0]
    const inputRef = useRef()
    const [editPost, setEditPost] = useState(false)
    const [postValue, setPostValue] = useState(postINFO.message)
    const [resetValue, setResetValue] = useState('')
    const [disable, setDisable] = useState(false)
    const [likes, setLikes] = useState([])
    const [commentsBoxOpen, setCommentsBoxOpen] = useState(false);
    const [countComments, setCountComments] = useState();
    const [idPost, setIdPost] = useState();

    const {id, token} = user

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/likes/${postINFO.id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setLikes(response.data.map(({userId, userName}) => {return {userId, whoLiked: userName}}))
        }).catch(e => console.log(e.data))
    }, [])

    useEffect(() => {
        if(editPost){
            inputRef.current.focus()
        }
    }, [editPost])

    function clickId(id){
        setIdPost(id);
    }

    function countComment(count){
        setCountComments(count);
    }


    return(
        <PostHTML>
            <PostAside >
                <ProfilePic src={postINFO.profilePicture} radius={50} />
                <SubPostAside >
                    <LikeButton 
                                    liked={likes?.filter((e) => e.userId == id).length !== 0}
                                    postId={postINFO.id}
                                    postLikes={likes.length}
                                    likeList={likes?.filter((e) => e.userId != id)}
                    />    
                    <CommentsButton     postId={postINFO.id}
                                        commentsBoxOpen={commentsBoxOpen}
                                        setCommentsBoxOpen={setCommentsBoxOpen}
                                        idClick={(id) => clickId(id)}
                                        countComments={countComments}/>                            
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
            {
                    (idPost == postINFO.id && commentsBoxOpen)?
                            (<CommentsHTML>
                                    <CommentsBox postId={postINFO.id}
                                                userProfilePicture={postINFO.profilePicture}
                                                display={"flex"}
                                                countComments={(count) => countComment(count)}/>
                            </CommentsHTML>):(<></>)
            }
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
            id: postINFO.id,
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