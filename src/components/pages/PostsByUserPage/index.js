import {useEffect, useState, useContext} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import UserContext from "../../../contexts/UserContext";
import TimeLine from "../../TimeLine/TimeLine";

export default function PostsByUserPage(){
    
    const [postsList, setPostsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user] = useContext(UserContext);
    const { id } = useParams();
    
    useEffect( () => {
        setLoading(true);
        const config = {headers: { authorization: `Bearer ${user.token}`}};
        const URL = process.env.REACT_APP_API_URL+'/user/'+id;
        const promise = axios.get(URL, config);
        promise.then( (response) => {
            setPostsList(response.data);
            setLoading(false);
        });
        promise.catch( (err) => console.log(err));
    }, [id]);

    function title() {
        if(postsList.length > 0) return postsList[0].userName + "'s posts";
    }

    function profilePicture() {
        if(postsList.length > 0) return postsList[0].profilePicture;
    }

    return (<TimeLine
                title={title()}
                profilePicture={profilePicture()}
                postsList={postsList}
                setPostsList={setPostsList}
                loading={loading} 
            />);
}
