import styled from "styled-components"
import ReactHashtag from "react-hashtag";
import { RiEdit2Line } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import { PostContent, UrlPost, UrlPostText } from "../pages/PostsByUserPage/styles";
import { useRef, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactModal from "react-modal";
import { Circles } from "react-loader-spinner";

export default function PostContentComponent(props){

    console.log('rerendering')

    const {postsList, post, index, renderList} = props
    const {token} = JSON.parse(localStorage.getItem('user'))
    const inputRef = useRef()
    const [editPost, setEditPost] = useState(false)
    const [postValue, setPostValue] = useState(post.message)
    const [resetValue, setResetValue] = useState('')
    const [disable, setDisable] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [modalLoad, setModalLoad] = useState(false)

    console.log(disable)

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

    //EDITAR POST
    function editPostSubmit(e){
        e.preventDefault()
        setDisable(true)
        const promise = axios.put(`${process.env.REACT_APP_API_URL}/editpost`,{
            id: post.id,
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

    //DELETAR POST
    function deletePost(){
        const promise = axios.delete(`${process.env.REACT_APP_API_URL}/deletepost/${post.id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        promise.then(response => {
            setModalLoad(false)
            setShowModal(false)
            renderList(Math.random())
        }).catch(e => {
            setModalLoad(false)
            setShowModal(false)
            alert(e.response.data.message)
        })
    }
    return(
        <PostContent>
            <NameAndButtons>
                <h3>{postsList.userName}</h3>
                <EditAndDel>
                    <ReactModal ariaHideApp={false} isOpen={showModal} style={modalStyle}>
                        <ContentModal>
                            {(modalLoad===true) ? <Circles color="#00BFFF" height={180} width={180}/>
                            :<>
                                Are you sure you want to delete this post?
                                <div>
                                <CancelButton onClick={() => setShowModal(false)}>
                                    No, go back
                                </CancelButton>
                                <ConfirmButton onClick={() => {
                                    setModalLoad(true)
                                    setTimeout(()=>{
                                        deletePost()
                                    }, "500")
                                }}>
                                    Yes, delete it
                                </ConfirmButton>
                                </div>
                            </>}
                        </ContentModal>
                    </ReactModal>
                    <RiEdit2Line color="white" cursor={'pointer'} onClick={() => changeEditPost()}/>
                    <AiFillDelete margin={10} cursor={'pointer'} onClick={() => setShowModal(true)}/>
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
const ConfirmButton = styled.button`
    width: 134px;
    height: 37px;
    background: #1877F2;
    border-radius: 5px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #FFFFFF;
    border: none;
    margin: 47px 13px;
    cursor: pointer;
`
const CancelButton = styled.button`
    width: 134px;
    height: 37px;
    background: #FFFFFF;
    border-radius: 5px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #1877F2;
    border: none;
    margin: 47px 13px;
    cursor: pointer;
`
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
const ContentModal = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;

    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 41px;
    text-align: center;
`
const modalStyle = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    content: {
        width: 597,
        height: 262,
        color: '#ffffff',
        backgroundColor: '#333333',
        borderRadius: '50px',
        position: 'absolute',
        top: '35%',
        left: '35%',
        padding: '38px 120px',
        overflow: 'hidden'
    }
}
