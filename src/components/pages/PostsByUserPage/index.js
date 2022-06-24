import {useEffect, useState, useContext} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import UserContext from "../../../contexts/UserContext";
import TimeLine from "../../TimeLine/TimeLine";

export default function PostsByUserPage(){
    const { id } = useParams();
    
    const [postsList, setPostsList] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState('2040-09-28T22:59:02.448804522Z');
    const [userState] = useContext(UserContext);

    useEffect(() => {
        setLoading(true);
        const config = {headers: { authorization: `Bearer ${userState.token}`}};
        const URL = process.env.REACT_APP_API_URL+`/user/${id}?timestamp=` + currentPage;
        const promise = axios.get(URL, config);
        promise.then(response => {
            const postList = response.data.postsList
            const previousPosts = postsList.postList ? postsList.postList : []
            setPostsList({...response.data, postList: [...previousPosts, ...postList]});
            setLoading(false);
        });
        promise.catch(error => console.log(error));
    }, [currentPage, id]);

    const title = () => {
        return postsList.pageContext ? postsList.pageContext.user.userName + "'s posts" : '' 
    }

    const profilePicture = () => {
        return postsList.pageContext ? postsList.pageContext.user.profilePicture : '' 
    }

    return (<TimeLine
                key={id}
                title={title()}
                profilePicture={profilePicture()}
                postsList={postsList?.postList}
                setPostsList={setPostsList}
                loading={loading}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage} 
                timeline={false}
            />);
}
