import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { useContext, useState } from "react";
import ReactTooltip from 'react-tooltip';

import UserContext from "../../contexts/UserContext";


export default function LikeButton(props){

    const [infos, setInfos] = useState([]);
    const [liked, setLiked] = useState(props.liked);
    const [countLikes, setCountLikes] = useState(props.postLikes)
    const [user, setUser] = useContext(UserContext)
    const {postId} = props;


    function togglelikePost(postId){
        const config = {headers: { authorization: `Bearer ${user}`}}
        const URL = process.env.REACT_APP_API_URL+'/togglelike/'+postId;
        const promise = axios.patch(URL, {}, config)
        
        promise.then( (response) => {  setInfos(response.data)
                                        setCountLikes(response.data[0])
                                        setLiked(!liked)})
        promise.catch( (error) => console.log('Error Get PostsByUser: ', error)) 
    }

    
    return (
        <>
        {
            (liked)?(
                <>
                <FaHeart fill={'#AC0000'} onClick={() => togglelikePost(postId)}/>
                <div className="label-popup">
                        Você, fulano e mais muitas pessoas
                </div>
                </>
            ):(<>
                <FaRegHeart onClick={() => togglelikePost(postId)} data-for="showLikes2"/>
                <div className="label-popup">
                        fulano e ciclano e mais pessoas
                </div>
                </>)
        }

        {
            (!countLikes.likes)?(<span> {countLikes} likes </span>):
                (<span> {parseInt(countLikes.likes)} likes </span>)
        }
        
        </>
    )
}