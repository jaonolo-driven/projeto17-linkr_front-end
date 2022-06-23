import TrendingHashtags from "../TrendingHashtags/TrendingHashtags";
import { TailSpin } from "react-loader-spinner";

import PostForm from "../PostForm";
import Header from "../Header";
import FollowButton from "../FollowButton/FollowButton";
import Feed from "../Feed/Feed";
import {LoadingPage, TimelineHTML, Title, MainContent, CenterHTML, SidebarWrapper, UserPageTitle} from "./style.js";

export default function TimeLine({ title, profilePicture, postsList, currentPage, setCurrentPage, createPost, loading }){

    function renderTitle() {
        if(!profilePicture)
            return <Title> {title} </Title>;
        return (
            <UserPageTitle>  
                <img src={profilePicture} />
                <h1> {title} </h1>  
                {FollowButton()}       
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
                                    {createPost ? <PostForm/> : <></>}
                                    <Feed
                                        postsList={postsList}
                                        setCurrentPage={setCurrentPage}
                                        loading={loading}
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
                                <TrendingHashtags />
                            </SidebarWrapper>
                        </div>
                    </CenterHTML>
                </MainContent>
            </TimelineHTML>);
}