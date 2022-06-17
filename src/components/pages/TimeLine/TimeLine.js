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
    const [postsList, setPostsList] = React.useState([``])
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

    if(postsList.length === 0) return(<h1> There are no posts yet</h1>)
    // console.log('postsList : ',postsList, typeof postsList ) 
    
    function Loading(){
        return(
                <ThreeCircles   color="red"
                                outerCircleColor= "#B6A7B5"
                                middleCircleColor="#504350"
                                innerCircleColor="#BCA79C"/>)}
    
    return(
        <TimelineHTML>
            <Header/>
            <Title> {titleTimeLine} </Title>
            <MainContent> 
                <Center>
                    {myPost ? <></> : <></>}
                    {console.log('pre Post : ',postsList)}
                    {animacao ? <Loading/> : postsList.map( (post) => <Post postsList={postsList}/> ) }
                </Center>
                { sideBar ? <CreateSideBar/> : <></>}
            </MainContent>
        </TimelineHTML>
        );

        function CreateSideBar(){
            return(
                <SideBar> SIDE BAR </SideBar>
            )
        }
    }

const TimelineHTML = styled.div`
    height: 100%;
    overflow: scroll;
`;

const Title = styled.h1`
    display: flex;
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
    margin-left: 3%;
`;

const Center = styled.section`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
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