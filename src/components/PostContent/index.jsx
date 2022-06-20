import styled from "styled-components"
import ReactHashtag from "react-hashtag";
import { RiEdit2Line } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import { PostContent, UrlPost, UrlPostText } from "../PostsByUserPage/styles";
import { useRef, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


export default function PostContentComponent(props){
    const {postINFO} = props
    const token = JSON.parse(localStorage.getItem('user'))
    const inputRef = useRef()
    const [editPost, setEditPost] = useState(false)
    const [postValue, setPostValue] = useState(postINFO.message)
    const [resetValue, setResetValue] = useState('')
    const [disable, setDisable] = useState(false)

    const {id} = useParams()

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
    return(
        <>
            <NameAndButtons>
                <Link   style={{ color: 'inherit', textDecoration: 'inherit'}}
                        to={`/user/${postINFO.userId}`}>
                    <h3>{postINFO.userName}</h3>
                </Link> 
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
                                             disabled={disable}
                                             />
                                    </form>
                                    : <ReactHashtag>{postValue}</ReactHashtag>}
        </>
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