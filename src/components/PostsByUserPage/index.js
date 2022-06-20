import { useEffect, useState, useContext } from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import styled from "styled-components"
import ReactHashtag from "react-hashtag";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ThreeCircles } from "react-loader-spinner";

import { Title, MainContent, Center, CreatePost, PostHTML, SideBar, Photo, SubHeaderContainer,
        PostAside, SideBarLine, SubPostAside, PostContent, Container, UrlPost,
        UrlPostText, IconStyle, MainNoPosts} from "./styles";

import Header from '.././Header/index.js'
import UserContext from "../../contexts/UserContext";
import PostContentComponent from "../PostContent";
import LikeButton from "./LikeButton";

export default function PostsByUser(props){

    //TODO: Falar com o João para enviar o user.id tbm no post para poder usar com o infoLikes
    
    const { myPost, sideBar } = props
    const [postsList, setPostsList] = useState([])
    const [postsList2, setPostsList2] = useState([])
    const [animacao, setAnimacao] = useState(false)
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()
    
    const { id } = useParams();

    // Colocando um user id fixo para testar, mas objetivo é pegar pelo useContext
    const userIdTest = 2;

    useEffect( () => {
        const config = {headers: { authorization: `Bearer ${user}`}}
        const URL = process.env.REACT_APP_API_URL+'/user/'+id;
        setAnimacao(true)
        const promise = axios.get(URL, config)
        promise.then( (response) => {   let newPost = response.data.postsInfo
                                        newPost = newPost.map((elemento) => {
                                            return {
                                                ...elemento, 
                                                likesList: response.data.postsLikesInfo.filter(e => e.idPostLiked == elemento.id)
                                            }
                                        })
                                        setPostsList2({...response.data, postsInfo: newPost})
                                        setPostsList(response.data)
                                        setAnimacao(false) } )
        promise.catch( (error) => {console.log('Error Get PostsByUser: ', error)
                                    navigate("/timeline")})   } 
    , []) 


function CreateMyPost(){
        if(postsList2.postsInfo.length === 0){
            return( 
            
                    <MainNoPosts>
                        <h3>No posts published yet!</h3>
                    </MainNoPosts>
            )}
        return(
            <CreatePost> 
                {postsList2.postsInfo?.map( (post, index) => 
                <PostHTML > 
                    <PostAside >
                    <Photo src={postsList.profilePicture} />
                    <SubPostAside >
                        <LikeButton 
                                    liked={post.likesList?.filter((e) => e.UserLiked == userIdTest).length !== 0}
                                    postId={post.id}
                                    postLikes={post.likes}
                                    likeList={post.likesList?.filter((e) => e.UserLiked != userIdTest)}/>
                    </SubPostAside>
                    </PostAside>
                    <PostContentComponent   postsList={postsList}
                                            post={post}
                                            index={index}/>
                </PostHTML> )}
            </CreatePost>
        )
    }
    function CreateSideBar(){
        return(
            <SideBar>
                <h3>trending</h3>
                <SideBarLine/>
                {postsList.allHashtagsInfo?.map( (hashtag) => 
                {return <p># {hashtag.tag.split("#")[1]}</p>})}
            </SideBar>
        )
    }

    if(postsList.length === 0){
        return(
            <IconStyle>
                <ThreeCircles
                    color="red"
                    outerCircleColor= "#B6A7B5"
                    middleCircleColor="#504350"
                    innerCircleColor="#BCA79C"
                />
            </IconStyle>
        )
    }
    else{
        if(animacao){
            return(
                <Container>
                <Header/>
                <SubHeaderContainer>
                <Photo src={postsList.profilePicture} />
                <Title> {`${postsList.userName}'s posts`} </Title>
                </SubHeaderContainer>
                <MainContent> 
                    <IconStyle>
                            <ThreeCircles
                                color="red"
                                outerCircleColor= "#B6A7B5"
                                middleCircleColor="#504350"
                                innerCircleColor="#BCA79C"
                            />
                    </IconStyle>
                </MainContent>

            </Container>)
        }
        else{
            return(
                <Container>
                <Header/>
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
            </Container>
            )
        }
    }
}
