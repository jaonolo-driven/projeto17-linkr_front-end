import { useState, useEffect, useContext } from "react";
import axios from "axios";

import UserContext from "../../../contexts/UserContext";
import TimeLine from "../../TimeLine/TimeLine";

import useInterval from "react-useinterval";

export default function TimelinePage() {

    const [postsList, setPostsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState('2040-09-28T22:59:02.448804522Z');
    const [userState] = useContext(UserContext);
    const [newPosts, setNewPosts] = useState([]);
    const [qtdNewPosts, setQteNewPosts] = useState(0);
    const [newPostsExist, setNewPostsExist] = useState(false);

    useInterval(getNewPosts, 15000)

    const perPage = 10;

    useEffect(() => {
        setLoading(true);
        const config = {headers: { authorization: `Bearer ${userState.token}`}};
        const URL = process.env.REACT_APP_API_URL+'/timelinelist?timestamp=' + currentPage;
        const promise = axios.get(URL, config);
        promise.then(response => {
            setPostsList(previousPosts => [...previousPosts, ...response.data]);
            setLoading(false); 
            //console.log(response.data);
        });
        promise.catch(error => console.log(error));
    }, [currentPage]);

    

    function getNewPosts(){
        const config = {headers: { authorization: `Bearer ${userState.token}`}};
        const URL = process.env.REACT_APP_API_URL+`/timelinelist/newposts/${postsList[0].id}`
        const promise = axios.get(URL, config);
        promise.then(response => {
            console.log('teste', response.data)
            if(response.data.length > 0){
                setNewPostsExist(true);
                setNewPosts(response.data);
                setQteNewPosts(response.data.length);
            } else {
                setNewPostsExist(false)
                setQteNewPosts(0);
                setNewPosts([]);
            }
        });
    }

    return (<TimeLine
                title="timeline"
                postsList={postsList}
                setPostsList={setPostsList}
                createPost={true}
                loading={loading}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                timeline={true}
                newPostsExist={newPostsExist}
                setNewPostsExist={setNewPostsExist}
                setQteNewPosts={setQteNewPosts}
                qtdNewPosts={qtdNewPosts}
                newPosts={newPosts}
            />);
}