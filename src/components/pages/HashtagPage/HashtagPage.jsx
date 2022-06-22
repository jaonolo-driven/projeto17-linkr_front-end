import {useEffect, useState, useContext} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import UserContext from "../../../contexts/UserContext";
import TimeLine from "../../TimeLine/TimeLine";

export default function HashtagPage(){
    const [postsList, setPostsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userState] = useContext(UserContext);
    const {hashtag} = useParams();

    useEffect( () => {
        setLoading(true);
        const config = {headers: { authorization: `Bearer ${userState}`}}
        const URL = process.env.REACT_APP_API_URL + `/hashtag/${hashtag}`
        const promise = axios.get(URL, config)
        promise.then( (response) => {   setPostsList(response.data)
                                        setLoading(false)})
        promise.catch( (err) => console.log('Error Get PostsList TIMELINE: ', err))
    }, [hashtag]);

    return (<TimeLine title={"# " + hashtag} postsList={postsList} loading={loading}/>);
}