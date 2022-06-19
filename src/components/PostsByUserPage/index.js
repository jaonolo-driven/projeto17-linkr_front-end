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

export default function PostsByUser(props){

    //TODO: Falar com o João para enviar o user.id tbm no post para poder usar com o infoLikes
    
    const { myPost, sideBar } = props
    const [postsList, setPostsList] = useState([])
    const [animacao, setAnimacao] = useState(false)
    const [likes, setLikes] = useState()
    const [user, setUser] = useContext(UserContext)
    const [typeLikes, setTypeLikes] = useState('')
    const [firstacess, setFirstacess] = useState(true)
    const [idPost, setIdPost] = useState();
    const [likesPostInfos, setLikesPostInfos] = useState([])
    const navigate = useNavigate()
    
    const { id } = useParams();
<<<<<<< HEAD

    // Colocando um user id fixo para testar, mas objetivo é pegar pelo useContext
    const userIdTest = 3;

=======
    
>>>>>>> 537b4bef890c2e017ed872fa1ece7b22234ef14e
    useEffect( () => {
        const config = {headers: { authorization: `Bearer ${user}`}}
        const URL = process.env.REACT_APP_API_URL+'/user/'+id;
        setAnimacao(true)
        const promise = axios.get(URL, config)
        promise.then( (response) => {   setPostsList(response.data)
                                        setAnimacao(false) } )
        promise.catch( (error) => {console.log('Error Get PostsByUser: ', error)
                                    navigate("/timeline")})   } 
    , []) 
<<<<<<< HEAD

function togglelikePost(postId){
        const config = {headers: { authorization: `Bearer ${user}`}}
        const URL = process.env.REACT_APP_API_URL+'/togglelike/'+postId;
        const promise = axios.patch(URL, {}, config)
        
        promise.then( (response) => {  setLikes(response.data[0].likes)
                                        insertLikes(postId, response.data[0].likes)
                                        setTypeLikes(response.data[1].typeLike)
                                        setIdPost(response.data[2].postIdInfo)
                                        setLikesPostInfos(response.data[3])
                                        setFirstacess(false)})
        promise.catch( (error) => console.log('Error Get PostsByUser: ', error)) 
} 
//console.log(likesPostInfos)

function insertLikes(postId, responselikes){
    postsList.postsInfo?.map((post) => {
            (post.id == postId)?(post.likes = responselikes):(<></>)
    })
    CreateMyPost();
}
=======
    
    function togglelikePost(postId){
            const config = {headers: { authorization: `Bearer ${user}`}}
            const URL = process.env.REACT_APP_API_URL+'/togglelike/'+postId;
            const promise = axios.patch(URL, {}, config)
            promise.then( (response) => { setLikes(response.data[0].likes)
                                            insertLikes(postId, response.data[0].likes)
                                            setTypeLikes(response.data[1].typeLike)
                                            setIdPost(response.data[2].postIdInfo)})
            promise.catch( (error) => console.log('Error Get PostsByUser: ', error)) 
    } 
    console.log(postsList)
    function insertLikes(postId, responselikes){
        postsList.postsInfo?.map((post) => {
                (post.id == postId)?(post.likes = responselikes):(<></>)
        })
        CreateMyPost();
    }
>>>>>>> 537b4bef890c2e017ed872fa1ece7b22234ef14e

//console.log(postsList)

/* function clickToggleLike(postId){
    return (
    (postId == idPost)?(
        (typeLikes == 'like')?(
            <FaHeart fill={'#AC0000'} onClick={() => togglelikePost(postId)}/>):(
            <FaRegHeart onClick={() => togglelikePost(postId)}/>
        )):(<FaRegHeart onClick={() => togglelikePost(postId)}/>)
    )
} */

function whoLiked(postsList, userIdTest){
    return (
        (firstacess)?(
            postsList.postsLikesInfo?.map((infoLike) =>{
                (infoLike.userLiked === userIdTest)?
                (<FaHeart fill={'#AC0000'} onClick={() => togglelikePost(infoLike.idPostLiked)}/>):
                (<FaRegHeart onClick={() => togglelikePost(infoLike.idPostLiked)}/>)
            })
        ):(likesPostInfos?.map((likePostInfo) => {
            (likePostInfo.userLiked === userIdTest)?
            (<FaHeart fill={'#AC0000'} onClick={() => togglelikePost(likePostInfo.idPostLiked)}/>):
            (<FaRegHeart onClick={() => togglelikePost(likePostInfo.idPostLiked)}/>)
        }))
    )
}

function CreateMyPost(){
        if(postsList.postsInfo.length === 0){
            return( 
            
                    <MainNoPosts>
                        <h3>No posts published yet!</h3>
                    </MainNoPosts>
            )}
        return(
            <CreatePost> 
                {postsList.postsInfo?.map( (post, index) => 
                <PostHTML > 
                    <PostAside >
                    <Photo src={postsList.profilePicture} />
                    <SubPostAside >
                        {
                            (firstacess)?(
                                postsList.postsLikesInfo?.map((infoLike) =>{
                                    (infoLike.idPostLiked == post.id)?
                                    (infoLike.UserLiked == userIdTest)?(
                                    (<FaHeart fill={'#AC0000'} onClick={() => togglelikePost(infoLike.idPostLiked)}/>)):
                                    (<FaRegHeart onClick={() => togglelikePost(infoLike.idPostLiked)}/>):
                                    (<FaRegHeart onClick={() => togglelikePost(infoLike.idPostLiked)}/>)
                                })
                            ):(likesPostInfos?.map((likePostInfo) => {
                                (likePostInfo.UserLiked === userIdTest && likePostInfo.idPostLiked == post.id)?
                                (<FaHeart fill={'#AC0000'} onClick={() => togglelikePost(likePostInfo.idPostLiked)}/>):
                                (<></>)
                            }))
                        }
                        <span> {post.likes} likes</span> 
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
            );
        }
    }
}
