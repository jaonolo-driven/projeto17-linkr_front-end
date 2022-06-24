import { useState, useEffect, useContext } from "react";
import axios from "axios";

import UserContext from "../../../contexts/UserContext";
import TimeLine from "../../TimeLine/TimeLine";

export default function TimelinePage() {

    const [postsList, setPostsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState('2040-09-28T22:59:02.448804522Z');
    const [userState] = useContext(UserContext);

    const perPage = 10;

    useEffect(() => {
        setLoading(true);
        const config = {headers: { authorization: `Bearer ${userState}`}};
        const URL = process.env.REACT_APP_API_URL+'/timelinelist?timestamp=' + currentPage;
        const promise = axios.get(URL, config);
        promise.then(response => {
            setPostsList(previousPosts => [...previousPosts, ...response.data]);
            setLoading(false);
        });
        promise.catch(error => console.log(error));
    }, [currentPage]);

    return (<TimeLine
                title="timeline"
                postsList={postsList}
                createPost={true}
                loading={loading}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                timeline={true}
            />);
}