import styled from "styled-components"
import ReactHashtag from "react-hashtag";
import { RiEdit2Line } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import { PostContent, UrlPost, UrlPostText } from "../PostsByUserPage/styles";
import { useRef, useState } from "react";
import { useEffect } from "react";

export default function PostContentComponent(props){
    const {postsList, post, index} = props
    const inputRef = useRef()
    const [editPost, setEditPost] = useState(false)
    const [postValue, setPostValue] = useState('')

    useEffect(()=>{
        if(editPost){
            inputRef.current.focus()
        }
    }, [editPost])

    function changeEditPost(){
        if(editPost===false){
            setEditPost(true)
            setPostValue(post.message)
        }else{
            setEditPost(false)
            setPostValue('')
        }
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
            {(editPost===true)   ?  <form>
                                        <Input ref={inputRef}
                                            type='text'
                                             value={postValue}
                                             onChange={e => setPostValue(e.target.value)}
                                             />
                                    </form>
                                    : <ReactHashtag>{post.message}</ReactHashtag>}
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