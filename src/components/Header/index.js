import { useContext, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import UserContext from "../../contexts/UserContext"
import axios from "axios"
import HeaderDropdownIcon from "../HeaderDropdownIcon"
import HeaderSearchBar from "../HeaderSearchBar"
import { ProfilePic } from "../../styles/ProfilePic"

const Header = () => { 
    const [dropDownState, setDropDownState] = useState(false)
    const [user, setUser] = useContext(UserContext)
    const [avatar, setAvatar] = useState('')
    const navigate = useNavigate()  

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/user`,
        {
            headers: {
                Authorization: `Bearer ${user.token}`
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
        <DesktopContainer>
            <Link to="/">
                <h1>linkr</h1>
            </Link>
            <HeaderSearchBar/>
            <DropdownButton onClick={() => setDropDownState(!dropDownState)}  >
                <HeaderDropdownIcon dropDownState={dropDownState}/>
                <ProfilePic alt='profile-picture' src={avatar} radius={53} />
            </DropdownButton>
            <DropdownLogout state={dropDownState}><div onClick={logout}>logout</div></DropdownLogout>
        </DesktopContainer>
        <MobileHolder>
            <MobileContainer>
                <Link to="/">
                    <h1>linkr</h1>
                </Link>
                <DropdownButton onClick={() => setDropDownState(!dropDownState)}  >
                    <HeaderDropdownIcon dropDownState={dropDownState}/>
                    <ProfilePic alt='profile-picture' src={avatar} radius={53} />
                </DropdownButton>
                <DropdownLogout state={dropDownState}><div onClick={logout}>logout</div></DropdownLogout>
            </MobileContainer>
            <MobileSearchBarHolder>
                <HeaderSearchBar/>
            </MobileSearchBarHolder>
        </MobileHolder>
    </>
}

export default Header

const Container = styled.div`
    background-color: var(--darker-grey);
    position: sticky;
    top: 0;
    height: 72px;
    padding: 0 17px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1;

    h1 {
        color: white;
        font-size: 49px;
        font-family: var(--title-font);
    }

    a {
        text-decoration: none;
        height: 100%;
        display: flex;
        align-items: center;
        margin-right: 17px;
    }
`

const DesktopContainer = styled(Container)`
    @media screen and (max-width: 650px) {
        display: none
    }
`

const MobileHolder = styled.header`
    @media screen and (min-width: 650px) {
        display: none
    }
`

const MobileSearchBarHolder = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const MobileContainer = styled(Container)``

const DropdownButton = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    justify-content: flex-end;
    width: 150px;
    height: 100%;
    cursor: pointer;
    background-color: var(--darker-grey);
`

const DropdownLogout = styled.div`
    position: absolute;
    background-color: var(--darker-grey);
    right: 0;
    top: 72px;
    z-index: -1;
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