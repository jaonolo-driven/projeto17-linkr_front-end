import {useEffect, useState, useContext} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import UserContext from "../../../contexts/UserContext";
import TimeLine from "../../TimeLine/TimeLine";

export default function PostsByUserPage(){
    
    /*  const [postsList, setPostsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user] = useContext(UserContext); */
    const { id } = useParams();

    const [postsList, setPostsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState('2040-09-28T22:59:02.448804522Z');
    const [userState] = useContext(UserContext);
    console.log(userState)
    
/*     useEffect( () => {
        setLoading(true);
        const config = {headers: { authorization: `Bearer ${user.token}`}};
        const URL = process.env.REACT_APP_API_URL+'/user/'+id;
        const promise = axios.get(URL, config);
        promise.then( (response) => {
            setPostsList(response.data);
            setLoading(false);
        });
        promise.catch( (err) => console.log(err));
    }, [id]); */

    useEffect(() => {
        setLoading(true);
        const config = {headers: { authorization: `Bearer ${userState.token}`}};
        const URL = process.env.REACT_APP_API_URL+`/user/${id}?timestamp=` + currentPage;
        const promise = axios.get(URL, config);
        promise.then(response => {
            setPostsList(previousPosts => [...previousPosts, ...response.data]);
            setLoading(false);
        });
        promise.catch(error => console.log(error));
    }, [currentPage, id]);

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
                currentPage={currentPage}
                setCurrentPage={setCurrentPage} 
            />);
}
