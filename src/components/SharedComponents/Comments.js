import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ReactTooltip from 'react-tooltip';
import { AiOutlineComment } from "react-icons/ai";
import styled from 'styled-components';

import UserContext from "../../contexts/UserContext";

import { CountCommentsAndIcon } from "./CommentsStyles.js";

export default function CommentsButton(props){

    const {postId, setCommentsBoxOpen, commentsBoxOpen, idClick, countComments, numberComments} = props;
    const [user, setUser] = useContext(UserContext);

    function showComments(postId){
        setCommentsBoxOpen(true)
        idClick(postId)
    //TODO: CHAMAR O GET DE MOSTRAR OS COMENTÁRIOS
    }

    return (
        <>
        <CountCommentsAndIcon>
            <AiOutlineComment onClick={() => showComments(postId)}/>
                {
                    (countComments)?(<span> {countComments} comments </span>):(
                        <span> {numberComments} comments </span>)                      
                }
        </CountCommentsAndIcon>
    </>)

}

