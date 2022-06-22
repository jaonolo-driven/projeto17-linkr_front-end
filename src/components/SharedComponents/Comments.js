import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ReactTooltip from 'react-tooltip';
import { AiOutlineComment } from "react-icons/ai";
import { PostContent } from "../PostsByUserPage/styles";
import styled from 'styled-components';

import UserContext from "../../contexts/UserContext";

import { CountCommentsAndIcon } from "./CommentsStyles.js";

export default function CommentsButton(props){

    const {postId, setCommentsBoxOpen, commentsBoxOpen, idClick, countComments} = props;
    const [showComment, setShowComment] = useState(false);
    const [user, setUser] = useContext(UserContext);
    let qteComments = 0;

 /*    function postComment(e){
        e.preventDefault()
        
        //setDisable(true)
        
        const promise = axios.post(`${process.env.REACT_APP_API_URL}/postcomments/:postId`,{
            message: message
        },
        {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        promise.then(response => {
            setLink('')
            setMessage('')
            setDisable(false)
            console.log(response.data)
        })
        promise.catch(e => {
            setDisable(false)
            alert(e.response.data.message)
        })
    } */

    function showComments(postId){
        setCommentsBoxOpen(true)
        idClick(postId)
    //TODO: CHAMAR O GET DE MOSTRAR OS COMENTÁRIOS
    }

    return (
        <>

        <CountCommentsAndIcon>
            <AiOutlineComment onClick={() => showComments(postId)}/>
            <span> {countComments} comments </span>
        </CountCommentsAndIcon>
        {
            (showComment)?
            ((qteComments == 0)?(<></>):(<></>)):(<></>)
        
        }
    </>)

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
