import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext"
import axios from "axios"
import { FiRefreshCw } from "react-icons/fi";

import Post from "../Post/Post";

export default function Feed({postsList, setCurrentPage, loading, timeline, newPostsExist, setPostsList, setQteNewPosts, qtdNewPosts, newPosts, setNewPostsExist, updateState}) {
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

    async function showNewPosts(){
    
        await setQteNewPosts(0);
        setPostsList([...newPosts, ...postsList]);
        setNewPostsExist(false)
    }

    return (<>
            {
                (qtdNewPosts > 0)?(
                <Button onClick={showNewPosts}> {qtdNewPosts} new posts, load more! <FiRefreshCw/></Button>):(<></>)
            }
            <FeedList>
                {postsList?.map(post => {
                    return <Post postINFO={post} key={`${post.isRepost ? `${post.whoRepostedId}:` : ''}${post.id}`} updateState={updateState}/>;
                } )}
            </FeedList>
    </>);
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

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%; 
    color: #FFFFFF;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    font-family: var(--font-family);
    background: #1877F2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    border: none;
    padding: 5px;
    margin-top: 2%;
    margin-bottom: 2%;
    height: 61px;

    svg {
        margin-left: 3%;
    }
`