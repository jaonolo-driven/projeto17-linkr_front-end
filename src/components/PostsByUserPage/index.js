import { useEffect, useState, useContext } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import ReactHashtag from "react-hashtag";
import { FaRegHeart } from "react-icons/fa";
import { ThreeCircles } from "react-loader-spinner";

import { Title, MainContent, Center, CreatePost, PostHTML, SideBar, Photo, SubHeaderContainer,
        PostAside, SideBarLine, SubPostAside, PostContent, Container, UrlPost,
        UrlPostText, IconStyle} from "./styles";
import Header from '.././Header/index.js'
import UserContext from "../../contexts/UserContext";

export default function PostsByUser(props){
    const { myPost, sideBar } = props
    const [postsList, setPostsList] = useState([])
    const [animacao, setAnimacao] = useState(false)
    const [likes, setLikes] = useState([])
    const [user, setUser] = useContext(UserContext)
    // Só para testar a URL
    const { id } = useParams();
    

    useEffect( () => {
        const config = {headers: { authorization: `Bearer ${user}`}}
        const URL = process.env.REACT_APP_API_URL+'/user/'+id;
        setAnimacao(true)
        const promise = axios.get(URL, config)
        promise.then( (response) => {   setPostsList(response.data)
                                        setAnimacao(false) } )
        promise.catch( (error) => console.log('Error Get PostsByUser: ', error))   } 
    , []) 

/*     useEffect( () => {
        //const config = {headers: { authorization: `Bearer ${userState.token}`}}
        const URL = "http://localhost:5000/user/1"
        setAnimacao(true)
        const promise = axios.get(URL)
        promise.then( (response) => { setPostsList(...postsList, response.data)
                                        setAnimacao(false) } )
        promise.catch( (error) => console.log('Error Get PostsByUser: ', error))   } 
    ,[])

console.log(postsList) */
/* postsList.urlsInfo?.map(elemento => {
    console.log(elemento.url)
}) */

/* function likePost(postId){
        const config = {headers: { authorization: `Bearer ${user}`}}
        const URL = process.env.REACT_APP_API_URL+'/like/'+postId;
        const promise = axios.post(URL, {}, config)
        promise.then( (response) => { setLikes(response.data[0].likes) })
        promise.catch( (error) => console.log('Error Get PostsByUser: ', error)) 
} */

    function CreateMyPost(){
        return(
            <CreatePost> 
                {postsList.postsInfo?.map( (post, index) => 
                <PostHTML > 
                    <PostAside >
                    <Photo src={postsList.profilePicture} />
                    <SubPostAside >
                        <FaRegHeart />
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



