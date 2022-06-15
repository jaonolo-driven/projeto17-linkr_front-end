import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import UserContext from "../../contexts/UserContext"
import axios from "axios"
import HeaderDropdownIcon from "../HeaderDropdownIcon"

const Header = () => { 
    const [dropDownState, setDropDownState] = useState(false)
    const [user, setUser] = useContext(UserContext)
    const [avatar, setAvatar] = useState('')
    const navigate = useNavigate()  

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/user`,
        {
            headers: {
                Authorization: `Bearer ${user}`
            }
        }).then(response => {
            setAvatar(response.data.profilePicture)
        }).catch(e => console.log(e.data))
    },[])

    const logout = () => {
        localStorage.removeItem('user')
        setUser(null)
        navigate('/')
    }

    return <>
        <Container>
            <h1>linkr</h1>
            <div onClick={() => setDropDownState(!dropDownState)}  >
                <HeaderDropdownIcon dropDownState={dropDownState}/>
                <ProfilePic alt='profile-picture' src={avatar} />
            </div>
        </Container>
        <DropdownLogout state={dropDownState}><div onClick={logout}>logout</div></DropdownLogout>
    </>
}

export default Header

const Container = styled.div`
    background-color: var(--darker-grey);
    position: sticky;
    top: 0;
    z-index: 1;
    height: 72px;
    padding: 0 17px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        color: white;
        font-size: 49px;
        font-family: var(--title-font);
    }

    > div {
        display: flex;
        align-items: center;
        gap: 16px;
        justify-content: flex-end;
        width: 150px;
    }
`

const ProfilePic = styled.img`
    height: 53px;
    border-radius: 50%;
`

const DropdownLogout = styled.div`
    position: absolute;
    z-index: 0;
    background-color: var(--darker-grey);
    right: 0;
    top: 72px;
    transform: translateY(${props => props.state ? '0%' : '-100%'});
    transition: transform 250ms;
    width: 150px;
    height: 47px;
    border-radius: 0 0 0 20px;

    div {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 17px;

        :hover {
            cursor: pointer;
        }
    }
`