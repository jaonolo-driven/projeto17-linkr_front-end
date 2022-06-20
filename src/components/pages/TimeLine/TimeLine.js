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
    const [animacao, setAnimacao] = React.useState(true)
    const [userState, setUserState] = React.useContext(UserContext)
    let isListEmpyt, empyt

    console.log("POSTLIST :", postsList)
    console.log(userState)

    console.log(userState)

    React.useEffect( () => {
        const config = {headers: { authorization: `Bearer ${userState}`}}
        const URL = process.env.REACT_APP_API_URL+'/timeline'
        const promise = axios.get(URL, config)
        promise.then( (response) => {   
                                        setPostsList(response.data)
                                        setAnimacao(false)})
        promise.catch( (err) => console.log('Error Get PostsList TIMELINE: ', err))   } 
    ,[])

    function IsListEmpyt(){
        if(postsList === 0){
            return(<h1>There are no posts yet</h1>)
        }
        return(<Post postsList={postsList}/>)
    } 
    
    function CreateSideBar(){
        return(
            <SideBar> SIDE BAR </SideBar>
        )
    }

    function Loading(){
        return(
                <LoadingHTML>
                    <ThreeCircles   color="red"
                                    outerCircleColor= "#B6A7B5"
                                    middleCircleColor="#504350"
                                    innerCircleColor="#BCA79C"/>
                </LoadingHTML>)}
    
    if(animacao){return(<MainContent> <Loading/> </MainContent>)}
    
    return( <TimelineHTML>
                <Header/>
                <MainContent> 
                    <CenterHTML>
                        <Title> {titleTimeLine} </Title>
                        {myPost ? <PostForm/> : <></>}
                        <IsListEmpyt/>
                    </CenterHTML>
                    <CreateSideBar/>
                </MainContent>
            </TimelineHTML>)}

const LoadingHTML = styled.div`
    display: flex;
    width: 100vw;
    height: 100vw;
    justify-content: center;
    align-items: center;
`

const TimelineHTML = styled.div`
    height: 100%;
    overflow: scroll;
    /* background-color: blue; */
`;

const Title = styled.h1`
    display: flex;
    width: 100%;
    text-align: left;
    margin-top: 50px;
    margin-bottom: 50px;
    margin-left: 3%;
    color: #fff;
    /* background-color: aliceblue; */
    `;

const MainContent = styled.main`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 90%;
    height: 100%;
    margin-left: 3%;
    /* background-color: aqua; */
`;

const CenterHTML = styled.section`
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