import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext"
import axios from "axios"

import Post from "../Post/Post";

export default function Feed({postsList, setCurrentPage, loading, timeline}) {

    const [user, setUser] = useContext(UserContext)
    const postsListState = useRef();
    postsListState.current = postsList;
    const [follows, setFollows] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/numberoffollows/${user.id}`
        ).then(({data}) => {
            setFollows(data)
        }).catch(e => console.log(e.data))
        const intersectionObserver = new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting)) {
                if(postsListState.current.length != 0){
                    setCurrentPage(postsListState.current.at(-1).createdAt);
                    console.log("estou atualizando o estado");
                }       
            }
        });
        intersectionObserver.observe(document.querySelector('#sentinela'));
        return () => intersectionObserver.disconnect();
    }, []);
    
    if(loading && postsList?.length === 0) {
        return <></>;
    }

    if(!follows && timeline){
        return(<White>You don't follow anyone yet. Search for new friends!</White>);
    }
    
    if(postsList?.length === 0){
        return(<White>No posts found from your friends</White>);
    }

    return (
            <FeedList>
                {postsList?.map(post => {
                    return <Post postINFO={post} key={`${post.isRepost ? `${post.whoRepostedId}:` : ''}${post.id}`}/>;
                } )}
            </FeedList>
    );
}

const FeedList = styled.ul`
    display: flex;
    flex-direction: column;
    padding: 0;
    margin-top: 0;
`;

const White = styled.h1`
    color: white;
`;