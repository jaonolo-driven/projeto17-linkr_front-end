import { useEffect, useState, useContext } from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import ReactHashtag from "react-hashtag";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ThreeCircles } from "react-loader-spinner";

import { Title, MainContent, Center, CreatePost, PostHTML, SideBar, Photo, SubHeaderContainer,
        PostAside, SideBarLine, SubPostAside, PostContent, Container, UrlPost,
        UrlPostText, IconStyle, MainNoPosts} from "./styles";

        import Header from '.././Header/index.js'
import UserContext from "../../contexts/UserContext";

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

    // Colocando um user id fixo para testar, mas objetivo é pegar pelo useContext
    const userIdTest = 3;

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
                    <PostContent >
                        <h3>{postsList.userName}</h3> 
                        <p><ReactHashtag>{post.message}</ReactHashtag></p>
                        <UrlPost>
                            <UrlPostText>
                                <h4>{postsList[index].url.title}</h4>
                                <p>{postsList[index].url.description}</p>
                                <a href={postsList[index].url.link}>{postsList[index].url.link}</a>
                            </UrlPostText>
                            <img src={postsList[index].url.image}/>
                        </UrlPost>
                    </PostContent>
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
