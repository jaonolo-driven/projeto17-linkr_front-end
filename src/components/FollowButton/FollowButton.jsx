import { useContext, useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import UserContext from "../../contexts/UserContext"
import axios from "axios"

export default function FollowButton() {

    const [user, setUser] = useContext(UserContext)
    const [follows, setFollows] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const { id } = useParams();  
    const body = { userId: user.id, followId: id,}

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/checkiffollows/${user.id}/${id}`
        ).then(({data}) => {
            setFollows(data)
        }).catch(e => console.log(e.data))
        setIsLoading(false)
    },[])

    if (1*id === user.id) return <></>

    function followUser() {
        setIsLoading(true)
        axios.post(`${process.env.REACT_APP_API_URL}/follow/${user.id}/${id}`
        ).then(() => {
            setFollows(true)
        }).catch(e => {console.log(e); alert('Não foi possivel completar a operação')})
        setIsLoading(false)
    }

    function unfollowUser() {
        setIsLoading(true)
        axios.delete(`${process.env.REACT_APP_API_URL}/unfollow/${user.id}/${id}`
        ).then(() => {
            setFollows(false)
        }).catch(e => {console.log(e.data); alert('Não foi possivel completar a operação')})
        setIsLoading(false)
    }

    if(isLoading === true)
    return(
        <Loading>Loading</Loading>
    )
    if(!follows)
    return(
        <Follow onClick={followUser}>Follow</Follow>
    )
    else
    return(
        <Unfollow onClick={unfollowUser}>Unfollow</Unfollow>
    )
};

const Button = styled.div`
    width: 120px;
    height: 40px;
    border-radius: 5px;
    line-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    cursor: pointer;

    @media screen and (max-width: 600px) {
        margin-top: 12px;
        width: 90px;
        height: 30px;
    }
`

const Follow = styled(Button)`
    color: white;
    background-color: #1877F2;
`;

const Unfollow = styled(Button)`
    color: #1877F2;
    background-color: white;
`;

const Loading = styled(Button)`
    color: white;
    background-color: darkgrey;
`;