import React from "react";
import styled from "styled-components";
import axios from "axios";
import UserContext from "../../../contexts/UserContext";
import PostForm from "../../PostForm";
import Header from "../../Header";
import Post from "../../Post/Post";
import { ThreeCircles } from "react-loader-spinner";

export default function TimeLine(props){
    const { myPost, sideBar, titleTimeLine } = props
    const [postsList, setPostsList] = React.useState([])
    const [animacao, setAnimacao] = React.useState(false)

    const [userState, setUserState] = React.useContext(UserContext)

    React.useEffect( () => {
        const config = {headers: { authorization: `Bearer ${userState}`}}
        const URL = process.env.REACT_APP_API_URL+'/timeline'
        setAnimacao(true)
        const promise = axios.get(URL, config)
        promise.then( (response) => {   setPostsList(response.data)
                                        setAnimacao(false)})
        promise.catch( (err) => console.log('Error Get PostsList TIMELINE: ', err))   } 
    ,[])

    if(!postsList){
        return(<h1> There are no posts yet</h1>)
    }    
    
    function CreateSideBar(){
        return(
            <SideBar> SIDE BAR </SideBar>
        )
    }

    function Loading(){
        return(
                <ThreeCircles   color="red"
                                outerCircleColor= "#B6A7B5"
                                middleCircleColor="#504350"
                                innerCircleColor="#BCA79C"/>)}
    
    return(
        <TimelineHTML>
            <Header/>
            <MainContent> 
                <CenterHTML>
                    <Title> {titleTimeLine} </Title>
                    {myPost ? <PostForm/> : <></>}
                    {animacao ? <Loading/> : <Post postsList={postsList}/> }
                </CenterHTML>
            </MainContent>
        </TimelineHTML>
        );

    }

const TimelineHTML = styled.div`
    height: 100%;
    overflow: scroll;
`;

const Title = styled.h1`
    display: flex;
    width: 100%;
    text-align: left;
    margin-top: 50px;
    margin-bottom: 50px;
    margin-left: 3%;
    color: #fff;
    `;

const MainContent = styled.main`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 90%;
    height: 100%;
    margin-left: 3%;
`;

const CenterHTML = styled.section`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    height: 100%;
    /* background-color: blue; */
`;

const SideBar = styled.aside`
    display: flex;
    position: sticky;
    width: 301px;
    height: 406px;
    left: 10%;
    top: 232px;
    margin-left: 30px;
    background: #171717;
    border-radius: 16px;
`;