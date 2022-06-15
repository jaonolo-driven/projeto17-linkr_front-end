import React from "react";
import styled from "styled-components";
import axios from "axios";
import UserContext from "../../../contexts/UserContext";

export default function TimeLine(props){
    const { myPost, sideBar, titleTimeLine } = props
    const [postsList, setPostsList] = React.useState([1,2,3,4,5,6,7])
    const [animacao, setAnimacao] = React.useState(false)
    const {userState} = React.useContext(UserContext)

    React.useEffect( () => {
        const config = {headers: { authorization: `Bearer ${userState.token}`}}
        const URL = process.env.REACT_APP_API_URL+'/timeline'
        setAnimacao(true)
        const promise = axios.get(URL, config)
        promise.then( (response) => {   setPostsList(...postsList, response.data)
                                        setAnimacao(false) } )
        promise.catch( (err) => console.log('Error Get PostsList TIMELINE: ', err))   } 
    ,[])

    function CreateMyPost(){
        return(
            <CreatePost> CREAR POST</CreatePost>
        )
    }
    function CreateSideBar(){
        return(
            <SideBar> SIDE BAR </SideBar>
        )
    }

    if(postsList.length === 0){
        return(
            <>
                <h1> NAO EXISTE NADA </h1>
            </>
        )
    }
    else{
        if(animacao){
            return(
                <>
                <header> Header </header>
                <Title> {titleTimeLine} </Title>
                <MainContent> 
                    <Center>
                    <p>Carregando</p>
                    </Center>
                </MainContent>
            </>)
        }
        else{
            return(
            <>
                <header> Header </header>
                <Title> {titleTimeLine} </Title>
                <MainContent> 
                    <Center>
                        {myPost ? <CreateMyPost/> : <></>}
                        {postsList.map( (post) => <Post> AQUI E UM POST </Post> )}
                    </Center>
                    { sideBar ? <CreateSideBar/> : <></>}
                </MainContent>
            </>
            );
        }
    }
}

const Title = styled.h1`
    display: flex;
    margin-top: 100px;
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

const CreatePost = styled.div`
    width: 611px;
    height: 209px;
    left: 241px;
    top: 232px;
    margin-bottom: 30px;
    border-radius: 16px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Post = styled.div`
    width: 611px;
    height: 276px;
    left: 415px;
    top: 495px;
    background: #171717;
    margin-bottom: 30px;
    border-radius: 16px;
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