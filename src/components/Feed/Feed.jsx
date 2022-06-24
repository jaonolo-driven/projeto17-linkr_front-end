import { useEffect, useRef } from "react";
import styled from "styled-components";

import Post from "../Post/Post";

export default function Feed({postsList, setCurrentPage, loading}) {

    const postsListState = useRef();
    postsListState.current = postsList;

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting)) {
                if(postsListState.current.length != 0){
                    setCurrentPage(postsListState.current.at(-1).createdAt);
                }       
            }
        });
        intersectionObserver.observe(document.querySelector('#sentinela'));
        return () => intersectionObserver.disconnect();
    }, []);
    
    if(loading && postsList?.length === 0) {
        return <></>;
    }
    
    if(postsList?.length === 0){
        return(<h1>There are no posts yet</h1>);
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
`;