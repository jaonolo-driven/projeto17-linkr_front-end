import PostForm from "../PostForm"

export default function Timeline(){
    const token = JSON.parse(localStorage.getItem('user'))
    return(
        <>
            <h1>{token}</h1>
            <PostForm/>
        </>
    )
}