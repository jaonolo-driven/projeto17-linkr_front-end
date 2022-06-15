import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import UserContext from "../../contexts/UserContext.js";

import { Title, MainContent, Center, CreatePost, Post, SideBar, Photo, SubHeaderContainer,
        PostAside, SideBarLine } from "./styles";

export default function PostsByUser(props){
    const { myPost, sideBar } = props
    const [postsList, setPostsList] = useState([])
    const [animacao, setAnimacao] = useState(false)
    const {userState} = useContext(UserContext)
/*     useEffect( () => {
        const config = {headers: { authorization: `Bearer ${userState.token}`}}
        const URL = process.env.REACT_APP_API_URL+'/timeline'
        setAnimacao(true)
        const promise = axios.get(URL, config)
        promise.then( (response) => {   setPostsList(...postsList, response.data)
                                        setAnimacao(false) } )
        promise.catch( (err) => console.log('Error Get PostsList TIMELINE: ', err))   } 
    ,[]) */

    useEffect( () => {
        //const config = {headers: { authorization: `Bearer ${userState.token}`}}
        const URL = "http://localhost:5000/user/1"
        setAnimacao(true)
        const promise = axios.get(URL)
        promise.then( (response) => { setPostsList(response.data)
                                        setAnimacao(false) } )
        promise.catch( (error) => console.log('Error Get PostsByUser: ', error))   } 
    ,[])

console.log(postsList)

    function CreateMyPost(){
        return(
            <CreatePost> 
                {postsList.postsInfo.map( (post) => 
                <Post> 
                    <PostAside><Photo src={postsList.profilePicture} />
                        <ion-icon name="heart-outline"></ion-icon>
                        {post.likes} likes 
                    </PostAside>
                        {postsList.userName} 
                        {post.message}
                        </Post> )}
            </CreatePost>
        )
    }
    function CreateSideBar(){
        return(
            <SideBar>
                <h3>trending</h3>
                <SideBarLine/>
                {postsList.allHashtagsInfo.map( (hashtag) => 
                <p>{hashtag.tag}</p>)}
            </SideBar>
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
                <Photo src={postsList.profilePicture} />
                <Title> {`${postsList.userName}'s posts`} </Title>
                <MainContent> 
                    <Center>
                    <p>Carregando...</p>
                    </Center>
                </MainContent>
            </>)
        }
        else{
            return(
            <>
                <header> Header </header>
                <SubHeaderContainer>
                <Photo src={postsList.profilePicture} />
                <Title> {`${postsList.userName}'s posts`} </Title>
                </SubHeaderContainer>
                <MainContent> 
                    <Center>
                        {myPost ? <CreateMyPost/> : <></>}
                    </Center>
                    { sideBar ? <CreateSideBar/> : <></>}
                </MainContent>
            </>
            );
        }
    }
}



