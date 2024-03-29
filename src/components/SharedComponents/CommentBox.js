import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import {FiSend} from "react-icons/fi";
import { TailSpin } from  'react-loader-spinner';

import UserContext from "../../contexts/UserContext";

export default function CommentsBox(props){

    const [message, setMessage] = useState('')
    const [commentsInfo, setCommentsInfo] = useState([]);
    const [disable, setDisable] = useState(false);
    const [user, setUser] = useContext(UserContext);

    const {postId, userProfilePicture, countComments, setCountComments} = props;

    useEffect(() => {
        const promise = axios.get(`${process.env.REACT_APP_API_URL}/getcomments/${postId}`,
        {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        promise.then(response => {
            setCommentsInfo(response.data)
            setCountComments(response.data.length)
        })

        promise.catch( (error) => console.log('Error Get comment post: ', error))
    }, [postId, disable, countComments ])
    

function commentPost(e){
        e.preventDefault()
        setDisable(true)
        
        const promise = axios.post(`${process.env.REACT_APP_API_URL}/postcomments/${postId}`,{
            message: message
        },
        {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        promise.then(response => {
            setMessage('')
            setDisable(false)
            setCountComments(countComments + 1);
            console.log(response.data)
        })
        promise.catch(e => {
            setDisable(false)
            alert(e.response.data.message)
        }) 
    }
    //
        return (<>
        <CommentsMain>
            {
                (commentsInfo.length !== 0)?(
                    commentsInfo?.map((commentInfo) => {
                        return (<>
                            <ContainerComments>
                                <PhotoFrame>
                                    <Photo src={commentInfo.profilePicture}/>
                                </PhotoFrame>
                                {
                                    (commentInfo.postOwner == undefined && commentInfo.following == undefined)?(
                                        <CommentsText>
                                            <p> {commentInfo.userName}</p>  
                                            <span>{commentInfo.whatComment}</span>
                                        </CommentsText>
                                    ):((commentInfo.postOwner == true)?(
                                        <CommentsText>
                                        <p> {commentInfo.userName} <span> • post’s author </span></p>  
                                        <span>{commentInfo.whatComment}</span>
                                    </CommentsText>
                                    ):( <CommentsText>
                                        <p> {commentInfo.userName} <span> • following </span></p>  
                                        <span>{commentInfo.whatComment}</span>
                                    </CommentsText>))
                                }
                            </ContainerComments>
                            <CommentsLine/>
                        </>)})):(<></>) 
                }
                <ContainerInsertComment>
                <PhotoFrame>
                    <Photo src={user.profilePicture}/>
                </PhotoFrame>
                <FormComment onSubmit={commentPost}>
                                        <Input  type='text'
                                                placeholder="write a comment..."
                                                value={message}
                                                onChange={e => setMessage(e.target.value)}
                                                disabled={disable}/>
                <Button type="submit" disabled={disable}>{disable?
                <TailSpin
                    height="15"
                    width="15"
                    color='#fff'
                    ariaLabel='loading'
                />: <FiSend/>}</Button>
            </FormComment>
            </ContainerInsertComment>
        </CommentsMain>
        </>)
}

const Input = styled.input`
    margin-left: 3%;
    //padding: 3px;
    background: #252525;
    border-radius: 8px;
    border: none;
    font-size: 14px;
    color: #575757;
    font-family: var(--default-font);
    width: 85%;
    position: relative;
    flex-grow: 1;
    height: 35px
`

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    //width: 112px; 
    color: #F3F3F3;
    font-weight: 700;
    font-size: 14px;
    background: #252525;
    height: 35px;
    width: 35px;
    //border-radius: 5px;
    border: none;
    //padding: 5px;
    //margin-top: 3px;
    //height: 31px;
    cursor: pointer;
`

const CommentsMain = styled.main`
    width: 100%;
    padding: 13px 24px 24px 24px;
`
const Photo = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 18px;
`
const PhotoFrame = styled.div`
    //width: 95px;
    display: flex;
    justify-content: center;
`
const ContainerComments = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 16px;
`

const CommentsText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;

    p span {
        margin-bottom: 3%;
        color: #565656;
        font-weight: 400;
        font-size: 14px;
        font-family: var(--default-font);   
    }

    p {
        color: #F3F3F3;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        font-family: var(--default-font);
    }

    span {
        color: #ACACAC;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        font-family: var(--default-font);
    }
`

const CommentsLine = styled.div`
    width: 100%;
    height: 1px;
    background-color: var(--line-grey);
    margin-bottom: 16px;
`

const FormComment = styled.form`
    display: flex;
    padding: 3px;
    background: #252525;
    border-radius: 8px;
    border: none;
    font-size: 14px;
    color: #575757;
    font-family: var(--default-font);
    flex-grow: 1;
`

const ContainerInsertComment = styled.div`
    display: flex;
    align-items: center;
`