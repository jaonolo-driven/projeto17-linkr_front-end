import styled from "styled-components";

import PostForm from "../PostForm";
import Header from "../Header";
import Post from "../Post/Post";
import TrendingHashtags from "../TrendingHashtags/TrendingHashtags";
import { ThreeCircles } from "react-loader-spinner";

export default function TimeLine({ title, profilePicture, postsList, createPost, loading }){

    function renderFeed(){
        if(postsList?.length === 0){
            return(<h1>There are no posts yet</h1>)
        }
        
        return (
            <Feed>
                {postsList?.map( post => <Post postINFO={post} key={post.id}/> )}
            </Feed>
        );
    }

    function renderTitle() {
        if(!profilePicture)
            return <Title> {title} </Title>;
        return (
            <UserPageTitle>
                <img src={profilePicture} />
                <h1> {title} </h1>
            </UserPageTitle>
        );
    }
    
    if(loading) {
        return(
            <MainContent>
                <LoadingPage>
                    <ThreeCircles
                        color="red"
                        outerCircleColor= "#B6A7B5"
                        middleCircleColor="#504350"
                        innerCircleColor="#BCA79C"
                    />
                </LoadingPage>
            </MainContent>);
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
                                    {renderFeed()}
                                </div>
                                <TrendingHashtags />
                            </SidebarWrapper>
                        </div>
                    </CenterHTML>
                </MainContent>
            </TimelineHTML>);
}

const LoadingPage = styled.div`
    display: flex;
    width: 100vw;
    height: 100vw;
    justify-content: center;
    align-items: center;
`

const TimelineHTML = styled.div`
    height: 100%;
    overflow: auto;
`;

const Title = styled.h1`
    display: flex;
    width: 100%;
    text-align: left;
    margin-top: 78px;
    margin-bottom: 40px;
    color: #fff;
    font-family: var(--subtitle-font);
    font-weight: 700;
    font-size: 43px;
    
    @media screen and (max-width: 650px) {
        margin: 19px 0;
        padding-left: 3%;
        line-height: 60px;
    }
`;

const MainContent = styled.main`
    width: 100%;
    height: calc(100% - 72px);

    @media screen and (max-width: 650px) {
        height: calc(100% - 137px);
    }
`;

const CenterHTML = styled.section`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 650px) {
        margin: 0;   
    }
`;

const Feed = styled.div`
    display: flex;
    flex-direction: column;
`;

const SidebarWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 28px
`;

const UserPageTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    //margin-left: 14.5%;
    //background-color: red;

    h1 {
        display: flex;
        margin-top: 5%;
        margin-bottom: 5%;
        margin-left: 3%;
        color: #fff;
        font-family: var(--subtitle-font);
        font-weight: 700;
        font-size: 43px;
    }

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-left: 18px;
        margin-right: 10px;
    }
`;