import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ReactTooltip from 'react-tooltip';

import UserContext from "../../../contexts/UserContext";


export default function LikeButton(props){

    const [liked, setLiked] = useState(props.liked);
    const [countLikes, setCountLikes] = useState(props.postLikes)
    const [idPost, setIdPost] = useState(props.postId)
    const [user, setUser] = useContext(UserContext)
    const [popupText1, setPopupText1] = useState('')
    const [popupText2, setPopupText2] = useState('')
    const {postId, likeList} = props;
    let poppUp;
    console.log(likeList)

    function togglelikePost(postId){
        const config = {headers: { authorization: `Bearer ${user.token}`}}
        const URL = process.env.REACT_APP_API_URL+'/togglelike/'+postId;
        const promise = axios.patch(URL, {}, config)
        
        promise.then( (response) => {  setCountLikes(response.data[0].likes)
                                        setLiked(!liked)
                                        setIdPost(response.data[1])
                                        })
        promise.catch( (error) => console.log('Error Get PostsByUser: ', error)) 
    }
    
    useEffect(() => {
            ReactTooltip.rebuild();
            if(liked){
                switch (parseInt(countLikes)) {
                    case 0:
                            poppUp = `Ninguém curtiu esse post ainda`
                            break
                    case 1:
                            poppUp =`Você curtiu esse post`
                            break
                    case 2:
                        poppUp = `Você e ${likeList[0].whoLiked} curtiram esse post`
                        break
                    default:
                        poppUp = `Você, ${likeList[0].whoLiked} e mais ${likeList.length-1} curtiram esse post`
                        break
                    }
                setPopupText1(poppUp)} else {
                switch (parseInt(countLikes)) {
                    case 0:
                        if(likeList.length == 0)
                        poppUp = `Ninguém curtiu esse post ainda`
                            break
                    case 1:
                        poppUp = `${likeList[0].whoLiked} curtiu esse post`
                            break
                    case 2:
                        poppUp = `${likeList[0].whoLiked} e ${likeList[0].whoLiked} curtiram esse post`
                        break
                    default:
                        poppUp = `${likeList[0].whoLiked}, ${likeList[0].whoLiked} e mais ${likeList.length-1} curtiram esse post`
                        break
                    }
            setPopupText2(poppUp)}
    }, [parseInt(countLikes), liked])

    return (
        <>
        {
            (liked)?(
                <>
                <div data-tip data-for={String(idPost)}>
                    <FaHeart fill={'#AC0000'} onClick={() => togglelikePost(postId)}/>
                    {console.log('to na 1')}
                </div>
                        <ReactTooltip id={String(idPost)}
                                        place="bottom" 
                                        textColor='#505050' 
                                        backgroundColor='rgba(255, 255, 255, 0.9)'
                                        effect="solid"
                                        className='fontTooltip'>
                            <span> {popupText1} </span>
                        </ReactTooltip>
                </>
            ):(<>
                <div data-tip data-for={String(idPost)}>
                    <FaRegHeart onClick={() => togglelikePost(postId)}/>
                    {console.log('to na 2')}
                </div>
                    {
                            (likeList.length == 0)?(<></>):(            
                                                        <ReactTooltip id={String(idPost)} 
                                                                        place="bottom" 
                                                                        textColor='#505050' 
                                                                        backgroundColor='rgba(255, 255, 255, 0.9)'
                                                                        effect="solid"
                                                                        className='fontTooltip'>
                                                                        <span> {popupText2} </span>
                                                        </ReactTooltip>)
                }
                </>) 
        }

        {
            (<span> {parseInt(countLikes)} likes </span>)
        }
        
        </>
    )
}