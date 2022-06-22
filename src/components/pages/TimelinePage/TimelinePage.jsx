import { useState, useEffect, useContext } from "react";
import axios from "axios";

import UserContext from "../../../contexts/UserContext";
import TimeLine from "../../TimeLine/TimeLine";

export default function TimelinePage() {

    const [postsList, setPostsList] = useState([])
    const [loading, setLoading] = useState(true)
    const [userState] = useContext(UserContext);

    //ABORDAGEM DA PRIMEIRA SPRINT
    useEffect(() => {
        setLoading(true);
        const config = {headers: { authorization: `Bearer ${userState}`}}
        //const URL = process.env.REACT_APP_API_URL+'/timeline'
        const URL = process.env.REACT_APP_API_URL+'/timelinelist'
        const promise = axios.get(URL, config)
        promise.then( (response) => {   setPostsList(response.data)
                                        setLoading(false)})
        promise.catch( (err) => console.log('Error Get PostsList TIMELINE: ', err))
    }, []);


    

    return (<TimeLine title="timeline" postsList={postsList} createPost={true} loading={loading}/>);
}