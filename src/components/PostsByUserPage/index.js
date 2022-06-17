// import { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import ReactHashtag from "react-hashtag";

// import { Title, MainContent, Center, CreatePost, PostHTML, SideBar, Photo, SubHeaderContainer,
//         PostAside, SideBarLine, SubPostAside, PostContent, Container } from "../PostsByUserPage/styles";

// export default function PostsByUser(props){
//     const { myPost, sideBar } = props
//     const [postsList, setPostsList] = useState([])
//     const [animacao, setAnimacao] = useState(false)
//     const token = JSON.parse(localStorage.getItem('user'))
//     // Só para testar a URL
//     let id = 2;
    
//     useEffect( () => {
//         const config = {headers: { authorization: `Bearer ${token}`}}
//         const URL = process.env.REACT_APP_API_URL+'/user/'+id;
//         setAnimacao(true)
//         const promise = axios.get(URL, config)
//         promise.then( (response) => {   setPostsList(...postsList, response.data)
//                                         setAnimacao(false) } )
//         promise.catch( (error) => console.log('Error Get PostsByUser: ', error))   } 
//     ,[]) 

// /*     useEffect( () => {
//         //const config = {headers: { authorization: `Bearer ${userState.token}`}}
//         const URL = "http://localhost:5000/user/1"
//         setAnimacao(true)
//         const promise = axios.get(URL)
//         promise.then( (response) => { setPostsList(...postsList, response.data)
//                                         setAnimacao(false) } )
//         promise.catch( (error) => console.log('Error Get PostsByUser: ', error))   } 
//     ,[])

// console.log(postsList) */

//     function CreateMyPost(){
//         return(
//             <CreatePost> 
//                 {postsList.postsInfo.map( (post) => 
//                 <PostHTML> 
//                     <PostAside>
//                     <Photo src={postsList.profilePicture} />
//                     <SubPostAside>
//                         <ion-icon name="heart-outline"></ion-icon>
//                         {post.likes} likes 
//                     </SubPostAside>
//                     </PostAside>
//                     <PostContent>
//                         <h3>{postsList.userName}</h3> 
//                         <p><ReactHashtag>{post.message}</ReactHashtag></p>
//                     </PostContent>
//                         </Post> )}
//             </CreatePost>
//         )
//     }
//     function CreateSideBar(){
//         return(
//             <SideBar>
//                 <h3>trending</h3>
//                 <SideBarLine/>
//                 {postsList.allHashtagsInfo.map( (hashtag) => 
//                 <p># {hashtag.tag.split("#")[1]}</p>)}
//             </SideBar>
//         )
//     }

//     if(postsList.length === 0){
//         return(
//             <>
//                 <h1> NAO EXISTE NADA </h1>
//             </>
//         )
//     }
//     else{
//         if(animacao){
//             return(
//                 <Container>
//                 <header> Header </header>
//                 <SubHeaderContainer>
//                 <Photo src={postsList.profilePicture} />
//                 <Title> {`${postsList.userName}'s posts`} </Title>
//                 </SubHeaderContainer>
//                 <MainContent> 
//                     <Center>
//                     <p>Carregando...</p>
//                     </Center>
//                 </MainContent>

//             </Container>)
//         }
//         else{
//             return(
//                 <Container>
//                 <header> Header </header>
//                 <SubHeaderContainer>
//                 <Photo src={postsList.profilePicture} />
//                 <Title> {`${postsList.userName}'s posts`} </Title>
//                 </SubHeaderContainer>
//                 <MainContent> 
//                     <Center>
//                         {myPost ? <CreateMyPost/> : <></>}
//                     </Center>
//                     { sideBar ? <CreateSideBar/> : <></>}
//                 </MainContent>
//             </Container>
//             );
//         }
//     }
// }



