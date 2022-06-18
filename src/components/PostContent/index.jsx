import styled from "styled-components"
import ReactHashtag from "react-hashtag";
import { RiEdit2Line } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import { PostContent, UrlPost, UrlPostText } from "../PostsByUserPage/styles";
import { useRef, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function PostContentComponent(props){
    const {postsList, post, index} = props
    const token = JSON.parse(localStorage.getItem('user'))
    const inputRef = useRef()
    const [editPost, setEditPost] = useState(false)
    const [postValue, setPostValue] = useState(post.message)
    const [resetValue, setResetValue] = useState('')

    useEffect(()=>{
        if(editPost){
            inputRef.current.focus()
        }
    }, [editPost])

    function changeEditPost(){
        if(editPost===false){
            setResetValue(postValue)
            setEditPost(true)
        }else{
            setEditPost(false)
            setPostValue(resetValue)
        }
    }

    function editPostSubmit(e){
        e.preventDefault()
        const promise = axios.put(`${process.env.REACT_APP_API_URL}/editpost`,{
            id: post.id,
            message: postValue
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        promise.then(response => {
            setEditPost(false)
        }).catch(e => {
            alert(e.response.data.message)
        })
    }
    return(
        <PostContent>
            <NameAndButtons>
                <h3>{postsList.userName}</h3>
                <EditAndDel>
                    <RiEdit2Line color="white" onClick={() => changeEditPost()}/>
                    <AiFillDelete margin={10}/>
                </EditAndDel>
            </NameAndButtons> 
            {(editPost===true)   ?  <form onSubmit={editPostSubmit}>
                                        <Input ref={inputRef}
                                            type='text'
                                             value={postValue}
                                             onChange={e => setPostValue(e.target.value)}
                                             />
                                    </form>
                                    : <ReactHashtag>{postValue}</ReactHashtag>}
            <UrlPost>
                <UrlPostText>
                    <h4>{postsList[index].url.title}</h4>
                    <p>{postsList[index].url.description}</p>
                    <a href={postsList[index].url.link}>{postsList[index].url.link}</a>
                </UrlPostText>
                <img src={postsList[index].url.image}/>
            </UrlPost>
        </PostContent>
    )
}


const NameAndButtons = styled.div`
    display: flex;
    justify-content: space-between;
`
const EditAndDel = styled.div`
    display: flex;
    justify-content: space-between;
    margin-right: 40px;
    color: #FFFFFF;
    width: 50px;
    padding-top: 20px;
`
const Input  = styled.input`
    height: 100%;
`