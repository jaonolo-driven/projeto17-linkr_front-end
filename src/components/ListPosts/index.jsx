import axios from "axios"
import { useEffect, useState } from "react"
import ItemPost from "../ItemPost"

export default function ListPosts(props){
    const {disable} = props
    const [posts, setPosts] = useState()

    useEffect(()=> {
        const promise = axios.get(`${process.env.REACT_APP_API_URL}/listposts`)
        promise.then(response => {
            setPosts(response.data)
        })
        promise.catch(e => alert(e.response.data))
    }, [disable])
    return(
        <>
            {posts?.map(p => <ItemPost  picture={p.profilePicture}
                                        name={p.userName}
                                        message={p.message}/>)}
        </>
    )
}