import TrendingHashtags from "../TrendingHashtags/TrendingHashtags";
import { TailSpin } from "react-loader-spinner";

import PostForm from "../PostForm";
import Header from "../Header";
import FollowButton from "../FollowButton/FollowButton";
import Feed from "../Feed/Feed";
import {LoadingPage, TimelineHTML, Title, MainContent, CenterHTML, SidebarWrapper, UserPageTitle} from "./style.js";
import { useState } from "react";

export default function TimeLine({ title, profilePicture, postsList, currentPage, setCurrentPage, createPost, loading, timeline, newPostsState, setPostsList, setQteNewPosts,  qtdNewPosts, newPosts, setNewPostsExist }){
    const [update, setUpdate] = useState(false)
    
    function renderTitle() {
        const followButton = FollowButton()

        return ((!profilePicture) ? <Title> {title} </Title> :
            <UserPageTitle>        
                <h1> 
                    <img src={profilePicture} />
                    {title} 
                </h1>  
                {followButton}       
            </UserPageTitle>
        );
    }
    
    return( <TimelineHTML>
                <Header/>
                <MainContent>
                    <CenterHTML>
                        <div>
                        {renderTitle()}
                            <SidebarWrapper>
                                <div>
                                    {createPost ? <PostForm updateState={[update, setUpdate]} /> : <></>}
                                    <Feed
                                        timeline={timeline}
                                        postsList={postsList}
                                        setCurrentPage={setCurrentPage}
                                        loading={loading}
                                        newPostsState={newPostsState}
                                        setPostsList={setPostsList}
                                        setQteNewPosts={setQteNewPosts}
                                        qtdNewPosts={qtdNewPosts}
                                        newPosts={newPosts}
                                        setNewPostsExist={setNewPostsExist}
                                        updateState={[update, setUpdate]}
                                    />
                                    {loading ?
                                        (<LoadingPage>
                                            <TailSpin
                                                ariaLabel="loading-indicator"
                                                color="#6D6D6D"
                                                width={36}
                                                height={36}
                                            />
                                            <p>Loading more posts...</p>
                                        </LoadingPage>) : <></>}
                                    <li id="sentinela"></li>
                                </div>
                                <TrendingHashtags update={update}/>
                            </SidebarWrapper>
                        </div>
                    </CenterHTML>
                </MainContent>
            </TimelineHTML>);
}