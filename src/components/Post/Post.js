import ReactHashtag from "react-hashtag";
import { Link } from "react-router-dom";
import { ProfilePic } from "../../styles/ProfilePic";
import { PostHTML, PostAside, SubPostAside, PostContent, NameAndButtons, EditAndDel, Input, CommentsHTML, MainPost} from "./styles";
import LikeButton from "./LikeButton";
import { RiEdit2Line } from "react-icons/ri";
import { BiRepost } from "react-icons/bi";
import { useState,  useRef, useContext, useEffect } from 'react'
import UserContext from "../../contexts/UserContext";
import axios from "axios";
import DeleteModal from "./DeleteModal";
import UrlPost from "./UrlPost";
import styled from "styled-components";

import CommentsButton from "./../SharedComponents/Comments.js"
import CommentsBox from "../SharedComponents/CommentBox.js";
import RepostButton from "./RepostButton.jsx";

export default function Post(props){
    const {postINFO, updateState} = props

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
    const [update, setUpdate] = updateState;

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
        <PostFather>
            {(postINFO.isRepost) ?     
                    <RepostTitle>
                        <BiRepost size={22}/>
                        <RepostText>Re-posted by  <strong>{(postINFO.userRepostedId === id) ? 
                            <Link to={`/user/${user.id}`}>you</Link> : 
                            <Link to={`/user/${postINFO.userRepostedId}`}>{postINFO.whoReposted}</Link>
                        }</strong></RepostText>
                    </RepostTitle>
                : <></>
            }
            <PostHTML>
                <MainPost>
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
                                            countComments={countComments}
                                            numberComments={postINFO.countComments}/>

                        <RepostButton id={postINFO.id} numberReposts={postINFO.numberReposts}/>                      
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
                            <DeleteModal updateState={updateState} id={postINFO.id}/>
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
                        :<p>
                            <ReactHashtag renderHashtag={(tag) => (
                                <Link to={`/hashtag/${tag.split("#")[1]}`} >
                                    <span>
                                        {tag}
                                    </span>
                                </Link>
                            )}>
                                {postValue}
                            </ReactHashtag>
                        </p>
                    }  
                    <UrlPost url={postINFO.urlMeta.url} />
                </PostContent>
                </MainPost>
                {
                        (idPost == postINFO.id && commentsBoxOpen)?
                                (<CommentsHTML>
                                        <CommentsBox postId={postINFO.id}
                                                    userProfilePicture={postINFO.profilePicture}
                                                    display={"flex"}
                                                    setCountComments={setCountComments}
                                                    countComments={countComments}/>
                                </CommentsHTML>):(<></>)
                }
            </PostHTML>
        </PostFather>
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
            setUpdate(!update)
        }).catch(e => {
            alert(e.response.data.message)
            setDisable(false)
            inputRef.current.focus()
        })
    }
}

const PostFather = styled.section`
    color: "#FFFFFF";
    background: #1E1E1E;
    margin: 0 0 18px 0;
    border-radius: 16px;
    height: auto;
`
const RepostTitle = styled.h4`
    display: flex;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 13px;
    color: #FFFFFF;
    padding: 10px;

    a {
        color: inherit;
        text-decoration: none;
    }
`
const RepostText= styled.div`
    margin-top: 4px;
    margin-left: 4px;
`
