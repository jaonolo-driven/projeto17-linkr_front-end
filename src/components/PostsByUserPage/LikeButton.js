import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { useContext, useState } from "react";
import ReactTooltip from 'react-tooltip';

import UserContext from "../../contexts/UserContext";


export default function LikeButton(props){

    const [liked, setLiked] = useState(props.liked);
    const [countLikes, setCountLikes] = useState(props.postLikes)
    const [user, setUser] = useContext(UserContext)
    const {postId, likeList} = props;

    function togglelikePost(postId){
        const config = {headers: { authorization: `Bearer ${user.token}`}}
        const URL = process.env.REACT_APP_API_URL+'/togglelike/'+postId;
        const promise = axios.patch(URL, {}, config)
        
        promise.then( (response) => {  setCountLikes(response.data[0])
                                        setLiked(!liked)})
        promise.catch( (error) => console.log('Error Get PostsByUser: ', error)) 
    }

    function popUpLikeButton(){
        return (
                (liked)?(
                    (likeList.length == 0)?(
                        <div>
                            Você curtiu esse post
                        </div>
                    ):((likeList.length == 1)?(   
                        <div>
                            Você e {likeList[0].whoLiked} curtiram esse post
                        </div>):
                        (<div >
                                Você, {likeList[0].whoLiked} e mais {likeList.length-1} curtiram esse post
                            </div>))
                ):((likeList.length == 1)?(
                    <div>
                        {likeList[0].whoLiked} curtiu esse post
                    </div>
                    ):((likeList.length == 2)?(   
                        <div >
                            {likeList[0].whoLiked}, {likeList[1].whoLiked} curtiram esse post
                        </div>):
                        (<div>
                            {likeList[0].whoLiked}, {likeList[1].whoLiked} e mais {likeList.length-1} curtiram esse post
                        </div>))
        )
        )
    }
    
    return (
        <>
        {
            (liked)?(
                <>
                <div data-tip data-for="showLikes1">
                    <FaHeart fill={'#AC0000'} onClick={() => togglelikePost(postId)}/>
                </div>
                        <ReactTooltip id="showLikes1" 
                                        place="bottom" 
                                        delayHide={500}
                                        textColor='#505050' 
                                        backgroundColor='rgba(255, 255, 255, 0.9)'
                                        effect="solid"
                                        className='fontTooltip'>
                            {popUpLikeButton()}
                        </ReactTooltip>
                </>
            ):(<>
                <div data-tip data-for="showLikes2">
                    <FaRegHeart onClick={() => togglelikePost(postId)}/>
                </div>
                {
                (likeList.length == 0)?(<></>):(                    
                        <ReactTooltip id="showLikes2" 
                                        place="bottom" 
                                        delayHide={500}
                                        textColor='#505050' 
                                        backgroundColor='rgba(255, 255, 255, 0.9)'
                                        effect="solid"
                                        className='fontTooltip'>
                            {popUpLikeButton()}
                        </ReactTooltip>)
                }
                </>) 
        }

        {
            (!countLikes.likes)?(<span> {countLikes} likes </span>):
                (<span> {parseInt(countLikes.likes)} likes </span>)
        }
        
        </>
    )
}