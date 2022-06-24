import { useContext, useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import UserContext from "../../contexts/UserContext"
import axios from "axios"
import HeaderDropdownIcon from "../HeaderDropdownIcon"
import HeaderSearchBar from "../HeaderSearchBar"
import { ProfilePic } from "../../styles/ProfilePic"

export default function FollowButton() {

    const [user, setUser] = useContext(UserContext)
    const [follows, setFollows] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [reload, setReload] = useState(false)
    const { id } = useParams();  
    const body = { userId: user.id, followId: id,}

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/checkiffollows/${user.id}/${id}`
        ).then(({data}) => {
            setFollows(data)
            console.log(follows)
        }).catch(e => console.log(e.data))
        setIsLoading(false)
    },[])

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

const Follow = styled.div`
    width: 120px;
    height: 40px;
    border-radius: 5px;
    line-height: 40px;
    text-align: center;
    font-weight: bold;
    color: white;
    background-color: #1877F2;
`;

const Unfollow = styled.div`
    width: 120px;
    height: 40px;
    border-radius: 5px;
    line-height: 40px;
    text-align: center;
    font-weight: bold;
    color: #1877F2;
    background-color: white;
`;

const Loading = styled.div`
    width: 120px;
    height: 40px;
    border-radius: 5px;
    line-height: 40px;
    text-align: center;
    font-weight: bold;
    color: white;
    background-color: darkgrey;
`;